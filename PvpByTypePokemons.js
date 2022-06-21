//
const LightningPokemons = document.querySelector("#btnProEl");
const watterPokemons = document.querySelector("#btnProAg");
const firePokemons = document.querySelector("#btnProFo");

//

const labelTypePokemon = document.querySelector("#labelChooseType");
//
const searchPokemoneByTypes = document.querySelector("#searchPokemoneByTypes");
const battlePokemonByTypes = document.querySelector("#battlePokemonByTypes");
const ChosenPokemontypes = document.querySelector("#selectPokemonsByType");

//labelChooseType
//variavel de referencia para tipo de pokemon, botar um numero como valor
//se estiver me batalha não mudar opções

/* const allpokemonsByType = document.querySelector(".BtnBattles"); */

OpcsByType.style.display = "none";
divOpcoes.style.display = "none";

backfirstForm.addEventListener("click", () => {
  //BtnRematchform2
  if (systemStatus.run == 0) {
    systemStatus.formBattles = 0;
    //aqui limpar
    if (PvpChat.firstChild) {
      delChatpvp();
      if (divOpcoes.children["slcPmBtid"]) {
        document.querySelector(".PvpOpcoes #btnProcurarPA").textContent =
          "Recolher";
      }
      //set the name of search all pokemons
    }
    backfirstForm.textContent = "Voltar";
    divOpcoes.style.display = "";
    OpcsByType.style.display = "none";
  } else if (systemStatus.run == 1) {
    systemStatus.stop = 1;
  }
});

battlePokemonByTypes.addEventListener("click", () => {
  backfirstForm.textContent = "Parar batalha";

  console.log(mainPlayer.pokemons[ChosenPokemontypes.value]);
  systemStatus.type = 1;
  let chooseValue = ChosenPokemontypes.value;
  if (foundedPokemon) {
    if (systemStatus.run == 0) {
      mainPlayer.pokemons[chooseValue].attack(foundedPokemon);
      funChatRef(
        mainPlayer,
        chatreference.list,
        chatreference.enemy,
        mainPlayer.pokemons[chooseValue]
      );
    } else {
      alert("Você esta em batalha");
    }
  } else {
    alert("Procure um Pokemon");
  }
});
//pegar as classes dos butões invez do id pra mecher no frombattles

//

//
LightningPokemons.addEventListener("click", () => {
  intoButtonsOfType(0);
});

watterPokemons.addEventListener("click", () => {
  intoButtonsOfType(1);
});

firePokemons.addEventListener("click", () => {
  intoButtonsOfType(2);
});

function intoButtonsOfType(tipo) {
  if (systemStatus.run == 0) {
    if (divOpcoes.children["BtnRematch"]) {
      if (
        window.confirm(
          "Se você clicar nesse botão pedera sua chance de revanche."
        )
      ) {
        document
          .querySelector(".PvpOpcoes")
          .removeChild(document.querySelector("#BtnRematch"));

        if (PvpChat.firstChild) {
          backfirstForm.textContent = "Voltar e limpar";
        }
        systemStatus.formBattles = 1;
        if (tipo == 0) {
          labelTypePokemon.textContent = "Tipo Raio";
        } else if (tipo == 1) {
          labelTypePokemon.textContent = "Tipo aquatico";
        } else if (tipo == 2) {
          labelTypePokemon.textContent = "Tipo Fogo";
        }
        updatePokemonListBattle("selectPokemonsByType");
        battleByTypes(0);
      }
    } else {
      systemStatus.formBattles = 1;
      if (tipo == 0) {
        labelTypePokemon.textContent = "Tipo Raio";
      } else if (tipo == 1) {
        labelTypePokemon.textContent = "Tipo aquatico";
      } else if (tipo == 2) {
        labelTypePokemon.textContent = "Tipo Fogo";
      }
      updatePokemonListBattle("selectPokemonsByType");
      battleByTypes(tipo);
    }
  }
}

function battleByTypes(pokemonType) {
  divOpcoes.style.display = "none";
  PvpNpcs.style.display = "none";
  OpcsByType.style.display = "";

  //put the if here to verify which  div is on

  searchPokemoneByTypes.addEventListener("click", () => {
    if (!systemStatus.run) {
      if (OpcsByType.children["BtnRematchform2"]) {
        OpcsByType.removeChild(document.querySelector("#BtnRematchform2"));
      }

      delChatpvp();
      foundedPokemon = null;
      foundedPokemon = new Pokemon(
        funFilterLuckybyType([], listadospoke[parseInt(pokemonType)]),
        "",
        undefined,
        ""
      );
      putImgChat(
        foundedPokemon,
        `você encontrou um ${foundedPokemon.nome} tipo ${foundedPokemon.tipo}`
      );
      console.log(foundedPokemon.rematch, "novo pokemon encontrado");
    }
  });

  let imgPath = document.getElementById("chosePoketypes");

  let a = mainPlayer.pokemons[ChosenPokemontypes.value].nome;
  imgPath.src = `./imagens/${a}.png`;
  //
  ChosenPokemontypes.addEventListener("change", () => {
    let a = mainPlayer.pokemons[ChosenPokemontypes.value].nome;
    imgPath.src = `./imagens/${a}.png`;
    //
  });
}
