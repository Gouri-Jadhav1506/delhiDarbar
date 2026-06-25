import "server-only";
import type { StaticImageData } from "next/image";
import { newsBlogData } from "@/components/data/newsBlogData";

type WordPressEmbedded = {
  "wp:featuredmedia"?: Array<{ source_url?: string }>;
  author?: Array<{ name?: string }>;
  "wp:term"?: Array<Array<{ name?: string }>>;
};

type WordPressPostApiResponse = {
  id: number;
  slug: string;
  link: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: WordPressEmbedded;
};

export type WordPressPost = {
  id: number;
  title: string;
  slug: string;
  link: string;
  excerpt: string;
  date: string;
  category: string;
  image: StaticImageData | string;
  author: string;
  comments: number;
};

const WORDPRESS_BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

const FALLBACK_CATEGORY = "Restaurant";
const FALLBACK_LINK = "/blog-details";

const FALLBACK_POSTS: WordPressPost[] = newsBlogData.map((item, index) => ({
  id: index,
  title: item.title,
  slug: `fallback-post-${index + 1}`,
  link: FALLBACK_LINK,
  excerpt: "",
  date: item.date,
  category: item.category ?? FALLBACK_CATEGORY,
  image: item.image,
  author: item.author,
  comments: item.comments ?? 0,
}));

const stripHtml = (value: string) => value.replace(/<[^>]*>?/gm, "").trim();

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "01 Jan";

  return date
    .toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    })
    .replace(",", "");
};

export async function fetchLatestWordPressPosts(
  limit = 3,
): Promise<WordPressPost[]> {
  if (!WORDPRESS_BASE_URL) {
    return FALLBACK_POSTS;
  }

  const url = new URL("/wp-json/wp/v2/posts", WORDPRESS_BASE_URL);
  url.searchParams.set("_embed", "1");
  url.searchParams.set("per_page", String(limit));

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 * 30 },
    });

    if (!response.ok) {
      console.error("Failed to fetch posts from WordPress", response.status);
      return FALLBACK_POSTS;
    }

    const rawPosts: WordPressPostApiResponse[] = await response.json();

    if (!rawPosts.length) {
      return FALLBACK_POSTS;
    }

    return rawPosts.map((post) => {
      const image =
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? FALLBACK_POSTS[0].image;
      const category =
        post._embedded?.["wp:term"]?.[0]?.[0]?.name ?? FALLBACK_CATEGORY;
      const author =
        post._embedded?.author?.[0]?.name ?? FALLBACK_POSTS[0].author;

      return {
        id: post.id,
        title: stripHtml(post.title.rendered),
        slug: post.slug,
        link: post.link ?? WORDPRESS_BASE_URL ?? FALLBACK_LINK,
        excerpt: stripHtml(post.excerpt.rendered),
        date: formatDate(post.date),
        category,
        image,
        author,
        comments: 0,
      };
    });
  } catch (error) {
    console.error("Unexpected WordPress fetch error", error);
    return FALLBACK_POSTS;
  }
}
