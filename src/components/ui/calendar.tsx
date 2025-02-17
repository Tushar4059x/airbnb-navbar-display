import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

const Calendar = () => {
  const [selectedView, setSelectedView] = React.useState('dates');
  const [selectedRange, setSelectedRange] = React.useState('2days');
  const [selectedDate, setSelectedDate] = React.useState(17); // For the blue highlight example
  
  const renderCalendarGrid = (month, year) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    const weeks = [];
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Add days from previous month
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -firstDayOfWeek + i + 1).getDate();
      days.push(
        <div key={`prev-${i}`} className="w-12 h-12 flex items-center justify-center text-neutral-300">
          {prevMonthDay}
        </div>
      );
    }

    // Add days of current month
    for (let date = 1; date <= lastDay.getDate(); date++) {
      const isSelected = date === selectedDate && month === 1; // February
      days.push(
        <div
          key={date}
          className={cn(
            "w-12 h-12 flex items-center justify-center rounded-full cursor-pointer",
            isSelected ? "bg-blue-50 font-medium" : "hover:border hover:border-neutral-200",
          )}
          onClick={() => setSelectedDate(date)}
        >
          {date}
        </div>
      );
    }

    // Fill in remaining days from next month
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push(
        <div key={`next-${i}`} className="w-12 h-12 flex items-center justify-center text-neutral-300">
          {i}
        </div>
      );
    }

    // Split days into weeks
    while (days.length) {
      weeks.push(
        <div key={weeks.length} className="flex">
          {days.splice(0, 7)}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <div className="flex mb-4">
          {dayNames.map(day => (
            <div key={day} className="w-12 text-center text-xs text-neutral-600">
              {day}
            </div>
          ))}
        </div>
        <div className="space-y-1">
          {weeks}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl p-6 bg-white rounded-3xl">
      {/* View Toggle */}
      <div className="flex gap-1 bg-gray-100 w-fit rounded-full p-1 mb-8">
        {['Dates', 'Months', 'Flexible'].map((view) => (
          <button
            key={view}
            className={cn(
              "px-6 py-2 rounded-full text-sm",
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
      <div className="flex justify-between items-center mb-8">
        <button className="p-2 hover:bg-gray-50 rounded-full">
          <ChevronLeft className="h-4 w-4 text-neutral-600" />
        </button>
        <div className="flex gap-[11rem]">
          <h2 className="text-base font-medium">February 2025</h2>
          <h2 className="text-base font-medium">March 2025</h2>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-full">
          <ChevronRight className="h-4 w-4 text-neutral-600" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="flex gap-8">
        <div className="flex-1">
          {renderCalendarGrid(1, 2025)}
        </div>
        <div className="flex-1">
          {renderCalendarGrid(2, 2025)}
        </div>
      </div>

      {/* Range Selector */}
      <div className="flex flex-wrap gap-2 mt-8">
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
              "px-4 py-2 rounded-full text-sm",
              selectedRange === value
                ? "bg-black text-white"
                : "border border-gray-200 text-neutral-600 hover:border-gray-300"
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