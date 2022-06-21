const NpcEletric = document.querySelector("#btnBtEl");
const labelNpc = document.querySelector(".PvpOpcoesNpc #labelChooseType");
PvpNpcs;

NpcEletric.addEventListener("click", () => {
  initiation(0);
});

function initiation(tipoPok) {
  if (systemStatus.run == 0) {
    if (systemStatus.rematchStatus == 1) {
      if (
        window.confirm(
          "Você perdera sua revanche se continuar deseja prosseguir?"
        ) == true
      ) {
        firstInitiation(tipoPok);
      }
    } else {
      firstInitiation(tipoPok);
    }
  }
}

function firstInitiation(tipo) {
  console.log(tipo);
  if (tipo == 0) {
    console.log(tipo, "teste");
    labelNpc.textContent = "Treinador Tipo eletrico";
  } else if (tipo == 1) {
    labelNpc.textContent = "Treinador Tipo Aquatico";
  } else if (tipo == 3) {
    labelNpc.textContent = "Treinador Tipo Fogo";
  }
  systemStatus.rematchStatus = 2;

  divOpcoes.style.display = "none";

  OpcsByType.style.display = "none";

  PvpNpcs.style.display = "";
  systemStatus.formBattles = 3;
  //
  //
  updatePokemonListBattle("selectPokemonsNpc");
}
function npcOnChatBattle() {}
function generateNpc() {}
function extractPokemonNpc() {}
