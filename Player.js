class Player {
  constructor(nome, idade, pokemons) {
    let a = [];
    testarpok(pokemons);
    this.rematchCoins = 3;
    this.nome = nome ? verifyname(nome) : "Desconhecido";
    this.idade = idade ? idade : 18;
    this.pokemons = a;
    this.games = [];
    this.batalhar = (oponen) => {
      function senpc(oponem) {
        const nomz = oponem.nome;
        if (nomz.indexOf("NPC") == true) {
          return oponem.combate[
            Math.floor(Math.random() * oponem.combate.length)
          ];
        } else {
          if (Array.isArray(oponem.pokemons) == true) {
            let pokemoesc = [];
            for (i = 0; i < oponem.pokemons.length; i++) {
              let str = `[${i}]-[${oponem.pokemons[i].nome}]
              `;
              pokemoesc.push(str);
            }
            const escolhido = prompt(
              ` ${pokemoesc}`.replace(/,| /g, "") + `escolha um pokemon`
            );
            if (escolhido) {
              return oponem.pokemons[escolhido];
            } else {
              return oponem.pokemons[
                Math.floor(Math.random() * oponem.pokemons.length)
              ];
            }
          } else {
            console.log(
              `você possui apenas um pokemon, ele Foi escolhido automaticamente : ${oponen.pokemons[0]}`
            );
            return oponem.pokemons[0];
          }
        }
      }
      function pokechoise(challenger, nomeplayer) {
        const nomez = nomeplayer;

        if (nomez.indexOf("NPC") >= 0) {
          return challenger[Math.floor(Math.random() * challenger.length)];
        } else {
          if (Array.isArray(challenger) == true) {
            let pokelis = [];
            for (i = 0; i < challenger.length; i++) {
              let pokemon1 = `[${i}]-[${challenger[i].nome}]
            `;
              pokelis.push(pokemon1);
            }
            const escolhido = prompt(
              `${pokelis}`.replace(/,| /g, "") +
                `escolha um pokemon (pokechoise)`
            );
            if (escolhido) {
              return challenger[escolhido];
            } else {
              return challenger[Math.floor(Math.random() * challenger.length)];
            }
          } else {
            console.log(
              `você possui apenas um pokemon, ele foi escolhido automaticamente: ${challenger.pokemons[0]} . `
            );
            return challenger.pokemons[0];
          }
        }
      }
      const chosen = senpc(oponen);
      const meu = pokechoise(this.pokemons, this.nome);
      const lis = [meu, chosen];
      const numer = Math.floor(Math.random() * lis.length);

      console.log(" Sorteando primeiro ataque! ");
      console.log("---------------------------------------------");
      console.log(`Vidas iniciail ${meu.nome}[${meu.life}]<3 `);
      console.log(` ${chosen.nome}[${chosen.life}]<3`);
      //
      if (numer == 0) {
        console.log(`${this.nome} é o primeiro a atacar`);
        while (true) {
          let [dano1, lifeat] = meu.dano(chosen);
          chosen.life = lifeat;
          console.log(
            `${meu.nome}[${meu.life}]<3 de ${this.nome} deu ${dano1} de dano em ${chosen.nome} [${lifeat}]<3 de ${oponen.nome}`
          );
          if (lifeat <= 0) {
            console.log(`${meu.nome} de ${this.nome} venceu a Batalha`);
            this.wins = this.wins + 1;
            console.log(`Vitorias de ${this.nome}: ${this.wins} `);
            meu.life = meu.nivel * 6;
            chosen.life = chosen.nivel * 6;
            return;
          }
          //
          //

          let [dano2, lifeat2] = chosen.dano(meu);
          meu.life = lifeat2;
          console.log(
            `${chosen.nome}[${chosen.life}]<3 de ${oponen.nome} deu ${dano2} de dano em ${meu.nome} [${lifeat2}]<3 de ${this.nome}`
          );
          if (lifeat2 <= 0) {
            console.log(`${chosen.nome} de ${oponen.nome} venceu a Batalha`);
            oponen.wins = oponen.wins + 1;
            console.log(`Vitorias de ${oponen.nome}: ${oponen.wins} `);
            meu.life = meu.nivel * 6;
            chosen.life = chosen.nivel * 6;
            return;
          }

          //
        }
      } else {
        console.log(`${oponen.nome} é o primeiro a atacar`);
        while (true) {
          let [dano2, lifeat2] = chosen.dano(meu);
          meu.life = lifeat2;
          console.log(
            `${chosen.nome}[${chosen.life}]<3 de ${oponen.nome} deu ${dano2} de dano em ${meu.nome} [${lifeat2}]<3 de ${this.nome}`
          );
          if (lifeat2 <= 0) {
            console.log(`${chosen.nome} de ${oponen.nome} venceu a Batalha`);
            oponen.wins = oponen.wins + 1;
            console.log(`Vitorias de ${oponen.nome}: ${oponen.wins} `);
            meu.life = meu.nivel * 6;
            chosen.life = chosen.nivel * 6;
            return;
          }
          //
          //
          let [dano1, lifeat] = meu.dano(chosen);
          chosen.life = lifeat;
          console.log(
            `${meu.nome}[${meu.life}]<3 de ${this.nome} deu ${dano1} de dano em ${chosen.nome} [${lifeat}]<3 de ${oponen.nome}`
          );
          if (lifeat <= 0) {
            console.log(`${meu.nome} de ${this.nome} venceu a Batalha`);
            this.wins = this.wins + 1;
            console.log(`Vitorias de ${this.nome}: ${this.wins} `);
            meu.life = meu.nivel * 6;
            chosen.life = chosen.nivel * 6;
            return;
          }
        }
      }
    };

    function verifyname(nom) {
      const name = nom.trim();

      if (name.indexOf("NPC") >= 0) {
        return name.replace(/NPC/g, "");
      } else {
        return name.trim();
      }
    }

    function batalhar(oponen) {
      const chosen = oponen;
      /* const meu = this.pokemons[0];
      const lis = [chosen, meu][Math.floor(Math.random() * 2)]; */
      console.log(chosen);
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
    /* listChanger(this.combate, this.forBattle, this.timeToChange); */
    //
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
  while (true) {
    let stuckhere = [];
    if (objeto.forBattle.length > 0) {
      let takeOut = objeto.forBattle.pop();
      if (stuckhere.length > 0) {
        stuckhere.pop();
      }
      stuckhere.push(takeOut);
    }

    let insert =
      objeto.combate[Math.floor(Math.random() * objeto.combate.length)];

    let indexPosition = objeto.combate.indexOf(insert);
    let item = objeto.combate.splice(indexPosition, 1);

    objeto.forBattle.push(item[0]);
    if (stuckhere.length > 0) {
      objeto.combate.push(stuckhere[0]);
    }

    //insert the pokemon here

    for (var i = 60; i > 0; i--) {
      await new Promise((r) => setTimeout(r, 1000));
      objeto.timeToChange = i;
    }
    objeto.forBattle[0].Played = 0;
  }
}
