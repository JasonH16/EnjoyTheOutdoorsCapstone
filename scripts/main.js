document.addEventListener("DOMContentLoaded", () => {
    const mountainsSelect = document.getElementById("mountainsSelect");
    const reset = document.getElementById("reset");
    const results = document.getElementById("results");

    // Add "Show All Mountains" option to the dropdown
    mountainsSelect.appendChild(new Option("Show All Mountains", "showAll"));
    mountainsSelect.appendChild(new Option("Select a mountain...", "none", true, true)); // Default selected

    // Populate dropdown options with mountain names
    mountainsArray.forEach(m => mountainsSelect.appendChild(new Option(m.name, m.name)));

    // Fetch sunrise and sunset times
    async function getSunsetForMountain(lat, lng) {
        try {
            let response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
            let data = await response.json();
            return data.results;
        } catch (error) {
            console.error("Error fetching sunrise/sunset times:", error);
        }
    }

    // Function to render all mountains as cards
    async function renderAllMountains() {
        results.innerHTML = ""; // Clear previous content
        results.style.display = "grid"; // Display results in grid format

        for (let m of mountainsArray) {
            const card = document.createElement("div");
            card.classList.add("card");

            const coords = m.coords.lat.toFixed(3) + ", " + m.coords.lng.toFixed(3);

            // Add content to each card with hidden sunrise/sunset section
            card.innerHTML = `
                <h3>${m.name}</h3>
                <p><strong>Elevation:</strong> ${m.elevation}</p>
                <p><strong>Effort:</strong> ${m.effort}</p>
                <p><strong>Coordinates:</strong> (${coords})</p>
                <p>${m.desc}</p>
                <button class="sunset-button" data-lat="${m.coords.lat}" data-lng="${m.coords.lng}">Get Sunrise/Sunset</button>
                <div class="sunrise-sunset" style="display: none;">
                    <p><strong>Sunrise:</strong> <span class="sunrise">N/A</span></p>
                    <p><strong>Sunset:</strong> <span class="sunset">N/A</span></p>
                </div>
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
        }

        // Attach event listeners to all "Get Sunrise/Sunset" buttons
        document.querySelectorAll(".sunset-button").forEach(button => {
            button.addEventListener("click", async (e) => {
                const lat = e.target.getAttribute("data-lat");
                const lng = e.target.getAttribute("data-lng");

                // Fetch sunrise and sunset times
                const times = await getSunsetForMountain(lat, lng);
                if (times) {
                    const card = e.target.parentElement;
                    card.querySelector(".sunrise").textContent = times.sunrise;
                    card.querySelector(".sunset").textContent = times.sunset;

                    // Toggle visibility of the sunrise/sunset info
                    const sunriseSunsetDiv = card.querySelector(".sunrise-sunset");
                    sunriseSunsetDiv.style.display = "block";
                }
            });
        });
    }

    // Function to render a single mountain
    async function renderSingleMountain(mountain) {
        results.innerHTML = ""; // Clear previous content
        results.style.display = "grid"; // Display results in grid format

        const card = document.createElement("div");
        card.classList.add("card");

        const coords = mountain.coords.lat.toFixed(3) + ", " + mountain.coords.lng.toFixed(3);

        // Add content to the card with hidden sunrise/sunset section
        card.innerHTML = `
            <h3>${mountain.name}</h3>
            <p><strong>Elevation:</strong> ${mountain.elevation}</p>
            <p><strong>Effort:</strong> ${mountain.effort}</p>
            <p><strong>Coordinates:</strong> (${coords})</p>
            <p>${mountain.desc}</p>
            <button class="sunset-button" data-lat="${mountain.coords.lat}" data-lng="${mountain.coords.lng}">Get Sunrise/Sunset</button>
            <div class="sunrise-sunset" style="display: none;">
                <p><strong>Sunrise:</strong> <span class="sunrise">N/A</span></p>
                <p><strong>Sunset:</strong> <span class="sunset">N/A</span></p>
            </div>
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

        // Attach event listener to the "Get Sunrise/Sunset" button
        const button = card.querySelector(".sunset-button");
        button.addEventListener("click", async (e) => {
            const lat = e.target.getAttribute("data-lat");
            const lng = e.target.getAttribute("data-lng");

            // Fetch sunrise and sunset times
            const times = await getSunsetForMountain(lat, lng);
            if (times) {
                const card = e.target.parentElement;
                card.querySelector(".sunrise").textContent = times.sunrise;
                card.querySelector(".sunset").textContent = times.sunset;

                // Toggle visibility of the sunrise/sunset info
                const sunriseSunsetDiv = card.querySelector(".sunrise-sunset");
                sunriseSunsetDiv.style.display = "block";
            }
        });
    }

    // Display selected mountain or all mountains on dropdown change
    mountainsSelect.addEventListener("change", () => {
        const selectedValue = mountainsSelect.value;
        
        if (selectedValue === "showAll") {
            renderAllMountains();
        } else if (selectedValue !== "none") {
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




    
  


