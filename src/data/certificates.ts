import certIncorporation from "@/assets/cert-incorporation.jpg";
import certGst from "@/assets/cert-gst.jpg";
import certIso from "@/assets/cert-iso.jpg";
import certMsme from "@/assets/cert-msme.jpg";

export interface Certificate {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const certificates: Certificate[] = [
  {
    id: "cert-001",
    title: "Certificate of Incorporation",
    description: "Registered under the Companies Act, 2013 with the Ministry of Corporate Affairs, Government of India.",
    image: certIncorporation,
  },
  {
    id: "cert-002",
    title: "GST Registration",
    description: "Valid GST registration certificate issued by the Goods and Services Tax Network (GSTN).",
    image: certGst,
  },
  {
    id: "cert-003",
    title: "ISO 9001:2015 Certified",
    description: "Quality Management System certification ensuring highest standards in operations.",
    image: certIso,
  },
  {
    id: "cert-004",
    title: "MSME Registration",
    description: "Udyam Registration Certificate from the Ministry of Micro, Small and Medium Enterprises.",
    image: certMsme,
  },
];
