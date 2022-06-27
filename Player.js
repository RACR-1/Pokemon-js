class Player {
  constructor(nome, idade, pokemons) {
    let a = [];
    testarpok(pokemons);
    this.rematchCoins = 3;
    this.nome = nome ? verifyname(nome) : "Desconhecido";
    this.idade = idade ? idade : 18;
    this.pokemons = a;
    this.games = [];

    function verifyname(nom) {
      const name = nom.trim();

      if (name.indexOf("NPC") >= 0) {
        return name.replace(/NPC/g, "");
      } else {
        return name.trim();
      }
    }

    function agrupar(pok) {
      for (i = 0; i < pok.length; i++) {
        a.push(pok[i]);
      }
      return a;
    }

    function testarpok(inn) {
      if (inn) {
        if (Array.isArray(inn) == true) {
          const ag = agrupar(inn);
          return ag;
        } else {
          a.push(inn);
          return a;
        }
      }
    }
  }
}

class NPCplayer extends Player {
  constructor(nome, idade, pokemons) {
    const nomes = ["João", "Jose", "Gilherme", "Rafael"];
    super(nome, idade, pokemons);
    let a = [];
    let b = [];
    let timeToChange = 0;
    testarpok(pokemons);
    if (nome) {
      this.nome = nome;
    } else {
      this.nome = " NPC " + nomes[Math.floor(Math.random() * nomes.length)];
    }
    this.Npc = "Npc";
    this.idade = idade ? idade : 20;
    this.combate = a;
    this.forBattle = b;
    this.timeToChange = timeToChange;

    function testarpok(inn) {
      if (inn) {
        if (Array.isArray(inn) == true) {
          const ag = agrupar(inn);
          return ag;
        } else {
          a.push(inn);
          return a;
        }
      }
    }
  }
}

async function listChanger(objeto) {
  let changed = 0;

  while (true) {
    let stuckhere = [];
    if (objeto.forBattle.length > 0) {
      let takeOut = objeto.forBattle.pop();
      if (stuckhere.length > 0) {
        stuckhere.pop();
      }
      stuckhere.push(takeOut);
      stuckhere[0].Played = 0;
    }

    let insert =
      objeto.combate[Math.floor(Math.random() * objeto.combate.length)];

    let indexPosition = objeto.combate.indexOf(insert);
    let item = objeto.combate.splice(indexPosition, 1);

    objeto.forBattle.push(item[0]);
    if (stuckhere.length > 0) {
      objeto.combate.push(stuckhere[0]);
    }

    for (var i = 60; i > 0; i--) {
      await new Promise((r) => setTimeout(r, 1000));
      objeto.timeToChange = i;
      if (online === 0) {
        if (changed === 0) {
          if (stuckhere.length > 0) {
            stuckhere[0].Played = 0;
          }
          objeto.forBattle[0].Played = 0;
          for (var c = 0; c < objeto.combate.length; c++) {
            objeto.combate[c].Played = 0;
          }
          changed = 1;
          while (online === 0) {
            await new Promise((r) => setTimeout(r, 500));
          }
        }
      } else {
        changed = 0;
      }
    }
    objeto.forBattle[0].Played = 0;
  }
}
