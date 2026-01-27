import React from 'react'
import { Card } from './ui/card';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';


type Service = {
    id: number;
    category: string;
    title: string;
    description: string;
    dd?:string;
}


type ServiceModalProps = {
    open: boolean;
    service : Service | null ,
    onClose : ()=> void;
}

function ServiceDetailsModal({ open, onClose, service }: ServiceModalProps) {

    const navigate = useNavigate()

    if (!open || !service) return null;



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <Card className="relative z-50 w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in-95" >

                {/* Scrollable Content Wrapper */}
                <div className="max-h-[75vh] overflow-y-auto pr-2">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-6">
                        <div>                           
                            <h2 className="mt-2 text-2xl font-bold text-primary">
                                {service.title}
                            </h2>
                        </div>

                        <button
                            onClick={onClose}
                            className="rounded-full p-2 hover:bg-muted transition"
                        >
                            <X className="h-6 w-6 text-muted-foreground" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="mt-6 space-y-6">
                        <p className="text-base leading-relaxed text-muted-foreground font-semibold">
                            {service.description}
                        </p>

                        <p>{service.dd ? service.dd : ""}</p>

                        <div className="rounded-xl bg-muted/40 p-5 text-sm text-muted-foreground border grid md:grid-cols-2 gap-2">
                            <div className='px-2'>
                                <p className="font-semibold text-foreground mb-3">
                                    Processing time <br />
                                    <span className='font-semibold text-muted-foreground'>5 Days</span>
                                </p>
    
                                <p className="font-semibold text-foreground mb-3">
                                    Validity of certificate <br />
                                    <span className='font-semibold text-muted-foreground'>3 YEAR</span>
                                </p>
    
                                <p className="font-semibold text-foreground mb-3">
                                    Fee Detail <br />
                                    <span className='font-semibold text-muted-foreground'>Price : <span className='font-semibold text-primary'>₹ 40</span></span>
                                </p>

                                <p className="font-semibold text-foreground mb-3">
                                    Processing Time Taken
                                    <br /> <span className='text-primary'>( Current year upto last month )</span> <br />
                                    <span className='font-semibold text-muted-foreground'>Average time</span>
                                </p>
                            </div>


                            <div className='px-2'>
                                <p className="font-semibold text-foreground mb-2">
                                    Required Documents
                                </p>
                                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                    <li>Identity Proof <span className='text-red-500'>*</span></li>
                                    <li>Address Proof <span className='text-red-500'>*</span></li>
                                    <li>Application Form <span className='text-red-500'>*</span></li>
                                    <li>Supporting Certificates (if any)</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    
                    {/* Footer */}
                    <div className="mt-6 flex justify-end gap-3 border-t pt-4">
                        <Button variant="ghost" onClick={onClose}>
                            Close
                        </Button>

                        {/* Pass service data in navigation state */}
                        <Button variant="hero" onClick={ ()=>navigate(`/service/application/${service.id}` , { state : { service  } })}>
                            Apply Now
                        </Button>  
                    </div>

                </div>

            </Card>
        </div>
    )
}

export default ServiceDetailsModal