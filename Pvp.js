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

btnPrPA.addEventListener("click", () => {
  if (battleStatus.run == 0) {
    let checkselc1 = document.querySelector("#slcPmBtid");
    let checkBtnpronto = document.querySelector("#btnPkmPro");
    let checkProcurar = document.querySelector("#btnProcurar");

    if (checkselc1 || checkBtnpronto || checkProcurar) {
      divOpcoes.removeChild(checkselc1);

      divOpcoes.removeChild(checkBtnpronto);
      divOpcoes.removeChild(checkProcurar);
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

      //
      let btnPkmPro = document.createElement("button");
      btnPkmPro.id = "btnPkmPro";
      btnPkmPro.textContent = "Batalhar";

      divOpcoes.appendChild(BtnProcurar);
      divOpcoes.appendChild(slcPmBt);
      divOpcoes.appendChild(btnPkmPro);
    }
    procurarPk();
  } else {
    battleStatus.stop = 1;
  }
});

function procurarPk() {
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

  btnPronto.addEventListener("click", () => {
    const checkchpvp = document.querySelectorAll(".divChPvp");
    if (checkchpvp.length > 3 || battleStatus.run > 0) {
      //
      alert("Você ainda esta em batalha");
    } else {
      let ch = ChosenPokemon.value;
      mainPlayer.pokemons[ch].attack(foundedPokemon);
      funChatRef(mainPlayer, chatreference.list, chatreference.enemy);
    }
  });
}

const oponente = new Pokemon("Wooper");
const jogador = new Player("Rodrigo", 20, [
  new Pokemon("Raichu", "", ""),
  new Pokemon("Caterpie", "", ""),
]);

//

async function funChatRef(player, chatRef, oponente) {
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
        console.log("sem critico");
        putonchat.classList.add("divChPvp");
      }

      PvpChat.appendChild(putonchat);
    }
    await new Promise((r) => setTimeout(r, 800));
  }
  battleStatus.stop = 0;
  battleStatus.run = 0;
  btnPrPA.textContent = "Recolher e limpar";
}

function FunAllLucky(player) {
  let guardar = [];
  guardar.push(funFilterLuckybyType(player, listadospoke[0]));
  guardar.push(funFilterLuckybyType(player, listadospoke[1]));
  guardar.push(funFilterLuckybyType(player, listadospoke[2]));

  return guardar[Math.floor(Math.random() * guardar.length)];
}

function funFilterLuckybyType(listaPlyer, arrayTakeOf) {
  let filt = arrayTakeOf.filter((e) => {
    return listaPlyer.indexOf(e) === -1;
  });
  filt.shift();

  if (filt.length >= 0) {
    return filt[Math.floor(Math.random() * filt.length)];
  } else {
    return;
  }
}

function funDarPkm(Player, espc = "", tipo = "") {
  if (tipo == "fogo") {
    let autoName = funFilterLuckybyType(Player.pokemons, listadospoke[2]);

    let givePkm = new Pokemon(autoName, "", undefined, Player);

    putImgChat(givePkm);
  } else if (tipo == "agua") {
    let autoName = funFilterLuckybyType(player.pokemons, listadospoke[1]);
    let givePkm = new Pokemon(autoName, "", undefined, Player);

    putImgChat(givePkm);
  } else if (tipo == "eletrico") {
    let autoName = funFilterLuckybyType(player.pokemons, listadospoke[0]);
    let givePkm = new Pokemon(autoName, "", undefined, Player);

    putImgChat(givePkm);
  } else if (Player && espc) {
    let givePkm = new Pokemon(espc, "", undefined, Player);

    putImgChat(givePkm);
  } else {
    let autoName = FunAllLucky(Player.pokemons);

    let givePkm = new Pokemon(autoName, undefined, undefined, Player);

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
