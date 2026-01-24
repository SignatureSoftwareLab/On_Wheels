import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AchieverCard from "@/components/AchieverCard";
import { achievers } from "@/data/achievers";

const Achievers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="py-12 md:py-16 gradient-hero border-b border-border">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Top Achievers
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet the inspiring individuals who have built successful businesses through dedication, hard work, and commitment to our products.
          </p>
        </div>
      </section>

      {/* Achievers Grid */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {achievers.map((achiever) => (
              <AchieverCard key={achiever.id} achiever={achiever} />
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-secondary/50">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> The achievements shown are based on individual effort and dedication. Results may vary. We do not guarantee any specific income or success levels. Past performance does not guarantee future results.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Achievers;
