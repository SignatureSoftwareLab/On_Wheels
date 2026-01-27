import { cn } from "@/lib/utils";
import { Button } from "./ui/button";



interface ServiceFilterProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (category: string) => void;
}




export const ServiceFilter = ({  categories, activeFilter, onFilterChange, }: ServiceFilterProps) => {


  return (

    <div className="flex flex-wrap gap-2">

      <Button
        onClick={() => onFilterChange("All Services")}        
        variant={activeFilter === "All Services" ? "hero" : "outline" }
        className="rounded-full px-4 py-2 text-sm  transition-all duration-200 shadow-xl bg-muted/100"
      >
        All Services
      </Button>

      {categories.map((category) => (
          <Button
            key={category}
            onClick={() => onFilterChange(category)}
            variant={activeFilter === category ? "hero" : "secondary"}
            className="rounded-full px-4 py-2 text-sm  transition-all duration-200 shadow-xl bg-muted"

        >
            {category}
        </Button>
      ))}
    </div>
  );
};


//variant="ghost"