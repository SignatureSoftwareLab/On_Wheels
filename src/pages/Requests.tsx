import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table } from '@/components/ui/table'
import { API_URL } from '@/config/api'
import { useUser } from '@/context/UserContext'
import { ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'


type Request = {
    id: string;
    added_by: string;
    full_name: string;
    email: string;
    phone_no: string;
    dob: string;
    father_name: string;
    mother_name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    pdf_form: string;
    identity_proof: string;
    address_proof: string;
    photo: string;
    signature: string;
    supporting_certificate: string;
    purpose_of_application: string;
    added_date: string;
    gender: string;
    service_id: string;
    service_name: string;
}




function Requests() {

    const {username , ready} = useUser();

    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(5);

    const [allRequest, setAllRequest] = useState<Request[]>([])
    const [filteredRequest, setFilteredRequest] = useState<Request[]>([])

    const [customerName, setCustomerName] = useState("");
    const [serviceName, setServiceName] = useState("");
    const [appliedDate, setAppliedDate] = useState("");

    const [openDocs, setOpenDocs] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);


    const documents = [
        { key: "pdf_form", label: "Application Form" },
        { key: "identity_proof", label: "Identity Proof" },
        { key: "address_proof", label: "Address Proof" },
        { key: "photo", label: "Photo" },
        { key: "signature", label: "Signature" },
        { key: "supporting_certificate", label: "Supporting Certificate" },
    ];




    const totalEntries = filteredRequest.length;
    const totalPages = Math.ceil(totalEntries / entriesPerPage);

    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;

    const currentData = filteredRequest.slice(startIndex, endIndex);


    // fetch all request
    const fetchAllRequestData = async (user: string) => {

        if (!ready) return;

        try {
            const response = await fetch(`${API_URL}/home/get_request_details`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: user })
            });

            console.log("response", response);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message || 'Unknown error'}`);
            }

            const data = await response.json();
            console.log(data);

            if (data.success) {
                setAllRequest(data.data || []);
                setFilteredRequest(data.data || []);
            } else {
                console.error("API Error.Unknown Error!");
            }
        } catch (error) {
            console.error("Error fetching Data", error);
        }
    };

    useEffect(() => {
        if (!ready) return;
        fetchAllRequestData(username);
    }, [username, ready]);





    const handleSearch = () => {
        let filtered = allRequest;

        if (customerName.trim()) {
            filtered = filtered.filter(r =>
                r.full_name.toLowerCase().includes(customerName.toLowerCase())
            );
        }

        if (serviceName.trim()) {
            filtered = filtered.filter(r =>
                r.service_name.toLowerCase().includes(serviceName.toLowerCase())
            );
        }

        if (appliedDate) {
            filtered = filtered.filter(r =>
                r.added_date.split(" ")[0] === appliedDate
            );
        }

        setFilteredRequest(filtered);
        setCurrentPage(1);
    };




    // reset 
    const handleReset = () => {
        setCustomerName("");
        setServiceName("");
        setAppliedDate("");
        setFilteredRequest(allRequest);
        setCurrentPage(1);
    };


    





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
                              <Label>Customer Name</Label>
                              <Input placeholder="Customer Name" value={customerName}
                                  onChange={(e) => setCustomerName(e.target.value)} />
                          </div>

                          <div>
                              <Label>Service Name</Label>
                              <Input placeholder="Service Name"  value={serviceName} onChange={(e) => setServiceName(e.target.value)}/>
                          </div>

                          <div>
                              <Label>Applied Date</Label>
                              <Input type="date"  value={appliedDate} onChange={(e)=> setAppliedDate(e.target.value)}/>
                          </div>
                      </div>

                      {/* Selects */}
                      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
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
                      </div> */}

                      {/* Actions */}
                      <div className="flex gap-3 mt-6">
                          <Button variant='outline' onClick={handleSearch}>
                              <Search className="h-4 w-4" />
                              Search
                          </Button>

                          <Button variant="destructive" className="hover:bg-red-100 hover:text-red-700" onClick={handleReset}>
                              Reset
                          </Button>
                      </div>
                  </div>
              </div>

              {/* ================= TABLE SECTION ================= */}
              <Card>
                  <CardContent className="p-0 overflow-x-auto">

                    {/* Pagination entries */}
                      <div className="flex items-center justify-between px-4 py-3">
                          <div className="flex items-center gap-2 text-sm">
                              <span>Show</span>

                              <select
                                  className="border rounded px-2 py-1"
                                  value={entriesPerPage}
                                  onChange={(e) => {
                                      setEntriesPerPage(Number(e.target.value));
                                      setCurrentPage(1); // reset page
                                  }}
                              >
                                  {[5, 10, 25, 50].map((size) => (
                                      <option key={size} value={size}>
                                          {size}
                                      </option>
                                  ))}
                              </select>

                              <span>entries</span>
                          </div>
                      </div>

                      <table className="w-full text-sm">
                          <thead>
                              <tr className="border-b bg-muted/40">
                                  {[
                                      "Sl No.",
                                      "Customer Name",
                                      "Info",
                                      "Service Name",
                                      "Applied Date",
                                      "Purpose",
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
                              {currentData.length > 0 ? (
                                  currentData.map((r, index) => (
                                      <tr className="border-b hover:bg-muted/30 transition" key={r.id}>
                                          <td className="px-4 py-3">{startIndex+index+1}</td>
                                          <td className="px-4 py-3">{r.full_name}</td>

                                          <td className="px-4 py-3">
                                              <div>
                                                  <span className='text-muted-foreground font-bold'>Email:</span> {r.email} <br />
                                                  <span className='text-muted-foreground font-bold'>Phone:</span>{r.phone_no} <br />
                                                  <span className='text-muted-foreground font-bold'>DOB:</span>{r.dob} <br />
                                                  <span className='text-muted-foreground font-bold'>Address:</span>{r.address} <br />
                                                  <span className='text-muted-foreground font-bold'>Gender:</span>{r.gender} <br />
                                                  <span className='text-muted-foreground font-bold'>City:</span>{r.city}
                                                  <span className='text-muted-foreground font-bold'> State:</span>{r.state}
                                              </div>
                                          </td> 

                                          

                                          <td className="px-4 py-3">{r.service_name}</td>

                                          <td className="px-4 py-3">{r.added_date.split(" ")[0]}</td>
                                          
                                          <td className="px-4 py-3">{r.purpose_of_application}</td>
                                          
                                          <td className="px-4 py-3">
                                              <Button
                                                  size="sm"
                                                  variant="outline"
                                                  onClick={() => {
                                                      setSelectedRequest(r);
                                                      setOpenDocs(true);
                                                  }}
                                              >
                                                  View
                                              </Button>

                                          </td>
                                      </tr>
                                  ))
                              ) : (
                              <tr>
                                  <td
                                      colSpan={7}
                                      className="py-12 text-center text-muted-foreground"
                                  >
                                      No data available in table
                                  </td>
                              </tr>
                              ) }
                          </tbody>
                      </table>

                      {/* Pagination */}
                      <div className="flex items-center justify-between px-4 py-3 border-t text-sm">
                          <span className="text-muted-foreground">
                              Showing {totalEntries === 0 ? 0 : startIndex + 1} to{" "}
                              {Math.min(endIndex, totalEntries)} of {totalEntries} entries
                          </span>

                          <div className="flex items-center gap-1">
                              <Button
                                  size="icon"
                                  variant="outline"
                                  disabled={currentPage === 1}
                                  onClick={() => setCurrentPage((p) => p - 1)}
                              >
                                  <ChevronLeft className="h-4 w-4" />
                              </Button>

                              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                  <Button
                                      key={page}
                                      size="sm"
                                      variant={page === currentPage ? "default" : "outline"}
                                      onClick={() => setCurrentPage(page)}
                                  >
                                      {page}
                                  </Button>
                              ))}

                              <Button
                                  size="icon"
                                  variant="outline"
                                  disabled={currentPage === totalPages || totalPages === 0}
                                  onClick={() => setCurrentPage((p) => p + 1)}
                              >
                                  <ChevronRight className="h-4 w-4" />
                              </Button>
                          </div>
                      </div>

                  </CardContent>
              </Card>
            </main>


          {/* view document  */}
          {selectedRequest && (
              <Dialog open={openDocs} onOpenChange={setOpenDocs}>
                  <DialogContent className="max-w-3xl">
                      <h2 className="text-lg font-semibold mb-4">
                          Documents – {selectedRequest.full_name}
                      </h2>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {documents.map((doc) => {
                              const url = (selectedRequest as any)[doc.key];
                              if (!url) return null;

                              const isPdf = url.endsWith(".pdf");

                              return (
                                  <div
                                      key={doc.key}
                                      onClick={() => window.open(url, "_blank")}
                                      className="border rounded-lg p-3 cursor-pointer hover:shadow-md transition"
                                  >
                                      <div className="h-32 flex items-center justify-center bg-muted rounded mb-2">
                                          {isPdf ? (
                                              <span className="text-sm font-semibold">PDF</span>
                                          ) : (
                                              <img
                                                  src={url}
                                                  alt={doc.label}
                                                  className="h-full object-contain"
                                              />
                                          )}
                                      </div>

                                      <p className="text-sm text-center font-medium">
                                          {doc.label}
                                      </p>
                                  </div>
                              );
                          })}
                      </div>
                  </DialogContent>
              </Dialog>
          )}


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







