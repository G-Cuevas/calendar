import { getYearElement } from "./helpers/getYearElement";
import "./style.css";

const form = document.querySelector<HTMLFormElement>("#date")!;
const startDateInput = document.querySelector<HTMLInputElement>("#startDate")!;
const endDateInput = document.querySelector<HTMLInputElement>("#endDate")!;
const calendar = document.querySelector<HTMLDivElement>("#calendar")!;

startDateInput.value = new Date().toISOString().split("T")[0];
endDateInput.value = new Date().toISOString().split("T")[0];

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

  if (startDate > endDate) {
    alert("La fecha de inicio no puede ser mayor a la fecha final");
    return;
  }

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
