'use client';

import heroBg from "@/assets/images/About-Us/hero-bg-pexels.jpg";
import about1 from "@/assets/images/About-Us/about-1.jpg";
import about2 from "@/assets/images/About-Us/about-2.jpg";
import about3 from "@/assets/images/About-Us/about-3.jpg";
import about4 from "@/assets/images/About-Us/about-4.jpg";
import SubPageBanner from "@/components/banner/SubPageBanner";
import CustomerFeedback from "@/components/common/CustomerFeedback";
import FoodPlaySection from "@/components/common/FoodPlaySection";
import MarqueeSlider from "@/components/common/MarqueeSlider";
import { useSkylineLandingLocale } from "@/lib/useSkylineLandingLocale";
import Image from "next/image";

export default function AboutUsPage() {
  const { isFrench } = useSkylineLandingLocale();

  const copy = isFrench
    ? {
        brand: "Skyline by Delhi Darbar",
        welcome: "Bienvenue chez Skyline",
        intro1:
          "La tradition rencontre la modernite. Notre rooftop offre une vue panoramique sur la ville, une cuisine indienne raffinee et une experience memorable sous les etoiles.",
        intro2:
          "Ne de l'heritage de Delhi Darbar, Skyline eleve l'experience culinaire au sommet du Rainbow Building a Riviera Synacassi. Nous reunissons saveurs indiennes authentiques et ambiance rooftop contemporaine.",
        features: [
          {
            title: "Vue rooftop",
            text: "Panorama urbain depuis le Rainbow Building",
          },
          {
            title: "Cuisine authentique",
            text: "Saveurs indiennes traditionnelles avec presentation moderne",
          },
          {
            title: "Evenements parfaits",
            text: "Ideal pour les celebrations et les moments intimes",
          },
        ],
        storyTitle: "Un voyage culinaire",
        storyBody1:
          "Notre carte celebre la richesse de la cuisine indienne, des biryanis parfumes d'Hyderabad aux specialites tandoori du Pendjab. Chaque plat est prepare selon des recettes transmises avec des epices nobles et des ingredients frais.",
        storyBody2:
          "Qu'il s'agisse de kebabs signatures, de currys onctueux ou de creations plus contemporaines, chaque assiette raconte une histoire de tradition, de passion et de maitrise culinaire.",
        experienceTitle: "L'experience Skyline",
        experienceBody1:
          "Au coucher du soleil sur Abidjan, Skyline devient un refuge vibrant. Lumieres douces, decor indien contemporain et brise du soir installent une atmosphere elegante et accueillante.",
        experienceBody2:
          "Des diners romantiques aux celebrations entre amis, chaque visite promet des souvenirs durables. Notre equipe veille a rendre chaque moment fluide et remarquable.",
      }
    : {
        brand: "Skyline by Delhi Darbar",
        welcome: "Welcome to Skyline",
        intro1:
          "Where tradition meets modernity. Our rooftop lounge offers panoramic city views, exquisite Indian cuisine, and an unforgettable dining experience under the stars.",
        intro2:
          "Born from the beloved legacy of Delhi Darbar, Skyline elevates the dining experience to new heights. Perched atop the Rainbow Building in Riviera Synacassi, we blend authentic Indian flavors with contemporary rooftop ambiance.",
        features: [
          {
            title: "Rooftop Views",
            text: "Panoramic city skyline from the Rainbow Building",
          },
          {
            title: "Authentic Cuisine",
            text: "Traditional Indian flavors with modern presentation",
          },
          {
            title: "Perfect Events",
            text: "Ideal for celebrations and intimate gatherings",
          },
        ],
        storyTitle: "A Culinary Journey",
        storyBody1:
          "Our menu celebrates the rich tapestry of Indian cuisine, from the aromatic biryanis of Hyderabad to the tandoori specialties of Punjab. Each dish is crafted with time-honored recipes, fine spices, and fresh ingredients.",
        storyBody2:
          "Whether you are savoring signature kebabs, indulging in creamy curries, or exploring fusion creations, every plate tells a story of tradition, passion, and culinary excellence.",
        experienceTitle: "The Skyline Experience",
        experienceBody1:
          "As the sun sets over Abidjan, Skyline transforms into a striking retreat. Soft lighting, contemporary Indian decor, and the evening breeze create an atmosphere that feels sophisticated yet welcoming.",
        experienceBody2:
          "From romantic dinners to lively celebrations, every visit promises memorable moments. Our attentive team ensures your experience feels polished from arrival to the last course.",
      };

  return (
    <>
      <SubPageBanner heroBg={heroBg} />
      <section className="bg-Dark-Cyan-Green py-20 md:py-32">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span className="text-International-Orange font-satisfy text-xl md:text-2xl">{copy.brand}</span>
            <h2 className="text-3xl md:text-5xl font-plus-jakarta-sans font-semibold text-white mt-3 mb-6">{copy.welcome}</h2>
            <p className="text-[#B4C4C4] font-jost text-base md:text-lg leading-relaxed mb-6">{copy.intro1}</p>
            <p className="text-[#8A9A9A] font-jost text-sm md:text-base leading-relaxed max-w-2xl mx-auto">{copy.intro2}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
            <div className="col-span-2 row-span-2 relative aspect-square md:aspect-auto rounded-2xl overflow-hidden">
              <Image src={about1} alt="Skyline rooftop lounge" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" priority />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image src={about2} alt="Chef preparing dishes" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image src={about3} alt="Dining with skyline views" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
            </div>
            <div className="col-span-2 relative aspect-[2/1] rounded-2xl overflow-hidden">
              <Image src={about4} alt="Signature cocktails" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {copy.features.map((feature, index) => (
              <div key={feature.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-International-Orange/10 flex items-center justify-center mx-auto mb-4">
                  {index === 0 && (
                    <svg className="w-6 h-6 text-International-Orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg className="w-6 h-6 text-International-Orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg className="w-6 h-6 text-International-Orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-white font-plus-jakarta-sans text-lg mb-2">{feature.title}</h3>
                <p className="text-[#B4C4C4] font-jost text-sm leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-plus-jakarta-sans font-semibold text-white mb-4">{copy.storyTitle}</h3>
                <p className="text-[#8A9A9A] font-jost text-sm leading-relaxed mb-4">{copy.storyBody1}</p>
                <p className="text-[#8A9A9A] font-jost text-sm leading-relaxed">{copy.storyBody2}</p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-plus-jakarta-sans font-semibold text-white mb-4">{copy.experienceTitle}</h3>
                <p className="text-[#8A9A9A] font-jost text-sm leading-relaxed mb-4">{copy.experienceBody1}</p>
                <p className="text-[#8A9A9A] font-jost text-sm leading-relaxed">{copy.experienceBody2}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FoodPlaySection />
      <CustomerFeedback />
      <MarqueeSlider />
    </>
  );
}
