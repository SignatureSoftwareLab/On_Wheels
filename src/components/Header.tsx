

// import { useState, useEffect, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, X, Leaf, User, ShoppingCart, ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";






// const Header = () => {


//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const location = useLocation();
//   const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});



//   // Define all dropdown menus
//   const dropdownMenus = {
//     "other-services": {
//       name: "Other Services",
//       links: [
//         { name: "Consultation", href: "" },
//         { name: "Maintenance", href: "" },
//         { name: "Training", href: "" },
//       ],
//     },
//     "more": {
//       name: "More",
//       links: [
//         { name: "Customers", href: "" },
//         { name: "Notification", href: "" },
//         { name: "Feedback", href: "" },
//       ],
//     },
//   };


//   type DropdownKey = keyof typeof dropdownMenus;


  
//   // Define navigation items including dropdowns at specific positions
//   const navItems = [

//     { name: "Home", href: "/" },
//     { name: "Services", href: "/services" },
//     //{ type: "dropdown", key: "other-services" as DropdownKey }, // Dropdown right after Services
//     { name: "Quick Links", href: "/quick-links" },
//     { name: "Requests", href: "" },
//     { name: "Reminders", href: "" },
//     { type: "dropdown", key: "more" as DropdownKey },

//   ];

  


//   const isActive = (href: string) => location.pathname === href;
  


//   // Check if any link in a dropdown is active
//   const isDropdownActive = (dropdownKey: DropdownKey) => {
//     return dropdownMenus[dropdownKey].links.some(link => isActive(link.href));
//   };



//   // Toggle specific dropdown
//   const toggleDropdown = (key: DropdownKey) => {
//     setOpenDropdown(openDropdown === key ? null : key);
//   };


//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const isOutsideAllDropdowns = Object.values(dropdownRefs.current).every(ref => {
//         return ref && !ref.contains(event.target as Node);
//       });

//       if (isOutsideAllDropdowns) {
//         setOpenDropdown(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);


//   // Close all dropdowns when route changes
//   useEffect(() => {
//     setIsMenuOpen(false);
//     setOpenDropdown(null);
//   }, [location.pathname]);


//   // Set ref for each dropdown
//   const setDropdownRef = (key: DropdownKey) => (el: HTMLDivElement | null) => {
//     dropdownRefs.current[key] = el;
//   };



//   return (

    
//     <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
//       <div className="container">
//         <nav className="flex items-center justify-between h-16 md:h-20">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2 group">
//             <div className="w-10 h-10 md:w-12 md:h-12 gradient-primary rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-glow transition-shadow">
//               <Leaf className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
//             </div>
//             <div className="hidden sm:block">
//               <span className="text-lg md:text-xl font-bold text-foreground">ON</span>
//               <span className="text-lg md:text-xl font-bold text-primary ml-1">WHEELS</span>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center gap-8">
//             {navItems.map((item, index) => {
//               if (item.type === "dropdown") {
//                 return (
//                   <div key={item.key} className="relative" ref={setDropdownRef(item.key)}>
//                     <button
//                       onClick={() => toggleDropdown(item.key)}
//                       className={`text-sm font-medium transition-colors flex items-center gap-1 py-2 ${
//                         isDropdownActive(item.key)
//                           ? "text-primary"
//                           : "text-muted-foreground hover:text-foreground"
//                       }`}
//                     >
//                       {dropdownMenus[item.key].name}
//                       <ChevronDown className={`w-4 h-4 transition-transform ${
//                         openDropdown === item.key ? "rotate-180" : ""
//                       }`} />
//                     </button>
                    
