import { companies } from "../website files/dataset.js";

const input = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");
const resultContainer = document.getElementById("resultContainer");

input.addEventListener("focus", showSuggestions);
input.addEventListener("input", showSuggestions);

function getWidth(value) {
  if (value === "High" || value === "Leader") return 90;
  if (value === "Strong" || value === "Medium") return 70;
  if (value === "Moderate") return 50;
  if (value === "Weak" || value === "Low") return 30;
  return 40;
}

function getRatingLabel(score) {
  if (score >= 80) return "Very Ethical";
  if (score >= 60) return "Ethical";
  if (score >= 40) return "Moderate";
  return "Unethical";
}

function getAlternatives(company) {
  return companies
    .filter(c =>
      c.sector === company.sector &&
      c.rating > 50 &&
      c.name !== company.name
    )
    .slice(0, 2);
}

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
      input.value = company.name;
      suggestions.style.display = "none";

      resultContainer.style.display = "block";
      const alternatives = getAlternatives(company);
      resultContainer.innerHTML = `
        <div class="card">

          <div class="card-header">
            <h2>${company.name}</h2>

            <div class="score-wrapper">
              <div class="score-circle" style="--score:${company.rating}">
                ${company.rating}
              </div>
              <p class="score-label">
                Ethical Score • ${getRatingLabel(company.rating)}
              </p>
            </div>
          </div>

          <p class="sector"> Sector: ${company.sector}</p> <br>

          <div class="bars">

            <div class="bar">
              <div class="bar-top">
                <span>HRDD</span>
                <span class="value">${company.hrdd}</span>
              </div>
              <div class="progress">
                <div style="width: ${getWidth(company.hrdd)}%"></div>
              </div>
            </div>

            <div class="bar">
              <div class="bar-top">
                <span>Labor Risk</span>
                <span class="value">${company.laborRisk}</span>
              </div>
              <div class="progress">
                <div style="width: ${getWidth(company.laborRisk)}%"></div>
              </div>
            </div>

            <div class="bar">
              <div class="bar-top">
                <span>Sustainability</span>
                <span class="value">${company.sustainability}</span>
              </div>
              <div class="progress">
                <div style="width: ${getWidth(company.sustainability)}%"></div>
              </div>
            </div>

          </div>

          <div class="extra-info">
            <h4>Summary</h4>
            <p>${company.summary}</p>

            <h4>Explanation</h4>
            <p>${company.explanation}</p>
          </div>

        </div>
        ${company.rating < 40 ? `
          <p class="warning">⚠️ This company has low ethical performance</p>
      <div class="alternatives">
        <h4>Better Alternatives</h4>
         ${alternatives.length > 0 ? alternatives.map(alt => `
      <div class="alt-card">
        <strong>${alt.name}</strong> (${alt.rating})
        <p>${alt.summary}</p>
      </div>
      `).join("") : `<p>No better alternatives found.</p>`}
  </div>
` : ""}
      `;
    });

    suggestions.appendChild(div);
  });
}

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
};