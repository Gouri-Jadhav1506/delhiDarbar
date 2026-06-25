'use client';

import heroBg from "@/assets/images/About-Us/hero-bg-pexels.jpg";
import SubPageBanner from "@/components/banner/SubPageBanner";
import { useSkylineLandingLocale } from "@/lib/useSkylineLandingLocale";

export default function PrivacyPolicyPage() {
  const { isFrench } = useSkylineLandingLocale();
  const locale = isFrench ? "fr-FR" : "en-US";
  const lastUpdated = new Date().toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const copy = isFrench
    ? {
        title: "Politique de confidentialite",
        updated: "Derniere mise a jour",
        sections: [
          {
            title: "1. Introduction",
            body: [
              "Skyline Delhi Darbar respecte votre vie privee et s'engage a proteger vos donnees personnelles. Cette politique explique comment nous collectons, utilisons et proteegeons vos informations lorsque vous visitez le site ou utilisez nos services.",
            ],
          },
          {
            title: "2. Informations collectees",
            body: [
              "Nous pouvons collecter les informations suivantes :",
              "Informations personnelles : nom, email, telephone et details de reservation lorsque vous nous contactez ou reservez.",
              "Donnees d'utilisation : adresse IP, navigateur, appareil et pages consultees.",
              "Cookies : nous utilisons des cookies pour ameliorer l'experience de navigation et comprendre l'usage du site.",
            ],
          },
          {
            title: "3. Utilisation des informations",
            body: [
              "Nous utilisons ces informations pour gerer les reservations, repondre aux demandes, fournir une assistance client, ameliorer le site et respecter nos obligations legales.",
            ],
          },
          {
            title: "4. Partage des informations",
            body: [
              "Nous ne vendons ni ne louons vos informations personnelles. Elles peuvent etre partagees uniquement avec des prestataires impliques dans l'exploitation du service ou lorsque la loi l'exige.",
            ],
          },
          {
            title: "5. Securite des donnees",
            body: [
              "Nous mettons en place des mesures techniques et organisationnelles raisonnables pour proteger vos donnees contre l'acces non autorise, la perte, l'alteration ou la divulgation.",
            ],
          },
          {
            title: "6. Vos droits",
            body: [
              "Vous pouvez demander l'acces, la correction ou la suppression de vos donnees, vous opposer a certains traitements ou retirer votre consentement lorsque cela s'applique.",
            ],
          },
          {
            title: "7. Nous contacter",
            body: [
              "Pour toute question relative a cette politique, contactez-nous a delhidarbarabidjan@gmail.com ou au +225 0575413751.",
              "Adresse : Immeuble Rainbow, Riviera 3, Cite Synacassi 2, Abidjan.",
            ],
          },
        ],
      }
    : {
        title: "Privacy Policy",
        updated: "Last updated",
        sections: [
          {
            title: "1. Introduction",
            body: [
              "Skyline Delhi Darbar respects your privacy and is committed to protecting your personal data. This policy explains how we collect, use, and safeguard information when you visit our website or use our services.",
            ],
          },
          {
            title: "2. Information We Collect",
            body: [
              "We may collect the following information:",
              "Personal information such as your name, email address, phone number, and reservation details when you contact or book with us.",
              "Usage data such as IP address, browser details, device information, and visited pages.",
              "Cookies that help us improve browsing experience and understand website usage.",
            ],
          },
          {
            title: "3. How We Use Information",
            body: [
              "We use this information to manage reservations, respond to enquiries, provide customer support, improve the website, and comply with legal requirements.",
            ],
          },
          {
            title: "4. Information Sharing",
            body: [
              "We do not sell or rent your personal information. Information may be shared only with service providers supporting our operations or when disclosure is legally required.",
            ],
          },
          {
            title: "5. Data Security",
            body: [
              "We apply reasonable technical and organisational measures to protect your data against unauthorised access, loss, alteration, or disclosure.",
            ],
          },
          {
            title: "6. Your Rights",
            body: [
              "You may request access to, correction of, or deletion of your data, object to certain processing activities, or withdraw consent where applicable.",
            ],
          },
          {
            title: "7. Contact Us",
            body: [
              "For questions about this policy, contact us at delhidarbarabidjan@gmail.com or +225 0575413751.",
              "Address: Immeuble Rainbow, Riviera 3, Cite Synacassi 2, Abidjan.",
            ],
          },
        ],
      };

  return (
    <>
      <SubPageBanner heroBg={heroBg} />

      <section className="bg-Dark-Cyan-Green py-20 md:py-32">
        <div className="container max-w-4xl">
          <div className="prose prose-invert prose-lg max-w-none">
            <h1 className="text-3xl md:text-4xl font-plus-jakarta-sans font-semibold text-white mb-8">{copy.title}</h1>
            <p className="text-[#B4C4C4] font-jost mb-6">
              {copy.updated}: {lastUpdated}
            </p>

            <div className="space-y-8 text-[#B4C4C4] font-jost">
              {copy.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-xl font-plus-jakarta-sans font-semibold text-white mb-4">{section.title}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
