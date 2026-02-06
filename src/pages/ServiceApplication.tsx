import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { API_URL } from '@/config/api';
import { useUser } from '@/context/UserContext';
import { toast } from '@/hooks/use-toast';
import { Download, File, FileText, Home, Mail, Phone, Upload, User, X } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'


type DocumentType = {
  id: string
  name: string
  description: string
  required: boolean
}

const DOCUMENT_TYPES: DocumentType[] = [
  { id: 'identity_proof', name: 'Identity Proof', description: 'Aadhar Card, PAN Card, Voter ID, Passport', required: true },
  { id: 'address_proof', name: 'Address Proof', description: 'Utility Bill, Rental Agreement, Bank Statement', required: true },
  { id: 'passport_size_photo', name: 'Passport Size Photo', description: 'Recent photograph with white background', required: true },
  { id: 'signature', name: 'Signature', description: 'Scanned signature on white paper', required: true },
  { id: 'supporting_certificate', name: 'Additional Documents', description: 'Any other supporting documents', required: false },
]


// Allowed file types for documents
const ALLOWED_DOCUMENT_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
const ALLOWED_DOCUMENT_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.pdf'];

// Allowed file type for PDF form
const ALLOWED_PDF_TYPE = 'application/pdf';
const ALLOWED_PDF_EXTENSION = '.pdf';


