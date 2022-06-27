let chatreference = {
  list: [],
  enemy: [],
  names: [] /* { player: undefined, enemy: undefined } */,
  firstAttack: { pokemon: [], position: [] },
  critical: { type: [], positio: [] }, // talvez fazer outro objeto como pictures
  pictures: { name: [], positio: [] },
  battle_Status: { end: 0, much: [] },
};

const listEletricos = [
  "eletricos",
  "Caterpie",
  "Pidgey",
  "Pikachu",
  "Raichu",
  "Sandshrew",
];

const listaAquaticos = [
  "aguatico",
  "Phione",
  "Feraligatr",
  "Quagsire",
  "Wailord",
  "Wooper",
];

const listaFogo = [
  "fogo",
  "Charmander",
  "Charizard",
  "Quilava",
  "Darmanitan",
  "Moltres",
];

const listaTipos = ["Eletrico", "Aquatico", "Fogo"];
const listadospoke = [listEletricos, listaAquaticos, listaFogo];

function tipokem(nome) {
  for (var i = 0; i < listadospoke.length; i++) {
    if (listadospoke[i].indexOf(nome) >= 0) {
      return listadospoke[i][0];
    }
  }

  return "Desconhecido";
}

//
function selectpoke() {
  const ordem = listadospoke[Math.floor(Math.random() * listadospoke.length)];
  const type = ordem.shift();
  const result = ordem[Math.floor(Math.random() * ordem.length)];
  ordem.unshift(type);
  return [result, type];
}

const [nome1, tipo1] = selectpoke();

