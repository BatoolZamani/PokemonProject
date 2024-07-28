
let baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=40&offset=0";
let responseAsJson;
let pokemonData = [];
let previousInputLength = 0; 

async function init() {
    await getApiPokemon();
    showPokCard();
  
}

async function getApiPokemon() {
    let userResponse = await fetch(baseUrl);
    responseAsJson = await userResponse.json();
    pokemonData = responseAsJson.results;
}

async function showPokCard(filteredData = []) {
    let content = document.getElementById('content');
    let source = filteredData.length ? filteredData : pokemonData;
    content.innerHTML = '';

    if (filteredData.length === 0 && previousInputLength >= 3) {
        content.innerHTML = '<p>No Pokémon found matching your search criteria.</p>';
        return;
    }

    for (let i = 0; i < source.length; i++) {
        let result = source[i];
        let response = await fetch(result.url);
        let pokemonDetails = await response.json();
        let pokemonImgUrl = pokemonDetails.sprites.other['official-artwork'].front_default;

        content.innerHTML += /*html*/`
            <div class="card-section ${pokemonDetails.types[0].type.name}"><!-- set background color -->
                <div class="card-section-container">
                    <div class="header-card-container">
                        <div>
                            <span class="pk-icon"><img src="./img/pokemon-icon1.png" alt=""/></span>
                            <span class="pk-icon"><img src="./img/pokemon-icon2.png" alt=""/></span>
                        </div>
                        <div class="pok-character-id">
                            <span>#${pokemonDetails.id}</span>
                        </div>
                    </div>
                    <div>
                        <span class="pk-img"><img src="${pokemonImgUrl}" alt=""/></span>
                    </div>
                    <div class="pk-character-name"><span>${pokemonDetails.name}</span></div>
                </div>
                <div class="heart-icon-basecard">
                    <img src="./img/redheart.png" alt="" />
                </div>
            </div>
        `;
    }
}


function filterAndShowNames() {
    let searchInput = document.getElementById('searchInput').value.toLowerCase();
            
    if (searchInput.length>=3) {     
        let filteredData = pokemonData.filter(pokemon =>
            pokemon.name.toLowerCase().startsWith(searchInput)
        );
        showPokCard(filteredData);
    }
    else if (previousInputLength >= 3 && searchInput.length < 3) {
        previousInputLength = 0;
        showPokCard();
    }
    previousInputLength = searchInput.length;
}