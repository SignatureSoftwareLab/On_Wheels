import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { API_URL } from '@/config/api'
import { useUser } from '@/context/UserContext'
import { toast } from '@/hooks/use-toast'
import { Description } from '@radix-ui/react-toast'
import { ChevronLeft, ChevronRight, Filter,  PlusCircleIcon, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'


type Reminder = {
    id: string;
    ack_no: string;
    name: string;
    email: string;
    reminder_date: string;
    description: string;
    added_date: string;
    branch_id: string;
}

function Reminder() {

    const {username , ready } = useUser();

    const [reminderModalOpen, setReminderModalOpen] = useState(false);

    const [error, setError] = useState("")

    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(5);



    const [reminderFormData, setReminderFormData] = useState({
        ack_no : "",
        name: "",
        email : "",
        reminder_date: "",
        description : ""
    });


    // state to store all reminder data
    const [allReminder, setAllReminder] = useState<Reminder[]>([]);
    const [filteredReminder, setFilteredReminder] = useState<Reminder[]>([]);


    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");



   // fetch all reminder data
   const fetchAllReminderData = async(user:string) => {
    
    if (!ready) return;

    try {
        const response = await fetch(`${API_URL}/home/get_acknowlegment_details` , {
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({username:user})
        });

        console.log("response" , response);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message || 'Unknown error'}`);
        }

        const data = await response.json();
        console.log(data);

        if(data.success){
            setAllReminder(data.data || []);
            setFilteredReminder(data.data || []);
        }else{
            console.error("API Error.Unknown Error!");           
        }        
    } catch (error) {
        console.error("Error fetching Data" , error);        
    }
   };

   useEffect(()=>{
    if (!ready) return;
    fetchAllReminderData(username);
   },[username , ready])


    const totalEntries = filteredReminder.length;
    const totalPages = Math.ceil(totalEntries / entriesPerPage);

    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;

    const currentData = filteredReminder.slice(startIndex, endIndex);



   const validateform = ()=>{
    let isValid = true;
    const newError = {name:"", email:"" , ack_no:"" , reminder_date:"" , description:""};

    if(!reminderFormData.name.trim()){
        newError.name = "Name is Required"
        isValid = false
    }

    if(!reminderFormData.email.trim()){
        newError.email = "Email is Required!";
        isValid = false;
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reminderFormData.email)){
        newError.email = "Please Enter a Valid Email";
        isValid = false;
    }

    if(!reminderFormData.ack_no.trim()){
        newError.ack_no = "Acknowledge number is Required";
        isValid = false;
    }

    if(!reminderFormData.reminder_date){
        newError.reminder_date = "Reminder Date is Required!";
        isValid = false;
    }

    if(!reminderFormData.description.trim()){
        newError.description = "Description is Required!";
        isValid = false;
    }

    //setError(newError);
    return isValid

   };      


   // search
    const handleSearch = () => {
        // if no filter applied, show all
        if (!startDate && !endDate) {
            setFilteredReminder(allReminder);
            setCurrentPage(1);
            return;
        }

        const filtered = allReminder.filter((item) => {
            const reminderDate = item.reminder_date.split(" ")[0]; // YYYY-MM-DD

            if (startDate && endDate) {
                return reminderDate >= startDate && reminderDate <= endDate;
            }

            if (startDate) {
                return reminderDate >= startDate;
            }

            if (endDate) {
                return reminderDate <= endDate;
            }

            return true;
        });

        setFilteredReminder(filtered);
        setCurrentPage(1);
    };




   // reset 
    const handleReset = () => {
        setStartDate("");
        setEndDate("");
        setFilteredReminder(allReminder);
        setCurrentPage(1);
    };





    

    // add reminder data
    const handleSubmit = async() => {

        // clear previous error if any
        setError("")

        try {

            if (!reminderFormData.name.trim()) {
                setError("Customer Name is Required!");
                return
            }

            if (!reminderFormData.description.trim()) {
                setError("Description is Required!");
                return
            }

            if (!reminderFormData.ack_no.trim()) {
                setError("Acknowledge Number is Required!");
                return
            }

            if (!reminderFormData.reminder_date) {
                setError("Reminder Date is Required!");
                return
            }

            // Optional: Email format validation
            // if (
            //     reminderFormData.email &&
            //     !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reminderFormData.email)
            // ) {
            //     setError("Please enter a valid email address!")
            //     return
            // }

            console.log("Reminder Data:", reminderFormData);

            
            // call api here
            const response = await fetch(`${API_URL}/home/add_reminder` , {
                method:"POST",
                headers:{
                  "Content-Type": "application/json",  
                },
                body: JSON.stringify({
                    ack_no: reminderFormData.ack_no,
                    name: reminderFormData.name,
                    email: reminderFormData.email,
                    reminder_date: reminderFormData.reminder_date,
                    description: reminderFormData.description,
                    username: username
                }),
            });

            console.log("reminder api response" , response);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message || 'Unknown error'}`);
            }

            const data = await response.json();
            console.log("reminder add data" , data);

            if(data.success){
                toast({
                    title:"Successfully Added!",
                    description:"Successfully Added Your Reminder..."
                });

                fetchAllReminderData(username);

                handleResetForm();

                setTimeout(()=>{
                    setReminderModalOpen(false)
                },400);
            } else {
                toast({
                    variant:"destructive",
                    title:"Failed!",
                    description:"Failed To Add Reminder.Please Try Again!"
                });

                handleResetForm();                
            }
        } catch (error) {
            console.error(error);
            toast({
                variant:"destructive",
                title:"Failed to Add Reminder!",
                description:"Failed Operation, Please Try Again!..."
            });        
        }
    };


    const handleResetForm = () => {
        setReminderFormData({
            ack_no: "",
            name: "",
            email: "",
            reminder_date: "",
            description: ""
        });

        //close modal
        setReminderModalOpen(false)
    };



  return (


    <div className="min-h-screen bg-background">
          <Header />


          {/* Hero */}
          <section className="py-10 md:py-15 gradient-hero border-border ">
              <div className="container text-center">
                  <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-foreground mb-4">
                      Reminders
                  </h1>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                      Access services from various departments in one place.
                  </p>
              </div>
          </section>


          <main className="container py-8 mb-10">

              {/* ================= FILTER SECTION ================= */}


              <div className="bg-white rounded-md border mb-10">
                  <div className="p-6 ">
                      <div className="flex items-center gap-2 mb-4">
                          <Filter className="h-5 w-5 text-muted-foreground" />
                          <h2 className="text-lg font-semibold">Filter By</h2>
                      </div>

                      {/* Inputs */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                          {/* <div>
                              <Label>Service Name</Label>
                              <Input placeholder="Service Name" />
                          </div> */}

                          <div>
                              <Label>Start Date</Label>
                              <Input
                                  type="date"
                                  value={startDate}
                                  onChange={(e) => setStartDate(e.target.value)}
                              />
                          </div>

                          <div>
                              <Label>End Date</Label>
                              <Input
                                  type="date"
                                  value={endDate}
                                  onChange={(e) => setEndDate(e.target.value)}
                              />
                          </div>


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
              </div>


              {/* =============== add reminder section============== */}

              {username && (
                  <div className='mb-5 flex justify-end'>
                      <Button variant='hero' onClick={() => setReminderModalOpen(true)}>
                          <PlusCircleIcon />

                          Add Reminder
                      </Button>

                  </div>
              )}

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
                                      "Acknowledgement No.",
                                      "Customer Name",
                                      "Customer Email",
                                      //"Service Name",
                                      "Event Date",
                                      "Description",
                                      //"Action",
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
                            { currentData.length > 0 ? (
                                currentData.map((r, index) => (
                                    <tr className="border-b hover:bg-muted/30 transition">
                                  <td className="px-4 py-3">{startIndex+index+1}</td>

                                  <td className="px-4 py-3">{r.ack_no || ""}</td>
                                  <td className="px-4 py-3">{r.name || ""}</td>
                                  <td className="px-4 py-3">{r.email || ""}</td>
                                  {/* <td className="px-4 py-3">License Service</td> */}
                                  <td className="px-4 py-3">{r.reminder_date.split(" ")[0] || ""}</td>
                                  <td className="px-4 py-3">{r.description}</td>                                 
                                  {/* <td className="px-4 py-3">
                                      <Button size="sm" variant="outline">View</Button>
                                  </td> */}
                              </tr>
                                ))
                            ) : (
                              <tr>
                                  <td
                                      colSpan={6}
                                      className="py-12 text-center text-muted-foreground"
                                  >
                                      No data available in reminder
                                  </td>
                              </tr>
                            )}
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

          <Footer/>

          {/* modal for open reminder  onOpenChange={setReminderModalOpen} */}

          <Dialog open={reminderModalOpen} onOpenChange={(open) => {
              setReminderModalOpen(open)
              if (!open) setError("")
          }}
          >

              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto px-4 sm:px-6 w-[95vw]">
                  <AlertDialogHeader>
                      <DialogTitle>Add Reminder</DialogTitle>
                  </AlertDialogHeader>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                          <div className='my-2'>
                              <Label>Acknowledgement No.</Label>
                              <Input placeholder="Enter Acknowledgement No" onChange={(e)=>setReminderFormData({...reminderFormData , ack_no: e.target.value})}/>
                          </div>

                          <div className='my-2'>
                              <Label>Email</Label>
                              <Input placeholder="Enter email..."  onChange={(e)=> setReminderFormData({...reminderFormData , email:e.target.value})}  />
                          </div>
                      </div>

                      <div>
                          <div className='my-2'>
                              <Label>Customer Name <span className='text-red-500'>*</span></Label>
                              <Input placeholder="Enter customer name" required  onChange={(e)=>setReminderFormData({...reminderFormData , name:e.target.value})} />
                          </div>

                          <div className='my-2'>
                              <Label>Reminder Date <span className='text-red-500'>*</span></Label>
                              <Input type="date" required  onChange={(e)=>setReminderFormData({...reminderFormData , reminder_date:e.target.value})}  />
                          </div>
                      </div>
                  </div>

                  <div>
                      <Label>Description</Label>
                      <Textarea placeholder="Enter reminder description" onChange={(e)=>setReminderFormData({...reminderFormData , description: e.target.value})} />
                  </div>

                  {error && <p className='text-red-500'>{error}</p>}


                  <AlertDialogFooter className="mt-4 gap-2">
                      <Button variant="destructive" className="hover:bg-red-100 hover:text-red-700" onClick={() => setReminderModalOpen(false)}>
                          Cancel
                      </Button>
                      <Button onClick={handleSubmit} disabled={!reminderFormData.name || !reminderFormData.reminder_date } >
                          Save Reminder
                      </Button>
                  </AlertDialogFooter>
              </DialogContent>
          </Dialog>



      </div>
  )
}

export default Reminder


  