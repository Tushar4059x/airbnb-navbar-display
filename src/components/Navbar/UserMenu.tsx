
import { Menu, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-3 rounded-full border-gray-200 hover:shadow-md transition-shadow p-2 md:p-4"
        >
          <Menu className="h-4 w-4" />
          <Avatar className="h-7 w-7">
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px] mt-2">
        <DropdownMenuItem className="cursor-pointer font-medium">
          Sign up
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Log in
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          Airbnb your home
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Help Center
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
