
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-8 sm:space-y-0",
        month: "space-y-6",
        caption: "flex justify-center pt-1 relative items-center px-8",
        caption_label: "text-base font-medium",
        nav: "flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "absolute top-0.5 h-8 w-8 p-0 hover:bg-transparent"
        ),
        nav_button_previous: "left-1",
        nav_button_next: "right-1",
        table: "w-full border-collapse mt-4",
        head_row: "flex",
        head_cell: cn(
          "text-muted-foreground w-10 font-normal text-[0.8rem] uppercase"
        ),
        row: "flex w-full mt-1",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          "[&:has([aria-selected])]:bg-transparent"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-10 p-0 font-normal text-[0.9rem] rounded-full hover:bg-accent/90 focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50 data-[disabled]:hover:bg-transparent data-[disabled]:cursor-not-allowed"
        ),
        day_selected: 
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full",
        day_today: "bg-accent/10 text-accent-foreground",
        day_outside:
          "text-muted-foreground/50 opacity-50 hover:bg-transparent hover:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "rounded-full",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4 text-neutral-600" />,
        IconRight: () => <ChevronRight className="h-4 w-4 text-neutral-600" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
