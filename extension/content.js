// load the database of #knowledge and #research (MIGHT be inaccurate)
fetch(chrome.runtime.getURL('brands.json'))
  .then(response => response.json())
  .then(brands => {
    // matching logic to check url
const hostname = window.location.hostname.toLowerCase();

const match = Object.keys(brands).find(key => {
  // 1. Remove spaces from the brand key (e.g., "cvs health" -> "cvshealth")
  const flatKey = key.replace(/\s+/g, '');
  
  // check if site has the brand name
  // Or if the brand name contains the URL (e.g., "cvs health" contains "cvs")
  const firstPart = key.split(' ')[0]; // Gets "cvs" from "cvs health"
  
  return hostname.includes(flatKey) || 
         hostname.includes(key.replace(' ', '')) || 
         hostname.includes(firstPart);
});

//  create the banner!! hooray
function displayAlert(company) {
  const container = document.createElement('div');
  container.style.all = 'initial';
  document.body.prepend(container);

  // make shadow root for style encapsulation
  const shadow = container.attachShadow({mode: 'open'});

  const color = company.rating > 70 ? '#2ecc71' : (company.rating > 40 ? '#f1c40f' : '#e74c3c');

  // put banner into shadow root
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