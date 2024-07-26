
let baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=40&offset=0";
let responseAsJson;
let pokemonData = [];

async function init() {
    await getApiPokemon();
    showPokCard();
}

async function getApiPokemon() {
    let userResponse = await fetch(baseUrl);
    responseAsJson = await userResponse.json();
    pokemonData = responseAsJson.results;
    console.log("result", responseAsJson.results);
}

async function showPokCard() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < pokemonData.length; i++) {
        let result = pokemonData[i];
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






        
         





