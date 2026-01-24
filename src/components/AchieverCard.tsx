import { Award, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Achiever } from "@/data/achievers";

interface AchieverCardProps {
  achiever: Achiever;
}

const AchieverCard = ({ achiever }: AchieverCardProps) => {
  return (
    <Card className="group overflow-hidden gradient-card border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-square overflow-hidden bg-secondary relative">
        <img
          src={achiever.image}
          alt={achiever.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold bg-foreground/50 px-3 py-1 rounded-full backdrop-blur-sm">
            <Award className="w-3 h-3" />
            {achiever.rank}
          </span>
        </div>
      </div>
      <CardContent className="p-4 md:p-5 text-center">
        <h3 className="font-semibold text-foreground mb-1">{achiever.name}</h3>
        <p className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-2">
          <MapPin className="w-3 h-3" />
          {achiever.city}
        </p>
        <div className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
          {achiever.achievement}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchieverCard;
