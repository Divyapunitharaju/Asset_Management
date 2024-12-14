document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton')
  const searchMake = document.getElementById('searchMake')
  const assetType = document.getElementById('assetType')
  const assetBody = document.getElementById('assetBody')
  
  searchButton.addEventListener('click',async(e) => {
    e.preventDefault()
  
    const make = document.getElementById('searchMake').value.trim()
    const name = document.getElementById('assetType').value;
    try {
      const response = await fetch(`http://localhost:3000/assets/search?make=${make}&name=${name}`)
      if (!response.ok) {
        console.error("Failed to fetch assets")
        return;
      }
      const assets = await response.json();
      assetBody.innerHTML = ''
      if (assets.length > 0) {
        assets.forEach((asset) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${asset.serialNo}</td>
            <td>${asset.name}</td>
            <td>${asset.make}</td>
            <td>${asset.model}</td>
            <td>${asset.status}</td>
            <td><a class="btn btn-warning" href="/assets/edit/${asset.id}">Edit</a></td>
            <td><a class="btn btn-danger" href="/assetHistory/history/${asset.id}">View History</a></td>`;
          assetBody.appendChild(row)
        })
      } else {
        const noDataRow = document.createElement('tr')
        noDataRow.innerHTML = `<td colspan="7" class="text-center">No assets found</td>`;
        assetBody.appendChild(noDataRow)
      }
    } catch (error) {
      console.error(error)
      alert('Error fetching assets')
    }
  })
  
  })
  
