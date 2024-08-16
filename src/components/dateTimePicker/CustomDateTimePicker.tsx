import  { useState } from 'react';
import Datetime from 'react-datetime';
import moment, { Moment } from 'moment';
import 'react-datetime/css/react-datetime.css';

const CustomDateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Moment | undefined>(undefined);

  const isValidDate = (current: Moment) => {
    const today = moment().startOf('day');
    const fiveHoursFromNow = moment().add(5, 'hours');
    // Allow selecting today but restrict the time to at least 5 hours from now
    if (current.isSame(today, 'day')) {
      return current.isAfter(fiveHoursFromNow);
    }
    // Allow selecting any date after today
    return current.isAfter(today);
  };

  const handleDateChange = (date: string | Moment | null) => {
    if (moment.isMoment(date) && date.isValid()) {
      setSelectedDate(date);
    } else {
      setSelectedDate(undefined);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Select Date and Time (at least 5 hours from now)
      </label>
      <Datetime
        inputProps={{ placeholder: 'Select Date and Time' }}
        isValidDate={isValidDate}
        onChange={handleDateChange}
        value={selectedDate || ''}
      />
      {selectedDate && (
        <div className="mt-2 text-sm text-gray-500">
          Selected Date and Time: {selectedDate.format('MMMM Do YYYY, h:mm:ss a')}
        </div>
      )}
    </div>
  );
};

export default CustomDateTimePicker;
