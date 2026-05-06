// 1. Load the database
fetch(chrome.runtime.getURL('brands.json'))
  .then(response => response.json())
  .then(brands => {
    // NEW ROBUST MATCHING LOGIC
const hostname = window.location.hostname.toLowerCase();

const match = Object.keys(brands).find(key => {
  // 1. Remove spaces from the brand key (e.g., "cvs health" -> "cvshealth")
  const flatKey = key.replace(/\s+/g, '');
  
  // 2. Check if the URL contains the brand name (e.g., "cvs.com" contains "cvs")
  // Or if the brand name contains the URL (e.g., "cvs health" contains "cvs")
  const firstPart = key.split(' ')[0]; // Gets "cvs" from "cvs health"
  
  return hostname.includes(flatKey) || 
         hostname.includes(key.replace(' ', '')) || 
         hostname.includes(firstPart);
});

// 4. Create the visual "Flag" on the website
function displayAlert(company) {
  // Create a container and attach it to the very top of the body
  const container = document.createElement('div');
  container.style.all = 'initial'; // Reset all inherited styles
  document.body.prepend(container);

  // Create the Shadow Root
  const shadow = container.attachShadow({mode: 'open'});

  const color = company.rating > 70 ? '#2ecc71' : (company.rating > 40 ? '#f1c40f' : '#e74c3c');

  // Inject the banner into the Shadow Root
  shadow.innerHTML = `
    <style>
      .ethical-banner {
        position: fixed; top: 0; left: 0; width: 100%;
        background: ${color}; color: white; z-index: 2147483647;
        text-align: center; padding: 15px; font-family: sans-serif;
        font-weight: bold; box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      }
      button { 
        margin-left: 20px; cursor: pointer; border: 1px solid white; 
        background: transparent; color: white; border-radius: 4px;
      }
    </style>
    <div class="ethical-banner">
      ⚠️ ${company.name} Ethical Rating: ${company.rating}/100
      <button id="close">Dismiss</button>
    </div>
  `;

  shadow.getElementById('close').onclick = () => container.remove();
}

    if (match) {
      const companyData = brands[match];
      displayAlert(companyData);
    }
  })
  .catch(error => console.error('Error loading brands.json:', error));  