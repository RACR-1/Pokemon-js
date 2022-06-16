const btnPrPA = document.querySelector("#btnProcurarPA");
const divOpcoes = document.querySelector(".PvpOpcoes");
const PvpChat = document.querySelector(".PvpChat");
const whilebattle = document.querySelector(".whileBattle");
//
let battleStatus = {
  run: 0,
  stop: 0,
};
//
let foundedPokemon = undefined;

//
/* insertPokemon(mainPlayer, [new Pokemon()]); */

btnPrPA.addEventListener("click", () => {
  //

  if (battleStatus.run == 0) {
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
      btnPrPA.textContent = "Procurar pokemon aleatorio";
    } else {
      //
      btnPrPA.textContent = "Recolher e limpar";
      let slcPmBt = document.createElement("select");
      slcPmBt.id = "slcPmBtid";

      for (i = 0; i < mainPlayer.pokemons.length; i++) {
        let opcSlcPmBt = document.createElement("Option");
        opcSlcPmBt.value = i;
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
    battleStatus.stop = 1;
  }
});

function procurarPk(imgchose = "") {
  const btnProcurar = document.querySelector("#btnProcurar");

  btnProcurar.addEventListener("click", () => {
    if (battleStatus.run == 0) {
      delChatpvp();

      foundedPokemon = new Pokemon(FunAllLucky([]), "", undefined, "");
      console.log(foundedPokemon);
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
    let ch = ChosenPokemon.value;
    if (foundedPokemon) {
      mainPlayer.pokemons[ch].attack(foundedPokemon);
      funChatRef(mainPlayer, chatreference.list, chatreference.enemy);
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
funFilterLuckybyType(jogador.pokemons, listadospoke[0]);
//

async function funChatRef(player, chatRef, oponente) {
  console.log(chatreference.pictures.name, "ordem dos nomes");
  console.log(chatreference.pictures.positio, "pisição");
  whilebattle.textContent = "Parar Batalha";

  battleStatus.run = 1;
  for (i = 0; i < chatRef.length; i++) {
    if (battleStatus.stop > 0) {
      break;
    }
    if (chatRef[i].Loose) {
      const putonchat = document.createElement("div");
      putonchat.classList.add("divChPvp");
      putonchat.id = "ChPvpLoos";
      putonchat.textContent = `Você perdeu contra ${oponente[0].nome} infelizmente não ganhara nada`;
      PvpChat.appendChild(putonchat);
      //
    } else if (chatRef[i].Win) {
      const putonchat = document.createElement("div");
      putonchat.classList.add("divChPvp");
      putonchat.id = "ChPvpWin";
      putonchat.textContent = `Você Venceu contra ${oponente[0].nome} Você ganhou um pokemon aleatorio que ainda não tem`;
      PvpChat.appendChild(putonchat);
      funDarPkm(player, "", "");
      //
    } else {
      const putonchat = document.createElement("div");

      putonchat.textContent = chatRef[i];
      console.log(chatreference.critical.positio[i]);

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
  foundedPokemon = undefined;
  battleStatus.stop = 0;
  battleStatus.run = 0;
  btnPrPA.textContent = "Recolher e limpar";
  return;
}

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
  console.log(player, "the player bug");
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
  }
  return elementImg;
}
