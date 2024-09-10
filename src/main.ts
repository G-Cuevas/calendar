import { months } from "./constants/months";
import { weekDays } from "./constants/weekDays";
import { DateRange } from "./interface/date-range";
import "./style.css";

const form = document.querySelector<HTMLFormElement>("#date")!;
const startDateInput = document.querySelector<HTMLInputElement>("#startDate")!;
const endDateInput = document.querySelector<HTMLInputElement>("#endDate")!;
const calendar = document.querySelector<HTMLDivElement>("#calendar")!;

startDateInput.value = new Date().toISOString().split("T")[0];
endDateInput.value = new Date().toISOString().split("T")[0];

const getDayElement = (
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

const getMonthElement = (
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

const getYearElement = (year: number, dateRange: DateRange) => {
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

form.addEventListener("submit", (e) => {
  calendar.innerHTML = "";
  e.preventDefault();

  if (!startDateInput.value || !endDateInput.value) {
    alert("Favor de seleccionar las fechas");
    return;
  }

  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);
  startDate.setHours(24, 0, 0, 0);
  endDate.setHours(24, 0, 0, 0);

  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  const years = [];

  for (let i = startYear; i <= endYear; i++) {
    years.push(getYearElement(i, { startDate, endDate }));
  }

  calendar.innerHTML = `
    <div>
      ${years.join("")}
    </  
  `;
});
