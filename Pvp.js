const btnPrPA = document.querySelector("#btnProcurarPA");
const divOpcoes = document.querySelector(".PvpOpcoes");
const PvpChat = document.querySelector(".PvpChat");

//

//
let foundedPokemon = undefined;

//

btnPrPA.addEventListener("click", () => {
  let checkselc1 = document.querySelector("#slcPmBtid");
  let checkBtnpronto = document.querySelector("#btnPkmPro");
  let checkProcurar = document.querySelector("#btnProcurar");

  if (checkselc1 || checkBtnpronto || checkProcurar) {
    divOpcoes.removeChild(checkselc1);

    divOpcoes.removeChild(checkBtnpronto);
    divOpcoes.removeChild(checkProcurar);
  } else {
    //
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
});

function procurarPk() {
  const btnProcurar = document.querySelector("#btnProcurar");

  btnProcurar.addEventListener("click", () => {
    delChatpvp();

    foundedPokemon = new Pokemon(FunAllLucky([]), "", undefined, "");

    putImgChat(
      foundedPokemon,
      `você encontrou um ${foundedPokemon.nome} tipo ${foundedPokemon.tipo}`
    );
  });
  const btnPronto = document.querySelector("#btnPkmPro");
  const ChosenPokemon = document.querySelector("#slcPmBtid");

  btnPronto.addEventListener("click", () => {
    const checkchpvp = document.querySelectorAll(".divChPvp");
    if (checkchpvp.length > 3) {
      //
      alert("procure outra luta");
    } else {
      let ch = ChosenPokemon.value;
      mainPlayer.pokemons[ch].attack(foundedPokemon);
      funChatRef(mainPlayer, chatreference, oponPoke);
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
  for (i = 0; i < chatRef.length; i++) {
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
      putonchat.classList.add("divChPvp");
      putonchat.textContent = chatRef[i];

      PvpChat.appendChild(putonchat);
    }
    await new Promise((r) => setTimeout(r, 800));
  }
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
    /* for (i = 0; i < classeChat.length; i++) {
      PvpChat.removeChild(classeChat[i]);
    } */
    while (PvpChat.firstChild) {
      PvpChat.removeChild(PvpChat.firstChild);
    }
  }
}
