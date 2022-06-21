const btnPrPA = document.querySelector("#btnProcurarPA");
const divOpcoes = document.querySelector(".PvpOpcoes");
const PvpChat = document.querySelector(".PvpChat");
const whilebattle = document.querySelector(".whileBattle");
const backfirstForm = document.querySelector("#backAllTypesBattle");
const OpcsByType = document.querySelector(".PvpOpcoesTipos");
const PvpNpcs = document.querySelector(".PvpOpcoesNpc");
//
let resultLooseRefChat = 0;
//systemStatus

let systemStatus = {
  run: 0,
  stop: 0,
  formBattles: 0,
  type: null,
  rematchStatus: 0,
};
//
let npcChoosed = undefined;
let foundedPokemon = undefined;

//
/* insertPokemon(mainPlayer, [new Pokemon()]); */

btnPrPA.addEventListener("click", () => {
  //

  if (systemStatus.run == 0) {
    let checkselc1 = document.querySelector("#slcPmBtid");
    let checkBtnpronto = document.querySelector("#btnPkmPro");
    let checkProcurar = document.querySelector("#btnProcurar");
    let checkopcimg = document.querySelector("#chosePoke");

    if (checkselc1 || checkBtnpronto || checkProcurar) {
      divOpcoes.removeChild(checkselc1);

      divOpcoes.removeChild(checkBtnpronto);
      divOpcoes.removeChild(checkProcurar);
      divOpcoes.removeChild(checkopcimg);
      delChatpvp();
      if (foundedPokemon) {
        foundedPokemon = null;
      }
      if (divOpcoes.children["BtnRematch"]) {
        /* let checkRematchtodel = document.querySelector("#BtnRematch"); */
        divOpcoes.removeChild(document.querySelector("#BtnRematch"));
      }
      btnPrPA.textContent = "Procurar pokemon aleatorio";
    } else {
      //
      if (PvpChat.firstChild) {
        btnPrPA.textContent = "Recolher e limpar";
      } else {
        btnPrPA.textContent = "Recolher";
      }
      let slcPmBt = document.createElement("select");
      slcPmBt.id = "slcPmBtid";

      for (i = 0; i < mainPlayer.pokemons.length; i++) {
        let opcSlcPmBt = document.createElement("Option");
        opcSlcPmBt.value = i;
        opcSlcPmBt.id = "optionPokemon";
        opcSlcPmBt.textContent = mainPlayer.pokemons[i].nome;
        slcPmBt.appendChild(opcSlcPmBt);
      }

      let BtnProcurar = document.createElement("button");
      BtnProcurar.id = "btnProcurar";
      BtnProcurar.textContent = "Procurar";

      //chosePoke comentario
      let btnPkmPro = document.createElement("button");
      btnPkmPro.id = "btnPkmPro";
      btnPkmPro.textContent = "Batalhar";

      divOpcoes.appendChild(BtnProcurar);
      divOpcoes.appendChild(slcPmBt);
      divOpcoes.appendChild(btnPkmPro);
      let opc = document.querySelector("#slcPmBtid");
      let choseElement = funRtI(opc.firstChild.textContent);
      choseElement.id = "chosePoke";
      divOpcoes.appendChild(choseElement);
    }

    procurarPk();
  } else {
    systemStatus.stop = 1;
  }
});