function ServiceApplication() {

  const { username , ready } = useUser();
  console.log("username in form", username);

  const { serviceId } = useParams<{ serviceId: string }>();
  console.log("serviceId", serviceId);

  const location = useLocation();
  const navigate = useNavigate();

  const service = location.state?.service || null;

  console.log("the passed service details", service);

  // If service is not passed via navigation, show error
  // if (!service) {
  //   return (
  //     <div className="min-h-screen bg-background">
  //       <Header />
  //       <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
  //         <div className="max-w-4xl mx-auto">
  //           <Card >
  //             <CardContent className="pt-8 pb-8 text-center">
  //               <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
  //                 <X className="h-8 w-8 text-red-600" />
  //               </div>
  //               <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
  //                 Service Not Found
  //               </h1>
  //               <p className="text-muted-foreground mb-6 max-w-md mx-auto">
  //                 Unable to load service details. Please go back and select a service again.
  //               </p>
  //               <div className="flex flex-col sm:flex-row gap-3 justify-center">
  //                 <Button
  //                   onClick={() => navigate('/services')}
  //                   className="gap-2"
  //                 >
  //                   Browse Services
  //                 </Button>
  //                 <Button
  //                   variant="outline"
  //                   onClick={() => navigate('/')}
  //                 >
  //                   Go to Homepage
  //                 </Button>
  //               </div>
  //             </CardContent>
  //           </Card>
  //         </div>
  //       </main>
  //       <Footer />
  //     </div>
  //   );
  // }



  // Generate dynamic document types based on service requirements
  const documentTypes: DocumentType[] = useMemo(() => {
    if (!service || !service.documents) {
      // Fallback to all required except supporting_certificate if no service data
      return DOCUMENT_TYPES.map(doc => ({
        ...doc,
        required: doc.id !== 'supporting_certificate'
      }));
    }

    return DOCUMENT_TYPES.map(doc => ({
      ...doc,
      required: service.documents.includes(doc.id)
    }));
  }, [service]);

  //console.log("old document", DOCUMENT_TYPES);
  //console.log("new updated document" , documentTypes);




  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("")
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);


  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    dob: '',
    gender: '',
    father_name: '',
    mother_name: '',
    purpose_of_application: '',
    declaration: false,
  })



  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, File | null>>({
    identity_proof: null,
    address_proof: null,
    passport_size_photo: null,
    signature: null,
    supporting_certificate: null,
  })


  const [uploadedPDF, setUploadedPDF] = useState<File | null>(null)



  // Validate file type for documents
  const validateDocumentFile = (file: File): boolean => {
    if (!ALLOWED_DOCUMENT_TYPES.includes(file.type)) {
      setFileUploadError(`Invalid file type. Please upload only ${ALLOWED_DOCUMENT_EXTENSIONS.join(', ')} files.`);
      return false;
    }

    // Check file size (max 2MB for documents)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      setFileUploadError(`File size too large. Maximum size is 2MB.`);
      return false;
    }

    setFileUploadError(null);
    return true;
  }


  // Validate PDF file
  const validatePDFFile = (file: File): boolean => {
    if (file.type !== ALLOWED_PDF_TYPE && !file.name.toLowerCase().endsWith('.pdf')) {
      setFileUploadError(`Invalid file type. Please upload only PDF files.`);
      return false;
    }

    // Check file size (max 10MB for PDF)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      setFileUploadError(`PDF file size too large. Maximum size is 10MB.`);
      return false;
    }

    setFileUploadError(null);
    return true;
  }




  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }



  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }


  // document upload
  const handleDocumentUpload = (documentId: string, file: File | null) => {
    if (file) {
      if (validateDocumentFile(file)) {
        setUploadedDocuments(prev => ({ ...prev, [documentId]: file }))
        setFileUploadError(null); // Clear any previous errors
      } else {
        // Reset the file input
        const fileInput = document.getElementById(`upload-${documentId}`) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      }
    } else {
      setUploadedDocuments(prev => ({ ...prev, [documentId]: null }))
    }
  }



  // pdf upload
  const handlePDFUpload = (file: File | null) => {
    if (file) {
      if (validatePDFFile(file)) {
        setUploadedPDF(file)
        setFileUploadError(null); // Clear any previous errors
      } else {
        // Reset the file input
        const fileInput = document.getElementById('pdf-upload') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      }
    } else {
      setUploadedPDF(null)
    }
  }



  const handleRemoveDocument = (documentId: string) => {
    setUploadedDocuments(prev => ({ ...prev, [documentId]: null }))
    setFileUploadError(null);
  }

  const handleRemovePDF = () => {
    setUploadedPDF(null)
    setFileUploadError(null);
  }


  // reset form
  const handleClearForm = () => {
    setFormData({
      full_name: '',
      email: '',
      phone_number: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      dob: '',
      gender: '',
      father_name: '',
      mother_name: '',
      purpose_of_application: '',
      declaration: false,
    })

    setUploadedDocuments({
      identity_proof: null,
      address_proof: null,
      passport_size_photo: null,
      signature: null,
      supporting_certificate: null,
    })

    setUploadedPDF(null)
    setFileUploadError(null);
    setError("");
  }


  // craete dummy pdf , jpg for file upload
  const createDummyPDF = () =>
    new Blob(
      [
        '%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF'
      ],
      { type: 'application/pdf' }
    )

  const createDummyJPG = () =>
    new Blob(
      [
        new Uint8Array([0xff, 0xd8, 0xff, 0xd9]) // SOI + EOI
      ],
      { type: 'image/jpeg' }
    )




  // form submit
  const handleSubmit = async (e: React.FormEvent) => {


    e.preventDefault()

    setIsSubmitting(true)
    setError("")
    setFileUploadError(null)

    console.log('Form Data:', formData)
    console.log('Uploaded Documents:', uploadedDocuments)
    console.log('Uploaded PDF:', uploadedPDF)
    // Handle form submission here


    try {

      // validate form
      if (!formData.full_name.trim()) {
        setError("Name is Required!");
        return;
      }

      if (!formData.email.trim()) {
        setError("Email is Required!");
        return;
      }

      if (!formData.phone_number.trim()) {
        setError("Phone Number is Required!");
        return;
      }

      if (!formData.dob) {
        setError("Date of Birth is Required!");
        return;
      }

      if (!formData.gender) {
        setError("Gender is Required!");
        return;
      }

      if (!formData.father_name) {
        setError("Father's Name is Required!");
        return;
      }

      if (!formData.mother_name) {
        setError("Mother's Name is Required!");
        return;
      }

      if (!formData.address.trim()) {
        setError("Address is Required!");
        return;
      }


      // Validate required documents are uploaded
      const requiredDocs = documentTypes.filter(doc => doc.required)
      const missingDocs = requiredDocs.filter(doc => !uploadedDocuments[doc.id])

      if (missingDocs.length > 0) {
        setError(`Please upload all required documents: ${missingDocs.map(doc => doc.name).join(', ')}`)
        return
      }



      const formDataToSend = new FormData();

      // check username and seviceid in api , username is get from the lnik

      formDataToSend.append("user_name", username);
      formDataToSend.append("service_id", serviceId);

      formDataToSend.append("full_name", formData.full_name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone_number", formData.phone_number);
      formDataToSend.append("dob", formData.dob);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("father_name", formData.father_name);
      formDataToSend.append("mother_name", formData.mother_name);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("city", formData.city || "");
      formDataToSend.append("state", formData.state || "");
      formDataToSend.append("pincode", formData.pincode || "");
      formDataToSend.append("purpose_of_application", formData.purpose_of_application || "");

      const appendFileOrDummy = (
        formData: FormData,
        fieldName: string,
        file: File | null,
        type: 'pdf' | 'jpg'
      ) => {
        if (file) {
          formData.append(fieldName, file)
        } else {
          const dummy =
            type === 'pdf' ? createDummyPDF() : createDummyJPG()

          const filename =
            type === 'pdf' ? 'empty.pdf' : 'empty.jpg'

          formData.append(fieldName, dummy, filename)
        }
      }


      appendFileOrDummy(formDataToSend, "identity_proof", uploadedDocuments.identity_proof, "pdf")

      appendFileOrDummy(formDataToSend, "address_proof", uploadedDocuments.address_proof, "pdf")

      appendFileOrDummy(formDataToSend, "passport_size_photo", uploadedDocuments.passport_size_photo, "pdf")

      appendFileOrDummy(formDataToSend, "signature", uploadedDocuments.signature, "pdf")

      appendFileOrDummy(formDataToSend, "supporting_certificate", uploadedDocuments.supporting_certificate, "pdf")

      appendFileOrDummy(formDataToSend, "pdf_form", uploadedPDF, "pdf")



      console.log("formDataToSend", formDataToSend);


      const response = await fetch(`${API_URL}/home/add_public_service_form`, {
        method: "POST",
        body: formDataToSend
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log("api result data", data);

      if (data.success) {

        toast({
          title: "Form Data Successfully Added",
          description: data.msg || "Form Inserted Successfully"
        });

        handleClearForm();

        setTimeout(() => {
          window.history.back()
        }, 1000)

      } else {
        toast({
          variant: "destructive",
          title: "Failed",
          description: data.error_msgs.email || "Failed to add Data",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false)
    }
  };



  // const downloadSampleForm = async () => {

  //   try {

  //     const response = await fetch(`${API_URL}/home/sample_form` , {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         service_id : serviceId
  //       }),
  //     });

  //     console.log("API response" , response);

  //     if(!response.ok){
  //       throw new Error("Failed To Download");
  //     }

  //     // convert the response in to blob
  //     const blob = await response.blob();

  //     // Create downloadable URL
  //     const url = window.URL.createObjectURL(blob);

  //     // create temp anchor 
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = `${service?.service_name || "Sample_Form"}.pdf`;


  //     document.body.appendChild(link);
  //     link.click();

  //     //cleanup
  //     link.remove();
  //     window.URL.revokeObjectURL(url);

  //   } catch (error) {
  //     console.error(error);
  //     toast({
  //       variant:"destructive",
  //       title:"Download Failed!" ,
  //       description:"Unable to download sample form , Please try again!..."
  //     })      
  //   }

  // }



  const downloadSampleForm = () => {
    // Create and download a sample PDF or template
    const link = document.createElement('a')
    link.href = '/sample-application-form.pdf'
    link.download = 'Sample_Application_Form.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }





  // Helper function to format accepted file types for display
  const getAcceptedFileTypesText = () => {
    return ALLOWED_DOCUMENT_EXTENSIONS.join(', ').toUpperCase();
  }



  if(!ready){
    return null;
  }

  if(!username.trim()){
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-8 pb-8 text-center">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <X className="h-8 w-8 text-red-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  Access Denied
                </h1>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  You don't have permission to access this page. A valid username is required to apply for services.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => navigate('/')}
                    className="gap-2"
                  >
                    Go to Homepage
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/services')}
                  >
                    Browse Services
                  </Button>
                </div>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    Need help? Contact support or check if you have the correct link.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-6 sm:mb-8 text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                Service Application Form
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground px-2">
                Please fill out all the required details for service : <span className="font-semibold text-primary">{service.service_name}</span>
              </p>
            </div>

            {/* Display file upload error */}
            {fileUploadError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm font-medium">{fileUploadError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Left Column - Personal Details */}
                <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                  {/* Personal Details Card */}
                  <Card>
                    <CardContent className="pt-4 sm:pt-6">
                      <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        <h2 className="text-lg sm:text-xl font-semibold text-foreground">Personal Details</h2>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="full_name" className="flex items-center gap-1 text-sm sm:text-base">
                            Full Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="full_name"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                            className="text-sm sm:text-base"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center gap-1 text-sm sm:text-base">
                            Email <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="example@email.com"
                              className="pl-10 text-sm sm:text-base"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone_number" className="flex items-center gap-1 text-sm sm:text-base">
                            Phone Number <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="phone_number"
                              name="phone_number"
                              value={formData.phone_number}
                              onChange={handleInputChange}
                              placeholder="+91 9876543210"
                              className="pl-10 text-sm sm:text-base"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dob" className="text-sm sm:text-base">Date of Birth <span className="text-red-500">*</span></Label>
                          <Input
                            id="dob"
                            name="dob"
                            type="date"
                            value={formData.dob}
                            onChange={handleInputChange}
                            className="text-sm sm:text-base"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="gender" className="text-sm sm:text-base">Gender <span className="text-red-500">*</span></Label>
                          <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)} required>
                            <SelectTrigger className="text-sm sm:text-base">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male" className="text-sm sm:text-base">Male</SelectItem>
                              <SelectItem value="female" className="text-sm sm:text-base">Female</SelectItem>
                              <SelectItem value="other" className="text-sm sm:text-base">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="father_name" className="text-sm sm:text-base">Father's Name <span className="text-red-500">*</span></Label>
                          <Input
                            id="father_name"
                            name="father_name"
                            value={formData.father_name}
                            onChange={handleInputChange}
                            placeholder="Enter father's name"
                            className="text-sm sm:text-base"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="mother_name" className="text-sm sm:text-base">Mother's Name <span className="text-red-500">*</span></Label>
                          <Input
                            id="mother_name"
                            name="mother_name"
                            value={formData.mother_name}
                            onChange={handleInputChange}
                            placeholder="Enter mother's name"
                            className="text-sm sm:text-base"
                            required
                          />
                        </div>

                      </div>
                    </CardContent>
                  </Card>
                  {/* Address Details Card */}
                  <Card>
                    <CardContent className="pt-4 sm:pt-6">
                      <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <Home className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        <h2 className="text-lg sm:text-xl font-semibold text-foreground">Address Details</h2>
                      </div>

                      <div className="space-y-4 sm:space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="address" className="flex items-center gap-1 text-sm sm:text-base">
                            Complete Address <span className="text-red-500">*</span>
                          </Label>
                          <Textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Enter your complete address"
                            rows={3}
                            required
                            className="text-sm sm:text-base min-h-[100px]"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city" className="text-sm sm:text-base">City</Label>
                            <Input
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="Enter city"
                              className="text-sm sm:text-base"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="state" className="text-sm sm:text-base">State</Label>
                            <Select value={formData.state} onValueChange={(value) => handleSelectChange('state', value)}>
                              <SelectTrigger className="text-sm sm:text-base">
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="kerala" className="text-sm sm:text-base">Kerala</SelectItem>
                                <SelectItem value="delhi" className="text-sm sm:text-base">Delhi</SelectItem>
                                <SelectItem value="maharashtra" className="text-sm sm:text-base">Maharashtra</SelectItem>
                                <SelectItem value="tamilnadu" className="text-sm sm:text-base">Tamil Nadu</SelectItem>
                                <SelectItem value="karnataka" className="text-sm sm:text-base">Karnataka</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="pincode" className="text-sm sm:text-base">Pincode</Label>
                            <Input
                              id="pincode"
                              name="pincode"
                              value={formData.pincode}
                              onChange={handleInputChange}
                              placeholder="Enter pincode"
                              className="text-sm sm:text-base"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* PDF Upload Section */}
                  <Card>
                    <CardContent className="pt-4 sm:pt-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                          <h2 className="text-lg sm:text-xl font-semibold text-foreground">Upload PDF Form</h2>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={downloadSampleForm}
                          className="gap-2 text-sm sm:text-base"
                          size="sm"
                        >
                          <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                          Download Sample Form
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Download the sample form, fill it offline, and upload the completed PDF.
                          Accepted format: {ALLOWED_PDF_EXTENSION.toUpperCase()} (Max 10MB)
                        </p>

                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 sm:p-8 text-center">
                          {uploadedPDF ? (
                            <div className="space-y-4">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-3">
                                <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                                <div className="text-center sm:text-left">
                                  <p className="font-medium text-sm sm:text-base truncate">{uploadedPDF.name}</p>
                                  <p className="text-xs sm:text-sm text-muted-foreground">
                                    {(uploadedPDF.size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={handleRemovePDF}
                                  className="h-7 w-7 sm:h-8 sm:w-8 mx-auto sm:mx-0"
                                >
                                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <Upload className="h-8 w-8 sm:h-12 sm:w-12 mx-auto text-muted-foreground" />
                              <div>
                                <Label htmlFor="pdf-upload" className="cursor-pointer">
                                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 text-sm sm:text-base">
                                    <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
                                    Choose PDF File
                                  </div>
                                  <Input
                                    id="pdf-upload"
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => handlePDFUpload(e.target.files?.[0] || null)}
                                    className="hidden"
                                  />
                                </Label>
                                <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                                  PDF files only (Max 10MB)
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Documents Upload */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-6 sm:top-8">
                    <CardContent className="pt-4 sm:pt-6">
                      <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <File className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        <h2 className="text-lg sm:text-xl font-semibold text-foreground">Documents Upload</h2>
                      </div>

                      <div className="space-y-4 sm:space-y-6">
                        {documentTypes.map((doc) => (
                          <div key={doc.id} className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Label className="flex items-center gap-1 text-sm sm:text-base">
                                {doc.name}
                                {doc.required === true && <span className="text-red-500">*</span>}
                              </Label>
                              {!uploadedDocuments[doc.id] && doc.required && (
                                <span className="text-xs text-red-500 font-medium">Required</span>
                              )}
                              {uploadedDocuments[doc.id] && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveDocument(doc.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              )}
                            </div>

                            <p className="text-xs text-muted-foreground">{doc.description}</p>

                            {uploadedDocuments[doc.id] ? (
                              <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                                <FileText className="h-5 w-5 text-primary" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{uploadedDocuments[doc.id]?.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {uploadedDocuments[doc.id] &&
                                      `${(uploadedDocuments[doc.id]!.size / 1024).toFixed(1)} KB`
                                    }
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-4">
                                <Label htmlFor={`upload-${doc.id}`} className="cursor-pointer block">
                                  <div className="text-center">
                                    <Upload className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2 text-muted-foreground" />
                                    <span className="text-sm font-medium">Upload Document</span>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {getAcceptedFileTypesText()} (Max 2MB)
                                    </p>
                                  </div>
                                  <Input
                                    id={`upload-${doc.id}`}
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.pdf"
                                    onChange={(e) => handleDocumentUpload(doc.id, e.target.files?.[0] || null)}
                                    className="hidden"
                                  />
                                </Label>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Additional Information */}
                      <div className="mt-6 sm:mt-8 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="purpose_of_application" className="text-sm sm:text-base">Purpose of Application</Label>
                          <Textarea
                            id="purpose_of_application"
                            name="purpose_of_application"
                            value={formData.purpose_of_application}
                            onChange={handleInputChange}
                            placeholder="Briefly describe the purpose of your application..."
                            rows={3}
                            className="text-sm sm:text-base"
                          />
                        </div>

                        <div className="flex items-start space-x-3 pt-4 border-t">
                          <Checkbox
                            id="declaration"
                            checked={formData.declaration}
                            onCheckedChange={(checked) =>
                              setFormData(prev => ({ ...prev, declaration: checked as boolean }))
                            }
                          />
                          <div className="space-y-1">
                            <Label htmlFor="declaration" className="font-semibold text-sm sm:text-base">
                              Declaration
                            </Label>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              I hereby declare that all the information provided is true and correct to the best of my knowledge.
                              I understand that providing false information may lead to rejection of my application.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 sm:mt-8 space-y-4 ">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md ">
                      <p className="text-red-600 text-sm font-medium">{error}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t flex flex-col sm:flex-row justify-between gap-4">
                <Button
                  type="button"
                  variant="link"
                  onClick={handleClearForm}
                  className="gap-2 text-sm sm:text-base order-2 sm:order-1 hover:bg-red-100 hover:text-red-700"
                  size="sm"
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                  Clear All
                </Button>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 order-1 sm:order-2 w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => window.history.back()}
                    className="text-sm sm:text-base"
                    size="sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="gap-2 text-sm sm:text-base"
                    disabled={!formData.declaration || isSubmitting}
                    size="sm"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    {!isSubmitting && <Upload className="h-3 w-3 sm:h-4 sm:w-4" />}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default ServiceApplication










