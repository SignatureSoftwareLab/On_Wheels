import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Download, File, FileText, Home, Mail, Phone, Upload, User, X } from 'lucide-react';
import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'


type DocumentType = {
  id: string
  name: string
  description: string
  required: boolean
}

const DOCUMENT_TYPES: DocumentType[] = [
  { id: 'id_proof', name: 'Identity Proof', description: 'Aadhar Card, PAN Card, Voter ID, Passport', required: true },
  //{ id: 'address_proof', name: 'Address Proof', description: 'Utility Bill, Rental Agreement, Bank Statement', required: true },
  { id: 'photo', name: 'Passport Size Photo', description: 'Recent photograph with white background', required: true },
  { id: 'signature', name: 'Signature', description: 'Scanned signature on white paper', required: true },
  { id: 'additional', name: 'Additional Documents', description: 'Any other supporting documents', required: false },
]


function ServiceApplication() {

    const { serviceId } = useParams<{ serviceId: string }>();

    const location = useLocation();

    const service = location.state?.service || null;

    console.log("the passed service details" , service);
    

    console.log("serviceId" , serviceId);


    const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    dateOfBirth: '',
    gender: '',
    fatherName: '',
    motherName: '',
    purpose: '',
    declaration: false,
  })
    

  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, File | null>>({
    id_proof: null,
    //address_proof: null,
    photo: null,
    signature: null,
    additional: null,
  })

  const [uploadedPDF, setUploadedPDF] = useState<File | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleDocumentUpload = (documentId: string, file: File | null) => {
    setUploadedDocuments(prev => ({ ...prev, [documentId]: file }))
  }

  const handlePDFUpload = (file: File | null) => {
    setUploadedPDF(file)
  }

  const handleRemoveDocument = (documentId: string) => {
    setUploadedDocuments(prev => ({ ...prev, [documentId]: null }))
  }

  const handleRemovePDF = () => {
    setUploadedPDF(null)
  }

  const handleClearForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      dateOfBirth: '',
      gender: '',
      fatherName: '',
      motherName: '',
      purpose: '',
      declaration: false,
    })
    setUploadedDocuments({
      id_proof: null,
      //address_proof: null,
      photo: null,
      signature: null,
      additional: null,
    })
    setUploadedPDF(null)
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form Data:', formData)
    console.log('Uploaded Documents:', uploadedDocuments)
    console.log('Uploaded PDF:', uploadedPDF)
    // Handle form submission here
  }

  const downloadSampleForm = () => {
    // Create and download a sample PDF or template
    const link = document.createElement('a')
    link.href = '/sample-application-form.pdf'
    link.download = 'Sample_Application_Form.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
                Please fill out all the required details for service : <span className="font-semibold text-primary">{service.title}</span>
              </p>
            </div>

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
                          <Label htmlFor="fullName" className="flex items-center gap-1 text-sm sm:text-base">
                            Full Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                            className="text-sm sm:text-base"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center gap-1 text-sm sm:text-base">
                            Email 
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
                              
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="flex items-center gap-1 text-sm sm:text-base">
                            Phone Number <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+91 9876543210"
                              className="pl-10 text-sm sm:text-base"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth" className="text-sm sm:text-base">Date of Birth</Label>
                          <Input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            className="text-sm sm:text-base"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="gender" className="text-sm sm:text-base">Gender</Label>
                          <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
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
                          <Label htmlFor="fatherName" className="text-sm sm:text-base">Father's Name</Label>
                          <Input
                            id="fatherName"
                            name="fatherName"
                            value={formData.fatherName}
                            onChange={handleInputChange}
                            placeholder="Enter father's name"
                            className="text-sm sm:text-base"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="motherName" className="text-sm sm:text-base">Mother's Name</Label>
                          <Input
                            id="motherName"
                            name="motherName"
                            value={formData.motherName}
                            onChange={handleInputChange}
                            placeholder="Enter mother's name"
                            className="text-sm sm:text-base"
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
                                <SelectItem value="delhi" className="text-sm sm:text-base">Delhi</SelectItem>
                                <SelectItem value="maharashtra" className="text-sm sm:text-base">Maharashtra</SelectItem>
                                <SelectItem value="tamilnadu" className="text-sm sm:text-base">Tamil Nadu</SelectItem>
                                <SelectItem value="karnataka" className="text-sm sm:text-base">Karnataka</SelectItem>
                                <SelectItem value="kerala" className="text-sm sm:text-base">Kerala</SelectItem>
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
                        {DOCUMENT_TYPES.map((doc) => (
                          <div key={doc.id} className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Label className="flex items-center gap-1 text-sm sm:text-base">
                                {doc.name}
                                {doc.required && <span className="text-red-500">*</span>}
                              </Label>
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
                                      JPG, PNG, PDF (Max 2MB)
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
                          <Label htmlFor="purpose" className="text-sm sm:text-base">Purpose of Application</Label>
                          <Textarea
                            id="purpose"
                            name="purpose"
                            value={formData.purpose}
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
                    disabled={!formData.declaration}
                    size="sm"
                  >
                    <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
                    Submit Application
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