import { useState } from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';

interface ParkingCalendarProps {
  selectedDates: Date[];
  onSelectDates: (dates: Date[]) => void;
}

export function ParkingCalendar({ selectedDates, onSelectDates }: ParkingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'
  ];

  const dayNames = ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'];

  const isDateSelected = (date: Date) => {
    return selectedDates.some(d => 
      d.getDate() === date.getDate() &&
      d.getMonth() === date.getMonth() &&
      d.getFullYear() === date.getFullYear()
    );
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 7);
    
    return date < minDate;
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    if (isDateDisabled(clickedDate)) return;

    if (isDateSelected(clickedDate)) {
      onSelectDates(selectedDates.filter(d => 
        !(d.getDate() === clickedDate.getDate() &&
          d.getMonth() === clickedDate.getMonth() &&
          d.getFullYear() === clickedDate.getFullYear())
      ));
    } else {
      onSelectDates([...selectedDates, clickedDate]);
    }
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    // Calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const selected = isDateSelected(date);
      const disabled = isDateDisabled(date);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          disabled={disabled}
          className={`
            aspect-square rounded-lg transition-all
            ${selected 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : disabled
              ? 'text-gray-300 cursor-not-allowed'
              : 'bg-white text-gray-900 hover:bg-gray-100 border border-gray-200'
            }
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-gray-900">
            <strong>Viktig informasjon:</strong> I henhold til parkeringsvilkårene må du søke minst 7 dager i forveien. Dette gir styret og P-service nødvendig tid til å registrere bilen i systemet.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {renderCalendarDays()}
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-600 rounded" />
          <span className="text-gray-600">Valgt</span>
        </div>
      </div>

      {selectedDates.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-gray-900">
            {selectedDates.length} {selectedDates.length === 1 ? 'dag' : 'dager'} valgt
          </p>
        </div>
      )}
    </div>
  );
}