const OpcsByType = document.querySelector(".PvpOpcoesTipos");
const LightningPokemons = document.querySelector("#btnProEl");
const firePokemons = document.querySelector("#btnProFo");
//
const watterPokemons = document.querySelector("#btnProAg");
const backAllTypesBattle = document.querySelector("#backAllTypesBattle");
const labelTypePokemon = document.querySelector("#labelChooseType");
//
const searchPokemoneByTypes = document.querySelector("#searchPokemoneByTypes");

//labelChooseType
//variavel de referencia para tipo de pokemon, botar um numero como valor
//se estiver me batalha não mudar opções
/* OpcsByType.style.display = "none"; */

backAllTypesBattle.addEventListener("click", () => {
  if (!battleStatus.run) {
    divOpcoes.style.display = "";
    OpcsByType.style.display = "none";
  }
});

LightningPokemons.addEventListener("click", () => {
  battleByTypes(0);
});

function battleByTypes(pokemonType) {
  if (pokemonType == 0) {
  } else if (pokemonType == 1) {
  } else if (pokemonType == 2) {
  }

  if (!battleStatus.run) {
    divOpcoes.style.display = "none";
    OpcsByType.style.display = "";
    searchPokemoneByTypes.addEventListener("click", () => {});
  }
}
