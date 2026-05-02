document.getElementById('btn').addEventListener('click', () => {
  alert('Extension button clicked!');
});
fetch(chrome.runtime.getURL('brands.json'))
  .then(res => res.json())
  .then(brands => {
    console.log("Database loaded!", brands);
    // Add your scanning logic here
  });