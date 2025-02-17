import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

// Utility function to merge class names
const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

const Calendar = () => {
  const [selectedView, setSelectedView] = React.useState('dates');
  const [selectedRange, setSelectedRange] = React.useState('exact');
  
  const renderCalendarGrid = (month, year) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    const weeks = [];
    
    // Get day names
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Current date for highlighting
    const today = new Date();
    const currentDate = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Add days from previous month
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(
        <div key={`prev-${i}`} className="w-10 h-10 flex items-center justify-center text-neutral-300">
          {new Date(year, month, -firstDayOfWeek + i + 1).getDate()}
        </div>
      );
    }

    // Add days of current month
    for (let date = 1; date <= lastDay.getDate(); date++) {
      const isToday = date === currentDate && month === currentMonth && year === currentYear;
      days.push(
        <div
          key={date}
          className={cn(
            "w-10 h-10 flex items-center justify-center rounded-full",
            isToday ? "bg-neutral-100" : "",
            "hover:bg-neutral-50 cursor-pointer"
          )}
        >
          {date}
        </div>
      );
    }

    // Split days into weeks
    while (days.length) {
      weeks.push(
        <div key={weeks.length} className="flex justify-between">
          {days.splice(0, 7)}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <div className="flex justify-between">
          {dayNames.map(day => (
            <div key={day} className="w-10 text-center text-sm text-neutral-600">
              {day}
            </div>
          ))}
        </div>
        {weeks}
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-sm">
      {/* View Toggle */}
      <div className="flex gap-2 p-1 bg-neutral-100 rounded-lg w-fit mb-6">
        {['Dates', 'Months', 'Flexible'].map((view) => (
          <button
            key={view}
            className={cn(
              "px-4 py-1 rounded-md text-sm",
              selectedView === view.toLowerCase()
                ? "bg-white shadow-sm"
                : "text-neutral-600"
            )}
            onClick={() => setSelectedView(view.toLowerCase())}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <button className="p-2">
          <ChevronLeft className="h-4 w-4 text-neutral-600" />
        </button>
        <div className="flex gap-16">
          <h2 className="text-lg font-medium">February 2025</h2>
          <h2 className="text-lg font-medium">March 2025</h2>
        </div>
        <button className="p-2">
          <ChevronRight className="h-4 w-4 text-neutral-600" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="flex gap-16">
        <div className="flex-1">
          {renderCalendarGrid(1, 2025)}
        </div>
        <div className="flex-1">
          {renderCalendarGrid(2, 2025)}
        </div>
      </div>

      {/* Range Selector */}
      <div className="flex gap-2 mt-6">
        {[
          { label: 'Exact dates', value: 'exact' },
          { label: '± 1 day', value: '1day' },
          { label: '± 2 days', value: '2days' },
          { label: '± 3 days', value: '3days' },
          { label: '± 7 days', value: '7days' },
          { label: '± 14 days', value: '14days' },
        ].map(({ label, value }) => (
          <button
            key={value}
            className={cn(
              "px-4 py-2 rounded-full text-sm border",
              selectedRange === value
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 text-neutral-600"
            )}
            onClick={() => setSelectedRange(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export {Calendar};