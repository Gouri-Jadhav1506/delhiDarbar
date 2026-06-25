'use client';
import React, { useState, useRef } from "react";
import heroBg from "@/assets/images/About-Us/hero-bg-pexels.jpg";
import SubPageBanner from "@/components/banner/SubPageBanner";
import MarqueeSlider from "@/components/common/MarqueeSlider";
import { useSkylineLandingLocale } from "@/lib/useSkylineLandingLocale";

const MenuPanel = ({ heading, tagline, items }) => (
  <div className="rounded-2xl border border-white/10 bg-[#0a1c1c] p-6 md:p-8">
    <div className="border-b border-white/10 pb-4 mb-6">
      <h3 className="text-xl font-plus-jakarta-sans font-semibold text-white mb-1">
        {heading}
      </h3>
      <p className="text-[#8A9A9A] font-jost text-sm">{tagline}</p>
    </div>
    <div className="space-y-4">
      {items.map((item) => (
        <div key={`${heading}-${item.name}`} className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-white font-plus-jakarta-sans font-medium text-base mb-1">
              {item.name}
            </p>
            <p className="text-[#8A9A9A] font-jost text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
          <span className="text-International-Orange font-jost font-semibold text-base whitespace-nowrap">
            {item.price}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const OurMenu = () => {
  const { isFrench } = useSkylineLandingLocale();
  const [activeCategory, setActiveCategory] = useState(null);
  const [activePanel, setActivePanel] = useState(null);
  const menuSectionRef = useRef(null);

  const scrollToMenu = () => {
    setTimeout(() => {
      menuSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const internationalMenu = [
    {
      name: "PERI PERI FRIES",
      price: "4,000",
      description: "Frites de pommes de terre assaisonnées au péri péri.",
    },
    {
      name: "GARLIC & PARSLEY FRIED POTATOES",
      price: "5,000",
      description: "Pommes sautées à l'ail et au persil.",
    },
    {
      name: "GARLIC BREAD (6 PCS)",
      price: "5,000",
      description: "Pain au beurre et à l'ail.",
    },
    {
      name: "CHEESE GARLIC BREAD (6 PCS)",
      price: "6,000",
      description: "Pain au beurre à l'ail et au fromage.",
    },
    {
      name: "PANEER EXPLOSION",
      price: "8,000",
      description: "Morceaux de fromage frits sautés à la sauce explosive du Chef.",
    },
    {
      name: "SHRIMPS EXPLOSION",
      price: "10,000",
      description: "Crevettes frites sautées à la sauce explosive du Chef.",
    },
    {
      name: "CHICKEN EXPLOSION",
      price: "8,000",
      description: "Morceaux de poulet frits sautés à la sauce explosive du Chef.",
    },
    {
      name: "CHICKEN TENDERS (6 PCS)",
      price: "8,000",
      description: "Lamelles frites de poulet.",
    },
    {
      name: "BARBECUE CHICKEN WINGS (8 PCS)",
      price: "8,000",
      description: "Ailerons de poulet à la sauce barbecue.",
    },
    {
      name: "BUTTER GARLIC PRAWNS",
      price: "16,000",
      description: "Gambas au beurre et à l'ail.",
    },
    {
      name: "PENNE ARRABIATA",
      price: "8,000",
      description: "Classique penne à la sauce arrabiata.",
    },
    {
      name: "FETTUCCINI IN CREAMY MUSHROOM SAUCE",
      price: "Veg 8,000 / Chicken 10,000",
      description: "Tagliatelles à la sauce crème champignons.",
    },
    {
      name: "THAI SALAD",
      price: "Chicken 9,000 / Paneer 9,000",
      description: "Salade thaï revisitée du Chef.",
    },
    {
      name: "CAJUN POTATOES (8 PCS)",
      price: "7,000",
      description:
        "Pommes de terre frites servies avec notre sauce maison aux épices cajun.",
    },
    {
      name: "QUESO FRITO (5 PCS)",
      price: "7,000",
      description:
        "Lamelles de fromage salé (halloumi) frites servies avec deux confitures.",
    },
    {
      name: "CHAMPIGNONS FARCIS (6 PCS)",
      price: "10,000",
      description:
        "Champignons de Paris farcis assaisonnés au sel de la truffe d'été.",
    },
    {
      name: "MOZZARELLA STICKS (5 PCS)",
      price: "5,000",
      description: "Lamelles de mozzarella frites servies avec sauce cocktail.",
    },
    {
      name: "BUTTER GARLIC MUSHROOM & BROCCOLI",
      price: "8,000",
      description: "Champignons et brocolis sautés au beurre et à l'ail.",
    },
  ];

  const indoChineseMenu = [
    {
      name: "MANCHOW SOUP",
      price: "Veg 4,000 / Chicken 5,000",
      description: "Bouillon réconfortant façon wok.",
    },
    {
      name: "HOT & SOUR SOUP",
      price: "Veg 4,000 / Chicken 5,000",
      description: "Classique piquant et acidulé.",
    },
    {
      name: "PANEER MOMOS (8 PCS)",
      price: "7,000",
      description: "Gyoza vapeur au fromage revisités.",
    },
    {
      name: "CHICKEN MOMOS (8 PCS)",
      price: "8,000",
      description: "Gyoza vapeur au poulet revisités.",
    },
    {
      name: "CHICKEN LOLLIPOP (8 PCS)",
      price: "7,000",
      description: "Ailerons de poulet frits aux sept épices.",
    },
    {
      name: "SZECHWAN LOLLIPOP (8 PCS)",
      price: "8,000",
      description: "Ailerons frits aux sept épices sautés à la sauce szechwan.",
    },
    {
      name: "VEG MANCHURIAN DRY / GRAVY",
      price: "5,000 / 7,000",
      description:
        "Boulettes de légumes hachés servies en entrée ou en plat aigre-doux.",
    },
    {
      name: "CHILLI PANEER DRY / GRAVY",
      price: "6,000 / 8,000",
      description: "Paneer sauté avec dés d'oignons et de poivrons.",
    },
    {
      name: "CHICKEN MANCHURIAN DRY / GRAVY",
      price: "7,000 / 9,000",
      description: "Morceaux de poulet frits en sauce aigre-douce.",
    },
    {
      name: "CHILLI CHICKEN DRY / GRAVY",
      price: "7,000 / 9,000",
      description: "Poulet sauté avec poivrons et sauce soja.",
    },
    {
      name: "VEG FRIED RICE / VEG SZECHWAN RICE",
      price: "7,000",
      description: "Riz cantonais aux légumes ou version szechwan.",
    },
    {
      name: "CHICKEN FRIED RICE / CHICKEN SZECHWAN RICE",
      price: "9,000",
      description: "Riz cantonais ou szechwan au poulet.",
    },
    {
      name: "VEG HAKKA / SZECHWAN NOODLES",
      price: "7,000",
      description: "Nouilles sautées aux légumes ou relevées façon szechwan.",
    },
    {
      name: "CHICKEN HAKKA / SZECHWAN NOODLES",
      price: "9,000",
      description: "Nouilles sautées au poulet ou version szechwan épicée.",
    },
  ];

  const indianVegStarters = [
    {
      name: "Vegetable Samosas (4 pcs)",
      price: "5,000",
      description: "Triangles frits fourrés aux pommes de terre.",
    },
    {
      name: "Batata Vada (4 pcs)",
      price: "5,000",
      description: "Beignets croustillants de pommes de terre.",
    },
    {
      name: "Hara Bara Kabab (4 pcs)",
      price: "5,000",
      description: "Beignets de légumes hachés aux herbes.",
    },
    {
      name: "Mix Pakoras / Onion Bhajias",
      price: "5,000",
      description: "Tempuras croustillants de légumes ou d’oignons.",
    },
    {
      name: "Paneer Samosas (4 pcs)",
      price: "6,000",
      description: "Triangles frits garnis de fromage maison.",
    },
    {
      name: "Paneer Tikka",
      price: "6,000",
      description: "Brochettes de paneer aux sauces tandoori et coriandre.",
    },
    {
      name: "Mix Veg Platter / Half Platter",
      price: "30,000 / 18,000",
      description:
        "Assortiment végétarien : samosa, paneer tikka, pakora, batata vada, hara bara kabab.",
    },
  ];

  const indianNonVegStarters = [
    {
      name: "Kheema Samosa (Poulet/Mouton)",
      price: "6,000",
      description: "Triangles frits garnis de viande hachée.",
    },
    {
      name: "Chicken Tikka",
      price: "6,000",
      description: "Brochette de poulet grillé sauce tandoori.",
    },
    {
      name: "Chicken Malai / Cheesy Kabab",
      price: "7,000",
      description: "Brochette de poulet grillé à la crème de cajou et fromage.",
    },
    {
      name: "Chicken Sheek Kabab",
      price: "7,000",
      description: "Kafta de poulet haché grillé au tandoor.",
    },
    {
      name: "Tandoori Chicken (Full / Half)",
      price: "14,000 / 8,000",
      description: "Poulet braisé façon tandoori.",
    },
    {
      name: "Mutton Sheek Kabab",
      price: "8,000",
      description: "Kafta de mouton haché grillé au tandoor.",
    },
    {
      name: "Mutton Boti Kabab",
      price: "8,000",
      description: "Brochette de mouton grillé sauce tandoori.",
    },
    {
      name: "Fish Tikka",
      price: "10,000",
      description: "Brochette de poisson grillée sauce tandoori.",
    },
    {
      name: "Fish Amritsari Fry",
      price: "10,000",
      description: "Morceaux de poisson frits aux sept épices.",
    },
    {
      name: "Shrimps Koliwada",
      price: "10,000",
      description: "Crevettes frites aux sept épices.",
    },
    {
      name: "Gambas Tandoori / Lasooni",
      price: "16,000",
      description: "Gambas grillées sauce tandoori ou beurre à l’ail.",
    },
    {
      name: "Tandoori Lobster",
      price: "18,000",
      description: "Langoustes grillées sauce tandoori.",
    },
    {
      name: "Mix Grill / Half Mix Grill",
      price: "45,000 / 30,000",
      description:
        "Assortiment carné : samosa viande, chicken tikka, cheesy kabab, malai kabab, sheek, fish tikka, jinga koliwada.",
    },
  ];

  const indianVegMains = [
    {
      name: "Dal Makhani",
      price: "8,000",
      description: "Lentilles noires et haricots rouges au beurre et à la crème.",
    },
    {
      name: "Dal Tadka",
      price: "8,000",
      description: "Soupe de lentilles jaunes à l’ail et au cumin.",
    },
    {
      name: "Dal Palak",
      price: "8,000",
      description: "Soupe de lentilles jaunes aux épinards frais.",
    },
    {
      name: "Veg Kadai",
      price: "8,000",
      description: "Légumes et paneer sautés aux oignons et tomates.",
    },
    {
      name: "Veg Peshawari",
      price: "8,000",
      description: "Curry de légumes onctueux au lait de coco.",
    },
    {
      name: "Baingan Bharta",
      price: "8,000",
      description: "Aubergine braisée réduite en purée fumée.",
    },
    {
      name: "Bombay Jeera Aloo",
      price: "8,000",
      description: "Dés de pommes de terre sautés au cumin.",
    },
    {
      name: "Veg Kofta Lababdaar / Masala / Maratha",
      price: "8,000",
      description: "Boulettes de légumes en sauce crémeuse, épicée ou corsée.",
    },
    {
      name: "Dum Aloo Kashmiri",
      price: "8,000",
      description: "Pommes de terre farcies au paneer et fruits secs, sauce tomate.",
    },
    {
      name: "Paneer Makhanwala",
      price: "9,000",
      description: "Curry beurre et tomate aux dés de fromage maison.",
    },
    {
      name: "Palak Paneer",
      price: "9,000",
      description: "Paneer mijoté dans une purée d’épinards.",
    },
    {
      name: "Shaahi Paneer",
      price: "9,000",
      description: "Sauce crémeuse aux oignons et cajou pour paneer.",
    },
    {
      name: "Methi Mutter Paneer",
      price: "9,000",
      description: "Paneer et petits pois au fenugrec crémeux.",
    },
    {
      name: "Paneer Kurchan",
      price: "10,000",
      description: "Émincés de paneer en sauce crémeuse tomate-oignon.",
    },
  ];

  const indianNonVegMains = [
    {
      name: "Traditional Curry",
      price: "Egg 8,000 / Chicken 10,000 / Mutton 12,000 / Fish 12,000 / Crevette 12,000",
      description: "Curry maison customisé à votre protéine.",
    },
    {
      name: "Tikka Masala",
      price: "Chicken 10,000 / Mutton 12,000",
      description: "Sauce robuste aux oignons et tomates rôties.",
    },
    {
      name: "Malai Masala",
      price: "Chicken 10,000 / Mutton 12,000",
      description: "Curry onctueux à la crème et noix de cajou.",
    },
    {
      name: "Kadhai",
      price: "Chicken 10,000 / Mutton 12,000",
      description: "Sauté express aux poivrons, oignons et épices torréfiées.",
    },
    {
      name: "Punjabi Masala",
      price: "Crevette 12,000 / Gambas 18,000 / Langouste 20,000",
      description: "Base tomate relevée aux sept épices.",
    },
    {
      name: "Butter Chicken",
      price: "10,000",
      description: "Poulet tandoori effilé, beurre et sauce tomate veloutée.",
    },
    {
      name: "Chicken Kali Mirch",
      price: "10,000",
      description: "Poulet tendre dans une sauce au poivre noir.",
    },
    {
      name: "Mutton Lasooni Masala",
      price: "12,000",
      description: "Morceaux de mouton dans une sauce ailée épicée.",
    },
    {
      name: "Kheema Masala",
      price: "12,000",
      description: "Émincé de mouton aux oignons caramélisés.",
    },
    {
      name: "Mutton Rogan Josh",
      price: "12,000",
      description: "Classique cachemiri aux tomates et oignons confits.",
    },
    {
      name: "Prawns Lasooni Masala",
      price: "18,000",
      description: "Gambas mijotées dans une sauce généreuse à l’ail.",
    },
  ];

  const indianAccompaniments = [
    {
      name: "Naan Nature",
      price: "1,500",
      description: "Pain tandoor moelleux classique.",
    },
    {
      name: "Tandoori Roti",
      price: "2,000",
      description: "Pain complet au feu de bois.",
    },
    {
      name: "Missi Roti",
      price: "2,000",
      description: "Pain à la farine de pois chiche.",
    },
    {
      name: "Tava Chapatti",
      price: "1,500",
      description: "Pain fin au blé complet.",
    },
    {
      name: "Roomali Roti",
      price: "2,500",
      description: "Crêpe ultra fine façon mouchoir.",
    },
    {
      name: "Butter Naan",
      price: "2,000",
      description: "Naan généreusement beurré.",
    },
    {
      name: "Pudina Naan",
      price: "2,000",
      description: "Pain parfumé à la menthe fraîche.",
    },
    {
      name: "Lachha Paratha",
      price: "2,500",
      description: "Paratha feuilleté au blé complet.",
    },
    {
      name: "Garlic Naan",
      price: "2,500",
      description: "Pain infusé à l’ail rôti.",
    },
    {
      name: "Cheese Naan",
      price: "3,500",
      description: "Naan farci d’un cœur de fromage fondu.",
    },
    {
      name: "Aloo Paratha",
      price: "3,500",
      description: "Paratha farci aux pommes de terre épicées.",
    },
    {
      name: "Paneer Paratha",
      price: "4,000",
      description: "Paratha garni de fromage maison râpé.",
    },
    {
      name: "Cheese Garlic Naan",
      price: "4,000",
      description: "Alliance ail rôti et fromage filant.",
    },
    {
      name: "French Fries",
      price: "3,000",
      description: "Frites dorées façon bistro.",
    },
    {
      name: "Plain Rice",
      price: "3,000",
      description: "Riz basmati vapeur.",
    },
    {
      name: "Jeera Rice",
      price: "3,500",
      description: "Riz basmati sauté au cumin.",
    },
    {
      name: "Biryani / Saffron Rice",
      price: "3,500",
      description: "Riz basmati parfumé au curry ou au safran.",
    },
    {
      name: "Signature Biryani",
      price: "Variable",
      description:
        "Biryani basmati avec légumes, poulet, mouton, kheema, crevettes, poisson ou œuf – servi avec raita.",
    },
    {
      name: "Plain Dahi",
      price: "2,000",
      description: "Yaourt nature rafraîchissant.",
    },
    {
      name: "Cucumber Raita",
      price: "2,500",
      description: "Yaourt au concombre et épices grillées.",
    },
    {
      name: "Mixed Raita",
      price: "2,500",
      description: "Yaourt aux légumes croquants.",
    },
    {
      name: "Boondi Raita",
      price: "2,500",
      description: "Yaourt aux billes croustillantes de pois chiche.",
    },
  ];

  const drinkChampagnes = [
    { name: "Pierre Grandet Brut", price: "50.000 F", description: "Bulles vives et notes d’agrumes." },
    { name: "Pierre Grandet Demi-Sec", price: "50.000 F", description: "Profil plus doux avec finale miellée." },
    { name: "Laurent Perrier Brut", price: "70.000 F", description: "Grande maison, finale crayeuse rafraîchissante." },
    { name: "Laurent Perrier Demi-Sec", price: "75.000 F", description: "Brioché et charmeur, parfait pour le dessert." },
    { name: "Moët Impérial Brut", price: "80.000 F", description: "Signature iconique, bulles fines et équilibrées." },
    { name: "Moët Impérial Rosé", price: "100.000 F", description: "Nez de fruits rouges et bouche ample." },
  ];

  const drinkRedWines = [
    { name: "Côte du Rhône Guigal", price: "25.000 F", description: "Assemblage sudiste fruits noirs & épices." },
    { name: "Côte de Blaye Château Les Bertrands", price: "25.000 F", description: "Merlot charmeur, tanins veloutés." },
    { name: "Haut Médoc Château Troupian", price: "33.000 F", description: "Structure médocaine classique." },
    { name: "Saint-Émilion Château le Barry", price: "34.000 F", description: "Merlot/cabernet, bouche raffinée." },
    { name: "Sancerre La Demoiselle Joseph Mellot", price: "35.000 F", description: "Rouge ligérien délicat, fruits croquants." },
    { name: "Saint-Estèphe Château Moutinot", price: "43.000 F", description: "Puissance et notes fumées." },
    { name: "Château Ferrande", price: "45.000 F", description: "Graves généreux, touche graphite." },
    { name: "Haute Côte de Nuits Les Vignes Hautes Moillard", price: "50.000 F", description: "Pinot noir élégant, belle fraîcheur." },
    { name: "Pessac Léognan Dauphin Olivier", price: "55.000 F", description: "Boisé noble, finale longue." },
  ];

  const drinkWhiteWines = [
    { name: "Calvet Moelleux", price: "35.000 F", description: "Doux et parfumé, idéal à l’apéritif." },
    { name: "Côte du Rhône Guigal Blanc", price: "43.000 F", description: "Assemblage floral, bouche ronde." },
    { name: "Muscadet Plaisir de Vigne", price: "45.000 F", description: "Vif et iodé, compagnon des fruits de mer." },
    { name: "Bourgogne Aligoté Long du Bois Moillard", price: "50.000 F", description: "Texture soyeuse, pointe saline." },
  ];

  const drinkRoseWines = [
    { name: "Sancerre Montarlet Joseph Mellot", price: "55.000 F", description: "Rosé premium, fruits rouges délicats." },
    { name: "Côte de Provence Château Cavalier", price: "29.000 F", description: "Rosé pâle, esprit Riviera." },
    { name: "Gris Blanc", price: "25.000 F", description: "Très léger, finale citronnée." },
    { name: "Languedoc La Grande Couronne", price: "25.000 F", description: "Rosé gourmand, notes de pêche." },
  ];

  const drinkWineByGlass = [
    { name: "Rouge du Jour", price: "20.000 F", description: "Sélection tournante du sommelier." },
    { name: "Blanc du Jour", price: "25.000 F", description: "Vin blanc maison, très frais." },
    { name: "Rosé du Jour", price: "25.000 F", description: "Expressif et rafraîchissant." },
    { name: "Champagne au Verre", price: "35.000 F", description: "Cuvée signature servie à la coupe." },
    { name: "Vin Prestige au Verre", price: "40.000 F", description: "Grande appellation disponible au verre." },
    { name: "Coupe de Champagne Classique", price: "25.000 F", description: "Service express de champagne." },
  ];

  const drinkPremiumSpirits = [
    { name: "Ballantine's", price: "5.000 / 50.000 F", description: "Scotch blended équilibré (verre / bouteille)." },
    { name: "JW Black Label", price: "6.000 / 60.000 F", description: "Label iconique, tourbé et sophistiqué." },
    { name: "Dewar's 12", price: "6.000 / 60.000 F", description: "Blend 12 ans, bouche miellée." },
    { name: "Chivas Regal 12", price: "6.000 / 60.000 F", description: "Texture crémeuse, finale douce." },
    { name: "Jack Daniel's", price: "6.000 / 60.000 F", description: "Tennessee whiskey aux notes de vanille." },
    { name: "Jack Honey", price: "6.000 / 60.000 F", description: "Version miel, plus suave." },
    { name: "Jameson Irish", price: "7.000 / 70.000 F", description: "Triple distillation, douceur irlandaise." },
    { name: "Glenfiddich 12", price: "9.000 / 90.000 F", description: "Single malt emblématique." },
    { name: "Woodford Reserve", price: "9.000 / 90.000 F", description: "Bourbon riche en caramel." },
    { name: "JW Double Black", price: "10.000 / 100.000 F", description: "Version très fumée du Black Label." },
    { name: "Jack Single Barrel", price: "10.000 / 100.000 F", description: "Sélection de barrique, plus boisé." },
    { name: "Gentleman Jack", price: "10.000 / 100.000 F", description: "Double filtré pour plus de douceur." },
    { name: "Chivas Regal 18", price: "12.000 / 120.000 F", description: "Blend premium 18 ans." },
    { name: "JW Gold Label", price: "13.000 / 130.000 F", description: "Assemblage luxueux, texture soyeuse." },
    { name: "Glen 18", price: "15.000 / 150.000 F", description: "Single malt 18 ans, grande longueur." },
    { name: "Macallan 12", price: "15.000 / 150.000 F", description: "Classique sherry oak." },
    { name: "Saint James Rhum", price: "5.000 / 50.000 F", description: "Rhum agricole martiniquais." },
    { name: "Havana Club 7", price: "6.000 / 60.000 F", description: "Rhum cubain vieilli 7 ans." },
    { name: "Bacardi", price: "5.000 / 50.000 F", description: "Rhum léger pour cocktails." },
    { name: "Ron Zacapa", price: "15.000 / 150.000 F", description: "Rhum solera du Guatemala." },
    { name: "Bombay Sapphire", price: "6.000 / 60.000 F", description: "Gin london dry iconique." },
    { name: "Antidote Gin", price: "5.000 / 50.000 F", description: "Gin artisanal aux botaniques locales." },
    { name: "Tanqueray", price: "6.000 / 60.000 F", description: "Gin classique, genévrier expressif." },
    { name: "Hendrick's", price: "15.000 / 150.000 F", description: "Gin infusé concombre & rose." },
    { name: "Smirnoff", price: "3.000 / 30.000 F", description: "Vodka pure et neutre." },
    { name: "Absolut Vodka", price: "3.000 / 30.000 F", description: "Vodka suédoise, multiples arômes." },
    { name: "Belvedere", price: "4.000 / 40.000 F", description: "Vodka polonaise premium." },
    { name: "Grey Goose", price: "4.000 / 40.000 F", description: "Vodka française ultra soyeuse." },
  ];

  const drinkShots = [
    { name: "Get 27", price: "5.000 / 50.000 F", description: "Menthol puissant, shot ou bouteille." },
    { name: "Jäger Shot", price: "6.000 / 60.000 F", description: "Herbal & épicé." },
    { name: "Olmeca Shot", price: "6.000 / 60.000 F", description: "Tequila vive, sel & citron." },
    { name: "Teresa Castillo", price: "6.000 / 60.000 F", description: "Recette maison relevée." },
    { name: "B52", price: "6.000 / 60.000 F", description: "Trilogie Kahlúa, Baileys, Grand Marnier." },
  ];

  const drinkLiqueurs = [
    { name: "Campari", price: "5.000 / 50.000 F", description: "Amer iconique." },
    { name: "Martini (Blanc/Rosé/Rouge)", price: "5.000 / 50.000 F", description: "Vermouth italien selon vos envies." },
    { name: "Ricard", price: "6.000 / 60.000 F", description: "Anisé fraîcheur provençale." },
    { name: "Pastis", price: "10.000 / 100.000 F", description: "Service à la carafe." },
    { name: "Limoncello", price: "5.000 / 50.000 F", description: "Digestif citronné." },
    { name: "Cointreau", price: "6.000 / 60.000 F", description: "Orange triple sec." },
    { name: "Jägermeister", price: "5.000 / 50.000 F", description: "Herbal allemand." },
    { name: "Baileys Irish Cream", price: "15.000 / 150.000 F", description: "Crème irlandaise gourmande." },
    { name: "Hennessy VS", price: "12.000 / 120.000 F", description: "Cognac VS." },
    { name: "Hennessy VSOP", price: "13.000 / 130.000 F", description: "Vieillissement supérieur." },
    { name: "Rémy Martin XO", price: "15.000 / 150.000 F", description: "Assemblage complexe." },
    { name: "Martell XO", price: "15.000 / 150.000 F", description: "Grande marque de cognac." },
  ];

  const drinkBeers = [
    { name: "Beaufort", price: "5.000 / 40.000 F", description: "Lager locale." },
    { name: "Heineken", price: "5.000 / 50.000 F", description: "Classique hollandaise." },
    { name: "Budweiser", price: "7.000 / 70.000 F", description: "American lager." },
    { name: "Guinness", price: "9.000 / 90.000 F", description: "Stout crémeuse." },
    { name: "Corona", price: "5.000", description: "Servie avec quartier de citron." },
    { name: "Desperados", price: "5.000", description: "Bière tequila, très fun." },
    { name: "Kingfisher", price: "6.000", description: "Best-seller indien." },
  ];

  const drinkClassicCocktails = [
    { name: "Mojito", price: "8.000", description: "Rhum blanc, menthe, citron, sucre de canne." },
    { name: "Mojito Pastèque", price: "8.000", description: "Twist fruité au jus de pastèque." },
    { name: "Old Fashioned", price: "8.000", description: "Whisky, bitters, sucre, zeste d’orange." },
    { name: "Negroni", price: "8.000", description: "Gin, Campari, vermouth doux." },
    { name: "Margarita", price: "8.000", description: "Tequila, citron vert, triple sec." },
    { name: "Cuba Libre", price: "8.000", description: "Rhum brun, cola, citron." },
    { name: "Gin Basil", price: "10.000", description: "Gin, citron, basilic & sucre." },
    { name: "Sex on the Beach", price: "10.000", description: "Vodka, Cointreau, orange, grenadine." },
    { name: "Espresso Martini", price: "10.000", description: "Vodka, café, Kahlúa, sucre." },
    { name: "Pornstar Martini", price: "10.000", description: "Fruit de la passion & prosecco." },
    { name: "Pink Lady", price: "10.000", description: "Gin, citron, grenadine." },
  ];

  const drinkSignatureCocktails = [
    { name: "London", price: "10.000", description: "Gin, litchi, pêche, passion & tonic." },
    { name: "Alloco", price: "10.000", description: "Whisky, ananas, popcorn, curaçao." },
    { name: "Babilov", price: "10.000", description: "Vodka, crème fraîche, noix de muscade." },
    { name: "Piña Colada", price: "10.000", description: "Rhum blanc, ananas, coco, crème fraîche." },
    { name: "Skyline", price: "10.000", description: "Rhum brun, bissap, gingembre." },
    { name: "Despejitos", price: "10.000", description: "Menthe, citron, bière Desperados." },
    { name: "Coronarita", price: "10.000", description: "Tequila, triple sec, grenadine, Corona." },
    { name: "Baileys Frappé", price: "10.000", description: "Baileys, crème fraîche, Kahlúa." },
    { name: "Tec-tini", price: "12.000", description: "Tequila rosé, vodka, liqueur de café, chocolat." },
    { name: "Delhi Darbar Devil", price: "12.000", description: "Création spicy maison." },
  ];

  const drinkMocktails = [
    { name: "Virgin Mojito", price: "12.000", description: "Menthe fraîche, citron, perrier." },
    { name: "Virgin Mojito Pastèque", price: "12.000", description: "Pastèque pressée, menthe, citron." },
    { name: "Fruit Punch", price: "12.000", description: "Mangue, pomme, passion, grenadine." },
    { name: "Bora Bora", price: "12.000", description: "Ananas, passion, citron, grenadine." },
    { name: "Exotique", price: "12.000", description: "Orange, passion, ananas, grenadine." },
    { name: "Arc en Ciel", price: "12.000", description: "Orange, grenadine, curaçao bleu." },
    { name: "Long Island Ice Tea", price: "15.000", description: "Version classique multi-spiritueux." },
    { name: "Fraise Menthe", price: "12.000", description: "Purée de fraise, menthe, citron." },
    { name: "San Orange", price: "12.000", description: "Orange, bitters San, eau gazeuse." },
    { name: "Kiwi Blast", price: "12.000", description: "Kiwi, pomme, citron, curaçao, crème." },
    { name: "Virgin Colada", price: "12.000", description: "Ananas, coco, crème fraîche." },
  ];

  const drinkWaterAndSoft = [
    { name: "Celeste", price: "7.000", description: "Eau minérale locale." },
    { name: "Kirène Plate", price: "7.000", description: "Eau plate sénégalaise." },
    { name: "Kirène Pétillante", price: "7.000", description: "Version gazeuse." },
    { name: "San Pellegrino", price: "7.000", description: "Eau italienne pétillante." },
    { name: "Perrier", price: "7.000", description: "Bulles iconiques." },
    { name: "Tonic", price: "7.000", description: "Indian tonic." },
    { name: "Cody's", price: "8.000", description: "Energy drink local." },
    { name: "Red Bull", price: "8.000", description: "Energy drink classique." },
    { name: "Softs (Coca, Fanta, Sprite, Orangina, Coca Zero)", price: "8.000", description: "Sodas 33cl." },
    { name: "Jus Frais (Orange, Ananas, Bissap, Passion, Pastèque)", price: "10.000", description: "Pressés minute." },
    { name: "Lassi Sucré / Salé", price: "3.000", description: "Lassi traditionnel à base de yaourt." },
    { name: "Masala Chaas", price: "3.000", description: "Babeurre épicé." },
    { name: "Lassi Mangue", price: "4.000", description: "Version fruitée signature." },
    { name: "Fresh Lime Soda", price: "4.000", description: "Citron vert, sucre, eau pétillante." },
  ];

  const dessertMenu = [
    {
      name: "Gulab Jamun (3 pcs)",
      price: "4,000",
      description: "Puddings frits de lait imbibés d’un sirop cardamome.",
    },
    {
      name: "Malai Kulfi",
      price: "5,000",
      description: "Crème glacée au safran et cardamome, pistaches concassées.",
    },
    {
      name: "Gajar Halwa",
      price: "5,000",
      description: "Pudding de carottes au safran, cardamome & amandes.",
    },
    {
      name: "Choco Lava Cake",
      price: "6,000",
      description: "Fondant chaud au chocolat, glace vanille.",
    },
    {
      name: "Crème Brûlée",
      price: "5,000",
      description: "Classique maison, croûte caramélisée.",
    },
    {
      name: "Ice Cream (2 scoops)",
      price: "4,000",
      description: "Deux boules au choix.",
    },
    {
      name: "Dessert of the Chef",
      price: "6,000",
      description: "Création surprise selon l’inspiration.",
    },
    {
      name: "Masala Chai",
      price: "3,000",
      description: "Thé au lait épicé façon maison.",
    },
    {
      name: "Thé au Choix",
      price: "3,000",
      description: "Menthe, citron, camomille ou sélection du jour.",
    },
    {
      name: "Expresso",
      price: "2,000",
      description: "Shot serré pour clôturer le repas.",
    },
  ];

  const menuCategories = [
    { title: "International Cuisine", count: 14 },
    { title: "Indian Cuisine", count: 32 },
    { title: "Drinks", count: 68 },
    { title: "Desserts", count: 10 },
  ];

  const categoryLabels = isFrench
    ? {
        "International Cuisine": "Cuisine internationale",
        "Indian Cuisine": "Cuisine indienne",
        Drinks: "Boissons",
        Desserts: "Desserts",
      }
    : {
        "International Cuisine": "International Cuisine",
        "Indian Cuisine": "Indian Cuisine",
        Drinks: "Drinks",
        Desserts: "Desserts",
      };

  const menuPanelData = {
    "International Cuisine": [
      {
        heading: "Menu International",
        tagline: "Gourmet bites with continental flair.",
        items: internationalMenu,
      },
      {
        heading: "Menu Indo-Chinois",
        tagline: "Smoky wok signatures with Skyline spice.",
        items: indoChineseMenu,
      },
    ],
    "Indian Cuisine": [
      {
        heading: "Entrées – Végétarien",
        tagline: "Snacks de rue emblématiques, entièrement végétariens.",
        items: indianVegStarters,
      },
      {
        heading: "Entrées – Volaille & Mer",
        tagline: "Tandoor, fritures et grillades signées Skyline.",
        items: indianNonVegStarters,
      },
      {
        heading: "Spécialités Végétariennes",
        tagline: "Currys mijotés, lentilles et paneer maison.",
        items: indianVegMains,
      },
      {
        heading: "Spécialités Poulet & Mer",
        tagline: "Classiques du nord de l’Inde, riches et aromatiques.",
        items: indianNonVegMains,
      },
      {
        heading: "Accompagnements & Raitas",
        tagline: "Pains au tandoor, riz parfumés et condiments frais.",
        items: indianAccompaniments,
      },
    ],
    Drinks: [
      {
        heading: "Champagnes",
        tagline: "Bubbles from maisons classiques et cuvées rosées.",
        items: drinkChampagnes,
      },
      {
        heading: "Vins Rouges",
        tagline: "Sélection château & appellations françaises.",
        items: drinkRedWines,
      },
      {
        heading: "Vins Blancs & Rosés",
        tagline: "Assemblages frais, iodés et rosés Riviera.",
        items: [...drinkWhiteWines, ...drinkRoseWines],
      },
      {
        heading: "Au Verre & Coupes",
        tagline: "Champagnes et vins premium servis à la demande.",
        items: drinkWineByGlass,
      },
      {
        heading: "Spiritueux & Shots",
        tagline: "Whiskies, rhums, vodkas et shots signature.",
        items: [...drinkPremiumSpirits, ...drinkShots, ...drinkLiqueurs],
      },
      {
        heading: "Bières & Cocktails Classiques",
        tagline: "Pressions, long drinks et recettes intemporelles.",
        items: [...drinkBeers, ...drinkClassicCocktails],
      },
      {
        heading: "Cocktails Signature & Sans Alcool",
        tagline: "Créations Skyline et mocktails fruités.",
        items: [...drinkSignatureCocktails, ...drinkMocktails],
      },
      {
        heading: "Eaux, Softs & Lassis",
        tagline: "Hydratation premium et boissons maison.",
        items: drinkWaterAndSoft,
      },
    ],
    Desserts: [
      {
        heading: "Desserts & Thé",
        tagline: "Classiques indiens & douceurs maison par Skyline.",
        items: dessertMenu,
      },
    ],
  };

  const selectedMenus = activeCategory ? menuPanelData[activeCategory] ?? [] : [];

  const handleCategorySelect = (title) => {
    if (activeCategory === title) {
      setActiveCategory(null);
      setActivePanel(null);
      return;
    }
    setActiveCategory(title);
    const firstPanel = menuPanelData[title]?.[0]?.heading ?? null;
    setActivePanel(firstPanel);
    scrollToMenu();
  };

  return (
    <>
      {/* banner */}
      <SubPageBanner heroBg={heroBg} />
      {/* banner */}

      {/* menu categories */}
      <section className="py-20 md:py-32 bg-Dark-Cyan-Green">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-International-Orange font-satisfy text-xl md:text-2xl">
              {isFrench ? "Notre menu" : "Our Menu"}
            </span>
            <h2 className="text-3xl md:text-5xl font-plus-jakarta-sans font-semibold text-white mt-3 mb-4">
              {isFrench ? "Plaisirs culinaires" : "Culinary Delights"}
            </h2>
            <p className="max-w-2xl mx-auto text-[#8A9A9A] font-jost text-base md:text-lg">
              {isFrench
                ? "Explorez notre selection de cuisine indienne et internationale, pensee pour une experience Skyline complete."
                : "Explore our carefully curated selection of authentic Indian and international cuisine."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {menuCategories.map((category) => {
              const isActive = activeCategory === category.title;

              return (
                <button
                  key={category.title}
                  onClick={() => handleCategorySelect(category.title)}
                  className={`group rounded-xl border p-6 text-left transition-all duration-300 ${
                    isActive
                      ? "border-International-Orange bg-International-Orange/10"
                      : "border-white/10 bg-[#0a1c1c]/50 hover:border-International-Orange/30"
                  }`}
                >
                  <h3 className={`font-plus-jakarta-sans font-semibold text-lg mb-2 transition-colors ${
                    isActive ? "text-International-Orange" : "text-white group-hover:text-International-Orange"
                  }`}>
                    {categoryLabels[category.title]}
                  </h3>
                  <p className="text-[#8A9A9A] font-jost text-sm">
                    {category.count} {isFrench ? "articles" : "items"}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>
      {/* menu categories */}

      {/* detailed menus */}
      {selectedMenus.length > 0 && (
        <section ref={menuSectionRef} id="menu-section" className="py-16 md:py-24 bg-Dark-Cyan-Green border-t border-white/5">
          <div className="container">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-plus-jakarta-sans font-semibold text-white mb-3">
                {activeCategory ? categoryLabels[activeCategory] : ""}
              </h2>
              <p className="max-w-2xl mx-auto text-[#8A9A9A] font-jost">
                {isFrench ? "Selectionnez une section pour afficher les plats et boissons." : "Select a section to view our offerings"}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {selectedMenus.map((panel) => {
                const isPanelActive = panel.heading === activePanel;
                return (
                  <button
                    key={panel.heading}
                    onClick={() => setActivePanel(panel.heading)}
                    className={`px-4 py-2 rounded-lg text-sm font-jost transition duration-300 ${
                      isPanelActive
                        ? "bg-International-Orange text-white"
                        : "border border-white/20 text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {panel.heading}
                  </button>
                );
              })}
            </div>

            {(() => {
              const panel = selectedMenus.find(
                (p) => p.heading === activePanel,
              );
              if (!panel) return null;
              return (
                <div className="max-w-4xl mx-auto">
                  <MenuPanel
                    key={panel.heading}
                    heading={panel.heading}
                    tagline={panel.tagline}
                    items={panel.items}
                  />
                </div>
              );
            })()}
          </div>
        </section>
      )}
      {/* detailed menus */}

      {/* marquee slider */}
      <MarqueeSlider />
      {/* marquee slider */}
    </>
  );
};

export default OurMenu;

