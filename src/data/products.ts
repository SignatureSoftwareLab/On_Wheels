import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "prod-001",
    name: "Immunity Booster Plus",
    description: "Ayurvedic formula with Ashwagandha, Tulsi & Giloy for natural immunity support. 60 capsules.",
    price: 1299,
    image: product1,
    category: "Health Supplements",
    inStock: true,
  },
  {
    id: "prod-002",
    name: "Herbal Protein Powder",
    description: "Plant-based protein with essential amino acids. Supports muscle health & recovery. 500g pack.",
    price: 1899,
    image: product2,
    category: "Nutrition",
    inStock: true,
  },
  {
    id: "prod-003",
    name: "Natural Skin Care Cream",
    description: "Enriched with Aloe Vera & Vitamin E for glowing, healthy skin. 100ml jar.",
    price: 799,
    image: product3,
    category: "Personal Care",
    inStock: true,
  },
  {
    id: "prod-004",
    name: "Omega-3 Fish Oil",
    description: "High-quality Omega-3 fatty acids for heart & brain health. 90 softgels.",
    price: 1499,
    image: product4,
    category: "Health Supplements",
    inStock: true,
  },
  {
    id: "prod-005",
    name: "Ayurvedic Hair Oil",
    description: "Traditional blend of Bhringraj, Amla & Brahmi for strong, healthy hair. 200ml bottle.",
    price: 599,
    image: product5,
    category: "Personal Care",
    inStock: true,
  },
  {
    id: "prod-006",
    name: "Weight Management Formula",
    description: "Natural metabolism support with Garcinia Cambogia & Green Tea Extract. 60 tablets.",
    price: 1699,
    image: product6,
    category: "Wellness",
    inStock: true,
  },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};
