import { months, weekDays } from "../constants/constants";
import { DateRange } from "../interface/date-range";
import { getDayElement } from "./getDayElement";

export const getMonthElement = (
  year: number,
  monthIndex: number,
  dateRange: DateRange
) => {
  const month = months[monthIndex];

  const allDays = weekDays.map((weekDay) => `<div>${weekDay}</div>`);

  const firstDay = new Date();
  firstDay.setFullYear(year);
  firstDay.setMonth(monthIndex);
  firstDay.setDate(1);

  const emptyDays = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

  for (let i = 0; i < emptyDays; i++) {
    allDays.push(getDayElement(null, monthIndex, year, dateRange));
  }

  for (let i = 1; i <= month.totalDays; i++) {
    allDays.push(getDayElement(i, monthIndex, year, dateRange));
  }

  return `
    <div class="month">
        <div>${month.name}</div>
        <div class="day-container">${allDays.join("")}</div>
    </div>
  `;
};
