import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar as CalendarIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DateRangeFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState<Date | null>(() => {
    const fromDate = searchParams.get("fromDate");
    return fromDate ? new Date(fromDate) : null;
  });
  const [endDate, setEndDate] = useState<Date | null>(() => {
    const toDate = searchParams.get("toDate");
    return toDate ? new Date(toDate) : null;
  });
  const [showApplyDateButton, setShowApplyDateButton] = useState(false);
  const handleDateChange = (date: Date | null, field: string) => {
    if (field === "startDate") {
        setStartDate(date);
        if (date) {
          searchParams.set("fromDate", date.toISOString());
        } else {
          searchParams.delete("fromDate");
        }
      } else {
        setEndDate(date);
        if (date) {
          searchParams.set("toDate", date.toISOString());
        } else {
          searchParams.delete("toDate");
        }
      }
      setShowApplyDateButton(true);
  };

  const applyDateToData = () => {
    if (startDate && endDate) {
      setSearchParams(searchParams);
      navigate(`?${searchParams.toString()}`);
    }
    return;
  };

  useEffect(() => {
    if (startDate && endDate) {
      setShowApplyDateButton(true);
    } else {
      setShowApplyDateButton(false);
    }
  }, [startDate, endDate]);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-2 dark:text-white">
        {/* From Date */}

        <div className="relative max-w-sm col-span-3 mb-4 md:mb-0">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="flex justify-end dark:text-white ">
            <span className="border-l border-gray-500 h-6 mr-2"></span>
            <p>from date</p>
          </div>
          <DatePicker
            selected={startDate}
            onChange={(date) => handleDateChange(date, "startDate")}
            dateFormat="dd/MM/yyyy"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholderText="Select from date"
            maxDate={new Date()}
          />
        </div>

        {/* To Date */}
        <div className="relative max-w-sm col-span-3">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="flex justify-end dark:text-white ">
            <span className="border-l border-gray-500 h-6 mr-2"></span>
            <p>to date</p>
          </div>
          <DatePicker
            selected={endDate}
            onChange={(date) => handleDateChange(date, "toDate")}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()} // Prevent selecting future dates
            minDate={startDate ? startDate : new Date()}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholderText="Select to date"
          />
        </div>
        {showApplyDateButton && (
          <div className="flex flex-col">
            <div className="flex justify-end dark:text-white ">
              <span className="border-l border-gray-500 h-6 mr-2"></span>
              {/* <p>click</p> */}
            </div>
            <Button onClick={applyDateToData}>show data</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default DateRangeFilter;
