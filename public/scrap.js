
const form = document.getElementById('formasset');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const assetId = document.getElementById('assetId').value;
  const scrapReason = document.getElementById('scrapReason').value;

  const scrapData = { assetId, scrapReason };

  try {
    const response = await fetch('http://localhost:3000/scrap/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(scrapData)
    })
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      document.getElementById('success').textContent = result.message
      form.reset();
    } else {
      const error = await response.json();
      document.getElementById('danger')=error.message
    }
  } catch (err) {
    console.error(err);
    alert("An unexpected error occurred. Please try again.");
  }
})
