import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { ServiceCard } from '@/components/ServiceCard'
import { ServiceFilter } from '@/components/ServiceFilter'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { useMemo, useState } from 'react'



const serviceCategories = [
    "E - DISTRICT",
    "PASSPORT SEVA",
    "PAN CARD SERVICES",
    "VOTER ID",
    "INCOME TAX",
    "GST SERVICES",
    "LEGAL SERVICES",
    "PROPERTY",
    "HEALTH",
    //"WELFARE FUNDS"
    // if want more category add in this 
];



const servicesData = [
    {
        id: 1,
        category: "E - DISTRICT",
        title: "Community Certificate",
        description: "Get your community certificate for educational and employment purposes. Essential for reservations...",
        dd:"ഒരു പ്രത്യേക ജാതിയിൽ പെട്ടയാളാണ് ഒരാളെന്ന് തെളിയിക്കുന്ന ഒരു രേഖയാണ് കമ്മ്യൂണിറ്റി സർട്ടിഫിക്കറ്റ്, പ്രത്യേകിച്ച് ഇന്ത്യൻ ഭരണഘടനയിൽ വ്യക്തമാക്കിയിട്ടുള്ള 'പട്ടികജാതി', 'പട്ടികവർഗം', മറ്റ് പിന്നോക്ക വിഭാഗങ്ങൾ എന്നിവയിൽ പെട്ടയാളാണെങ്കിൽ. ഇത് പട്ടികജാതിക്കാർക്കും പട്ടികവർഗക്കാർക്കും മറ്റ് പൗരന്മാരെപ്പോലെ തന്നെ പുരോഗതി കൈവരിക്കുന്നതിന് പ്രത്യേക പ്രോത്സാഹനവും അവസരങ്ങളും നൽകും."
    },
    {
        id: 2,
        category: "E - DISTRICT",
        title: "One and Same Certificate",
        description: "Certify that different names in documents refer to the same person. Required for official records...",
    },
    {
        id: 3,
        category: "PROPERTY",
        title: "Possession Certificate",
        description: "Obtain legal proof of possession of property or land. Essential for property transactions...",
    },
    {
        id: 4,
        category: "E - DISTRICT",
        title: "Nativity Certificate",
        description: "Prove your native state for educational admissions and government job applications...",
    },
    {
        id: 5,
        category: "E - DISTRICT",
        title: "Income Certificate",
        description: "Official document certifying annual income for scholarships and government schemes...",
    },
    {
        id: 6,
        category: "E - DISTRICT",
        title: "Domicile Certificate",
        description: "Proof of permanent residence required for state-level benefits and admissions...",
    },
    {
        id: 7,
        category: "PASSPORT SEVA",
        title: "New Passport Application",
        description: "Apply for a fresh passport with complete documentation and police verification support...",
    },
    {
        id: 8,
        category: "PASSPORT SEVA",
        title: "Passport Renewal",
        description: "Renew your expired or expiring passport with hassle-free documentation assistance...",
    },
    {
        id: 9,
        category: "PAN CARD SERVICES",
        title: "New PAN Card",
        description: "Apply for a new Permanent Account Number card for tax and financial purposes...",
    },
    {
        id: 10,
        category: "PAN CARD SERVICES",
        title: "PAN Card Correction",
        description: "Update or correct details in your existing PAN card quickly and easily...",
    },
    {
        id: 11,
        category: "GST SERVICES",
        title: "GST Registration",
        description: "Register your business under Goods and Services Tax for compliance and input credits...",
    },
    {
        id: 12,
        category: "GST SERVICES",
        title: "GST Return Filing",
        description: "File your monthly, quarterly or annual GST returns accurately and on time...",
    },
    {
        id: 13,
        category: "LEGAL SERVICES",
        title: "Legal Consultation",
        description: "Get expert legal advice for civil, criminal, and corporate matters from experienced advocates...",
    },
    {
        id: 14,
        category: "INCOME TAX",
        title: "ITR Filing",
        description: "File your income tax returns with proper deductions and compliance checks...",
    },
    {
        id: 15,
        category: "VOTER ID",
        title: "New Voter ID",
        description: "Register as a voter and get your electoral photo identity card for elections...",
    },
    {
        id: 16,
        category: "PROPERTY",
        title: "Encumbrance Certificate",
        description: "Get EC to verify property is free from legal or monetary liabilities...",
    },
];




type ColorVariant = "blue" | "teal" | "amber";



const categoryColors: Record<string, ColorVariant> = {
    "E - DISTRICT": "blue",
    "PASSPORT SEVA": "teal",
    "PAN CARD SERVICES": "blue",
    "VOTER ID": "teal",
    "INCOME TAX": "amber",
    "GST SERVICES": "teal",
    "LEGAL SERVICES": "blue",
    "PROPERTY": "amber",
    "HEALTH": "teal",
};


function Services() {


    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All Services");

    const filteredServices = useMemo(() => {
        return servicesData.filter((service) => {
            const matchesCategory = activeFilter === "All Services" || service.category === activeFilter;
            const matchesSearch =
                searchQuery === "" ||
                service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeFilter, searchQuery]);
    // add servicesData if it came from api


    return (
        <>
            <div className="min-h-screen bg-background">
                <Header />


                {/* Hero */}
                <section className="py-10 md:py-15 gradient-hero border-border ">
                    <div className="container text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-foreground mb-4">
                            Government Services
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Access all government services from various departments in one place. Search and apply for certificates, registrations, and more.
                        </p>
                    </div>
                </section>




                {/* Main Content */}
                <main className="container py-8 mb-10">

                    {/* Search Bar */}
                    <div className="relative mb-8">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search for certificates, registrations, or services..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-12 rounded-xl border-border bg-card pl-12 text-base shadow-sm focus-visible:ring-primary"
                        />
                    </div>

                    {/* Filter Section */}
                    <div className="mb-6">
                        <p className="mb-3 text-sm font-medium text-muted-foreground">Filter by Category</p>
                        <ServiceFilter
                            categories={serviceCategories}
                            activeFilter={activeFilter}
                            onFilterChange={setActiveFilter}
                        />
                    </div>

                    {/* Results Count */}
                    <p className="mb-6 text-sm text-muted-foreground">
                        Showing <span className="font-semibold text-foreground">{filteredServices.length}</span> services
                    </p>

                    {/* Service Cards Grid */}
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredServices.map((service) => (
                            <ServiceCard
                                key={service.id}
                                //title={service.title}
                                //description={service.description}
                                //category={service.category}
                                service={service}
                                colorVariant={categoryColors[service.category] || "blue"}
                            />
                        ))}
                    </div>

                    {filteredServices.length === 0 && (
                        <div className="mt-12 text-center">
                            <p className="text-lg text-muted-foreground">No services found for your search.</p>
                            <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters or search term.</p>
                        </div>
                    )}
                </main>



                <Footer />

            </div>
        </>
    )
}

export default Services