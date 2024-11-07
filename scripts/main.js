document.addEventListener("DOMContentLoaded", () => {
    const mountainsSelect = document.getElementById("mountainsSelect");
    const reset = document.getElementById("reset");
    mountainsArray.forEach(m => mountainsSelect.appendChild(new Option(m.name)));
    mountainsSelect.addEventListener("change", e => {
        const selectedIndex = mountainsSelect.selectedIndex;
        if(selectedIndex){ 
            const m = mountainsArray[selectedIndex - 1];
            
            const coords = m.coords.lat.toFixed(3) + 
                    ", " + 
                    m.coords.lng.toFixed(3);

            results.innerHTML = "<h1>" + m.name + "</h1>" + `                
                Elevation:   <b>${m.elevation}</b><br>
                Effort:      <b>${m.effort   }</b><br>
                Coordinates: <b>(${coords})</b><br>
                <br>
                ${m.desc}
                <br><br>
            `; 
          
            if(m.img){
                const i = document.createElement("img");
                i.alt = "Mountain Image";
                i.src = "data/images/" + m.img;
                results.appendChild(i);
            }
        }
        reset.addEventListener("click", ()=>{
mountainsSelect.value = "";
results.style.display = "none";
results.innerHTML = "";
        })
    });
});
