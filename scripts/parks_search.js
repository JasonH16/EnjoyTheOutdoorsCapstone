function addPark(parkTypeName, parkTypeSelect) {
    parkTypeSelect.appendChild(new Option(parkTypeName));
}
function addLocation(text, target) {
    target.appendChild(new Option(text));
}
function Park(parkObject) {
    // Create a div for each park card
    const e = document.createElement("div");
    e.classList.add("park-card"); // Add a class for styling

    // Include a website link only if the park has a "Visit" property
    e.innerHTML = `
        <h3>${parkObject.LocationName}</h3>
        <p><strong>Location:</strong> ${parkObject.City}, ${parkObject.State}</p>
        <p><strong>Address:</strong> ${parkObject.Address}</p>
        <p><strong>Zip Code:</strong> ${parkObject.ZipCode}</p>
        <p><strong>Phone:</strong> ${parkObject.Phone}</p>
        
        ${parkObject.Visit ? `<a href="${parkObject.Visit}" target="_blank">Park Website</a>` : ""}
    `;
    return e;
}



function renderParks() {
    const results = document.getElementById("results");
    const selectedType = parkTypeSelect.value.toLowerCase();
    const selectedLocation = parkLocationSelect.value.toLowerCase();
    results.innerHTML = ""; // Clear old results

    let filtered = nationalParksArray;

    // Filter by park type if not "all"
    if (selectedType && selectedType !== "all") {
        filtered = filtered.filter(p => p.LocationName.toLowerCase().includes(selectedType));
    }
    // Filter by location if not "all"
    if (selectedLocation && selectedLocation !== "all") {
        filtered = filtered.filter(p => p.State.toLowerCase() === selectedLocation);
    }

    // Render filtered parks in a grid
    if (filtered.length > 0) {
        results.style.display = "grid"; // Set grid display for results
        filtered.forEach(p => results.appendChild(Park(p)));
    } else {
        results.innerHTML = "<p>No results found matching the filter.</p>";
    }
}

function onContent() {
    const parkTypeSelect = document.getElementById("parkTypeSelect");
    const parkLocationSelect = document.getElementById("parkLocationSelect");

    // Populate dropdowns with options
    parkTypesArray.forEach(parkTypeName => addPark(parkTypeName, parkTypeSelect));
    locationsArray.forEach(parkLocationName => addLocation(parkLocationName, parkLocationSelect));

    // Listen for changes to the dropdowns
    parkTypeSelect.addEventListener("change", renderParks);
    parkLocationSelect.addEventListener("change", renderParks);
}
function resetFilter() {
    const parkTypeSelect = document.getElementById("parkTypeSelect");
    const parkLocationSelect = document.getElementById("parkLocationSelect");

    // Reset dropdowns to "All" or "Select..." options
    parkTypeSelect.value = "all";
    parkLocationSelect.value = "all";

    // Re-render parks based on the reset filter
    renderParks();
}

// Initialize content after DOM is loaded
document.addEventListener("DOMContentLoaded", onContent);
