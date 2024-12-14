
const form = document.getElementById('returnAssetForm');
const successDiv = document.getElementById('success');
const dangerDiv = document.getElementById('danger');

form.addEventListener('submit', async (e) => {
e.preventDefault();
const assetId = document.getElementById('asset').value;
const employeeId = document.getElementById('employee').value;
const returnDate = document.getElementById('returnDate').value;
const returnReason = document.getElementById('returnReason').value;

const returnData = { assetId, employeeId, returnDate, returnReason };

try {
  const response = await fetch('http://localhost:3000/return/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(returnData)
  })
  if (response.ok) {
    const result = await response.json();
    successDiv.innerText = result.message;
    dangerDiv.innerText = ''; 
    form.reset();
  } else {
    const error = await response.json();
    successDiv.innerText = ''; 
    dangerDiv.innerText = error.message;
  }
} catch (err) {
  console.error(err);
  alert("An unexpected error occurred. Please try again.");
}
})