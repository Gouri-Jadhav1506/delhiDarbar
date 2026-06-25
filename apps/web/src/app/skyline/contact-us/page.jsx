'use client';

import heroBg from "@/assets/images/About-Us/hero-bg-pexels.jpg";
import SubPageBanner from "@/components/banner/SubPageBanner";
import { useSkylineLandingLocale } from "@/lib/useSkylineLandingLocale";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import Link from "next/link";
import { useState } from "react";

const ContactUs = () => {
  const { isFrench } = useSkylineLandingLocale();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const copy = isFrench
    ? {
        cards: ["Reservation", "General", "Technique"],
        heading: "Nous contacter",
        placeholders: {
          firstName: "Prenom",
          lastName: "Nom",
          phone: "Numero de telephone",
          email: "Email (optionnel)",
          message: "Votre message",
        },
        button: "Envoyer le message",
        formMessageTitle: "Nouvelle demande de contact",
      }
    : {
        cards: ["Booking", "General", "Technical"],
        heading: "Get in Touch",
        placeholders: {
          firstName: "First Name",
          lastName: "Last Name",
          phone: "Phone Number",
          email: "Email (Optional)",
          message: "Your Message",
        },
        button: "Send Message",
        formMessageTitle: "New Contact Form Submission",
      };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = [
      copy.formMessageTitle,
      "",
      `Name: ${formData.firstName} ${formData.lastName}`,
      `Phone: ${formData.phone}`,
      `Email: ${formData.email || "Not provided"}`,
      `Message: ${formData.message}`,
    ].join("\n");

    const whatsappUrl = buildWhatsAppUrl(message);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <SubPageBanner heroBg={heroBg} />

      <div className="contact-info py-16 md:py-[120px] fade-in overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { label: copy.cards[0], href: "mailto:delhidarbarabidjan@gmail.com", value: "delhidarbarabidjan@gmail.com", type: "mail" },
              { label: copy.cards[1], href: "tel:+2250575413751", value: "+225 0575413751", type: "phone" },
              { label: copy.cards[2], href: "tel:+2250709130101", value: "+225 0709130101", type: "support" },
            ].map((card, index) => (
              <div key={card.label}>
                <div className="contact-info-card bg-texture bg-no-repeat bg-cover bg-center py-8 md:py-[42px] px-4 md:px-8 relative after:absolute after:top-0 after:left-0 after:w-full after:h-[100px] md:after:h-[116px] after:bg-Dark-Cyan hover:after:bg-International-Orange text-center transition-all ease-linear duration-300 after:transition-all after:ease-linear after:duration-300 rounded-xl">
                  <div className="icon w-20 h-20 md:w-[120px] md:h-[120px] rounded-full border-2 border-International-Orange bg-white flex items-center justify-center mx-auto z-10 relative mb-4 md:mb-5">
                    {index === 0 && (
                      <svg width="36" height="36" className="md:w-[46px] md:h-[46px]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="8" y="12" width="32" height="24" rx="4" stroke="#DF3F01" strokeWidth="2.5" />
                        <path d="M10 14L24 27L38 14" stroke="#DF3F01" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 34L19.5 25.5" stroke="#DF3F01" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M38 34L28.5 25.5" stroke="#DF3F01" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg width="36" height="36" className="md:w-[46px] md:h-[46px]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6H18C19.1 6 20.04 6.8 20.2 7.89L21.3 15.3C21.43 16.2 21.1 17.09 20.43 17.76L16.9 21.29C20.28 27.41 24.59 31.72 30.71 35.1L34.24 31.57C34.91 30.9 35.8 30.57 36.7 30.7L44.11 31.8C45.2 31.96 46 32.9 46 34V40C46 41.66 44.66 43 43 43C24.22 43 5 23.78 5 5C5 3.34 6.34 2 8 2H14" stroke="#DF3F01" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg width="36" height="36" className="md:w-[46px] md:h-[46px]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 26V22C10 13.1634 17.1634 6 26 6C34.8366 6 42 13.1634 42 22V26" stroke="#DF3F01" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 26H14C15.1046 26 16 26.8954 16 28V32C16 33.1046 15.1046 34 14 34H12C10.8954 34 10 33.1046 10 32V26Z" stroke="#DF3F01" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M38 26H34C32.8954 26 32 26.8954 32 28V32C32 33.1046 32.8954 34 34 34H36C37.1046 34 38 33.1046 38 32V26Z" stroke="#DF3F01" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 34H28V41C28 42.1046 27.1046 43 26 43H22C20.8954 43 20 42.1046 20 41V34Z" stroke="#DF3F01" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <h4 className="font-plus-jakarta-sans font-semibold text-lg md:text-[22px] leading-tight text-white mb-2">{card.label}</h4>
                  <Link className="font-jost font-normal text-sm md:text-[18px] leading-tight text-white block break-all" href={card.href}>
                    {card.value}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="contact-form-map fade-in">
        <iframe
          src="https://www.google.com/maps?q=5.3467201%2C-3.9446299&z=16&hl=en&output=embed"
          width="100%"
          height="612"
          frameBorder="0"
          style={{ border: "0" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Skyline Delhi Darbar Location"
        />

        <div className="form -mt-32 md:-mt-48 relative z-10 pb-[140px]">
          <div className="container max-w-3xl">
            <div className="bg-[#0a1c1c] rounded-2xl border border-white/10 p-8 md:p-12 shadow-2xl">
              <h2 className="text-2xl md:text-3xl font-plus-jakarta-sans font-semibold text-white text-center mb-8">{copy.heading}</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder={copy.placeholders.firstName}
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-International-Orange focus:outline-none transition-colors font-jost"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder={copy.placeholders.lastName}
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-International-Orange focus:outline-none transition-colors font-jost"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder={copy.placeholders.phone}
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-International-Orange focus:outline-none transition-colors font-jost"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={copy.placeholders.email}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-International-Orange focus:outline-none transition-colors font-jost"
                  />
                </div>
                <textarea
                  name="message"
                  rows="4"
                  placeholder={copy.placeholders.message}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-International-Orange focus:outline-none transition-colors font-jost resize-none mb-6"
                  required
                />
                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 font-jost font-medium text-base text-white bg-International-Orange py-3 px-8 rounded-lg hover:bg-International-Orange/90 transition-all duration-300"
                  >
                    {copy.button}
                    <svg className="w-4 h-4" viewBox="0 0 13 13" fill="none">
                      <path d="M7.135 9.775C6.896 10.014 6.51 10.014 6.274 9.775C6.038 9.537 6.035 9.151 6.274 8.915L8.077 7.112H3.453C3.115 7.112 2.844 6.841 2.844 6.503C2.844 6.165 3.115 5.894 3.453 5.894H8.077L6.274 4.091C6.035 3.852 6.035 3.466 6.274 3.23C6.513 2.994 6.899 2.991 7.135 3.23L9.979 6.071C10.217 6.31 10.217 6.696 9.979 6.932L7.135 9.775Z" fill="white" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
