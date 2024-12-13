
  const searchForm = document.getElementById("searchForm");

  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("search").value.trim();
    const status = document.getElementById("status").value.trim();

    if (!nameInput || !status) {
      alert("Please fill in both the name and status fields.");
      return;
    }

    try {
      const response = await fetch(`/employees?name=${nameInput}&status=${status}`, {
        method: "GET",
      });

      if (response.ok) {
        const employees = await response.json();
        console.log("Employees:", employees);
     
      } else {
        const error = await response.json();
        console.error("Server Error:", error);
        alert(`Error: ${error.message || "Unable to fetch employees."}`);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An unexpected error occurred. Please try again later.");
    }
  });

