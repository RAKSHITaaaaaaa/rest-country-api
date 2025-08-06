var second = document.querySelector(".second");

function generate(key, value) {
    let itemDiv = document.createElement("div");
    itemDiv.classList.add("item", "col-12");

    let keyDiv = document.createElement("div");
    keyDiv.classList.add("key");
    keyDiv.innerHTML = key;

    let valueDiv = document.createElement("div");
    valueDiv.classList.add("value");

    if (key === "Flags") {
        let img = document.createElement("img");
        img.src = value;
        img.alt = "Flag";
        valueDiv.appendChild(img);
    } else if (key === "GoogleMap") {
        let a = document.createElement("a");
        a.href = value;
        a.target = "_blank";
        a.innerHTML = "Open on Google Maps";
        valueDiv.appendChild(a);
    } else if (Array.isArray(value)) {
        valueDiv.innerHTML = value.join(", ");
    } else {
        valueDiv.innerHTML = value;
    }

    itemDiv.appendChild(keyDiv);
    itemDiv.appendChild(valueDiv);
    second.appendChild(itemDiv);
}

async function getAPIData() {
    let input = document.getElementById("country");
    let country = input.value.trim() || "bharat";

    try {
        let response = await fetch("https://restcountries.com/v3.1/name/" + country);
        let data = await response.json();

        second.innerHTML = ""; // Clear previous content

        data.forEach((country, index) => {
            generate("Name", country.name.official);
            generate("Capital", country.capital);
            generate("Flags", country.flags.png);
            generate("Population", country.population);
            generate("Area", country.area);
            generate("Region", country.region);
            generate("Subregion", country.subregion);
            generate("Continents", country.continents);
            generate("Landlocked", country.landlocked);
            generate("Independent", country.independent);
            generate("UN Member", country.unMember);
            generate("Borders", country.borders);
            generate("Timezones", country.timezones);
            generate("GoogleMap", country.maps.googleMaps);
            generate("Languages", Object.values(country.languages || {}));
            generate("Currencies", Object.values(country.currencies || {}).map(c => c.name));

            // Add a divider only if it's not the last country

            if (index < data.length - 1) {
                const divider = document.createElement("hr");
                divider.classList.add("country-divider");
                second.appendChild(divider);
            }

        });
    } catch (error) {
        alert("Invalid Country Name");
    }
}

getAPIData();
