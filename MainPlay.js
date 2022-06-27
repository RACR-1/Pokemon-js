const butao = document.querySelector("#butao");
const nme = document.querySelector("#txt");
const show = document.querySelector("#showObject");
const dive = document.querySelector(".num1");
const form = document.querySelector("#my-form");
const selctipos = document.querySelector("#listaTipos");
const selcpokes = document.querySelector("#listaPokemons");
const labelLista = document.querySelector("#label-lista");
const idade = document.querySelector("#idad");
const maindiv = document.querySelector(".main");
const div2 = document.querySelector(".num2");
const div3 = document.querySelector(".num3");
const div4 = document.querySelector(".num4");
//btnSair
div2.style.display = "none";
div3.style.display = "none";
div4.style.display = "none";
let pvpDiv = "";
//criar outro arquivo pras cidades e pvp
/* labelLista.style.display = "none";
selcpokes.style.display = "none"; */

var mainPlayer = "";

for (i = 0; i < listadospoke.length; i++) {
  const opc1 = document.createElement("option");
  opc1.id = "tiposl";
  opc1.value = listadospoke[i][0];
  opc1.innerHTML = listadospoke[i][0];
  const imgMpT = document.createElement("img");

  selctipos.appendChild(opc1);
}

if (selctipos.value) {
  for (i = 0; i < listadospoke.length; i++) {
    if (listadospoke[i].indexOf(selctipos.value) >= 0) {
      const group = listadospoke[i];
      const g = group.shift();
      for (a = 0; a < group.length; a++) {
        const ini = document.createElement("option");
        ini.id = "optn";
        ini.value = group[a];
        ini.textContent = group[a];
        selcpokes.appendChild(ini);
      }
      group.unshift(g);
    }
  }
}

let pessoa = {
  nome: "",
  idade: 0,
  pokemons: [],
};
let pokemonObj = {
  nome: "",
  tipo: "",
  nivel: "",
};

butao.addEventListener("click", (e) => {
  e.preventDefault();
  if (nme.value && idade.value) {
    mainPlayer = new Player(nme.value, idade.value, []);
    let choosePokemon = new Pokemon(selcpokes.value, selctipos.value);
    insertPokemon(mainPlayer, [choosePokemon]);
    dive.style.display = "none";
    div2.style.display = "";
    online = 1;
  } else {
    const alerta = document.createElement("label");
    alerta.id = "alerta";
    alerta.innerHTML = "preencha todos os campos vazios <br/>";
    dive.appendChild(alerta);
    setTimeout(() => {
      dive.removeChild(alerta);
    }, 4000);
  }
  updateStatusLabel(mainPlayer, "play");
});

selctipos.addEventListener("change", (e) => {
  const checkop = document.querySelectorAll("#optn");
  if (checkop) {
    for (i = 0; i < checkop.length; i++) {
      selcpokes.removeChild(checkop[i]);
    }
  }

  switch (e.target.value) {
    case listadospoke[0][0]:
      showpks(listadospoke[0]);
      break;
    case listadospoke[1][0]:
      showpks(listadospoke[1]);
      break;
    case listadospoke[2][0]:
      showpks(listadospoke[2]);
      break;
  }
});

function showpks(p) {
  const g = p.shift();
  for (a = 0; a < p.length; a++) {
    const ini = document.createElement("option");
    ini.id = "optn";
    ini.value = p[a];
    ini.textContent = p[a];
    selcpokes.appendChild(ini);
  }
  p.unshift(g);
}

function insertPokemon(player1, pokemon) {
  if (Array.isArray(pokemon) == true) {
    //

    for (var i = 0; i < pokemon.length; i++) {
      pokemon[i].player = player1;
      if (player1.Npc) {
        player1.combate.push(pokemon[i]);
      } else {
        player1.pokemons.push(pokemon[i]);
      }
    }
  } else {
    pokemon.player = "";
    pokemon.player = player1;
    if (player1.Npc) {
      player1.combate.push(pokemon);
    } else {
      player1.pokemons.push(pokemon);
    }
  }
}

//

function generateNpcFull(tipo) {
  let nome;
  let listOfinsert;
  if (tipo == 0) {
    nome = "Volkner";
    listOfinsert = generatePokemonArray(tipo);
  } else if (tipo == 1) {
    nome = "Misty";
    listOfinsert = generatePokemonArray(tipo);
  } else if (tipo == 2) {
    nome = "Kabu";
    listOfinsert = generatePokemonArray(tipo);
  }

  let NpcReturn = new NPCplayer(nome);

  insertPokemon(NpcReturn, listOfinsert);
  return NpcReturn;
  //
}
function generatePokemonArray(number) {
  let listToReturn = [];
  for (var i = 1; i < listadospoke[number].length; i++) {
    listToReturn.push(new Pokemon(listadospoke[number][i]));
    //
  }

  return listToReturn;
}
