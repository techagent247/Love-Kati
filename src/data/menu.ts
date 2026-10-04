import katiImg from "@/assets/kati-roll.jpg";
import chipsImg from "@/assets/chips.jpg";
import chaatImg from "@/assets/chaat.jpg";
import curryImg from "@/assets/curry.jpg";

export type CategoryId = "kati-rolls" | "chips" | "chaat" | "curry" | "kids" | "drinks";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price?: string; // leave undefined until confirmed — never invent
  image?: string;
  category: CategoryId;
  vegetarian?: boolean;
  vegan?: boolean;
  spice?: 0 | 1 | 2 | 3;
  popular?: boolean;
};

export const categories: { id: CategoryId; label: string; title: string; blurb: string; image?: string }[] = [
  { id: "kati-rolls", label: "Kati Rolls", title: "The Kati Roll", blurb: "A quintessential Calcutta spicy street wrap.", image: katiImg },
  { id: "chips", label: "Chips", title: "Proper Street Food Sides", blurb: "Loaded with gunpowder masala heat.", image: chipsImg },
  { id: "chaat", label: "Chaat", title: "Chaat", blurb: "A crispy, crunchy, spicy, sweet-tangy street-food bite.", image: chaatImg },
  { id: "curry", label: "Curry", title: "Curries", blurb: "Slow, deep, big-flavoured bowls.", image: curryImg },
  { id: "kids", label: "Kids", title: "Little Food Lovers", blurb: "Gentle, no-fuss favourites for smaller appetites." },
  { id: "drinks", label: "Drinks", title: "Drinks", blurb: "Cold, fizzy and very Indian." },
];

export const menu: MenuItem[] = [
  { id: "classic-egg", name: "Classic Egg Roll", category: "kati-rolls", image: katiImg, vegetarian: true, spice: 1, description: "Flaky paratha layered with egg, rolled with spicy fillings and topped with chutney." },
  { id: "chicken-tikka", name: "Chicken Tikka Roll", category: "kati-rolls", image: katiImg, spice: 2, popular: true, description: "Skewer-roasted chicken tikka wrapped in paratha with onion and green chutney." },
  { id: "egg-chicken-tikka", name: "Egg Chicken Tikka Roll", category: "kati-rolls", image: katiImg, spice: 2, description: "The full Calcutta move: egg-layered paratha with chicken tikka and chutney." },
  { id: "lamb-tikka", name: "Lamb Tikka Roll", category: "kati-rolls", image: katiImg, spice: 2, popular: true, description: "Tender roasted lamb tikka, rolled tight with spicy fillings and chutney." },
  { id: "egg-lamb-tikka", name: "Egg Lamb Tikka Roll", category: "kati-rolls", image: katiImg, spice: 2, description: "Egg-layered paratha loaded with lamb tikka and topped with chutney." },
  { id: "masala-paneer", name: "Masala Paneer Roll", category: "kati-rolls", image: katiImg, vegetarian: true, spice: 2, description: "Masala-roasted paneer wrapped in paratha with spicy fillings and chutney." },
  { id: "curried-chickpea", name: "Curried Chickpea Roll", category: "kati-rolls", image: katiImg, vegetarian: true, spice: 1, description: "Spiced curried chickpeas rolled in paratha and finished with chutney." },

  { id: "gunpowder-masala-chips", name: "Gunpowder Masala Chips", category: "chips", image: chipsImg, vegetarian: true, spice: 2, popular: true, description: "Crispy chips tossed in our gunpowder masala spice." },
  { id: "gunpowder-tamarind-chips", name: "Gunpowder Tamarind Chips", category: "chips", image: chipsImg, vegetarian: true, spice: 2, description: "Gunpowder-spiced chips with a sweet-sour tamarind drizzle." },

  { id: "samosa-chole-chaat", name: "Samosa Black Chole Chaat", category: "chaat", image: chaatImg, vegetarian: true, spice: 1, popular: true, description: "Warm vegetable samosa filled with black chickpea curry, served with cool yogurt, fresh herbs, pomegranate, tamarind drizzle and green chutney." },

  { id: "pumpkin-curry", name: "Keralian Pumpkin, Potato & Coconut Curry", category: "curry", image: curryImg, vegan: true, vegetarian: true, spice: 1, description: "With lentil puri, vegan loaded chips and basmati rice." },
  { id: "lamb-vindaloo", name: "Goan Spring Lamb Vindaloo", category: "curry", image: curryImg, spice: 3, description: "With basmati rice and gunpowder chips." },

  { id: "plain-chips", name: "Plain Chips", category: "kids", image: chipsImg, vegetarian: true, spice: 0, description: "Simple, golden and crispy." },
  { id: "no-spice-egg-paratha", name: "No Spice Egg Paratha", category: "kids", image: katiImg, vegetarian: true, spice: 0, description: "Soft egg paratha with zero heat." },
  { id: "plain-paratha", name: "Plain Paratha", category: "kids", image: katiImg, vegetarian: true, spice: 0, description: "Warm, flaky and plain." },

  { id: "coke", name: "Coke", category: "drinks", description: "Ice cold classic." },
  { id: "thums-up", name: "Thums Up", category: "drinks", description: "India's bold, fizzy cola." },
  { id: "limca", name: "Limca", category: "drinks", description: "Lemon-lime fizz from India." },
];

export const itemsIn = (c: CategoryId) => menu.filter((m) => m.category === c);
