'use client';

import { useSkylineLandingLocale } from "@/lib/useSkylineLandingLocale";
import Link from "next/link";
import React from "react";

const FeatureIcon = ({ name }) => {
  const icons = {
    utensils: (
      <svg className="w-5 h-5 text-International-Orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    view: (
      <svg className="w-5 h-5 text-International-Orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    wine: (
      <svg className="w-5 h-5 text-International-Orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    calendar: (
      <svg className="w-5 h-5 text-International-Orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  };

  return icons[name] || null;
};

const FactIcon = ({ name }) => {
  const icons = {
    cuisine: (
      <svg className="w-5 h-5 text-International-Orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    location: (
      <svg className="w-5 h-5 text-International-Orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    clock: (
      <svg className="w-5 h-5 text-International-Orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    phone: (
      <svg className="w-5 h-5 text-International-Orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  };

  return icons[name] || null;
};

const SkylineIntroSection = () => {
  const { isFrench } = useSkylineLandingLocale();

  const copy = isFrench
    ? {
        tag: "Skyline en bref",
        title: "Quand la cuisine indienne rencontre le ciel",
        para1:
          "Perche au-dessus du paysage vibrant d'Abidjan, Skyline by Delhi Darbar offre une experience culinaire elevee. Notre rooftop associe des saveurs indiennes authentiques et une vue panoramique pour vos celebrations, rendez-vous pro et diners intimes.",
        para2:
          "Des cocktails signatures aux plats soigneusement prepares, chaque detail est pense pour une soiree memorale.",
        features: [
          { icon: "utensils", text: "Cuisine indienne authentique" },
          { icon: "view", text: "Vue panoramique sur la ville" },
          { icon: "wine", text: "Cocktails signatures" },
          { icon: "calendar", text: "Reservations en soiree" },
        ],
        ctaMenu: "Explorer le menu",
        ctaBook: "Reserver une table",
        facts: [
          {
            icon: "cuisine",
            label: "Cuisine",
            value: "Indienne moderne",
            desc: "Saveurs authentiques, presentation contemporaine",
          },
          {
            icon: "location",
            label: "Emplacement",
            value: "Rooftop Abidjan",
            desc: "Vue remarquable au coeur d'Abidjan",
          },
          {
            icon: "clock",
            label: "Horaires",
            value: "Mar - Dim",
            desc: "12h - 15h et 18h - 23h",
          },
          {
            icon: "phone",
            label: "Reservations",
            value: "WhatsApp / Appel",
            desc: "Reservation rapide via WhatsApp ou contact",
          },
        ],
      }
    : {
        tag: "Skyline At A Glance",
        title: "Where Indian Cuisine Meets the Sky",
        para1:
          "Perched above Abidjan's vibrant cityscape, Skyline by Delhi Darbar offers an elevated dining experience that transcends the ordinary. Our rooftop sanctuary combines authentic Indian flavors with panoramic views, creating unforgettable moments for celebrations, business gatherings, or intimate dinners.",
        para2:
          "From our signature cocktails to carefully curated dishes, every element is designed to delight your senses while you take in the breathtaking skyline.",
        features: [
          { icon: "utensils", text: "Authentic Indian Cuisine" },
          { icon: "view", text: "Panoramic City Views" },
          { icon: "wine", text: "Signature Cocktails" },
          { icon: "calendar", text: "Evening Reservations" },
        ],
        ctaMenu: "Explore Menu",
        ctaBook: "Book a Table",
        facts: [
          {
            icon: "cuisine",
            label: "Cuisine",
            value: "Modern Indian",
            desc: "Authentic flavors with contemporary presentation",
          },
          {
            icon: "location",
            label: "Location",
            value: "Rooftop Abidjan",
            desc: "Stunning skyline views from Ivory Coast's capital",
          },
          {
            icon: "clock",
            label: "Hours",
            value: "Tue - Sun",
            desc: "12PM - 3PM & 6PM - 11PM",
          },
          {
            icon: "phone",
            label: "Reservations",
            value: "WhatsApp / Call",
            desc: "Easy booking via WhatsApp or contact page",
          },
        ],
      };

  return (
    <section className="bg-Cyan overflow-hidden">
      <div className="container py-[70px] md:py-[120px]">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-International-Orange/60" />
            <span className="font-satisfy text-lg md:text-xl text-International-Orange">{copy.tag}</span>
            <span className="w-8 h-[1px] bg-International-Orange/60" />
          </div>
          <h2 className="font-plus-jakarta-sans text-2xl md:text-4xl lg:text-[42px] font-semibold leading-tight text-white max-w-3xl mx-auto">
            {copy.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="font-jost text-base md:text-lg leading-relaxed text-white/70">{copy.para1}</p>
              <p className="font-jost text-base md:text-lg leading-relaxed text-white/70">{copy.para2}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {copy.features.map((feature) => (
                <div key={feature.text} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-International-Orange/10 flex items-center justify-center flex-shrink-0">
                    <FeatureIcon name={feature.icon} />
                  </div>
                  <span className="font-jost text-sm text-white/90">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/skyline/our-menu"
                className="group inline-flex items-center gap-2 rounded-full bg-International-Orange px-6 py-3.5 font-jost text-sm font-semibold text-Cyan transition-all duration-300 hover:shadow-lg hover:shadow-International-Orange/25 hover:-translate-y-0.5"
              >
                {copy.ctaMenu}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="#book-table"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-jost text-sm font-semibold text-white transition-all duration-300 hover:border-International-Orange hover:text-International-Orange hover:-translate-y-0.5"
              >
                {copy.ctaBook}
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-International-Orange/5 via-transparent to-International-Orange/5 rounded-3xl blur-2xl pointer-events-none" />

            <div className="relative grid sm:grid-cols-2 gap-4">
              {copy.facts.map((fact) => (
                <article
                  key={fact.label}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] p-5 transition-all duration-300 hover:border-International-Orange/30"
                >
                  <div className="w-11 h-11 rounded-xl bg-International-Orange/10 flex items-center justify-center mb-4 group-hover:bg-International-Orange/15 transition-colors">
                    <FactIcon name={fact.icon} />
                  </div>

                  <p className="font-jost text-xs uppercase tracking-wider text-white/50 mb-1">{fact.label}</p>
                  <p className="font-plus-jakarta-sans text-lg font-semibold text-white mb-2">{fact.value}</p>
                  <p className="font-jost text-sm text-white/60 leading-relaxed">{fact.desc}</p>
                  <div className="absolute bottom-0 left-5 right-5 h-[2px] bg-gradient-to-r from-transparent via-International-Orange/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkylineIntroSection;
