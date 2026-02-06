import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { ServiceCard } from '@/components/ServiceCard'
import { ServiceFilter } from '@/components/ServiceFilter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { API_URL } from '@/config/api'
import { useUser } from '@/context/UserContext'
import { Search } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'

type Category = {
    id: string;
    service_name: string;
    enc_id: string;
}



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



type ColorVariant = "blue" | "teal" | "amber";




function Services() {

    const {username , ready } = useUser();
    console.log("username" , username);
    

    // Add a search mode state (this state is for if search option is divided to category and service also)
    //type SearchMode = 'services' | 'categories';
    //const [searchMode, setSearchMode] = useState<SearchMode>('services');

    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<string>("");
    const [loading, setLoading] = useState(true)

    const [infoMessage, setInfoMessage] = useState<string>("Please select a category")



    // state to store service category
    const [serviceCategories, setServiceCategories] = useState<Category[]>([])

    // state to store all servicedata
    const [servicesData, setServicesData] = useState<Service[]>([])

    const [categoriesPerPage, setCategoriesPerPage] = useState(8);


    const [categoryPage, setCategoryPage] = useState(1);

    const totalCategoryPages = Math.ceil(
        serviceCategories.length / categoriesPerPage
    );


    const paginatedCategories = useMemo(() => {
        const start = (categoryPage - 1) * categoriesPerPage;
        const end = start + categoriesPerPage;
        return serviceCategories.slice(start, end);
    }, [serviceCategories, categoryPage, categoriesPerPage]);





    const getColorByParentId = (parentId: string): ColorVariant => {
        const id = Number(parentId);
        if (isNaN(id)) return "blue";

        if (id % 3 === 0) return "blue";
        if (id % 2 === 0) return "teal";
        return "amber";
    }


    // fetch all service category  -- this fetch category is work based on the user_name data in it
    const fetchAllCategory = async (user: string) => {

        if (!ready) return;

        setLoading(true);
        setServicesData([]);
        setServiceCategories([]);

        try {
            const response = await fetch(
                `${API_URL}/home/parent_service_details`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ user_name: user }),
                }
            );

            const data = await response.json();

            if (data?.success && data.data.length > 0) {
                setServiceCategories(data.data);
                const firstCategory = data.data[0];
                setActiveFilter(firstCategory.service_name);


                fetchAllServicesData(firstCategory.enc_id, user);
                setInfoMessage("");
            } else {
                setInfoMessage("User does not exist");
            }
        } catch (error) {
            console.error(error);
            setInfoMessage("Something went wrong");
        } finally {
            setLoading(false);
        }
    };




    useEffect(() => {
        if (!ready) return; //  stop premature calls
        fetchAllCategory(username)
    }, [username , ready]) 
    // give username and ckeck the data 





    // fetch all services data

    const fetchAllServicesData = async (encId: string, user: string) => {
        
        if (!ready) return;

        setLoading(true)
        try {
            const response = await fetch(
                `${API_URL}/home/sub_service_details`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        parent_id: encId,
                        user_name: user,
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message || 'Unknown error'}`);
            }

            const data = await response.json();
            if (data?.success) {
                setServicesData(data.data || []);
            }
            else {
                console.error("API Error. Unknown Error!");
            }
        } catch (error) {
            console.error("Error Fetching Data", error);
        } finally {
            setLoading(false)
        }
    };


    

    // category click
    const handleCategoryClick = (category: Category) => {

        setActiveFilter(category.service_name);
        setServicesData([]);
        setLoading(true);
        fetchAllServicesData(category.enc_id , username || "");
        setInfoMessage("")

    };


    //     // Then modify your filteredCategories logic
    // const filteredCategories = useMemo(() => {
    //     if (searchMode === 'categories' && searchQuery.trim()) {
    //         return serviceCategories.filter((category) =>
    //             category.service_name.toLowerCase().includes(searchQuery.toLowerCase())
    //         );
    //     }
    //     return serviceCategories;
    // }, [serviceCategories, searchQuery, searchMode]);

    // // And modify filteredServices
    // const filteredServices = useMemo(() => {
    //     if (searchMode === 'services') {
    //         return servicesData.filter((service) =>
    //             service.service_name.toLowerCase().includes(searchQuery.toLowerCase())
    //         );
    //     }
    //     return servicesData;
    // }, [servicesData, searchQuery, searchMode]);



    const filteredServices = useMemo(() => {

        return servicesData.filter((service) =>
            service.service_name.toLowerCase().includes(searchQuery.toLowerCase()))

    }, [servicesData, searchQuery])




    const handleReset = () => {
        if (serviceCategories.length > 0) {
            const firstCategory = serviceCategories[0];
            setCategoryPage(1);
            setSearchQuery("");
            setActiveFilter(firstCategory.service_name);
            fetchAllServicesData(firstCategory.enc_id , username || "");
            setInfoMessage("");
        }
    };




    const PageLoader = () => (
        <div className="flex items-center justify-center min-h-[300px]">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
        </div>
    );



    // const filteredServices = useMemo(() => {
    //     return servicesData.filter((service) => {
    //         const matchesCategory = activeFilter === "All Services" || service.category === activeFilter;
    //         const matchesSearch =
    //             searchQuery === "" ||
    //             service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //             service.description.toLowerCase().includes(searchQuery.toLowerCase());
    //         return matchesCategory && matchesSearch;
    //     });
    // }, [activeFilter, searchQuery]);
    // // add servicesData if it came from api


    return (
        <>
            <div className="min-h-screen bg-background">
                <Header />


                {/* Hero */}
                <section className="py-10 md:py-15 gradient-hero border-border ">
                    <div className="container text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-foreground mb-4">
                            Services
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Access all services from various departments in one place. Search and apply for certificates, registrations, and more.
                        </p>
                    </div>
                </section>




                {/* Main Content */}
                <main className="container py-8 mb-10">

                    {/* Search Bar + Reset */}
                    <div className="flex gap-3 items-center mb-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search for services..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-12 rounded-xl border-border bg-card pl-12 text-base shadow-sm focus-visible:ring-primary"
                            />
                        </div>

                        <Button
                            onClick={handleReset}
                            variant="destructive"
                            className="h-12 rounded-xl px-6 hover:bg-red-100 hover:text-red-700"

                        >
                            Reset
                        </Button>
                    </div>


                    {/* Modify your search section */}
                    {/* <div className="flex gap-3 items-center mb-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                            
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                                <Button
                                    type="button"
                                    variant={searchMode === 'services' ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSearchMode('services')}
                                    className="h-6 text-xs"
                                >
                                    Services
                                </Button>
                                <Button
                                    type="button"
                                    variant={searchMode === 'categories' ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSearchMode('categories')}
                                    className="h-6 text-xs"
                                >
                                    Categories
                                </Button>
                            </div>

                            <Input
                                type="text"
                                placeholder={searchMode === 'services' ? "Search for services..." : "Search for categories..."}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-12 rounded-xl border-border bg-card pl-12 pr-40 text-base shadow-sm focus-visible:ring-primary"
                            />
                        </div>

                        <Button
                            onClick={handleReset}
                            variant="destructive"
                            className="h-12 rounded-xl px-6 hover:bg-red-100 hover:text-red-700"
                        >
                            Reset
                        </Button>
                    </div> */}


                    {/* Filter Section */}

                    {paginatedCategories.length == 0 && (
                        <div className="mt-12 text-center">
                            <p className="text-lg text-muted-foreground">
                                No services found.
                            </p>                           
                        </div>
                    )}

                    { paginatedCategories.length > 0 && (  
                    <div className="mb-6">
                        <p className="mb-3 text-sm font-medium text-muted-foreground">
                            Filter by Category
                        </p>

                        <div className="flex items-center justify-between mb-4">
                            {/* Show Entries */}
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>Show</span>

                                <select
                                    value={categoriesPerPage}
                                    onChange={(e) => {
                                        setCategoriesPerPage(Number(e.target.value));
                                        setCategoryPage(1); // reset pagination
                                    }}
                                    className="rounded-md border border-border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                >
                                    <option value={5}>5</option>
                                    <option value={8}>8</option>
                                    <option value={12}>12</option>
                                    <option value={20}>20</option>
                                </select>

                                <span>entries</span>
                            </div>
                        </div>


                        {/* Category Buttons */}
                        <div className="flex flex-wrap gap-2 mb-4">

                            {/* Paginated Categories */}
                            {paginatedCategories.map((category) => (
                                <Button
                                    key={category.id}
                                    onClick={() => handleCategoryClick(category)}
                                    variant={activeFilter === category.service_name ? "hero" : "secondary"}
                                    className="rounded-full px-4 py-2 text-sm shadow-xl border transition"
                                >
                                    {category.service_name}
                                </Button>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalCategoryPages > 1 && (
                            <div className="flex items-center justify-end gap-3 mt-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    disabled={categoryPage === 1}
                                    onClick={() => setCategoryPage((p) => Math.max(p - 1, 1))}
                                >
                                    Previous
                                </Button>

                                <span className="text-sm text-muted-foreground">
                                    Page <span className="font-medium text-foreground">{categoryPage}</span>{" "}
                                    of {totalCategoryPages}
                                </span>

                                <Button
                                    size="sm"
                                    variant="outline"
                                    disabled={categoryPage === totalCategoryPages}
                                    onClick={() =>
                                        setCategoryPage((p) => Math.min(p + 1, totalCategoryPages))
                                    }
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </div> 
                )}

                    {/* Results Count */}
                    
                    {loading && <PageLoader />}

                    {!loading && !infoMessage && (
                        <>
                            <p className="mb-6 text-sm text-muted-foreground">
                                Showing <span className="font-semibold text-foreground">
                                    {filteredServices.length}
                                </span> services
                            </p>

                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredServices.map((service) => (
                                    <ServiceCard
                                        key={service.id}
                                        service={service}
                                        colorVariant={getColorByParentId(service.parent_id)}
                                    />
                                ))}
                            </div>

                            {filteredServices.length === 0 && (
                                <div className="mt-12 text-center">
                                    <p className="text-lg text-muted-foreground">
                                        No services found for your search.
                                    </p>
                                    <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters or search term.</p>
                                </div>
                            )}
                        </>
                    )}

                    {!loading && infoMessage && (
                        <div className="my-10 text-center">
                            <p className="text-lg font-medium text-muted-foreground">
                                {infoMessage}
                            </p>
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











// import Footer from '@/components/Footer'
// import Header from '@/components/Header'
// import { ServiceCard } from '@/components/ServiceCard'
// import { ServiceFilter } from '@/components/ServiceFilter'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { API_URL } from '@/config/api'
// import { Search } from 'lucide-react'
// import React, { useEffect, useMemo, useState } from 'react'

// type Category = {
//     id: string;
//     service_name: string;
//     enc_id: string;
// }



// type Service = {
//     id: string;
//     service_id: string;
//     description: string;
//     added_date: string;
//     status: string;
//     amount: string;
//     service_charge: string;
//     billno: string;
//     added_by: string;
//     parent_id: string;
//     processing_time: string;
//     validity_of_certificate: string;
//     processing_time_taken: string;
//     documents: string[];
//     service_name: string;
//     parent_name: string;
//     enc_id: string;

// }



// type ColorVariant = "blue" | "teal" | "amber";




// function Services() {


//     const [searchQuery, setSearchQuery] = useState("");
//     const [activeFilter, setActiveFilter] = useState("All Services");
//     const [loading, setLoading] = useState(true)

//     const [infoMessage, setInfoMessage] = useState<string>("Please select a category")



//     // state to store service category
//     const [serviceCategories, setServiceCategories] = useState<Category[]>([])

//     // state to store all servicedata
//     const [servicesData, setServicesData] = useState<Service[]>([])

//     const CATEGORIES_PER_PAGE = 8;

//     const [categoryPage, setCategoryPage] = useState(1);

//     const totalCategoryPages = Math.ceil(
//         serviceCategories.length / CATEGORIES_PER_PAGE
//     );

//     const paginatedCategories = useMemo(() => {
//         const start = (categoryPage - 1) * CATEGORIES_PER_PAGE;
//         const end = start + CATEGORIES_PER_PAGE;
//         return serviceCategories.slice(start, end);
//     }, [serviceCategories, categoryPage]);




//     const getColorByParentId = (parentId: string): ColorVariant => {
//         const id = Number(parentId);
//         if (isNaN(id)) return "blue";

//         if (id % 3 === 0) return "blue";
//         if (id % 2 === 0) return "teal";
//         return "amber";
//     }


//     // fetch all service category  -- this fetch category is work based on the user_name data in it
//     const fetchAllCategory = async () => {
//         try {

//             const response = await fetch(`${API_URL}/home/parent_service_details`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ user_name: "9497554401" })
//             });

//             console.log("response", response);

//             if (!response.ok) {
//                 const errorData = await response.json();

//                 throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message || 'Unknown error'}`);
//             }

//             const data = await response.json();
//             console.log("category data", data);

//             if (data?.success) {
//                 setServiceCategories(data.data || []);
//                 setCategoryPage(1);
//             }
//             else {
//                 console.error("API Error. Unknown Error!");
//             }
//         } catch (error) {
//             console.error("Error Fetching Data", error);

//         } finally {
//             setTimeout(() => setLoading(false), 300)
//         }
//     };

//     useEffect(() => {
//         fetchAllCategory()
//     }, [])





//     // fetch all services data
//     const fetchAllServicesData = async (encId: string) => {
//         try {

//             const response = await fetch(`${API_URL}/home/sub_service_details`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ parent_id: encId }),
//             });

//             console.log("response of service data", response);

//             if (!response.ok) {
//                 const errorData = await response.json();

//                 throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message || 'Unknown error'}`);
//             }

//             const data = await response.json();
//             console.log("service data", data);

//             if (data?.success) {
//                 setServicesData(data.data || [])
//             }
//             else {
//                 console.error("API Error. Unknown Error!");
//             }

//         } catch (error) {
//             console.error("Error Fetching Data", error);

//         } finally {
//             setLoading(false)
//         }
//     };




//     // category click
//     const handleCategoryClick = (category: Category | "ALL") => {

//         if (category === "ALL") {
//             setCategoryPage(1);
//             setActiveFilter("All Services");
//             setServicesData([]);

//             setInfoMessage("Please Select A Category");
//             return

//         } else {
//             setActiveFilter(category.service_name);
//             setServicesData([]);

//             fetchAllServicesData(category.enc_id);
//             setInfoMessage("")
//         }

//     };




//     const filteredServices = useMemo(() => {

//         return servicesData.filter((service) =>
//             service.service_name.toLowerCase().includes(searchQuery.toLowerCase()))

//     }, [servicesData, searchQuery])

//     const handleReset = () => {
//         setCategoryPage(1);
//         setSearchQuery("");
//         setActiveFilter("All Services");
//         setServicesData([]);
//         setInfoMessage("Please select a category");
//     };




//     // const filteredServices = useMemo(() => {
//     //     return servicesData.filter((service) => {
//     //         const matchesCategory = activeFilter === "All Services" || service.category === activeFilter;
//     //         const matchesSearch =
//     //             searchQuery === "" ||
//     //             service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     //             service.description.toLowerCase().includes(searchQuery.toLowerCase());
//     //         return matchesCategory && matchesSearch;
//     //     });
//     // }, [activeFilter, searchQuery]);
//     // // add servicesData if it came from api


//     return (
//         <>
//             <div className="min-h-screen bg-background">
//                 <Header />


//                 {/* Hero */}
//                 <section className="py-10 md:py-15 gradient-hero border-border ">
//                     <div className="container text-center">
//                         <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-foreground mb-4">
//                             Services
//                         </h1>
//                         <p className="text-muted-foreground max-w-2xl mx-auto">
//                             Access all services from various departments in one place. Search and apply for certificates, registrations, and more.
//                         </p>
//                     </div>
//                 </section>




//                 {/* Main Content */}
//                 <main className="container py-8 mb-10">

//                     {/* Search Bar + Reset */}
//                     <div className="flex gap-3 items-center mb-8">
//                         <div className="relative flex-1">
//                             <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
//                             <Input
//                                 type="text"
//                                 placeholder="Search for services..."
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="h-12 rounded-xl border-border bg-card pl-12 text-base shadow-sm focus-visible:ring-primary"
//                             />
//                         </div>

//                         <Button
//                             onClick={handleReset}
//                             variant="destructive"
//                             className="h-12 rounded-xl px-6 hover:bg-red-100 hover:text-red-700"
//                             disabled={
//                                 searchQuery === "" &&
//                                 activeFilter === "All Services" &&
//                                 servicesData.length === 0
//                             }
//                         >
//                             Reset
//                         </Button>
//                     </div>


//                     {/* Filter Section */}
//                     <div className="mb-6">
//                         <p className="mb-3 text-sm font-medium text-muted-foreground">
//                             Filter by Category
//                         </p>

//                         {/* Category Buttons */}
//                         <div className="flex flex-wrap gap-2 mb-4">
//                             {/* All Services */}
//                             <Button
//                                 onClick={() => handleCategoryClick("ALL")}
//                                 variant={activeFilter === "All Services" ? "hero" : "outline"}
//                                 className="rounded-full px-4 py-2 text-sm shadow-md"
//                             >
//                                 All Services
//                             </Button>

//                             {/* Paginated Categories */}
//                             {paginatedCategories.map((category) => (
//                                 <Button
//                                     key={category.id}
//                                     onClick={() => handleCategoryClick(category)}
//                                     variant={activeFilter === category.service_name ? "hero" : "secondary"}
//                                     className="rounded-full px-4 py-2 text-sm shadow-md"
//                                 >
//                                     {category.service_name}
//                                 </Button>
//                             ))}
//                         </div>

//                         {/* Pagination Controls */}
//                         {totalCategoryPages > 1 && (
//                             <div className="flex items-center justify-end gap-3 mt-2">
//                                 <Button
//                                     size="sm"
//                                     variant="outline"
//                                     disabled={categoryPage === 1}
//                                     onClick={() => setCategoryPage((p) => Math.max(p - 1, 1))}
//                                 >
//                                     Previous
//                                 </Button>

//                                 <span className="text-sm text-muted-foreground">
//                                     Page <span className="font-medium text-foreground">{categoryPage}</span>{" "}
//                                     of {totalCategoryPages}
//                                 </span>

//                                 <Button
//                                     size="sm"
//                                     variant="outline"
//                                     disabled={categoryPage === totalCategoryPages}
//                                     onClick={() =>
//                                         setCategoryPage((p) => Math.min(p + 1, totalCategoryPages))
//                                     }
//                                 >
//                                     Next
//                                 </Button>
//                             </div>
//                         )}
//                     </div>


//                     {/* Results Count */}
//                     {!infoMessage && (
//                         <>
//                             <p className="mb-6 text-sm text-muted-foreground">
//                                 Showing <span className="font-semibold text-foreground">{filteredServices.length}</span> services
//                             </p>


//                             {/* Service Cards Grid */}
//                             <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
//                                 {filteredServices.map((service) => (
//                                     <ServiceCard
//                                         key={service.id}
//                                         service={service}
//                                         colorVariant={getColorByParentId(service.parent_id)}
//                                     />
//                                 ))}
//                             </div>

//                             {filteredServices.length === 0 && (
//                                 <div className="mt-12 text-center">
//                                     <p className="text-lg text-muted-foreground">No services found for your search.</p>
//                                     <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters or search term.</p>
//                                 </div>
//                             )}
//                         </>
//                     )}


//                     {infoMessage && (

//                         <div className="my-12 text-center">
//                             <p className="text-lg font-medium text-muted-foreground">
//                                 {infoMessage}
//                             </p>
//                             <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters or search term.</p>
//                         </div>
//                     )}
//                 </main>



//                 <Footer />

//             </div>
//         </>
//     )
// }

// export default Services