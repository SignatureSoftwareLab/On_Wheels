import Footer from '@/components/Footer'
import Header from '@/components/Header'
//import { QuickLinkCard } from '@/components/QuickLinkCard'
//import { QuickLinkFilter } from '@/components/QuickLinkFilter'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'


const quickLinkCategories = [
  "Other Important Service",
  "Utility & Other Payments",
  "CSC Service",
  "Central Government Service",
  "Kerala Government Service",
  "Softwares & Others",
]

const quickLinksData = [
  {
    id: 1,
    category: "Other Important Service",
    title: "MG University",
    logo: `https://esahaye.in/storage/uploads/quicklinks_logo/1766561733_govt-logo.png`,
    link: "https://www.mgu.ac.in/home/",
  },
  {
    id: 2,
    category: "Other Important Service",
    title: "St. Paul's College",
    logo: "/logos/st-pauls.png",
    link: "/quick-links/st-pauls",
  },
  {
    id: 3,
    category: "Kerala Government Service",
    title: "APJ Abdul Kalam University",
    logo: "/logos/apj.png",
    link: "/quick-links/apj",
  },
  {
    id: 4,
    category: "Other Important Service",
    title: "Vidya Lakshmi Education Loan",
    logo: "/logos/vidya-lakshmi.png",
    link: "/quick-links/vidya-lakshmi",
  },
]




function QuickLinks() {

    const [searchQuery, setSearchQuery] = useState("")

    const [activeCategory, setActiveCategory] = useState("All")

    const filteredLinks = useMemo(() => {
        return quickLinksData.filter((item) => {
            const matchCategory =
                activeCategory === "All" || item.category === activeCategory

            const matchSearch =
                item.title.toLowerCase().includes(searchQuery.toLowerCase())

            return matchCategory && matchSearch
        })
    }, [searchQuery, activeCategory])

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

              {/* Filter Section */}
              <div className="flex flex-wrap gap-2">
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
              </div>

              {/* either use Filter component by passing data as props */}

              {/* Grid */}
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {filteredLinks.map((item) => (

                      <Card className="border-2 rounded-xl hover:shadow-md transition" key={item.id}>
                          <CardContent className="flex flex-col items-center justify-center py-8">
                              <img
                                  src={item.logo}
                                  alt={item.title}
                                  className="h-16 object-contain mb-4"
                              />

                              <h3 className="text-sm font-semibold text-center mb-4">
                                  {item.title}
                              </h3>

                              <Button asChild size="sm">
                                  <Link to={item.link} target="_blank" >View Details</Link>
                              </Button>
                          </CardContent>
                      </Card>

                    // either  use quick Card component here

                  ))}
              </div>

              {filteredLinks.length === 0 && (
                  <p className="text-center text-muted-foreground mt-10">
                      No links found
                  </p>
              )}

          </main>


          <Footer/>
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


