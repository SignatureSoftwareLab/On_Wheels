import { Link } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube, CarTaxiFront } from "lucide-react";

const Footer = () => {
  return (
    <footer className="gradient-dark text-primary-foreground">
      {/* Disclaimer Banner */}
      <div className="bg-gold/90 text-gold-foreground py-3">
        <div className="container text-center text-xs md:text-sm font-medium">
          <strong>Disclaimer:</strong>  Acts as a digital partner for individuals and businesses, focusing on bridging technology gaps and providing easy access to online services.
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-foreground/10 rounded-xl flex items-center justify-center">
                <CarTaxiFront className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">On Wheels</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
             We are OnWheels. We make legal documents easy for everyone, everywhere! Our mission is to Empower people to get legal documentation services in the comfort of their home. Empower people working in the legal documentation space to work effectively and efficiently.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "Quick Links", href: "/quick-links" },
                { name: "About Us", href: "#about" },
                { name: "Business Opportunity", href: "/register" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {[
                { name: "Terms & Conditions", href: "#" },
                { name: "Privacy Policy", href: "#" },
                { name: "Refund Policy", href: "#" },
                { name: "Income Disclaimer", href: "#" },
                { name: "Grievance Redressal", href: "#" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>123 Business Park, Andheri East, Mumbai - 400069, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail className="w-4 h-4 shrink-0" />
                <span>support@OnWheels.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-4 md:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/60">
            <p>© 2026 OnWheels Pvt. Ltd. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <span>CIN: U74999MH2020PTC123456</span>
              <span>GSTIN: 27ABCDE1234F1ZK</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
