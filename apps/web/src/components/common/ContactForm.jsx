'use client';

import { useSkylineLandingLocale } from "@/lib/useSkylineLandingLocale";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import React, { useState } from "react";

const ContactForm = () => {
  const { isFrench } = useSkylineLandingLocale();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "2",
    date: "",
    time: "19:00",
  });

  const copy = isFrench
    ? {
        subtitle: "Reservations",
        title: "Reservez votre table",
        labels: {
          name: "Votre nom",
          phone: "Numero de telephone",
          guests: "Convives",
          date: "Date",
          time: "Heure",
        },
        placeholders: {
          name: "Krishna Sahani",
          phone: "+225 07 XX XX XX XX",
        },
        guestSingle: "Convive",
        guestPlural: "Convives",
        reserveButton: "Reserver maintenant",
        note: "Pour les grands groupes (8+ convives), appelez directement au",
        contactLabels: {
          phone: "Telephone",
          location: "Emplacement",
          openHours: "Horaires",
          locationValue: "Abidjan, Cote d'Ivoire",
          hoursValue: "12h - 15h / 18h - 23h",
        },
        messageTitle: "Nouvelle demande de reservation",
      }
    : {
        subtitle: "Reservations",
        title: "Book Your Table",
        labels: {
          name: "Your Name",
          phone: "Phone Number",
          guests: "Guests",
          date: "Date",
          time: "Time",
        },
        placeholders: {
          name: "Krishna Sahani",
          phone: "+225 07 XX XX XX XX",
        },
        guestSingle: "Guest",
        guestPlural: "Guests",
        reserveButton: "Reserve Now",
        note: "For large groups (8+ guests), please call us directly at",
        contactLabels: {
          phone: "Phone",
          location: "Location",
          openHours: "Open Hours",
          locationValue: "Abidjan, Ivory Coast",
          hoursValue: "12PM - 3PM / 6PM - 11PM",
        },
        messageTitle: "New Table Reservation Request",
      };

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = [
      copy.messageTitle,
      "",
      `Name: ${formData.name}`,
      `Phone: ${formData.phone}`,
      `Guests: ${formData.guests}`,
      `Date: ${formData.date}`,
      `Time: ${formData.time}`,
    ].join("\n");

    const whatsappUrl = buildWhatsAppUrl(message);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div id="book-table" className="reservation-section bg-Dark-Cyan-Green overflow-hidden">
      <div className="container pt-[70px] md:pt-[140px] pb-[140px]">
        <div className="text-center mb-[50px] md:mb-[70px]">
          <h2 className="section-subtitle font-satisfy font-normal subtitle text-International-Orange flex items-center justify-center gap-[15px] mb-4">
            <span>
              <svg width="13" height="30" viewBox="0 0 13 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.02392 28.6457L7.97935 17.6722C9.169 17.5219 10.2426 17.1711 11.1421 16.6701C12.3607 15.9518 13.0281 15.0165 12.9991 14.0144L12.9701 11.2919L12.4768 0.418535C12.4478 0.201403 12.1286 0.000973324 11.7224 0.000973324C11.2872 -0.0157292 10.939 0.184701 10.91 0.435238L10.5908 10.5903L7.66018 10.6071L7.25396 0.435238C7.22494 0.201404 6.87675 0.000973324 6.47053 0.000973324C6.00628 -0.0157292 5.62907 0.184701 5.62907 0.451941L5.3099 10.6071L2.3793 10.6238L1.94406 0.451941C1.91504 0.234808 1.59587 0.0343784 1.18965 0.0343784C0.754411 0.0176759 0.40622 0.218106 0.377205 0.468643L0 11.3253L0.0290154 14.0645C0.0290154 15.8349 2.23422 17.3215 5.1358 17.6889L4.43942 28.6624C4.43942 28.6847 4.43942 28.707 4.43942 28.7292C4.49745 29.4475 5.54202 30.032 6.81872 29.9986C8.0664 29.9819 9.08195 29.3639 9.02392 28.6457Z" fill="#FFD84D" />
              </svg>
            </span>
            {copy.subtitle}
          </h2>
          <h2 className="title font-plus-jakarta-sans font-semibold text-white max-w-[600px] mx-auto">{copy.title}</h2>
        </div>

        <div className="max-w-[800px] mx-auto">
          <div className="relative bg-Cyan rounded-[24px] p-[2px]">
            <div className="absolute inset-0 rounded-[24px] bg-gradient-to-r from-International-Orange/20 via-white/10 to-International-Orange/20" />

            <div className="relative bg-Cyan rounded-[22px] p-8 md:p-12">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-International-Orange/5 rounded-full blur-[100px] pointer-events-none" />

              <form onSubmit={handleSubmit} className="relative space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block font-jost text-sm text-white/60 mb-3 uppercase tracking-wider">{copy.labels.name}</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={copy.placeholders.name}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white placeholder:text-white/30 focus:outline-none focus:border-International-Orange/50 focus:bg-white/10 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="block font-jost text-sm text-white/60 mb-3 uppercase tracking-wider">{copy.labels.phone}</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={copy.placeholders.phone}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white placeholder:text-white/30 focus:outline-none focus:border-International-Orange/50 focus:bg-white/10 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="group">
                    <label className="block font-jost text-sm text-white/60 mb-3 uppercase tracking-wider">{copy.labels.guests}</label>
                    <div className="relative">
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-International-Orange/50 focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num} className="bg-Cyan">
                            {num} {num === 1 ? copy.guestSingle : copy.guestPlural}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block font-jost text-sm text-white/60 mb-3 uppercase tracking-wider">{copy.labels.date}</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-International-Orange/50 focus:bg-white/10 transition-all duration-300 cursor-pointer [color-scheme:dark]"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="block font-jost text-sm text-white/60 mb-3 uppercase tracking-wider">{copy.labels.time}</label>
                    <div className="relative">
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-International-Orange/50 focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer"
                      >
                        <option value="18:00" className="bg-Cyan">06:00 PM</option>
                        <option value="18:30" className="bg-Cyan">06:30 PM</option>
                        <option value="19:00" className="bg-Cyan">07:00 PM</option>
                        <option value="19:30" className="bg-Cyan">07:30 PM</option>
                        <option value="20:00" className="bg-Cyan">08:00 PM</option>
                        <option value="20:30" className="bg-Cyan">08:30 PM</option>
                        <option value="21:00" className="bg-Cyan">09:00 PM</option>
                        <option value="21:30" className="bg-Cyan">09:30 PM</option>
                        <option value="22:00" className="bg-Cyan">10:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="group w-full md:w-auto md:min-w-[280px] mx-auto block py-4 px-10 rounded-full bg-International-Orange text-Cyan font-plus-jakarta-sans font-semibold text-base uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,216,77,0.3)] hover:scale-[1.02] active:scale-95"
                  >
                    <span className="flex items-center justify-center gap-3">
                      {copy.reserveButton}
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                </div>

                <p className="text-center font-jost text-sm text-white/40">
                  {copy.note}{" "}
                  <a href="tel:+2250575413751" className="text-International-Orange hover:underline">
                    +225 0575413751
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-20">
          <div className="hidden md:flex flex-row items-center justify-center gap-8 lg:gap-16">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-International-Orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="font-jost text-sm text-white/50">{copy.contactLabels.phone}</p>
                <a href="tel:+2250575413751" className="font-plus-jakarta-sans text-white hover:text-International-Orange transition-colors">
                  +225 0575413751
                </a>
              </div>
            </div>

            <div className="w-px h-12 bg-white/10" />

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-International-Orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-jost text-sm text-white/50">{copy.contactLabels.location}</p>
                <p className="font-plus-jakarta-sans text-white">{copy.contactLabels.locationValue}</p>
              </div>
            </div>

            <div className="w-px h-12 bg-white/10" />

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-International-Orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-jost text-sm text-white/50">{copy.contactLabels.openHours}</p>
                <p className="font-plus-jakarta-sans text-white">{copy.contactLabels.hoursValue}</p>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 bg-Cyan/40 rounded-2xl p-4 border border-white/5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-International-Orange/15 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-International-Orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-jost text-xs text-white/50 mb-0.5">{copy.contactLabels.phone}</p>
                  <a href="tel:+2250575413751" className="font-plus-jakarta-sans text-white text-sm hover:text-International-Orange transition-colors block truncate">
                    +225 0575413751
                  </a>
                </div>
              </div>

              <div className="bg-Cyan/40 rounded-2xl p-4 border border-white/5 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-International-Orange/15 flex items-center justify-center mb-2">
                  <svg className="w-4 h-4 text-International-Orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="font-jost text-[10px] text-white/50 mb-0.5">{copy.contactLabels.location}</p>
                <p className="font-plus-jakarta-sans text-white text-xs">Abidjan</p>
              </div>

              <div className="bg-Cyan/40 rounded-2xl p-4 border border-white/5 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-International-Orange/15 flex items-center justify-center mb-2">
                  <svg className="w-4 h-4 text-International-Orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="font-jost text-[10px] text-white/50 mb-0.5">{copy.contactLabels.openHours}</p>
                <p className="font-plus-jakarta-sans text-white text-xs leading-tight">{copy.contactLabels.hoursValue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
