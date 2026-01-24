import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="py-12 md:py-16 gradient-hero border-b border-border">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Products
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Premium Ayurvedic supplements and wellness products for a healthier you. All products are quality tested and GMP certified.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-secondary/50">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            <strong>Note:</strong> These products are dietary supplements and are not intended to diagnose, treat, cure, or prevent any disease. Please consult your healthcare provider before use.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
