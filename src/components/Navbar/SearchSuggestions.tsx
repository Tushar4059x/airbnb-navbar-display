
import { Building2, Navigation } from "lucide-react";

interface Location {
  id: number;
  name: string;
  description: string;
  type: "nearby" | "popular";
}

const locations: Location[] = [
  {
    id: 1,
    name: "Current location",
    description: "Find stays near you",
    type: "nearby"
  },
  {
    id: 2,
    name: "New York",
    description: "Explore the city life",
    type: "popular"
  },
  {
    id: 3,
    name: "Los Angeles",
    description: "Beach and entertainment",
    type: "popular"
  },
  {
    id: 4,
    name: "Miami",
    description: "Tropical paradise",
    type: "popular"
  }
];

interface SearchSuggestionsProps {
  onSelect: (location: string) => void;
}

const SearchSuggestions = ({ onSelect }: SearchSuggestionsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Nearby</h3>
        <div className="grid gap-4">
          {locations
            .filter(location => location.type === "nearby")
            .map(location => (
              <button
                key={location.id}
                className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors"
                onClick={() => onSelect(location.name)}
              >
                <div className="p-3 bg-gray-100 rounded-xl">
                  <Navigation className="h-6 w-6 text-gray-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{location.name}</div>
                  <div className="text-sm text-gray-500">{location.description}</div>
                </div>
              </button>
            ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Popular destinations</h3>
        <div className="grid gap-4">
          {locations
            .filter(location => location.type === "popular")
            .map(location => (
              <button
                key={location.id}
                className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors"
                onClick={() => onSelect(location.name)}
              >
                <div className="p-3 bg-gray-100 rounded-xl">
                  <Building2 className="h-6 w-6 text-gray-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{location.name}</div>
                  <div className="text-sm text-gray-500">{location.description}</div>
                </div>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;
