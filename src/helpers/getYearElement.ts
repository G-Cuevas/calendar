import { DateRange } from "../interface/date-range";
import { getMonthElement } from "./getMonthElement";

export const getYearElement = (year: number, dateRange: DateRange) => {
  const allMonths = [];

  for (let i = 0; i < 12; i++) {
    allMonths.push(getMonthElement(year, i, dateRange));
  }

  return `
    <div class="year">
        <div class="year-title">${year}</div>
        <div class="month-container">${allMonths.join("")}</div>
    </div>
  `;
};
