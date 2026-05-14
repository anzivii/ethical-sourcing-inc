// category page JavaScript, this handles the search bar and populating the company table based on the selected category
import { companies } from "../website files/dataset.js";

// search bar functionality, this is the same code as the search bar on the homepage, but we want to show suggestions on focus here as well since users might want to quickly jump to a different company category without going back to the homepage
const input = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");

// show suggestions when user focuses or types in the search bar (we want to show suggestions on focus so that users can see popular companies even before typing)
input.addEventListener("focus", showSuggestions);
input.addEventListener("input", showSuggestions);

// hide suggestions when user clicks outside the search bar or suggestions container, this is important for user experience so that the suggestions don't stay open when not needed
function showSuggestions() {
  const query = input.value.toLowerCase();

  if (!query) {
    suggestions.style.display = "none";
    return;
  }

  suggestions.innerHTML = "";
  suggestions.style.display = "block";
  // filter companies based on search query, we use includes here for a more flexible search experience (users can type any part of the company name to find it)
  const filtered = companies.filter(c =>
    c.name.toLowerCase().includes(query)
  );
  // show up to 8 suggestions, we limit the number of suggestions to avoid overwhelming the user and to keep the UI clean
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
const title = document.getElementById("category-title"); // get category from URL parameters, we use URLSearchParams to easily extract the selected category from the URL, this allows us to dynamically populate the page based on the category the user selected on the homepage

const params = new URLSearchParams(window.location.search); // get the "sector" parameter from the URL, this is the parameter we set when the user clicks on a category on the homepage, it tells us which category of companies to show on this page
const sector = params.get("sector") || "Apparel"; // default to Apparel if no sector is provided, this ensures that the page still shows something even if the URL is missing the sector parameter

// set the page title based on the selected category, this makes it clear to the user which category they are viewing and provides context for the company table below
title.textContent = `${sector} Companies`;

// filter companies based on selected category, we use the "sector" property of each company to determine which companies belong to the selected category
const filtered = companies.filter(c => c.sector === sector);

// clear table first before populating with new data (need to make sure data is correct and the old search data isn't still showing)
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