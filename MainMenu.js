const statusLabel = document.querySelector("#lblPId");
const GamesDiv = document.querySelector(".ContentWins");
const btnMostrarPokemons = document.querySelector("#btnShowAllPKS");
const btnMostrarVitorias = document.querySelector("#btnShowWins");
const btnBatalhar = document.querySelector("#btnBatalhar");
const btnAutor = document.querySelector("#btnAutoria");
const btnBackMain = document.querySelector("#btnBackMain");
const btnBackMainNPC = document.querySelector("#backMainMenuNpc");
const btnBackMainTypes = document.querySelector("#typesBackMainMenu");
const conteudo = document.querySelector(".conteudo");
const backFromAutor = document.querySelector("#BackFromAutor");
const outOfGame = document.querySelector("#btnSair");

const btnEcP = document.createElement("button");
const divMTP = document.querySelector("#mostrarTodosPokemons");

let online = 0;

function countGamesNumber(mPlayer, conditional = "") {
  if (!conditional) {
    let wNumber = [];

    for (var i = 0; i < mPlayer.games.length; i++) {
      if (mPlayer.games[i].conditional == 1) {
        wNumber.push(mPlayer.games[i].conditional);
      }
    }

    return wNumber.length;
  } else {
    let lNumber = [];

    for (var i = 0; i < mPlayer.games.length; i++) {
      if (mPlayer.games[i].conditional == 0) {
        lNumber.push(mPlayer.games[i].conditional);
      }
    }

    return lNumber.length;
  }
}
async function updateStatusLabel(mPlayer, autoRefres = "") {
  if (!autoRefres) {
    statusLabel.innerText = ` Nome:[${mPlayer.nome}]-Idade:[${
      mPlayer.idade
    }]-Games:[${mPlayer.games.length}]-Vitorias:[${countGamesNumber(
      mPlayer
    )}]-Derrotas:[${countGamesNumber(mPlayer, "0")}]-Revanches:[${
      mPlayer.rematchCoins
    }] `;
  } else {
    let loopControl = true;
    while (loopControl) {
      for (var i = 60; i > 0; i--) {
        statusLabel.innerText = ` Nome:[${mPlayer.nome}]-Idade:[${
          mPlayer.idade
        }]-Games:[${mPlayer.games.length}]-Vitorias:[${countGamesNumber(
          mPlayer
        )}]-Derrotas:[${countGamesNumber(mPlayer, "0")}]-Revanches:[${
          mPlayer.rematchCoins
        }] - [${mPlayer.rematchCoins > 4 ? "fullCoins" : i + "s"}]`;

        await new Promise((r) => setTimeout(r, 700));
        if (!mainPlayer) {
          statusLabel.innerText = "";
          loopControl = false;
          break;
        }
      }
      if (mPlayer.rematchCoins < 5) {
        mPlayer.rematchCoins++;
      }
    }
  }
}

function templateGameReturnCard(pokemon, result, opponent, conditional) {
  let template = `
          
            <person id="enemyPerson"> Oponente : ${opponent}  </person>
            <img id="imgOponentGAmes" src="./imagens/${opponent}.png" alt="">
            <div id="commentCode">${result}</div>
            <img src="./imagens/${pokemon[0]}.png" id="playerPokemonGames" alt="">
            <img id="enemyPokemonGames" src="./imagens/${pokemon[1]}.png" alt="">
          
`;
  const card = document.createElement("div");
  card.classList.add("cardwins");
  if (conditional === 0) {
    card.style.backgroundColor = "rgba(201, 2, 2, 0.103)";
  } else {
    card.style.backgroundColor = "rgba(3, 198, 13, 0.196)";
  }
  card.innerHTML = template;
  return card;
}

outOfGame.addEventListener("click", () => {
  dive.style.display = "";
  div2.style.display = "none";
  div3.style.display = "none";
  div4.style.display = "none";
  mainPlayer = undefined;
  online = 0;
});
btnAutor.addEventListener("click", () => {
  div2.style.display = "none";
  div3.style.display = "none";
  div4.style.display = "";
});
backFromAutor.addEventListener("click", () => {
  div2.style.display = "";
  div3.style.display = "none";
  div4.style.display = "none";
});

btnMostrarVitorias.addEventListener("click", () => {
  if (GamesDiv.children.length > 0) {
    btnMostrarVitorias.textContent = "Mostrar Jogos";
    while (GamesDiv.firstChild) {
      GamesDiv.removeChild(GamesDiv.firstChild);
    }
  } else {
    if (mainPlayer.games.length > 0) {
      btnMostrarVitorias.textContent = "Recolher";
      for (var i = 0; i < mainPlayer.games.length; i++) {
        let card = templateGameReturnCard(
          mainPlayer.games[i].pokemons,
          mainPlayer.games[i].result,
          mainPlayer.games[i].opponent,
          mainPlayer.games[i].conditional
        );
        GamesDiv.appendChild(card);
      }
    } else {
      alert("Você ainda Não jogou");
    }
  }
});

