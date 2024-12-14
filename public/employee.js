document.addEventListener("DOMContentLoaded", async function () {
    const searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const search = document.getElementById("search").value
      const status = document.getElementById("status").value
      try {
        const response = await fetch(
          `http://localhost:3000/employees/search?name=${search}&status=${status}`
        )
        const employees = await response.json()
        console.log(typeof employees)
        console.log(employees)
  
        let tableBody = ""
        employees.forEach((employee) => {
          tableBody += `
                    <tr>
                        <td>${employee.name}</td>
                        <td>${employee.position}</td>
                        <td>${employee.status}</td>
                        <td><a href="/employees/edit/${employee.id}" class="btn btn-warning">Edit</a></td>
                    </tr>`
        })
        document.querySelector("tbody").innerHTML = tableBody
      } catch (error) {
        console.error("Error:", error)
        alert("An error occurred while fetching employees")
      }
    })
  })
  
