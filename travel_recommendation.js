const btnSearch = document.getElementById("btnSearch");
const clearBtn = document.getElementById("clearBtn");
const results = document.getElementById("result");

let data = {};

async function fetchData() {
  const response = await fetch("travel_recommendation_api.json");
  data = await response.json();
}

function search() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  results.innerHTML = ``;

  const displayResults = (items, category) => {
    if (items.length > 0) {
      const categoryHeader = document.createElement("h2");
      categoryHeader.innerText =
        category.charAt(0).toUpperCase() + category.slice(1);
      results.appendChild(categoryHeader);

      items.forEach((item) => {
        const itemDiv = document.createElement("div");

        itemDiv.innerHTML += `
                            <h2 class="text-dark">${item.name}</h2>
                            <img style="width: 100%;" src='${item.imageUrl}' />
                            
                            <p class="text-dark">${item.description}</p>
                            <button style="border-radius: 10px; background-color: #175C66; padding: 10px; display: block; margin-bottom: 10px">Visit</button>
                            `;
        results.style.cssText = `
                background-color: #FFF;
                overflow-y: scroll;
                padding: 10px;
                height: 400px;
                width: 500px;
                float: right;
            `;

        results.appendChild(itemDiv);
      });
    } else {
      results.innerHTML = `<h2> ${category} not found</h2>`;
      results.style.cssText = "";
    }
  };

  const filterItems = (data, keywords) => {
    return data.filter((item) => {
      return keywords.some(keyword => item.name.toLowerCase().includes(keyword));
    });
  };

  let foundresults = false;

  const keywords = [searchInput];
  if (searchInput.endsWith('s')) {
    keywords.push(searchInput.slice(0, -1)); // singular form
  } else {
    keywords.push(searchInput + 's'); // plural form
  }

  // search for countries
  data.countries.forEach((country) => {
    const matchedCities = filterItems(country.cities, keywords);
    if (keywords.some(keyword => country.name.toLowerCase().includes(keyword)) || matchedCities.length > 0) {
      displayResults([country], "countries");
      foundResults = true;
    }
    if (matchedCities.length > 0) {
      displayResults(matchedCities, "cities");
      foundResults = true;
    }
  });

  // search for temples
  const matchedTemples = filterItems(data.temples, searchInput);
  if (matchedTemples.length > 0) {
    displayResults(matchedTemples, "temples");
    foundresults = true;
  }

  const matchedBeaches = filterItems(data.beaches, searchInput);
  if (matchedBeaches.length > 0) {
    displayResults(matchedBeaches, "beaches");
    foundresults = true;
  }

  if (!foundresults) {
    results.innerHTML = `<h2> No Results found </h2>`;
    results.style.cssText = "";
  }
}

document.addEventListener("DOMContentLoaded", fetchData);

btnSearch.addEventListener("click", search);

function resetSearch() {
  document.getElementById("searchInput").value = "";
  results.innerHTML = `<h4>Type a valid search query</h4>`;
  results.style.cssText = "";
}
clearBtn.addEventListener("click", resetSearch);
