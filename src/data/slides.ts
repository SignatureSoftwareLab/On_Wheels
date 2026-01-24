import heroBg1 from "@/assets/hero-bg-1.jpg";
import heroBg2 from "@/assets/hero-bg-2.jpg";
import heroBg3 from "@/assets/hero-bg-3.jpg";
import heroBg4 from "@/assets/hero-bg-4.jpg";

export interface Slide {
  id: string;
  headline: string;
  subtext: string;
  image: string;
  ctaPrimary: {
    text: string;
    href: string;
  };
  ctaSecondary: {
    text: string;
    href: string;
  };
}

export const slides: Slide[] = [
  {
    id: "slide-1",
    headline: "Transform Your Health, Transform Your Life",
    subtext: "Discover premium Ayurvedic products backed by science and tradition. Join thousands of satisfied customers across India.",
    image: heroBg1,
    ctaPrimary: { text: "Join Now", href: "/register" },
    ctaSecondary: { text: "View Products", href: "/products" },
  },
  {
    id: "slide-2",
    headline: "Quality Products You Can Trust",
    subtext: "100% natural ingredients, GMP-certified manufacturing, and rigorous quality testing for every product we offer.",
    image: heroBg2,
    ctaPrimary: { text: "Shop Now", href: "/products" },
    ctaSecondary: { text: "Learn More", href: "#about" },
  },
  {
    id: "slide-3",
    headline: "Wellness for the Whole Family",
    subtext: "From immunity boosters to personal care, we have products for every member of your family's health journey.",
    image: heroBg3,
    ctaPrimary: { text: "Explore Products", href: "/products" },
    ctaSecondary: { text: "Join Us", href: "/register" },
  },
  {
    id: "slide-4",
    headline: "Build Your Business with Confidence",
    subtext: "Partner with a company that values transparency, compliance, and your success. Product-first approach with genuine opportunities.",
    image: heroBg4,
    ctaPrimary: { text: "Become a Partner", href: "/register" },
    ctaSecondary: { text: "Our Achievers", href: "/achievers" },
  },
];
