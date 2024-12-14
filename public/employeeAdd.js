const form = document.getElementById('addEmployeeForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim()
  const position = document.getElementById('position').value.trim()
  const status = document.getElementById('status').value;
  const employeeData = { name, position, status }
  try {
    const response = await fetch('http://localhost:3000/employees/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(employeeData)
    });

    if (response.ok) {
      const result = await response.json()
      document.getElementById('success').textContent = result.message
      form.reset()
    } else {
      const error = await response.json()
      document.getElementById('danger').textContent = error.message
    }
  } catch (err) {
    console.error("Unexpected error:", err)
    alert("An unexpected error occurred. Please try again.")
  }
})
