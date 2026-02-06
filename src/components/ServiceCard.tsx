import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, FileText, Home, ClipboardList, Shield, Wallet, Globe, Plane, Stamp, Icon } from "lucide-react";
import { useState } from "react";
import ServiceDetailsModal from "./ServiceDetailsModal";





type ColorVariant = "blue" | "teal" | "amber";

type Service = {
    id: string;
    service_id: string;
    description: string;
    added_date: string;
    status: string;
    amount: string;
    service_charge: string;
    billno: string;
    added_by: string;
    parent_id: string;
    processing_time: string;
    validity_of_certificate: string;
    processing_time_taken: string;
    documents: string[];
    service_name: string;
    parent_name: string;
    enc_id: string;

}


interface ServiceCardProps {
  service : Service;
  colorVariant?: ColorVariant;
  //onViewDetails?: () => void;
}


const colorStyles: Record<ColorVariant, { border: string; bg: string; icon: string; button: string }> = {
  blue: {
    border: "border-l-primary",
    bg: "bg-primary/10",
    icon: "text-primary",
    button: "bg-primary hover:bg-primary/90",
  },
  teal: {
    border: "border-l-[hsl(174,72%,43%)]",
    bg: "bg-[hsl(174,72%,95%)]",
    icon: "text-[hsl(174,72%,43%)]",
    button: "bg-[hsl(174,72%,43%)] hover:bg-[hsl(174,72%,38%)]",
  },
  amber: {
    border: "border-l-[hsl(38,92%,50%)]",
    bg: "bg-[hsl(38,92%,95%)]",
    icon: "text-[hsl(38,92%,50%)]",
    button: "bg-[hsl(38,92%,50%)] hover:bg-[hsl(38,92%,45%)]",
  },
};


const getCategoryIcon = (category: string) => {
  const iconMap: Record<string, typeof Users> = {
    "E - DISTRICT": FileText,
    "PASSPORT SEVA": Globe,
    "PAN CARD SERVICES": ClipboardList,
    "VOTER ID": Users,
    "INCOME TAX": Wallet,
    "GST SERVICES": Wallet,
    "LEGAL SERVICES": Shield,
    "TRAVEL AND TOURISM": Plane,
    "TRADE MARK": Stamp,
    "DIGITAL SIGNATURE": FileText,
    "PROPERTY": Home,
  };
  return iconMap[category] || FileText;
};




export const ServiceCard = ({ service, colorVariant = "blue", }: ServiceCardProps) => {

    //console.log("service" , service);

    //modal for viewdetails
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedService, setSelectedService] = useState<Service | null>(null)


    const styles = colorStyles[colorVariant];
    //const Icon = getCategoryIcon(service.category);


    const onViewDetails = (service: Service) => {
        console.log("clicked service", service);
        setSelectedService(service)        
        setIsModalOpen(true);
    }
    //console.log("selected service", selectedService);




    return (

        <>
            <Card className={`relative overflow-hidden border-l-4 ${styles.border} bg-gradient-to-br from-card to-muted/30 p-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                <div className="p-5">
                    {/* Icon and Category */}
                    <div className="flex items-start gap-4">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${styles.bg}`}>
                            <Globe className={`h-6 w-6 ${styles.icon}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className={`text-xs font-semibold uppercase tracking-wider ${styles.icon}`}>
                                {service.parent_name}
                            </span>
                            <h3 className="mt-1 text-base font-bold text-foreground leading-tight">
                                {service.service_name}
                            </h3>
                        </div>
                    </div>
    
                    {/* Description */}
                    <p className="mt-4 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {service.description}
                    </p>
    
                    {/* Button */}
                    <Button
                        onClick={()=>onViewDetails(service)}
                        className={`mt-5 gap-2 rounded-lg px-5 text-sm font-medium text-white ${styles.button}`}
                        size="sm"
                    >
                        View Details
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            </Card>
            
    
            <ServiceDetailsModal
            open={isModalOpen} 
            onClose={()=>{
                setIsModalOpen(false);
                setSelectedService(null)
            }}  
            service={selectedService}
              />
        </>

    );
};