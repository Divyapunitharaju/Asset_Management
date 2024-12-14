const form = document.getElementById('issueAssetForm')
const submitBtn = document.getElementById('submitBtn')

form.addEventListener('submit', async (e) => {
e.preventDefault();
const assetId = document.getElementById('asset').value
const employeeId = document.getElementById('employee').value
const issueDate = document.getElementById('issueDate').value

const issueData = { assetId, employeeId, issueDate };

try {
  const response = await fetch('http://localhost:3000/issue/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(issueData)
  })
  if (response.ok) {
    const result = await response.json()
    document.getElementById('success').textContent = result.message
    form.reset()
  } else {
    const error = await response.json()
    document.getElementById('danger')=error.message
  }
} catch (err) {
  console.error(err)
  alert("An unexpected error occurred. Please try again.")
}
})
