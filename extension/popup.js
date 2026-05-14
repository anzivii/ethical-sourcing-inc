async function loadPopupData() {
  // acquire current tab ☝️🤓
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab.url) return;
  
  const url = new URL(tab.url);
  const hostname = url.hostname.toLowerCase();

  // load database
  const response = await fetch(chrome.runtime.getURL('brands.json'));
  const brands = await response.json();

  // matching logic to check url
  const match = Object.keys(brands).find(key => {
    const flatKey = key.replace(/\s+/g, '');
    const firstPart = key.split(' ')[0];
    
    return hostname.includes(flatKey) || 
           hostname.includes(key.replace(' ', '')) || 
           hostname.includes(firstPart);
  });

  // aurafarming by displaying data in popup
  if (match) {
    const data = brands[match];
    document.getElementById('brand-name').innerText = data.name;
    document.getElementById('rating-val').innerText = data.rating + "/100";
    document.getElementById('sector').innerText = data.sector;
    document.getElementById('labor').innerText = data.labor_risk;
    document.getElementById('tier').innerText = data.tier;
    document.getElementById('summary').innerText = data.summary;
    document.getElementById('explanation').innerText = data.explanation;
    
    const color = data.rating > 70 ? '#2ecc71' : (data.rating > 40 ? '#f1c40f' : '#e74c3c');
    document.getElementById('rating-val').style.color = color;
  } else {
    document.getElementById('brand-name').innerText = "No Data Found";
    document.getElementById('summary').innerText = "This company is not yet in our ethical database.";
  }
}

loadPopupData();