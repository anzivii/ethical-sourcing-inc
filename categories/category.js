import { companies } from "../website files/dataset.js";

const tableBody = document.getElementById("table-body");
const title = document.getElementById("category-title");

const params = new URLSearchParams(window.location.search);
const sector = params.get("sector") || "Apparel";

title.textContent = `${sector} Companies`;

const filtered = companies.filter(c => c.sector === sector);

// clear table first (good habit)
tableBody.innerHTML = "";

if (filtered.length === 0) {
  tableBody.innerHTML = `<tr><td colspan="2">No companies found</td></tr>`;
} else {
  filtered.forEach(company => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${company.name}</td>
      <td>${company.rating}</td>
    `;

    tableBody.appendChild(row);
  });
}