const statusLabel = document.querySelector("#lblPId");

//botoes principai
const btnMostrarPokemons = document.querySelector("#btnShowAllPKS");
const btnMostrarVitorias = document.querySelector("#btnShowWins");
const btnBatalhar = document.querySelector("#btnBatalhar");
const btnAutor = document.querySelector("btnAutoria");
const btnsair = document.querySelector("btnSair");
const btnBackMain = document.querySelector("#btnBackMain");
//

//
const btnEcP = document.createElement("button");
//
const divMTP = document.querySelector("#mostrarTodosPokemons");

//
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
function updateStatusLabel(mPlayer) {
  statusLabel.innerText = ` Nome:[${mPlayer.nome}]-Idade:[${
    mPlayer.idade
  }]-Games:[${mPlayer.games.length}]-Vitorias:[${countGamesNumber(
    mPlayer
  )}]-Derrotas:[${countGamesNumber(mPlayer, "0")}] `;
}
butao.addEventListener("click", () => {
  updateStatusLabel(mainPlayer);
});

btnMostrarPokemons.addEventListener("click", () => {
  const CPtest = document.querySelectorAll("#lblCP");

  if (CPtest.length >= 1) {
    FunCPeD("", divMTP, "lblCP");
  }
  btnEcP.id = "btnEcP";
  btnEcP.textContent = "Recolher";
  divMTP.appendChild(btnEcP);
  FunCPeD(mainPlayer.pokemons, divMTP, "");
});

btnEcP.addEventListener("click", () => {
  //

  divMTP.removeChild(btnEcP);
  FunCPeD("", divMTP, "lblCP");
});

btnBatalhar.addEventListener("click", () => {
  /* div2.style.display = "none";
  div3.style.display = ""; */
});
btnBackMain.addEventListener("click", () => {
  /* div2.style.display = "";
  div3.style.display = "none"; */
});

function FunCPeD(p = "", dApd = "", idDel = "") {
  if (p && dApd) {
    for (i = 0; i < p.length; i++) {
      const lblFunCPeD = document.createElement("label");
      lblFunCPeD.id = "lblCP";
      lblFunCPeD.innerHTML = `<h4>nome: ${p[i].nome} | Tipo: ${p[i].tipo} </h4>`;
      const funCPeRtI = funRtI(p[i].nome);
      lblFunCPeD.appendChild(funCPeRtI);
      dApd.appendChild(lblFunCPeD);
    }
  } else if (idDel && dApd) {
    //

    const CPeDidDel = document.querySelectorAll(`#${idDel}`);

    for (i = 0; i < CPeDidDel.length; i++) {
      dApd.removeChild(CPeDidDel[i]);
    }
    //
  } else {
    alert("nenhum valor foi passado");
  }
}
function FunCoE(e) {
  /* contar elementos */
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
