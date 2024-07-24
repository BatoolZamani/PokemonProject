
let baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=40&offset=0";



async function onload() {
    let userResponse = await fetch(baseUrl);
    responseAsJson = await userResponse.json();
    
     console.log("result", responseAsJson.results);
    
    renderPokCard();
}

onload();

async function renderPokCard() {
  let content = document.getElementById('content');
  content.innerHTML = '';

  // for (let i = 0; i < responseAsJson.results.length; i++) {
    responseAsJson.results.forEach(async(result) => {
      //let result = responseAsJson.results[i];
      let response = await fetch(result.url);
      let pokemonData = await response.json();


      let pokemonImgUrl = pokemonData.sprites.other['official-artwork'].front_default;

                content.innerHTML += /*html*/`
                    <div class="card-section">
                        <div class="card-section-container">
                            <div class="header-card-container">
                                <div>
                                    <span class="pk-icon"><img src="./img/pokemon-icon1.png" alt=""/></span>
                                    <span class="pk-icon"><img src="./img/pokemon-icon2.png" alt=""/></span>
                                   
                                </div>
                                <div class="pok-character-id">
                                    <span>#${pokemonData.id}</span>
                                </div>
                            </div>
                            <div>
                                <span class="pk-img"><img src="${pokemonImgUrl}" alt=""/></span>
                            </div>
                            <div class="pk-character-name"><span>${pokemonData.name}</span></div>
                        </div>
                        <div class="heart-icon-basecard">
                            <img src="./img/redheart.png" alt="" />
                        </div>
                    </div>
                `;
            })
          
          }