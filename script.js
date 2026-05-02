import { companies } from "./dataset.js";

const input = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");
const resultContainer = document.getElementById("resultContainer");

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
      <div class="main-box">
        <h3>${company.name}</h3>
        <p><strong>Sector:</strong> ${company.sector}</p>
        <p><strong>Rating:</strong> ${company.rating}</p>
      </div>

      <div class="details-box">
        <h4>Additional Insights</h4>
        <p><strong>HRDD Tier:</strong> ${company.hrdd}</p>
        <p><strong>Child/Forced Labor Risk:</strong> ${company.laborRisk}</p>
        <p><strong>Sustainability:</strong> ${company.sustainability}</p>
      </div>

      <div class ="other-box">
        <h4>Summary and Explanation</h4>
        <p><strong>Summary:</strong> ${company.summary}</p>
        <p><strong>Explanation:</strong> ${company.explanation}</p>
      </div>
    `;
    });

    suggestions.appendChild(div);
  });
}

// hide dropdown + results when clicking outside
div.addEventListener("click", () => {
  input.value = company.name;
  suggestions.style.display = "none";
});



function toggleDropdown() {
  document.getElementById("dropdown").classList.toggle("show");
}

function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}

window.onclick = function(e) {
  if (!e.target.matches('.dropdown-btn')) {
    const dropdown = document.getElementById("dropdown");
    if (dropdown.classList.contains('show')) {
      dropdown.classList.remove('show');
    }
  }
}