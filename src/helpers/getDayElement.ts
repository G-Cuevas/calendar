import { months } from "../constants/constants";
import { DateRange } from "../interface/date-range";

export const getDayElement = (
  day: number | null,
  monthIndex: number,
  year: number,
  dateRange: DateRange
) => {
  if (!day) return `<div class="day" style="color: gray;"></div>`;

  const holidays = months[monthIndex].holidays || [];

  const date = new Date();
  date.setFullYear(year);
  date.setMonth(monthIndex);
  date.setDate(day);
  date.setHours(0, 0, 0, 0);

  const dayColor = (() => {
    const isOutOfRange = date < dateRange.startDate || date > dateRange.endDate;
    if (isOutOfRange) return "gray";

    const isHoliday = holidays.includes(day);
    if (isHoliday) return "orange";

    const isWeekend = [0, 6].includes(date.getDay());
    if (isWeekend) return "yellow";

    return "green";
  })();

  return `<div class="day" style="background-color: ${dayColor};">${day}</div>`;
};
