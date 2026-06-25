import React from "react";
import ProductDetailClient from "./ProductDetailClient";
import { products } from "../../data/products";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <ProductDetailClient id={resolvedParams.id} />;
}
