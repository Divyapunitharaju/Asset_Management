const form = document.getElementById('addCategoryForm')
const submitBtn = document.getElementById('submitBtn')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const assetCategoryId = document.getElementById('assetCategoryId').value
  const name = document.getElementById('name').value.trim();
  const categoryData = { name}
  try {
    const response = await fetch(`http://localhost:3000/assetCategories/${assetCategoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(categoryData)
    })

    if (response.ok) {
      const result = await response.json()
      console.log(result)
      alert(result.message)
      form.reset()
    } else {
      const error = await response.json()
      alert("Error:" + error.message)
    }
  } catch (err) {
    console.error(err);
    alert("An unexpected error occurred. Please try again.")
  }
})
