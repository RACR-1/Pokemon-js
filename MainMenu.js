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
butao.addEventListener("click", () => {
  statusLabel.innerText = ` Nome:[${mainPlayer.nome}]-Idade:[${mainPlayer.idade}]-Vitorias:[${mainPlayer.wins}] `;
});

btnMostrarPokemons.addEventListener("click", () => {
  const CPtest = document.querySelectorAll("#lblCP");
  console.log(CPtest);
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
