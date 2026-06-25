'use client';

import heroBg from "@/assets/images/About-Us/hero-bg-pexels.jpg";
import SubPageBanner from "@/components/banner/SubPageBanner";
import { useSkylineLandingLocale } from "@/lib/useSkylineLandingLocale";

export default function TermsOfServicePage() {
  const { isFrench } = useSkylineLandingLocale();
  const locale = isFrench ? "fr-FR" : "en-US";
  const lastUpdated = new Date().toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const copy = isFrench
    ? {
        title: "Conditions d'utilisation",
        updated: "Derniere mise a jour",
        sections: [
          {
            title: "1. Acceptation",
            body: [
              "En accedant au site Skyline Delhi Darbar et a ses services, vous acceptez les presentes conditions. Si vous n'etes pas d'accord avec une partie du contenu, n'utilisez pas le site ni les services associes.",
            ],
          },
          {
            title: "2. Description des services",
            body: [
              "Skyline Delhi Darbar exploite un restaurant rooftop et un lounge proposant cuisine indienne, boissons et services evenementiels. Le site fournit des informations, des contenus de menu et des moyens de prise de contact ou de reservation.",
            ],
          },
          {
            title: "3. Reservations",
            body: [
              "Toutes les reservations sont soumises a disponibilite et confirmation.",
              "Nous pouvons modifier ou annuler une reservation en cas de contrainte operationnelle ou d'evenement imprevu.",
              "Pour les groupes importants, une reservation anticipee ou un acompte peut etre demande.",
              "Un retard important peut entrainer la perte de la reservation.",
            ],
          },
          {
            title: "4. Paiement",
            body: [
              "Les prix sont affiches en francs CFA et peuvent inclure les taxes applicables.",
              "Nous acceptons les paiements en especes, cartes ou solutions mobiles selon disponibilite.",
              "Pour certains evenements ou prestations, un acompte peut etre exige pour confirmer la commande.",
            ],
          },
          {
            title: "5. Comportement attendu",
            body: [
              "Les utilisateurs doivent fournir des informations exactes, respecter le personnel et les autres clients, et ne pas adopter de comportement abusif, illegal ou nuisible.",
            ],
          },
          {
            title: "6. Propriete intellectuelle",
            body: [
              "Les contenus du site, y compris textes, visuels, logos et elements graphiques, appartiennent a Skyline Delhi Darbar sauf mention contraire. Toute reutilisation non autorisee est interdite.",
            ],
          },
          {
            title: "7. Limitation de responsabilite",
            body: [
              "Dans les limites autorisees par la loi, Skyline Delhi Darbar ne pourra etre tenu responsable des dommages indirects ou consecutifs lies a l'utilisation du site ou des services.",
            ],
          },
          {
            title: "8. Modifications",
            body: [
              "Nous pouvons mettre a jour ces conditions a tout moment. Les nouvelles versions prennent effet des leur publication sur le site.",
            ],
          },
          {
            title: "9. Droit applicable",
            body: [
              "Ces conditions sont regies par le droit applicable en Cote d'Ivoire. Les litiges eventuels relevent de la competence des juridictions d'Abidjan.",
            ],
          },
          {
            title: "10. Contact",
            body: [
              "Pour toute question relative a ces conditions, contactez-nous a delhidarbarabidjan@gmail.com ou au +225 0575413751.",
              "Adresse : Immeuble Rainbow, Riviera 3, Cite Synacassi 2, Abidjan, Cote d'Ivoire.",
            ],
          },
        ],
      }
    : {
        title: "Terms of Service",
        updated: "Last updated",
        sections: [
          {
            title: "1. Acceptance",
            body: [
              "By accessing the Skyline Delhi Darbar website and services, you agree to these terms. If you do not accept them, you should not use the website or related services.",
            ],
          },
          {
            title: "2. Services Description",
            body: [
              "Skyline Delhi Darbar operates a rooftop restaurant and lounge offering Indian cuisine, beverages, and event services. The website provides information, menu content, and reservation or contact pathways.",
            ],
          },
          {
            title: "3. Reservations",
            body: [
              "All reservations are subject to availability and confirmation.",
              "We may amend or cancel reservations when operational constraints or unforeseen events require it.",
              "Large group bookings may require advance confirmation or a deposit.",
              "Significant delay may result in forfeiture of the reservation.",
            ],
          },
          {
            title: "4. Payment Terms",
            body: [
              "Prices are listed in CFA Francs and may include applicable taxes.",
              "We accept cash, card, and mobile payment methods where available.",
              "Selected events or service formats may require a deposit to secure the booking.",
            ],
          },
          {
            title: "5. Expected Conduct",
            body: [
              "Users must provide accurate information, treat staff and guests respectfully, and avoid abusive, illegal, or harmful behaviour.",
            ],
          },
          {
            title: "6. Intellectual Property",
            body: [
              "Website content, including text, images, logos, and design assets, belongs to Skyline Delhi Darbar unless stated otherwise. Unauthorised reuse is prohibited.",
            ],
          },
          {
            title: "7. Limitation of Liability",
            body: [
              "To the fullest extent permitted by law, Skyline Delhi Darbar is not liable for indirect or consequential damages arising from use of the website or services.",
            ],
          },
          {
            title: "8. Modifications",
            body: [
              "We may update these terms at any time. Updated versions take effect once published on the website.",
            ],
          },
          {
            title: "9. Governing Law",
            body: [
              "These terms are governed by the applicable laws of Cote d'Ivoire. Any dispute will fall under the competent courts of Abidjan.",
            ],
          },
          {
            title: "10. Contact Information",
            body: [
              "For questions about these terms, contact us at delhidarbarabidjan@gmail.com or +225 0575413751.",
              "Address: Immeuble Rainbow, Riviera 3, Cite Synacassi 2, Abidjan, Cote d'Ivoire.",
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
