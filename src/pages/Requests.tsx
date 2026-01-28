import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table } from '@/components/ui/table'
import { ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react'
import React from 'react'





function Requests() {





  return (

      <div className="min-h-screen bg-background">
          <Header />


          {/* Hero */}
          <section className="py-10 md:py-15 gradient-hero border-border ">
              <div className="container text-center">
                  <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-foreground mb-4">
                      My Requested Services
                  </h1>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                      Access services from various departments in one place.
                  </p>
              </div>
          </section>


          <main className="container py-8 mb-10">

              {/* ================= FILTER SECTION ================= */}


              <div className="bg-white rounded-md border mb-20">
                  <div className="p-6 border-b">
                      <div className="flex items-center gap-2 mb-4">
                          <Filter className="h-5 w-5 text-muted-foreground" />
                          <h2 className="text-lg font-semibold">Filter By</h2>
                      </div>

                      {/* Inputs */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                              <Label>Acknowledgement No.</Label>
                              <Input placeholder="Acknowledgement No." />
                          </div>

                          <div>
                              <Label>Customer Name</Label>
                              <Input placeholder="Customer Name" />
                          </div>

                          <div>
                              <Label>Service Name</Label>
                              <Input placeholder="Service Name" />
                          </div>

                          <div>
                              <Label>Applied Date</Label>
                              <Input type="date" />
                          </div>
                      </div>

                      {/* Selects */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                          <div>
                              <Label>Status</Label>
                              <Select>
                                  <SelectTrigger>
                                      <SelectValue placeholder="Select Status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                      <SelectItem value="all">All</SelectItem>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="processing">Processing</SelectItem>
                                      <SelectItem value="completed">Completed</SelectItem>
                                      <SelectItem value="rejected">Rejected</SelectItem>
                                  </SelectContent>
                              </Select>
                          </div>

                          <div>
                              <Label>Priority</Label>
                              <Select>
                                  <SelectTrigger>
                                      <SelectValue placeholder="Select Priority" />
                                  </SelectTrigger>
                                  <SelectContent>
                                      <SelectItem value="all">All</SelectItem>
                                      <SelectItem value="low">Low</SelectItem>
                                      <SelectItem value="high">High</SelectItem>
                                  </SelectContent>
                              </Select>
                          </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 mt-6">
                          <Button variant='outline'>
                              <Search className="h-4 w-4" />
                              Search
                          </Button>

                          <Button variant="destructive" className="hover:bg-red-100 hover:text-red-700">
                              Reset
                          </Button>
                      </div>
                  </div>
              </div>

              {/* ================= TABLE SECTION ================= */}
              <Card>
                  <CardContent className="p-0 overflow-x-auto">
                      <table className="w-full text-sm">
                          <thead>
                              <tr className="border-b bg-muted/40">
                                  {[
                                      "Sl No.",
                                      "Acknowledgement No.",
                                      "Customer Name",
                                      "Customer Phone",
                                      "Service Name",
                                      "Processing Time",
                                      "Applied Date",
                                      "Purpose",
                                      "Status",
                                      "Action",
                                  ].map((h) => (
                                      <th
                                          key={h}
                                          className="text-left py-3 px-4 font-bold text-muted-foreground whitespace-nowrap"
                                      >
                                          {h}
                                      </th>
                                  ))}
                              </tr>
                          </thead>

                          <tbody>

                              {/* Example row (remove when API data comes) */}
                              {/* <tr className="border-b hover:bg-muted/30 transition">
                                  <td className="px-4 py-3">1</td>
                                  <td className="px-4 py-3">ACK-1023</td>
                                  <td className="px-4 py-3">John Doe</td>
                                  <td className="px-4 py-3">9876543210</td>
                                  <td className="px-4 py-3">License Service</td>
                                  <td className="px-4 py-3">2 Days</td>
                                  <td className="px-4 py-3">12 Jan 2026</td>
                                  <td className="px-4 py-3">Verification</td>
                                  <td className="px-4 py-3">
                                      <Badge variant="secondary">Pending</Badge>
                                  </td>
                                  <td className="px-4 py-3">
                                      <Button size="sm" variant="outline">View</Button>
                                  </td>
                              </tr> */}

                              {/* Empty state */}
                              <tr>
                                  <td
                                      colSpan={10}
                                      className="py-12 text-center text-muted-foreground"
                                  >
                                      No data available in table
                                  </td>
                              </tr>

                          </tbody>
                      </table>

                      {/* Pagination */}
                      <div className="flex items-center justify-between px-4 py-3 border-t text-sm">
                          <span className="text-muted-foreground">
                              Showing 0 to 0 of 0 entries
                          </span>

                          <div className="flex items-center gap-1">
                              <Button size="icon" variant="outline" disabled>
                                  <ChevronLeft className="h-4 w-4" />
                              </Button>

                              <Button size="sm" className="px-3">
                                  1
                              </Button>

                              <Button size="icon" variant="outline" disabled>
                                  <ChevronRight className="h-4 w-4" />
                              </Button>
                          </div>
                      </div>
                  </CardContent>
              </Card>
            </main>

          <Footer/>
      </div>
  )
}

export default Requests




//  {/* pagination */}
//             {totalPages > 1 && (
//               <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-4">
//                 {/* Entries Info */}
//                 <div className="text-sm text-muted-foreground">
//                   Showing {indexOfFirstEntry + 1} to{" "}
//                   {Math.min(indexOfLastEntry, totalEntries)} of {totalEntries} entries
//                 </div>

//                 {/* Controls */}
//                 <div className="flex flex-wrap gap-1">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     disabled={currentPage === 1}
//                     onClick={() => setCurrentPage(1)}
//                   >
//                     First
//                   </Button>

//                   <Button
//                     variant="outline"
//                     size="sm"
//                     disabled={currentPage === 1}
//                     onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                   >
//                     Previous
//                   </Button>

//                   {Array.from({ length: totalPages }, (_, i) => (
//                     <Button
//                       key={i}
//                       size="sm"
//                       variant={currentPage === i + 1 ? "default" : "outline"}
//                       onClick={() => setCurrentPage(i + 1)}
//                     >
//                       {i + 1}
//                     </Button>
//                   ))}

//                   <Button
//                     variant="outline"
//                     size="sm"
//                     disabled={currentPage === totalPages}
//                     onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//                   >
//                     Next
//                   </Button>

//                   <Button
//                     variant="outline"
//                     size="sm"
//                     disabled={currentPage === totalPages}
//                     onClick={() => setCurrentPage(totalPages)}
//                   >
//                     Last
//                   </Button>
//                 </div>
//               </div>
//             )}