//                     {openDropdown === item.key && (
//                       <div className="absolute top-full left-0 mt-1 w-48 bg-background border border-border rounded-lg shadow-lg py-2 animate-fade-in z-50">
//                         {dropdownMenus[item.key].links.map((link) => (
//                           <Link
//                             key={link.name}
//                             to={link.href}
//                             className={`block px-4 py-2 text-sm transition-colors ${
//                               isActive(link.href)
//                                 ? "bg-secondary text-primary"
//                                 : "text-muted-foreground hover:bg-secondary hover:text-foreground"
//                             }`}
//                           >
//                             {link.name}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 );
//               }
              
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   className={`text-sm font-medium transition-colors relative py-2 ${
//                     isActive(item.href)
//                       ? "text-primary"
//                       : "text-muted-foreground hover:text-foreground"
//                   }`}
//                 >
//                   {item.name}
//                   {isActive(item.href) && (
//                     <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
//                   )}
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Desktop Actions */}
//           <div className="hidden lg:flex items-center gap-3">
//             <Button asChild variant="ghost" size="sm">
//               <Link to="/login" className="flex items-center gap-2">
//                 <User className="w-4 h-4" />
//                 Login
//               </Link>
//             </Button>
//             <Button asChild size="sm">
//               <Link to="/register">Register</Link>
//             </Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="lg:hidden p-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
//             aria-label="Toggle menu"
//           >
//             {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </nav>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="lg:hidden pb-4 animate-fade-in">
//             <div className="flex flex-col gap-2">
//               {navItems.map((item) => {
//                 if (item.type === "dropdown") {
//                   return (
//                     <div key={item.key} className="flex flex-col">
//                       <button
//                         onClick={() => toggleDropdown(item.key)}
//                         className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-colors flex items-center justify-between ${
//                           isDropdownActive(item.key)
//                             ? "bg-secondary text-primary"
//                             : "text-muted-foreground hover:bg-secondary hover:text-foreground"
//                         }`}
//                       >
//                         {dropdownMenus[item.key].name}
//                         <ChevronDown className={`w-4 h-4 transition-transform ${
//                           openDropdown === item.key ? "rotate-180" : ""
//                         }`} />
//                       </button>
                      
//                       {openDropdown === item.key && (
//                         <div className="pl-6 mt-1 space-y-1">
//                           {dropdownMenus[item.key].links.map((link) => (
//                             <Link
//                               key={link.name}
//                               to={link.href}
//                               onClick={() => setIsMenuOpen(false)}
//                               className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                                 isActive(link.href)
//                                   ? "bg-secondary text-primary"
//                                   : "text-muted-foreground hover:bg-secondary hover:text-foreground"
//                               }`}
//                             >
//                               {link.name}
//                             </Link>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 }
                
//                 return (
//                   <Link
//                     key={item.name}
//                     to={item.href}
//                     onClick={() => setIsMenuOpen(false)}
//                     className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
//                       isActive(item.href)
//                         ? "bg-secondary text-primary"
//                         : "text-muted-foreground hover:bg-secondary hover:text-foreground"
//                     }`}
//                   >
//                     {item.name}
//                   </Link>
//                 );
//               })}
              
//               <div className="flex gap-2 mt-2 px-4">
//                 <Button asChild variant="outline" size="sm" className="flex-1">
//                   <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
//                 </Button>
//                 <Button asChild size="sm" className="flex-1">
//                   <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;









// --------- menu without dropdown------------




import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf, User, ShoppingCart, CarTaxiFront } from "lucide-react";
import { Button } from "@/components/ui/button";




const Header = () => {



  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();



  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Quick Links", href: "/quick-links" },
    { name: "Requests", href: "/my-requests" },
    { name: "Reminders", href: "/reminder" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 md:w-12 md:h-12 gradient-primary rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-glow transition-shadow">
              {/* CarTaxiFront - Leaf */}
              <CarTaxiFront  className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
              {/* <img src="/favicon.ico" alt="" className="w-5 h-5 md:w-6 md:h-6"/> */}
            </div>
            <div className="hidden sm:block">
              <span className="text-lg md:text-xl font-bold text-foreground">ON</span>
              <span className="text-lg md:text-xl font-bold text-primary ml-1">WHEELS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors relative py-2 ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* <Button asChild variant="ghost" size="sm">
              <Link to="/login" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Login
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/register">Register</Link>
            </Button> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-secondary text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* <div className="flex gap-2 mt-2 px-4">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                </Button>
                <Button asChild size="sm" className="flex-1">
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
                </Button>
              </div> */}

            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