function procurarPk(imgchose = "") {
  const btnProcurar = document.querySelector("#btnProcurar");

  btnProcurar.addEventListener("click", () => {
    const checkRematch = document.querySelector("#BtnRematch");
    if (checkRematch) {
      divOpcoes.removeChild(checkRematch);
    }
    if (systemStatus.run == 0) {
      delChatpvp();

      foundedPokemon = new Pokemon(FunAllLucky([]), "", undefined, "");

      console.log(foundedPokemon.rematch, "search log rematch");
      putImgChat(
        foundedPokemon,
        `você encontrou um ${foundedPokemon.nome} tipo ${foundedPokemon.tipo}`
      );
    }
  });
  const btnPronto = document.querySelector("#btnPkmPro");
  const ChosenPokemon = document.querySelector("#slcPmBtid");
  let ch = document.getElementById("chosePoke");
  ChosenPokemon.addEventListener("change", () => {
    let a = mainPlayer.pokemons[ChosenPokemon.value].nome;
    ch.src = `./imagens/${a}.png`;
  });

  btnPronto.addEventListener("click", () => {
    systemStatus.formBattles = 0;
    let ch = ChosenPokemon.value;
    if (foundedPokemon) {
      if (systemStatus.run == 0) {
        mainPlayer.pokemons[ch].attack(foundedPokemon);
        funChatRef(
          mainPlayer,
          chatreference.list,
          chatreference.enemy,
          mainPlayer.pokemons[ch]
        );
      } else {
        alert("Você esta em batalha");
      }
    } else {
      alert("Procure um Pokemon");
    }
  });
}

const oponente = new Pokemon("Wooper");
const jogador = new Player("Rodrigo", 20, [
  new Pokemon("Caterpie", "", ""),
  new Pokemon("Pidgey", "", ""),
  new Pokemon("Pikachu", "", ""),
  new Pokemon("Raichu", "", ""),
  new Pokemon("Sandshrew", "", ""),
]);

//

