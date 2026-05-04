// 1. Load the database
fetch(chrome.runtime.getURL('brands.json'))
  .then(response => response.json())
  .then(brands => {
    // 2. Get the current website name (e.g., "www.nestle.com" -> "nestle")
    const hostname = window.location.hostname;
    const cleanName = hostname.replace('www.', '').split('.')[0];

    // 3. Search the database
    if (brands[cleanName]) {
      const company = brands[cleanName];
      displayAlert(company);
    }
  });

// 4. Create the visual "Flag" on the website
function displayAlert(company) {
  const banner = document.createElement('div');
  
  // Styling the banner based on rating
  const color = company.rating > 70 ? '#2ecc71' : (company.rating > 40 ? '#f1c40f' : '#e74c3c');
  
  banner.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; 
    background: ${color}; color: white; z-index: 999999;
    text-align: center; padding: 15px; font-family: sans-serif;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2); font-weight: bold;
  `;
  
  banner.innerHTML = `
    Ethical Rating for ${company.name}: ${company.rating}/100 (${company.tier}) 
    <br><small style="font-weight:normal">${company.summary}</small>
    <button id="close-ethical-banner" style="margin-left:20px; cursor:pointer;">X</button>
  `;
  
  document.body.prepend(banner);

  document.getElementById('close-ethical-banner').onclick = () => banner.remove();
}