import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Certificate } from "@/data/certificates";

interface CertificateCardProps {
  certificate: Certificate;
}

const CertificateCard = ({ certificate }: CertificateCardProps) => {
  const [isEnlarged, setIsEnlarged] = useState(false);

  return (
    <>
      <Card 
        className="group cursor-pointer overflow-hidden gradient-card border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
        onClick={() => setIsEnlarged(true)}
      >
        <div className="aspect-[3/4] overflow-hidden bg-secondary relative">
          <img
            src={certificate.image}
            alt={certificate.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center shadow-lg">
                <ZoomIn className="w-5 h-5 text-foreground" />
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-4 md:p-5">
          <h3 className="font-semibold text-foreground mb-2">{certificate.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{certificate.description}</p>
        </CardContent>
      </Card>

      {/* Enlarged Modal */}
      {isEnlarged && (
        <div 
          className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsEnlarged(false)}
        >
          <div className="relative max-w-3xl w-full max-h-[90vh] animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsEnlarged(false)}
              className="absolute -top-12 right-0 p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={certificate.image}
              alt={certificate.title}
              className="w-full h-auto rounded-lg shadow-prominent"
            />
            <div className="mt-4 text-center">
              <h3 className="font-semibold text-primary-foreground text-lg">{certificate.title}</h3>
              <p className="text-sm text-primary-foreground/70 mt-1">{certificate.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CertificateCard;
