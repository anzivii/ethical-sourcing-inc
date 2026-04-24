import { companies } from "./dataset.js";

const input = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");
const resultContainer = document.getElementById("resultContainer");

input.addEventListener("focus", showSuggestions);
input.addEventListener("input", showSuggestions);

function showSuggestions() {
  const query = input.value.toLowerCase();
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
      input.value = company.name;
      suggestions.style.display = "none";

      // SHOW RESULT BOX
      resultContainer.style.display = "block";
      resultContainer.innerHTML = `
        <h3>${company.name}</h3>
        <p><strong>Sector:</strong> ${company.sector}</p>
        <p><strong>Rating:</strong> ${company.rating}</p>
      `;
    });

    suggestions.appendChild(div);
  });
}

// hide dropdown + results when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-container")) {
    suggestions.style.display = "none";
  }
});