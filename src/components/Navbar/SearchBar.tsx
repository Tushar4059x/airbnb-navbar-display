
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SearchSuggestions from "./SearchSuggestions";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-full h-[48px] border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow px-6 rounded-full bg-white"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <span className="font-medium">Anywhere</span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="hidden sm:inline text-gray-600">Any week</span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="text-gray-400">Add guests</span>
          </div>
          <div className="flex-shrink-0">
            <div className="p-2 bg-rose-500 rounded-full text-white">
              <Search className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/25 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 w-full bg-white rounded-3xl shadow-xl border p-6 z-50 animate-in fade-in slide-in-from-top-4">
            <SearchSuggestions onSelect={(location) => {
              setSearchQuery(location);
              setIsOpen(false);
            }} />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
