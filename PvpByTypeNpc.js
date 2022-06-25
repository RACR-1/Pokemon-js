const btnNpcEletric = document.querySelector("#btnBtEl");
const btnNpcfire = document.querySelector("#btnBtFo");
const btnNpcAquatic = document.querySelector("#btnBtAg");
const btnBackThird = document.querySelector("#backNpc");
//btnBtAg
const labelNpc = document.querySelector(".PvpOpcoesNpc #labelChooseType");
const ChosenPokemonNpcs = document.querySelector("#selectPokemonsNpc");
const batalharNpc = document.querySelector("#battleNpc");
//btnBtEl
PvpNpcs;

btnBackThird.addEventListener("click", () => {
  //fazer o botão de volta e verificações
  if (systemStatus.run > 0) {
    systemStatus.stop = 1;
    btnBackThird.textContent = "Voltar e limpar";
  } else {
    if (systemStatus.rematchStatus == 1) {
      if (window.confirm("Você Perdera sua Revanche se continuar") == true) {
        systemStatus.rematchStatus = 2;
        BackMainThird();
      }
    } else {
      BackMainThird();
    }
  }
});

function BackMainThird() {
  if (PvpChat.children) {
    delChatpvp();
  }
  btnBackThird.textContent = "Voltar";
  divOpcoes.style.display = "";

  OpcsByType.style.display = "none";

  PvpNpcs.style.display = "none";
}

btnNpcEletric.addEventListener("click", () => {
  initiation(0);
});
btnNpcAquatic.addEventListener("click", () => {
  initiation(1);
});
btnNpcfire.addEventListener("click", () => {
  initiation(2);
});

//
batalharNpc.addEventListener("click", () => {
  systemStatus.formBattles = 2;
  let ch = ChosenPokemonNpcs.value;
  console.log(ch);
  if (foundedPokemon) {
    if (!foundedPokemon.Played == 1) {
      if (systemStatus.run == 0) {
        btnBackThird.textContent = "Parar Batalha";
        mainPlayer.pokemons[ch].attack(foundedPokemon);
        funChatRef(
          mainPlayer,
          chatreference.list,
          chatreference.enemy,
          mainPlayer.pokemons[ch]
        );
        npcsList[systemStatus.NpcAtual].forBattle[0].Played = 1;
      } else {
        alert("Você esta em batalha");
      }
    } else if (systemStatus.rematchStatus == 1) {
      alert(
        "você tem uma revanche, ultima chance de jogar contra o mesmo pokemon"
      );
    } else {
      alert(
        "Você acabou de Batalhar contra esse Pokemon, quando um novo pokemon atualizar clique em batalhar contra esse treinador novamente"
      );
    }
  } else {
    alert(
      "jogue com outro treinador ou espere outro Pokemon chegar e clique em batalher contra treinador novamente"
    );
  }
});

function initiation(tipoPok) {
  if (systemStatus.run == 0) {
    if (systemStatus.rematchStatus == 1) {
      if (
        window.confirm(
          "Você perdera sua revanche se continuar deseja prosseguir?"
        ) == true
      ) {
        foundedPokemon = undefined;
        firstInitiation(tipoPok);
      }
    } else {
      firstInitiation(tipoPok);
    }
  }
}

function firstInitiation(tipo) {
  if (systemStatus.rematchStatus > 0) {
    systemStatus.rematchStatus = 2;
  }
  console.log(systemStatus.rematchStatus, "rematch status");
  if (PvpChat.children) {
    delChatpvp();
  }
  backfirstForm.textContent = "Voltar";
  divOpcoes.style.display = "none";

  OpcsByType.style.display = "none";

  PvpNpcs.style.display = "";

  systemStatus.formBattles = 2;
  //
  //

  if (tipo == 0) {
    labelNpc.textContent = "Treinador Tipo eletrico";
    npcOnChatBattle(npcEletric, "", "Pronto para uma batalha Pokemon?");
    foundedPokemon = npcEletric.forBattle[0];
    systemStatus.NpcAtual = 0;
  } else if (tipo == 1) {
    labelNpc.textContent = "Treinador Tipo Aquatico";
    npcOnChatBattle(npcAquatic, "", "Pronto para uma batalha Pokemon?", 1);
    foundedPokemon = npcAquatic.forBattle[0];
    systemStatus.NpcAtual = 1;
  } else if (tipo == 2) {
    labelNpc.textContent = "Treinador Tipo Fogo";
    npcOnChatBattle(npcFire, "", "Pronto para uma batalha Pokemon?", 1);
    foundedPokemon = npcFire.forBattle[0];
    systemStatus.NpcAtual = 2;
  }

  updatePokemonListBattle("selectPokemonsNpc");
  let imgPath = document.getElementById("chosePokeNpc");

  let a = mainPlayer.pokemons[ChosenPokemonNpcs.value].nome;
  imgPath.src = `./imagens/${a}.png`;
  //
  ChosenPokemonNpcs.addEventListener("change", () => {
    let a = mainPlayer.pokemons[ChosenPokemonNpcs.value].nome;
    imgPath.src = `./imagens/${a}.png`;
    //
  });
}

async function labelChangerForNpc(div = "", object = "", texto = "") {
  let groupLetters = [];

  let arrayFormsg = texto.split("");

  for (var i = 0; i < arrayFormsg.length; i++) {
    groupLetters.push(arrayFormsg[i]);
    let PassarString = groupLetters.toString().replace(/,/g, "");
    object.textContent = PassarString;
    if (systemStatus.run == 0) {
      await new Promise((r) => setTimeout(r, 100));
    }
  }
}
