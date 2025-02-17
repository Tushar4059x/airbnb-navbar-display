
import { useState } from "react";
import { Globe, Menu, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle navbar background on scroll
  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-md border-b" : "bg-white"
    }`}>
      <div className="max-w-[2520px] mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <svg className="h-8 w-auto text-rose-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.0002 0C5.37024 0 0 5.37024 0 12.0002C0 18.6301 5.37024 24 12.0002 24C18.6301 24 24 18.6301 24 12.0002C24 5.37024 18.6301 0 12.0002 0ZM12.0002 22.0001C6.47724 22.0001 2.00006 17.5229 2.00006 12.0002C2.00006 6.47724 6.47724 2.00006 12.0002 2.00006C17.5229 2.00006 22.0001 6.47724 22.0001 12.0002C22.0001 17.5229 17.5229 22.0001 12.0002 22.0001Z"/>
              </svg>
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-grow max-w-2xl">
            <SearchBar />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:flex items-center gap-2 hover:bg-gray-100 rounded-full">
              Airbnb your home
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-gray-100 rounded-full">
              <Globe className="h-5 w-5" />
            </Button>
            <UserMenu />
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4">
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