async function funChatRef(player, chatRef, oponente, ChoosePokemonForRematch) {
  if (systemStatus.formBattles == 0) {
    whilebattle.textContent = "Parar Batalha";
  } else if (systemStatus.formBattles == 1) {
    backfirstForm.textContent = "Parar Batalha";
    //
  }
  systemStatus.run = 1;
  for (i = 0; i < chatRef.length; i++) {
    if (systemStatus.stop > 0) {
      break;
    }
    if (chatRef[i].Loose) {
      /* resultLooseRefChat++; */
      foundedPokemon.rematch++;
      console.log(ChoosePokemonForRematch.rematch, "loose result rematch");
      /* updateStatusLabel(player); */
      const putonchat = document.createElement("div");
      putonchat.classList.add("divChPvp");
      putonchat.id = "ChPvpLoos";
      putonchat.textContent = `Você perdeu contra ${oponente[0].nome} infelizmente não ganhara nada`;
      PvpChat.appendChild(putonchat);
      //
    } else if (chatRef[i].Win) {
      /* updateStatusLabel(player); */
      const putonchat = document.createElement("div");
      putonchat.classList.add("divChPvp");
      putonchat.id = "ChPvpWin";
      putonchat.textContent = `Você Venceu contra ${oponente[0].nome} Você ganhou um pokemon aleatorio que ainda não tem`;
      PvpChat.appendChild(putonchat);
      funDarPkm(player, "", "");
      //
      if (systemStatus.formBattles == 0) {
        updatePokemonListBattle("slcPmBtid");
      } else if (systemStatus.formBattles == 1) {
        updatePokemonListBattle("selectPokemonsByType");
      }
    } else {
      const putonchat = document.createElement("div");

      putonchat.textContent = chatRef[i];

      //firstattack conditional
      if (chatreference.firstAttack.position[0] == i) {
        chatreference.firstAttack.pokemon[0];
        let fat = imgBattleElement(chatreference.firstAttack.pokemon[0], 3);
        putonchat.appendChild(fat);
        chatreference.firstAttack.pokemon.shift();
        chatreference.firstAttack.position.shift();
      }
      //
      if (chatreference.critical.positio[0] == i) {
        chatreference.critical.positio.shift();
        let imgcrit = document.createElement("img");
        imgcrit.src = `./imagens/Critico/${chatreference.critical.type[0]}.png`;
        imgcrit.classList.add("divChPvpImgCrit");
        putonchat.appendChild(imgcrit);
        putonchat.classList.add("divChPvpCritico");
        chatreference.critical.type.shift();
      } else {
        putonchat.classList.add("divChPvp");
      }
      if (chatreference.pictures.positio[0] == i) {
        if (chatreference.pictures.name[0] == 0) {
          // criar img player
          //criar img opoenete
          const first = imgBattleElement(chatreference.names[0], 0);
          const second = imgBattleElement(chatreference.names[1], 1);
          putonchat.appendChild(first);
          putonchat.appendChild(second);
        } else {
          const first = imgBattleElement(chatreference.names[1], 0);
          const second = imgBattleElement(chatreference.names[0], 1);
          putonchat.appendChild(first);
          putonchat.appendChild(second);
        }

        chatreference.pictures.positio.shift();
        chatreference.pictures.name.shift();
      }
      PvpChat.appendChild(putonchat);
    }
    await new Promise((r) => setTimeout(r, 800));
  }
  // rematch
  /* if (systemStatus.formBattles == 0) {
    whilebattle.textContent = "Recolher e limpar";
  } else if (systemStatus.formBattles == 1) {
    backfirstForm.textContent = "Recolher e limpar";
    //
  } */
  if (foundedPokemon.rematch == 1) {
    if (player.rematchCoins) {
      if (systemStatus.formBattles == 0) {
        console.log(ChoosePokemonForRematch, "contagem rematch");
        rematchRandomBattles(
          player,
          ChoosePokemonForRematch,
          divOpcoes,
          "BtnRematch"
        );
      } else if (systemStatus.formBattles == 1) {
        console.log("into if rematch invoke function");
        rematchRandomBattles(
          player,
          ChoosePokemonForRematch,
          OpcsByType,
          "BtnRematchform2"
        );

        //
      }
    } else {
      foundedPokemon = undefined;
    }
  } else {
    foundedPokemon = undefined;
  }
  console.log(systemStatus.type, "current form");
  systemStatus.stop = 0;
  systemStatus.run = 0;
  if (systemStatus.formBattles == 0) {
    btnPrPA.textContent = "Recolher e limpar";
  } else if (systemStatus.formBattles == 1) {
    let recolhertSecondForm = document.querySelector("#backAllTypesBattle");
    recolhertSecondForm.textContent = "Voltar e limpar";
  }
  systemStatus.type = null;
  return;
}
//equal to zero the pokemon rematch when you search new pokemon
//instead use variable with founded pokemon  put straight the new classe on function parameter
async function rematchRandomBattles(
  playerRematchCoins,
  pokemonRematch,
  formToRemove,
  idForFormat
) {
  systemStatus.rematchStatus = 1;
  //set the form for rename the button
  console.log(foundedPokemon, foundedPokemon.rematch, "rematch pokemon");

  let btnRematch = document.createElement("button");
  btnRematch.id = idForFormat;
  formToRemove.appendChild(btnRematch);

  btnRematch.addEventListener("click", () => {
    if (foundedPokemon.rematch == 1) {
      playerRematchCoins.rematchCoins--;
      delChatpvp();
      putImgChat(
        foundedPokemon,
        `você encontrou um ${foundedPokemon.nome} tipo ${foundedPokemon.tipo}`
      );
      foundedPokemon.rematch++;
      pokemonRematch.attack(foundedPokemon);
      funChatRef(
        mainPlayer,
        chatreference.list,
        chatreference.enemy,
        pokemonRematch
      );
      formToRemove.removeChild(btnRematch);
    } else {
      alert("esse pokemon não é elegivel para revanche");
      if (formToRemove.children[idForFormat]) {
        formToRemove.removeChild(btnRematch);
      }
    }
  });
  for (var i = 40; i >= 0; i--) {
    btnRematch.textContent = `Revanche (${i})`;
    if (systemStatus.rematchStatus > 1) {
      break;
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  systemStatus.rematchStatus = 0;
  if (formToRemove.children[idForFormat]) {
    formToRemove.removeChild(btnRematch);
  }
}
//
function FunAllLucky(player) {
  let guardar = [];
  guardar.push(funFilterLuckybyType(player, listadospoke[0]));
  guardar.push(funFilterLuckybyType(player, listadospoke[1]));
  guardar.push(funFilterLuckybyType(player, listadospoke[2]));

  return guardar[Math.floor(Math.random() * guardar.length)];
}

function funFilterLuckybyType(listaPlyer, arrayTakeOf) {
  let group = [];
  for (var i = 0; i < listaPlyer.length; i++) {
    group.push(listaPlyer[i].nome);
  }
  let filt = arrayTakeOf.filter((e) => {
    return group.indexOf(e) < 0;
  });

  filt.shift();

  if (filt.length >= 0) {
    return filt[Math.floor(Math.random() * filt.length)];
  } else {
    return;
  }
}

function funDarPkm(player, espc = "", tipo = "") {
  if (tipo == "fogo") {
    let autoName = funFilterLuckybyType(player.pokemons, listadospoke[2]);

    let givePkm = new Pokemon(autoName);
    insertPokemon(mainPlayer, givePkm);

    putImgChat(givePkm);
  } else if (tipo == "agua") {
    let autoName = funFilterLuckybyType(player.pokemons, listadospoke[1]);
    let givePkm = new Pokemon(autoName);
    insertPokemon(mainPlayer, givePkm);

    putImgChat(givePkm);
  } else if (tipo == "eletrico") {
    let autoName = funFilterLuckybyType(player.pokemons, listadospoke[0]);
    let givePkm = new Pokemon(autoName);
    insertPokemon(mainPlayer, givePkm);

    putImgChat(givePkm);
  } else if (player && espc) {
    let givePkm = new Pokemon(espc);
    insertPokemon(mainPlayer, givePkm);
    putImgChat(givePkm);
  } else if (player && espc == "" && tipo == "") {
    let autoName = FunAllLucky(player.pokemons);

    let givePkm = new Pokemon(autoName);

    insertPokemon(player, new Pokemon(autoName));
    putImgChat(givePkm);
  }
}

function putImgChat(pokemon, text = "") {
  let divpkwin = document.createElement("div");
  divpkwin.classList.add("divChPvp");
  divpkwin.id = "NewPkm";

  divpkwin.style.backgroundImage = `url(./imagens/${pokemon.tipo}.jpg)`;
  divpkwin.style.backgroundSize = "500px 300px";

  //
  let lblWinPk = document.createElement("label");
  lblWinPk.classList.add("divChPvp");
  if (text) {
    lblWinPk.textContent = text;
  } else {
    lblWinPk.textContent = `Você ganhou um ${pokemon.nome} tipo ${pokemon.tipo}!`;
  }
  lblWinPk.for = "imgGotPkm";
  lblWinPk.id = "lblPkmGot";

  divpkwin.appendChild(lblWinPk);
  //
  let imgWinPk = retornarIMG(pokemon.nome, "imgGotPkm", "divChPvp");
  divpkwin.appendChild(imgWinPk);
  PvpChat.appendChild(divpkwin);
}

function delChatpvp() {
  const classeChat = document.querySelectorAll(".divChPvp");
  if (classeChat) {
    while (PvpChat.firstChild) {
      PvpChat.removeChild(PvpChat.firstChild);
    }
  }
}

function checkbattle() {}

function stopbattle() {}

function imgBattleElement(nome, position) {
  const elementImg = document.createElement("img");
  elementImg.src = `./imagens/${nome}.png`;
  if (position == 0) {
    elementImg.classList.add("divChPvpImgFirst");
  } else if (position == 1) {
    elementImg.classList.add("divChPvpImgSecond");
  } else if (position == 3) {
    elementImg.classList.add("divChPvpImgFirstAttack");
  }
  return elementImg;
}

function updatePokemonListBattle(idOfSlect) {
  //slcPmBtid
  let selectPokemons = document.querySelector("#" + idOfSlect);
  if (selectPokemons) {
    let selctOptionsPokemons = document.querySelectorAll(
      `#${idOfSlect} #optionPokemon`
    );
    for (var i = 0; i < selctOptionsPokemons.length; i++) {
      selectPokemons.removeChild(selctOptionsPokemons[i]);
    }
  }

  for (i = 0; i < mainPlayer.pokemons.length; i++) {
    let opcSlcPmBt = document.createElement("Option");
    opcSlcPmBt.value = i;
    opcSlcPmBt.id = "optionPokemon";
    opcSlcPmBt.textContent = mainPlayer.pokemons[i].nome;
    selectPokemons.appendChild(opcSlcPmBt);
  }
  //
}
