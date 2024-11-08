document.addEventListener("DOMContentLoaded", () => {
    const mountainsSelect = document.getElementById("mountainsSelect");
    const reset = document.getElementById("reset");
    const results = document.getElementById("results");

    // Add "Show All Mountains" option to the dropdown
    mountainsSelect.appendChild(new Option("Show All Mountains", "showAll"));
    mountainsSelect.appendChild(new Option("Select a mountain...", "none", true, true)); // Default selected

    // Populate dropdown options with mountain names
    mountainsArray.forEach(m => mountainsSelect.appendChild(new Option(m.name, m.name)));

    // Function to render all mountains as cards
    function renderAllMountains() {
        results.innerHTML = ""; // Clear previous content
        results.style.display = "grid"; // Display results in grid format

        mountainsArray.forEach(m => {
            const card = document.createElement("div");
            card.classList.add("card");

            const coords = m.coords.lat.toFixed(3) + ", " + m.coords.lng.toFixed(3);

            // Add content to each card
            card.innerHTML = `
                <h3>${m.name}</h3>
                <p><strong>Elevation:</strong> ${m.elevation}</p>
                <p><strong>Effort:</strong> ${m.effort}</p>
                <p><strong>Coordinates:</strong> (${coords})</p>
                <p>${m.desc}</p>
            `;

            // Add image if available
            if (m.img) {
                const img = document.createElement("img");
                img.alt = "Mountain Image";
                img.src = "data/images/" + m.img;
                img.classList.add("card-image");
                card.appendChild(img);
            }

            // Append the card to the results container
            results.appendChild(card);
        });
    }

    // Function to render a single mountain
    function renderSingleMountain(mountain) {
        results.innerHTML = ""; // Clear previous content
        results.style.display = "grid"; // Ensure results display as grid

        const card = document.createElement("div");
        card.classList.add("card");

        const coords = mountain.coords.lat.toFixed(3) + ", " + mountain.coords.lng.toFixed(3);

        // Add content to the card
        card.innerHTML = `
            <h3>${mountain.name}</h3>
            <p><strong>Elevation:</strong> ${mountain.elevation}</p>
            <p><strong>Effort:</strong> ${mountain.effort}</p>
            <p><strong>Coordinates:</strong> (${coords})</p>
            <p>${mountain.desc}</p>
        `;

        // Add image if available
        if (mountain.img) {
            const img = document.createElement("img");
            img.alt = "Mountain Image";
            img.src = "data/images/" + mountain.img;
            img.classList.add("card-image");
            card.appendChild(img);
        }

        // Append the card to the results container
        results.appendChild(card);
    }

    // Display selected mountain or all mountains on dropdown change
    mountainsSelect.addEventListener("change", e => {
        const selectedValue = mountainsSelect.value;
        
        if (selectedValue === "showAll") {
            // Show all mountains if "Show All Mountains" is selected
            renderAllMountains();
        } else if (selectedValue !== "none") {
            // Show only the selected mountain
            const selectedMountain = mountainsArray.find(m => m.name === selectedValue);
            renderSingleMountain(selectedMountain);
        }
    });

    // Reset functionality
    reset.addEventListener("click", () => {
        mountainsSelect.value = "none";
        results.innerHTML = ""; // Clear results on reset
    });
});

       

    
  


