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
                <div>Elevation:   <b>${m.elevation}</b></div>
                Effort:      <b>${m.effort   }</b>
                Coordinates: <b>(${coords})</b>
              
                ${m.desc}
               
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

        });

    });
    const mountainsData = {
        mountain1: {
            title: "Mountain 1",
            description: "This is Mountain 1, known for its stunning views and popular hiking trails.",
            img: "images/mountain1.jpg"
        },
        mountain2: {
            title: "Mountain 2",
            description: "Mountain 2 offers breathtaking landscapes and challenging climbing routes.",
            img: "images/mountain2.jpg"
        },
        mountain3: {
            title: "Mountain 3",
            description: "Mountain 3 is a beautiful peak with amazing flora and fauna along the trails.",
            img: "images/mountain3.jpg"
        }
    };
    
  
});

