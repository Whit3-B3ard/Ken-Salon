import { format, formatISO, isBefore, parse } from "date-fns";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { now, OPENING_HOURS_INTERVAL } from "../../constants/config";
import { getOpeningTimes, roundToNearestMinutes } from "../../utils/helper";
import "./Calendar.css";
console.log("DynamicCalendar import reached");
const DynamicCalendar = dynamic(() => import("react-calendar"), { ssr: false });

const CalendarComponent = ({ days = [], closedDays }) => {
  const router = useRouter();
  days = [
    { dayOfWeek: 1, openTime: "10:00", closeTime: "20:30" },
    { dayOfWeek: 2, openTime: "10:00", closeTime: "20:30" },
    { dayOfWeek: 3, openTime: "10:00", closeTime: "20:30" },
    { dayOfWeek: 4, openTime: "10:00", closeTime: "20:30" },
    { dayOfWeek: 5, openTime: "10:00", closeTime: "20:30" },
    { dayOfWeek: 6, openTime: "10:00", closeTime: "20:30" },
    { dayOfWeek: 7, openTime: "10:00", closeTime: "20:30" },
  ];
  // Determine if today is closed
  const today = days.find((d) => d.dayOfWeek === (now.getDay() + 1));
  console.log("days:" + days);
  console.log("now get day:" + now.getDay());
  if (!today) {
    // Handle the scenario when today is not found.
    // For example, return null or some placeholder content
    return <div>No data available for today.</div>; // or handle this scenario appropriately
  }
  const rounded = roundToNearestMinutes(now, OPENING_HOURS_INTERVAL);
  const closing = parse(today.closeTime, "kk:mm", now);
  const tooLate = !isBefore(rounded, closing);
  if (tooLate) {
    return <div className="h-screen w-full flex justify-center">
     <div>
      <h1>sorry we are closed right now</h1>
      </div> 
      </div>;
  };
  // closedDays.push(formatISO(new Date().setHours(0, 0, 0, 0)))
  const [date, setDate] = useState({
    justDate: null,
    dateTime: null,
  });

  useEffect(() => {
    if (date.dateTime) {
      localStorage.setItem("selectedTime", date.dateTime.toISOString());
      router.push("/menu");
    }
  }, [date.dateTime, router]);

  const times = date.justDate && getOpeningTimes(date.justDate, days);

  return (
    <div className="flex h-screen w-3/4 flex-col items-center   ml-8 pl-2">
      {date.justDate ? (
        <div className="border-2 border-gray-500 p-8 rounded-xl">
          <div className="flex  flex-wrap gap-4">
            {times?.map((time, i) => (
              <div
                className="rounded-xl bg-gray-100 hover:bg-blue-50 p-2"
                key={`time-${i}`}
              >
                <button
                  onClick={() =>
                    setDate((prev) => ({ ...prev, dateTime: time }))
                  }
                  type="button"
                >
                  {format(time, "kk:mm")}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <DynamicCalendar
          minDate={now}
          className="REACT-CALENDAR p-2"
          view="month"
          tileDisabled={({ date }) =>
            Array.isArray(closedDays) && closedDays.includes(formatISO(date))
          }
          onClickDay={(date) =>
            setDate((prev) => ({ ...prev, justDate: date }))
          }
        />
      )}
    </div>
  );
};

export default CalendarComponent;
