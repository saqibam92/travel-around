const btnSearch = document.getElementById('btnSearch');
const clearBtn = document.getElementById('clearBtn')
const searchDiv = document.getElementById('result');

function searchLoaction() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    searchDiv.innerHTML= ``;
    console.log(input);

    

    fetch('travel_recommendation_api.json')
        .then((response=> response.json()))
        .then((data) =>{
            const countries = data.countries.find((item) => item.name.toLowerCase() === input)
            const temples = data.temples.find((item) => item.name.toLowerCase() === input)
            const beaches = data.beaches.find((item) => item.name.toLowerCase() === input)
            console.log(data);
            console.log(countries)

            if(countries) {
                countries.cities.map((city) => (
                    searchDiv.innerHTML += `
                                            <img style="width: 100%;" src='${city.imageUrl}' />
                                            <h2 class="text-dark">${city.name}</h2>
                                            <p class="text-dark">${city.description}</p>
                                            <button style="border-radius: 10px; background-color: #175C66; padding: 10px; display: block; margin-bottom: 10px">Visit</button>
                                            `
                ))
                searchDiv.style.cssText = `
                    background-color: #FFF;
                    overflow-y: scroll;
                    padding: 10px;
                    height: 400px;
                `;
            } else {
                searchDiv.innerHTML = `<h2>Country not found</h2>`

            }
        })
        .catch((err) => {
            console.log(err)
            searchDiv.innerHTML = "An error occurred while fetching data.";
        })
}

btnSearch.addEventListener('click', searchLoaction)
// btnSearch.addEventListener('click', () => {alert('clicked')})

function resetSearch() {
    document.getElementById('searchInput').value = "";
    searchDiv.innerHTML = `<h4>Type a valid search query</h4>`
    searchDiv.style.cssText = ""
}
clearBtn.addEventListener('click', resetSearch)