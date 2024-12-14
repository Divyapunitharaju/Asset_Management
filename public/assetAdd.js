const form = document.getElementById('addAssetForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const serialNo = document.getElementById('serialNo').value.trim();
  const name = document.getElementById('name').value.trim();
  const model = document.getElementById('model').value.trim()
  const make = document.getElementById('make').value.trim();
  const status = document.getElementById('status').value;
  const branch = document.getElementById('branch').value.trim()
  const value = document.getElementById('value').value.trim()


  const assetData = { serialNo,name,model,make,status,branch,value };
  try {
    const response = await fetch('http://localhost:3000/assets/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(assetData)
    })

    if (response.ok) {
      const result = await response.json();
      console.log(result)
      document.getElementById('success').innerText = ` ${result.message}`;
      form.reset()
    } else {
      const error = await response.json();
      document.getElementById('error').innerText = `${error.message}`;
    }
  } catch (err) {
    console.error(err)
    alert("An unexpected error occurred")
  }
})
