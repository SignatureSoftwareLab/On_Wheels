import Footer from '@/components/Footer'
import Header from '@/components/Header'
//import { QuickLinkCard } from '@/components/QuickLinkCard'
//import { QuickLinkFilter } from '@/components/QuickLinkFilter'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { API_URL, imgUrl } from '@/config/api'
import { useUser } from '@/context/UserContext'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'


const quickLinkCategories = [
  "Other Important Service",
  "Utility & Other Payments",
  "CSC Service",
  "Central Government Service",
  "Kerala Government Service",
  "Softwares & Others",
]

type Link = {
    id: string;
    branch_id: string;
    name: string;
    link: string;
    image: string;
    status: string;
    created_date: string;
    enc_id: string;
    image1: string;
}




function QuickLinks() {

    const { username, ready } = useUser();

    const [searchQuery, setSearchQuery] = useState("")

    //const [activeCategory, setActiveCategory] = useState("All");

    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(8);

    // state for quick links
    const [quickLinksData, setQuickLinksData] = useState<Link[]>([]);
    const [filteredquickLinks, setFilteredquickLinks] = useState<Link[]>([]);


    // fetch all quick link data
    const fetchAllQuickLinks = async (user: string) => {

        if (!ready) return;

        try {
            const response = await fetch(`${API_URL}/home/quicklink_service`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_name: user })
            });

            console.log("response", response);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message || 'Unknown error'}`);
            }

            const data = await response.json();
            console.log(data);

            if (data.success) {
                setQuickLinksData(data.data || []);
                setFilteredquickLinks(data.data || []);
            } else {
                console.error("API Error.Unknown Error!");
            }
        } catch (error) {
            console.error("Error fetching Data", error);
        }
    };


    useEffect(() => {
        if (!ready) return;
        fetchAllQuickLinks(username);
    }, [username, ready]);


    useEffect(() => {
        if (!quickLinksData.length) return;

        const filtered = quickLinksData.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredquickLinks(filtered);
        setCurrentPage(1); // Reset to first page when searching
    }, [searchQuery, quickLinksData]);




    // Pagination handlers
    const goToFirstPage = () => setCurrentPage(1);
    const goToLastPage = () => setCurrentPage(totalPages);
    const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

    // Generate page numbers to display
    const getPageNumbers = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        range.forEach((i) => {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        });

        return rangeWithDots;
    };


    const totalEntries = filteredquickLinks.length;
    const totalPages = Math.ceil(totalEntries / entriesPerPage);

    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;

    const currentData = filteredquickLinks.slice(startIndex, endIndex);






    // const filteredLinks = useMemo(() => {
    //     return quickLinksData.filter((item) => {
    //         const matchCategory =
    //             activeCategory === "All" || item.category === activeCategory

    //         const matchSearch =
    //             item.title.toLowerCase().includes(searchQuery.toLowerCase())

    //         return matchCategory && matchSearch
    //     })
    // }, [searchQuery, activeCategory])

    // quickLinksData added in the dependency if data comes from api



    return (


        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero */}
            <section className="py-10 md:py-15 gradient-hero border-border ">
                <div className="container text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-foreground mb-4">
                        Quick Links
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Added links of various departments are available in esahaye. You can search below to know more about each Forms.
                    </p>
                </div>
            </section>

            <main className="container py-8 mb-10">

                {/* Search Bar */}
                <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search Here For Links..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-12 rounded-xl border-border bg-card pl-12 text-base shadow-sm focus-visible:ring-primary"
                    />
                </div>


                {/* Results count and entries per page selector */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                    <p className="text-sm text-muted-foreground">
                        Showing <span className="font-medium">{totalEntries > 0 ? startIndex + 1 : 0}</span> to{' '}
                        <span className="font-medium">{Math.min(endIndex, totalEntries)}</span> of{' '}
                        <span className="font-medium">{totalEntries}</span> results
                    </p>

                    <div className="flex items-center gap-2">
                        <label htmlFor="entries" className="text-sm text-muted-foreground">
                            Show:
                        </label>
                        <select
                            id="entries"
                            value={entriesPerPage}
                            onChange={(e) => {
                                setEntriesPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="h-8 w-16 rounded-md border border-input bg-background px-2 text-sm"
                        >
                            <option value={4}>4</option>
                            <option value={8}>8</option>
                            <option value={12}>12</option>
                            <option value={16}>16</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                </div>

                {/* Filter Section */}
                {/* <div className="flex flex-wrap gap-2">
                  {["All", ...quickLinkCategories].map((cat) => (

                      <Button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          variant={activeCategory === cat ? "hero" : "secondary"}
                          className="px-4 py-1.5 rounded-full text-sm border transition shadow-xl "
                      >
                          {cat}
                      </Button>
                  ))}
              </div> */}

                {/* either use Filter component by passing data as props */}

                {/* Grid */}
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {currentData.map((item) => (

                        <Card className="border rounded-xl hover:shadow-md transition" key={item.id}>
                            <CardContent className="flex flex-col items-center justify-center py-8">

                                <img
                                    src={`${imgUrl}/assets/images/online_service/${item.image}`}
                                    alt={item.name}
                                    className="h-20 object-contain mb-4 border"
                                />

                                <h3 className="text-sm font-semibold text-center mb-4">
                                    {item.name}
                                </h3>

                                <Button asChild size="sm">
                                    <Link to={item.link} target="_blank" >View Details</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        // either  use quick Card component here

                    ))}
                </div>

                {currentData.length === 0 && (
                    <p className="text-center text-muted-foreground mt-10">
                        No links found
                    </p>
                )}


                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex flex-col items-center gap-4 mt-8">
                        {/* Mobile pagination */}
                        <div className="flex sm:hidden items-center gap-2">
                            <Button variant="outline" size="sm" onClick={goToPreviousPage} disabled={currentPage === 1}>
                                Previous
                            </Button>
                            <span className="text-sm">Page {currentPage} of {totalPages}</span>
                            <Button variant="outline" size="sm" onClick={goToNextPage} disabled={currentPage === totalPages}>
                                Next
                            </Button>
                        </div>

                        {/* Desktop pagination */}
                        <div className="hidden sm:flex items-center gap-2">
                            <Button variant="outline" size="icon" onClick={goToFirstPage} disabled={currentPage === 1} className="h-8 w-8">
                                <ChevronsLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={goToPreviousPage} disabled={currentPage === 1} className="h-8 w-8">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>

                            <div className="flex gap-1">
                                {getPageNumbers().map((page, index) => (
                                    <React.Fragment key={index}>
                                        {page === '...' ? (
                                            <span className="px-3 py-1 text-muted-foreground">...</span>
                                        ) : (
                                            <Button
                                                variant={currentPage === page ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setCurrentPage(Number(page))}
                                                className="h-8 w-8"
                                            >
                                                {page}
                                            </Button>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            <Button variant="outline" size="icon" onClick={goToNextPage} disabled={currentPage === totalPages} className="h-8 w-8">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={goToLastPage} disabled={currentPage === totalPages} className="h-8 w-8">
                                <ChevronsRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}

            </main>


            <Footer />
        </div>

    )
}

export default QuickLinks






{/* either use Filter component by passing data as props */}

{/* <QuickLinkFilter
    categories={quickLinkCategories}
    active={activeCategory}
    onChange={setActiveCategory}
     /> */}

//----------filter component------- 

// import { Button } from "./ui/button"

// type Props = {
//   categories: string[]
//   active: string
//   onChange: (value: string) => void
// }

// export const QuickLinkFilter = ({ categories, active, onChange }: Props) => {



//   return (

//     <div className="flex flex-wrap gap-2">
//       {["All", ...categories].map((cat) => (

//         <Button
//           key={cat}
//           onClick={() => onChange(cat)}
//           variant={active === cat ? "hero" : "secondary" }
//           className="px-4 py-1.5 rounded-full text-sm border transition shadow-xl "
//         >
//           {cat}
//         </Button>
//       ))}
//     </div>
//   )
// }



//----------link card component ---------
//   <QuickLinkCard
//       key={item.id}
//       linkData={item}
//   />

//------------card component------

// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Link } from "react-router-dom"


// type LinkData = {
//     id: number;
//     category: string;
//     title: string;
//     logo: string;
//     link: string;
// }


// type Props = {
//     linkData: LinkData | null;
// }

// export const QuickLinkCard = ({ linkData}: Props) => {

//   return (

//     <Card className="border-2 rounded-xl hover:shadow-md transition">
//       <CardContent className="flex flex-col items-center justify-center py-8">
//         <img
//           src={linkData.logo}
//           alt={linkData.title}
//           className="h-16 object-contain mb-4"
//         />

//         <h3 className="text-sm font-semibold text-center mb-4">
//           {linkData.title}
//         </h3>

//         <Button asChild size="sm">
//           <Link to={linkData.link} target="_blank" >View Details</Link>
//         </Button>
//       </CardContent>
//     </Card>
//   )
// }


