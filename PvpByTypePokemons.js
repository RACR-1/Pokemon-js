const LightningPokemons = document.querySelector("#btnProEl");
const watterPokemons = document.querySelector("#btnProAg");
const firePokemons = document.querySelector("#btnProFo");
const labelTypePokemon = document.querySelector("#labelChooseType");

const searchPokemoneByTypes = document.querySelector("#searchPokemoneByTypes");
const battlePokemonByTypes = document.querySelector("#battlePokemonByTypes");
const ChosenPokemontypes = document.querySelector("#selectPokemonsByType");

OpcsByType.style.display = "none";
divOpcoes.style.display = "";
PvpNpcs.style.display = "none";
backfirstForm.addEventListener("click", () => {
  if (systemStatus.run == 0) {
    systemStatus.formBattles = 0;

    if (PvpChat.firstChild) {
      delChatpvp();
      if (divOpcoes.children["slcPmBtid"]) {
        document.querySelector(".PvpOpcoes #btnProcurarPA").textContent =
          "Recolher";
      }
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

  let chooseValue = ChosenPokemontypes.value;
  if (foundedPokemon) {
    if (systemStatus.run == 0) {
      systemStatus.type = 1;
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
    if (systemStatus.rematchStatus > 0) {
      if (
        window.confirm(
          "Se você clicar nesse botão pedera sua chance de revanche."
        )
      ) {
        systemStatus.rematchStatus = 2;
        if (PvpChat.children) {
          delChatpvp();
        }
        if (foundedPokemon) {
          foundedPokemon = undefined;
        }

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
        systemStatus.currentyPokemon = tipo;
        updatePokemonListBattle("selectPokemonsByType");
        battleByTypes(0);
      }
    } else {
      systemStatus.formBattles = 1;
      if (PvpChat.children) {
        delChatpvp();
      }
      if (foundedPokemon) {
        foundedPokemon = undefined;
      }
      if (tipo == 0) {
        labelTypePokemon.textContent = "Tipo Raio";
      } else if (tipo == 1) {
        labelTypePokemon.textContent = "Tipo aquatico";
      } else if (tipo == 2) {
        labelTypePokemon.textContent = "Tipo Fogo";
      }
      systemStatus.currentyPokemon = tipo;
      updatePokemonListBattle("selectPokemonsByType");
      battleByTypes(tipo);
    }
  }
}

function battleByTypes(pokemonType) {
  divOpcoes.style.display = "none";
  PvpNpcs.style.display = "none";
  OpcsByType.style.display = "";
  btnBackThird.textContent = "Voltar";

  searchPokemoneByTypes.addEventListener("click", () => {
    if (!systemStatus.run) {
      if (systemStatus.rematchStatus > 0) {
        systemStatus.rematchStatus = 2;
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
    }
  });

  let imgPath = document.getElementById("chosePoketypes");

  let a = mainPlayer.pokemons[ChosenPokemontypes.value].nome;
  imgPath.src = `./imagens/${a}.png`;

  ChosenPokemontypes.addEventListener("change", () => {
    let a = mainPlayer.pokemons[ChosenPokemontypes.value].nome;
    imgPath.src = `./imagens/${a}.png`;
  });
}