function rdNm(typ) {
  for (i = 0; i < listadospoke.length; i++) {
    if (listadospoke[i].indexOf(typ) >= 0) {
      listadospoke[i].shift(typ);
      let escolhido =
        listadospoke[i][Math.floor(Math.random() * listadospoke.length)];
      listadospoke[i].unshift(typ);
      return escolhido;
    }
  }
}
//if i want put rematch for specific pokemon imma need to creat one variable this.rematchNumber to compare if it has number above i want
//turn under i want and then the pokemon gonna be unavaliable to other fight
//for the npc it gonna make the pokemon unavaliable and then the battle will be with other random even it you just battle
class Pokemon {
  constructor(nome = null, tipo = "", nivel = 2, player = "") {
    this.rematch = 0;
    this.player = player;
    this.nome = nome ? nome : tipo ? rdNm(tipo) : nome1;
    this.tipo = tipo ? tipo : nome ? tipokem(nome) : tipo1;
    this.nivel = parseInt(nivel);
    this.life = this.nivel * 6;
    this.Played = 0;
    this.damage = () => {
      const randomico = Math.floor(Math.random() * 10);
      if (randomico >= 7) {
        return Math.floor(Math.random() * (this.nivel + this.life / 2 - 1) + 1);
      } else {
        return Math.floor(Math.random() * (this.nivel + 6 / 2 - 1) + 1);
      }
    };
    this.dano = (champion) => {
      //
      let lifoponent = champion.life;
      let initial = champion.life;
      //
      lifoponent = lifoponent - this.damage();

      let danocausado = initial - lifoponent;

      return [danocausado, lifoponent];
      //
    };
    //
    this.attack = (champion) => {
      //
      /* chatreference.battleRslt.win = undefined;
      chatreference.battleRslt.Loose = undefined; */
      chatreference.pictures.name = "";
      chatreference.pictures.name = [];
      chatreference.pictures.positio = "";
      chatreference.pictures.positio = [];
      chatreference.names = "";
      chatreference.names = [];
      chatreference.names.push(this.nome);
      chatreference.names.push(champion.nome);

      //
      chatreference.enemy = "";
      chatreference.enemy = [];
      chatreference.enemy.push(champion);
      chatreference.list = "";
      chatreference.list = [];

      chatreference.firstAttack.position = [];
      chatreference.firstAttack.pokemon = [];
      let lifoponent = champion.life;
      let mylife = this.life;

      chatreference.list.push(
        `Vida inicial de seu pokemon ${this.nome} : ${mylife} , vida inicial de ${champion.nome} inimigo : ${lifoponent}.`
      );
      //
      chatreference.pictures.positio.push(chatreference.list.length - 1);
      chatreference.pictures.name.push(0);
      chatreference.list.push(`Sorteando Primeiro ataque`);
      let fAttack = Math.floor(Math.random() * chatreference.names.length);

      if (fAttack == 0) {
        chatreference.list.push(
          `Promeiro a atacar ${chatreference.names[fAttack]} Aliado`
        );
      } else {
        chatreference.list.push(
          `Promeiro a atacar ${chatreference.names[fAttack]} Oponente`
        );
      }
      chatreference.firstAttack.position.push(chatreference.list.length - 1);
      chatreference.firstAttack.pokemon.push(chatreference.names[fAttack]);
      if (fAttack === 0) {
        ////////////////////////////////////////////////////////////////////////////////
        while (true) {
          //
          //
          //

          let meudano = lifoponent;
          lifoponent = lifoponent - this.damage();
          let dCausado = meudano - lifoponent; //

          //if dano tal maior que adicionar no chat reference com push vai ser uma lista de 0 ou 1 assim da pra ver se é critico
          // mesmo sistema com as fotos tem 2 ataques no primeiro bota 1 no segundo zero essa numeração vai definir prioridade
          chatreference.list.push(
            `Seu ${this.nome} Tipo : ${this.tipo} Deu ${dCausado} de dano no ${champion.nome} `
          );
          if (dCausado > 4) {
            chatreference.critical.positio.push(chatreference.list.length - 1);
            chatreference.critical.type.push(this.tipo);
          }
          chatreference.pictures.positio.push(chatreference.list.length - 1);
          chatreference.pictures.name.push(0);
          //aqui
          if (lifoponent <= 0) {
            chatreference.list.push(
              `Você venceu! ${champion.nome} inimigo esta com ${lifoponent} de vida! `
            );

            chatreference.list.push(
              `Vida atual de Seu pokemon ${this.nome} é ${mylife}`
            );
            chatreference.list.push({ Win: "win" });
            //put the while here

            if (this.player) {
              let battleResult = {
                result: `Vitoria [${this.nome} - ${this.tipo}] contra [${champion.nome} - ${champion.tipo}] `,
                opponent: champion.player
                  ? champion.player.nome
                  : champion.nome,
                conditional: 1,
                pokemons: [this.nome, champion.nome],
              };
              /*  this.player.games.push(battleResult); */
              pushGametoPlayer(this.player, battleResult);
            }

            if (champion.player) {
              let battleResult = {
                result: `Derrota [${champion.nome} - ${champion.tipo}] contra [${this.nome} - ${this.tipo}] de ${this.player.nome}`,
                opponent: this.player.nome,
                conditional: 0,
                pokemons: [this.nome, champion.nome],
              };

              /* champion.player.games.push(battleResult); */
              pushGametoPlayer(champion.player, battleResult);
            }

            //end here

            break;
          }
          //
          //
          //

          let danoinim = mylife;
          mylife = mylife - champion.damage();
          let dCausadoOp = danoinim - mylife;

          chatreference.list.push(
            `${champion.nome} tipo: ${champion.tipo} deu ${dCausadoOp} em seu pokemon ${this.nome} `
          );
          //
          if (dCausadoOp > 4) {
            chatreference.critical.positio.push(chatreference.list.length - 1);
            chatreference.critical.type.push(champion.tipo);
          }
          chatreference.pictures.positio.push(chatreference.list.length - 1);
          chatreference.pictures.name.push(1);
          chatreference.list.push(
            `Sua vida ${mylife} vida do oponente ${lifoponent}`
          );
          if (mylife <= 0) {
            chatreference.list.push(`Você perdeu ${champion.nome} venceu!`);
            chatreference.list.push(`Sua vida:   ${mylife}`);
            chatreference.list.push({ Loose: "Loose" });

            if (champion.player) {
              let battleResult = {
                result: `Vitoria [${champion.nome} - ${champion.tipo}] contra [${this.nome} - ${this.tipo}] de ${this.player.nome}`,
                opponent: this.player.nome,
                conditional: 1,
                pokemons: [this.nome, champion.nome],
              };

              /* champion.player.games.push(battleResult); */
              pushGametoPlayer(champion.player, battleResult);
            }

            if (this.player) {
              let battleResult = {
                result: `Derrota [${this.nome} - ${this.tipo}] contra [${champion.nome} - ${champion.tipo}] `,
                opponent: champion.player
                  ? champion.player.nome
                  : champion.nome,
                conditional: 0,
                pokemons: [this.nome, champion.nome],
              };

              /* this.player.games.push(battleResult); */
              pushGametoPlayer(this.player, battleResult);
            }

            break;
          }
        }
      } else {
        ///////////////////////////////////////////////////////////////////
        while (true) {
          //
          //
          //
          let danoinim = mylife;
          mylife = mylife - champion.damage();
          let dCausadoOp = danoinim - mylife;

          chatreference.list.push(
            `${champion.nome} tipo: ${champion.tipo} deu ${dCausadoOp} em seu pokemon ${this.nome} `
          );
          //
          if (dCausadoOp > 4) {
            chatreference.critical.positio.push(chatreference.list.length - 1);
            chatreference.critical.type.push(champion.tipo);
          }
          chatreference.pictures.positio.push(chatreference.list.length - 1);
          chatreference.pictures.name.push(1);
          chatreference.list.push(
            `Sua vida ${mylife} vida do oponente ${lifoponent}`
          );
          if (mylife <= 0) {
            chatreference.list.push(`Você perdeu ${champion.nome} venceu!`);
            chatreference.list.push(`Sua vida:   ${mylife}`);
            chatreference.list.push({ Loose: "Loose" });

            if (champion.player) {
              let battleResult = {
                result: `Vitoria [${champion.nome} - ${champion.tipo}] contra [${this.nome} - ${this.tipo}] de ${this.player.nome}`,
                opponent: this.player.nome,
                conditional: 1,
                pokemons: [this.nome, champion.nome],
              };

              /* champion.player.games.push(battleResult); */
              pushGametoPlayer(champion.player, battleResult);
            }

            if (this.player) {
              let battleResult = {
                result: `Derrota [${this.nome} - ${this.tipo}] contra [${champion.nome} - ${champion.tipo}] `,
                opponent: champion.player
                  ? champion.player.nome
                  : champion.nome,
                conditional: 0,
                pokemons: [this.nome, champion.nome],
              };

              /*  this.player.games.push(battleResult); */
              pushGametoPlayer(this.player, battleResult);
            }

            break;
          }
          ////////
          ////////
          ////////
          let meudano = lifoponent;
          lifoponent = lifoponent - this.damage();
          let dCausado = meudano - lifoponent; //

          //if dano tal maior que adicionar no chat reference com push vai ser uma lista de 0 ou 1 assim da pra ver se é critico
          // mesmo sistema com as fotos tem 2 ataques no primeiro bota 1 no segundo zero essa numeração vai definir prioridade
          chatreference.list.push(
            `Seu ${this.nome} Tipo : ${this.tipo} Deu ${dCausado} de dano no ${champion.nome} `
          );
          if (dCausado > 4) {
            chatreference.critical.positio.push(chatreference.list.length - 1);
            chatreference.critical.type.push(this.tipo);
          }
          chatreference.pictures.positio.push(chatreference.list.length - 1);
          chatreference.pictures.name.push(0);
          //aqui
          if (lifoponent <= 0) {
            //
            chatreference.list.push(
              `Você venceu! ${champion.nome} inimigo esta com ${lifoponent} de vida! `
            );

            chatreference.list.push(
              `Vida atual de Seu pokemon ${this.nome} é ${mylife}`
            );
            chatreference.list.push({ Win: "win" });

            if (this.player) {
              let battleResult = {
                result: `Vitoria [${this.nome} - ${this.tipo}] contra [${champion.nome} - ${champion.tipo}] `,
                opponent: champion.player
                  ? champion.player.nome
                  : champion.nome,
                conditional: 1,
                pokemons: [this.nome, champion.nome],
              };

              /* this.player.games.push(battleResult); */
              pushGametoPlayer(this.player, battleResult);
            }

            if (champion.player) {
              let battleResult = {
                result: `Derrota [${champion.nome} - ${champion.tipo}] contra [${this.nome} - ${this.tipo}] de ${this.player.nome}`,
                opponent: this.player.nome,
                conditional: 0,
                pokemons: [this.nome, champion.nome],
              };

              /* champion.player.games.push(battleResult); */
              pushGametoPlayer(champion.player, battleResult);
            }

            //

            break;
          }

          //
          //
          //
        }
      }
      //push game into player
      async function pushGametoPlayer(PlayerToPush, gameToPush) {
        chatreference.battle_Status.much.push(
          chatreference.battle_Status.much.length
        );
        endObserver();
        let loopBattle = true;
        while (loopBattle) {
          if (chatreference.battle_Status.end == 1) {
            loopBattle = false;
            PlayerToPush.games.push(gameToPush);

            chatreference.battle_Status.much.pop();
            /* chatreference.end = 0; */
            break;
          }

          await new Promise((r) => setTimeout(r, 1000));
        }
      }
      async function endObserver() {
        //
        let loopStatus = true;
        while (loopStatus) {
          //
          if (chatreference.battle_Status.end === 1) {
            if (chatreference.battle_Status.much.length == 0) {
              chatreference.battle_Status.end = 0;
            }
          }
          await new Promise((r) => setTimeout(r, 900));
        }
      }
    };
  }
}
