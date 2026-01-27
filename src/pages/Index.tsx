import { Link } from "react-router-dom";
import { ArrowRight, Package, Users, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
//import ProductCard from "@/components/ProductCard";
//import AchieverCard from "@/components/AchieverCard";
import CertificateCard from "@/components/CertificateCard";
import { products } from "@/data/products";
import { achievers } from "@/data/achievers";
import { certificates } from "@/data/certificates";

const Index = () => {
  const featuredProducts = products.slice(0, 6);
  const topAchievers = achievers.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Slider */}
      <HeroSlider />

      {/* Features Section */}
      <section className="py-12 md:py-16 gradient-hero">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Package, title: "Premium Products", desc: "100% natural, quality tested" },
              { icon: Users, title: "Growing Community", desc: "50,000+ happy customers" },
              { icon: Shield, title: "Fully Compliant", desc: "GST registered, legal business" },
              { icon: Award, title: "Trusted Brand", desc: "ISO certified operations" },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-4 md:p-6 rounded-xl bg-card border border-border shadow-soft hover:shadow-medium transition-shadow text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 gradient-primary rounded-xl flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground text-sm md:text-base mb-1">{feature.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 md:py-20" id="products">
        <div className="container">
          <div className="text-center mb-10 md:mb-12">
            <span className="inline-block text-sm font-semibold text-primary bg-secondary px-4 py-1.5 rounded-full mb-4">
              Our Products
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Premium Health & Wellness Products
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our range of Ayurvedic supplements and personal care products, crafted with natural ingredients for your wellbeing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))} */}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/products">
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="py-16 md:py-20 bg-secondary/50" id="certificates">
        <div className="container">
          <div className="text-center mb-10 md:mb-12">
            <span className="inline-block text-sm font-semibold text-primary bg-card px-4 py-1.5 rounded-full mb-4">
              Trust & Compliance
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Business Certifications
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We operate with full transparency and legal compliance. Click on any certificate to view details.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {certificates.map((certificate) => (
              <CertificateCard key={certificate.id} certificate={certificate} />
            ))}
          </div>
        </div>
      </section>

      {/* Achievers Section */}
      <section className="py-16 md:py-20" id="achievers">
        <div className="container">
          <div className="text-center mb-10 md:mb-12">
            <span className="inline-block text-sm font-semibold text-primary bg-secondary px-4 py-1.5 rounded-full mb-4">
              Success Stories
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Top Achievers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated individuals who have built successful businesses through hard work and commitment.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {/* {topAchievers.map((achiever) => (
              <AchieverCard key={achiever.id} achiever={achiever} />
            ))} */}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/achievers">
                See All Achievers
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 gradient-primary">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Join our community of health-conscious individuals and explore premium products backed by trust and quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="gold" size="xl">
              <Link to="/register">Join Now</Link>
            </Button>
            <Button asChild variant="hero-outline" size="xl">
              <Link to="/products">Explore Products</Link>
            </Button>
          </div>
          <p className="text-xs text-primary-foreground/60 mt-6">
            * Individual results may vary. Success depends on effort and market conditions.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
