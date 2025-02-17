
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";

type MenuType = "where" | "check-in" | "check-out" | "who" | null;

const SearchBar = () => {
  const [activeMenu, setActiveMenu] = useState<MenuType>(null);
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);

  const handleButtonClick = (menu: MenuType) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 p-2 border border-gray-200 rounded-full bg-white shadow-sm">
        {/* Where */}
        <Button
          variant="ghost"
          onClick={() => handleButtonClick("where")}
          className={cn(
            "rounded-full h-auto py-4 px-6 hover:bg-gray-100",
            activeMenu === "where" && "bg-gray-100"
          )}
        >
          <div className="text-left">
            <div className="font-medium">Where</div>
            <div className="text-sm text-gray-500">
              {location || "Search destinations"}
            </div>
          </div>
        </Button>

        <div className="h-8 w-[1px] bg-gray-200" />

        {/* Check-in */}
        <Button
          variant="ghost"
          onClick={() => handleButtonClick("check-in")}
          className={cn(
            "rounded-full h-auto py-4 px-6 hover:bg-gray-100",
            activeMenu === "check-in" && "bg-gray-100"
          )}
        >
          <div className="text-left">
            <div className="font-medium">Check in</div>
            <div className="text-sm text-gray-500">
              {checkIn ? format(checkIn, "MMM d") : "Add dates"}
            </div>
          </div>
        </Button>

        <div className="h-8 w-[1px] bg-gray-200" />

        {/* Check-out */}
        <Button
          variant="ghost"
          onClick={() => handleButtonClick("check-out")}
          className={cn(
            "rounded-full h-auto py-4 px-6 hover:bg-gray-100",
            activeMenu === "check-out" && "bg-gray-100"
          )}
        >
          <div className="text-left">
            <div className="font-medium">Check out</div>
            <div className="text-sm text-gray-500">
              {checkOut ? format(checkOut, "MMM d") : "Add dates"}
            </div>
          </div>
        </Button>

        <div className="h-8 w-[1px] bg-gray-200" />

        {/* Who */}
        <Button
          variant="ghost"
          onClick={() => handleButtonClick("who")}
          className={cn(
            "rounded-full h-auto py-4 px-6 hover:bg-gray-100",
            activeMenu === "who" && "bg-gray-100"
          )}
        >
          <div className="text-left">
            <div className="font-medium">Who</div>
            <div className="text-sm text-gray-500">
              {guests === 1 ? "1 guest" : `${guests} guests`}
            </div>
          </div>
        </Button>

        <Button size="icon" className="bg-rose-500 hover:bg-rose-600 rounded-full ml-2">
          <Search className="h-4 w-4 text-white" />
        </Button>
      </div>

      {/* Dropdown Menus */}
      {activeMenu && (
        <>
          <div
            className="fixed inset-0 bg-black/25 z-40"
            onClick={() => setActiveMenu(null)}
          />
          <div className="absolute top-full left-0 w-full bg-white rounded-3xl shadow-xl border p-6 mt-2 z-50">
            {activeMenu === "where" && (
              <div className="max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold mb-4">Where to?</h3>
                <input
                  type="text"
                  placeholder="Search destinations"
                  className="w-full p-4 border rounded-xl"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            )}

            {(activeMenu === "check-in" || activeMenu === "check-out") && (
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-2 gap-8">
                  <Calendar
                    mode="single"
                    selected={activeMenu === "check-in" ? checkIn : checkOut}
                    onSelect={(date) => {
                      if (activeMenu === "check-in") {
                        setCheckIn(date);
                        setActiveMenu("check-out");
                      } else {
                        setCheckOut(date);
                        setActiveMenu(null);
                      }
                    }}
                    disabled={activeMenu === "check-out" ? { before: checkIn } : undefined}
                    initialFocus
                  />
                  <Calendar
                    mode="single"
                    selected={activeMenu === "check-in" ? checkIn : checkOut}
                    onSelect={(date) => {
                      if (activeMenu === "check-in") {
                        setCheckIn(date);
                        setActiveMenu("check-out");
                      } else {
                        setCheckOut(date);
                        setActiveMenu(null);
                      }
                    }}
                    month={addDays(new Date(), 30)}
                    disabled={activeMenu === "check-out" ? { before: checkIn } : undefined}
                    initialFocus
                  />
                </div>
                <div className="flex gap-2 mt-4 justify-center">
                  {[1, 2, 3, 7, 14].map((days) => (
                    <Button
                      key={days}
                      variant="outline"
                      className="rounded-full"
                      onClick={() => {
                        if (activeMenu === "check-in") {
                          const date = new Date();
                          setCheckIn(date);
                          setCheckOut(addDays(date, days));
                          setActiveMenu(null);
                        }
                      }}
                    >
                      ± {days} {days === 1 ? "day" : "days"}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {activeMenu === "who" && (
              <div className="max-w-sm mx-auto">
                <h3 className="text-lg font-semibold mb-4">Who's coming?</h3>
                <div className="flex items-center justify-between">
                  <span>Guests</span>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                    >
                      -
                    </Button>
                    <span>{guests}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setGuests(guests + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