btnMostrarPokemons.addEventListener("click", () => {
  const CPtest = document.querySelectorAll("#lblCP");

  if (CPtest.length >= 1) {
    FunCPeD("", divMTP, "lblCP");
  }
  btnEcP.id = "btnEcP";
  btnEcP.textContent = "Recolher";
  divMTP.appendChild(btnEcP);
  FunCPeD(mainPlayer.pokemons, conteudo, "");
});

btnEcP.addEventListener("click", () => {
  divMTP.removeChild(btnEcP);
  FunCPeD("", conteudo, "lblCP");
});

btnBatalhar.addEventListener("click", () => {
  div2.style.display = "none";
  div3.style.display = "";
  if (GamesDiv.children.length > 0) {
    btnMostrarVitorias.textContent = "Mostrar Jogos";
    while (GamesDiv.firstChild) {
      GamesDiv.removeChild(GamesDiv.firstChild);
    }
  }
});
btnBackMainTypes.addEventListener("click", () => {
  funBackMainMenu();
});
btnBackMainNPC.addEventListener("click", () => {
  funBackMainMenu();
});
btnBackMain.addEventListener("click", () => {
  funBackMainMenu();
});
function funBackMainMenu() {
  if (systemStatus.run === 0) {
  }
  div2.style.display = "";
  div3.style.display = "none";
  divOpcoes.style.display = "";
  OpcsByType.style.display = "none";
  PvpNpcs.style.display = "none";
  btnBackThird.textContent = "Voltar";
  delChatpvp();

  let recolhertSecondForm = (document.querySelector(
    "#backAllTypesBattle"
  ).textContent = "Voltar");

  let recolhertThirdForm = (document.querySelector("#backNpc").textContent =
    "Voltar");

  let checkselc1 = document.querySelector(".PvpOpcoes #slcPmBtid");
  let checkBtnpronto = document.querySelector(".PvpOpcoes #btnPkmPro");
  let checkProcurar = document.querySelector(".PvpOpcoes #btnProcurar");
  let checkopcimg = document.querySelector(".PvpOpcoes #chosePoke");
  if (systemStatus.rematchStatus > 0) {
    systemStatus.rematchStatus = 2;
  }
  if (checkselc1 || checkBtnpronto || checkProcurar) {
    divOpcoes.removeChild(checkselc1);

    divOpcoes.removeChild(checkBtnpronto);
    divOpcoes.removeChild(checkProcurar);
    divOpcoes.removeChild(checkopcimg);
    delChatpvp();
    if (foundedPokemon) {
      foundedPokemon = null;
    }

    btnPrPA.textContent = "Procurar pokemon aleatorio";
  }
}

function FunCPeD(p = "", dApd = "", idDel = "") {
  if (p && dApd) {
    for (i = 0; i < p.length; i++) {
      const lblFunCPeD = document.createElement("label");
      const divimgsPkm = document.createElement("div");
      divimgsPkm.classList.add("conteudo");
      lblFunCPeD.id = "lblCP";
      lblFunCPeD.classList.add("card");
      lblFunCPeD.innerHTML = `<h4>nome: ${p[i].nome} | Tipo: ${p[i].tipo} </h4>`;
      const funCPeRtI = funRtI(p[i].nome);
      lblFunCPeD.appendChild(funCPeRtI);
      dApd.appendChild(lblFunCPeD);
    }
  } else if (idDel && dApd) {
    const CPeDidDel = document.querySelectorAll(`#${idDel}`);

    for (i = 0; i < CPeDidDel.length; i++) {
      dApd.removeChild(CPeDidDel[i]);
    }
  } else {
    alert("nenhum valor foi passado");
  }
}

function funRtI(nm) {
  const funImg = document.createElement("img");
  funImg.id = "funImg";
  funImg.width = "50";
  funImg.src = `./imagens/${nm}.png`;
  return funImg;
}

function retornarIMG(nm, id = "", clas = "") {
  const funImg = document.createElement("img");
  funImg.id = id;
  funImg.classList.add(clas);
  funImg.src = `./imagens/${nm}.png`;
  return funImg;
}
function NpcManagement(number = "") {
  let ids;
  if (number == 0) {
    ids = ["imgfrontBattlePokemonE", "UpdatePokemonNpcE"];
  } else if (number == 1) {
    ids = ["imgfrontBattlePokemonA", "UpdatePokemonNpcA"];
  } else if (number == 2) {
    ids = ["imgfrontBattlePokemonF", "UpdatePokemonNpcF"];
  }
  let npcGen = generateNpcFull(number);
  listChanger(npcGen);
  updateNPCFrontBattle(npcGen, ids);
  return npcGen;
}

async function updateNPCFrontBattle(objecto, ids = "") {
  let [imgPokemon, timerChange] = ids;
  let imgchng = document.querySelector(`#${imgPokemon}`);
  imgchng.src = `./imagens/${objecto.forBattle[0].nome}.png`;
  while (true) {
    await new Promise((r) => setTimeout(r, 100));

    document.querySelector(`#${timerChange}`).textContent = `novo Pokemon em :
      ${objecto.timeToChange} s`;
    if (objecto.timeToChange == 1) {
      imgchng.src = `./imagens/${objecto.forBattle[0].nome}.png`;
    }
  }
}
