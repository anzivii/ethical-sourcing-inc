import { companies } from "../website files/dataset.js";

const input = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");

input.addEventListener("focus", showSuggestions);
input.addEventListener("input", showSuggestions);

function showSuggestions() {
  const query = input.value.toLowerCase();

  if (!query) {
    suggestions.style.display = "none";
    return;
  }

  suggestions.innerHTML = "";
  suggestions.style.display = "block";

  const filtered = companies.filter(c =>
    c.name.toLowerCase().includes(query)
  );

  filtered.slice(0, 8).forEach(company => {
    const div = document.createElement("div");

    div.classList.add("suggestion-item");
    div.textContent = company.name;

    div.addEventListener("click", () => {

      // redirect to homepage with selected company
      window.location.href =
        `../website files/index2.html?company=${encodeURIComponent(company.name)}`;

    });

    suggestions.appendChild(div);
  });
}

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