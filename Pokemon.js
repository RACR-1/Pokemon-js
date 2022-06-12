let chatreference = [];
let oponPoke = "";

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
  console.log("console logggg tipokem");
  console.log(listadospoke.length);

  for (var i = 0; i < listadospoke.length; i++) {
    console.log(listadospoke[i]);
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

class Pokemon {
  constructor(nome = null, tipo = "", nivel = 2, player = "") {
    this.player = player;
    this.nome = nome ? nome : tipo ? rdNm(tipo) : nome1;
    this.tipo = tipo ? tipo : nome ? tipokem(nome) : tipo1;
    this.nivel = parseInt(nivel);
    this.life = this.nivel * 6;
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

      //
      oponPoke = "";
      oponPoke = [];
      oponPoke.push(champion);
      chatreference = "";
      chatreference = [];
      let lifoponent = champion.life;
      let mylife = this.life;
      console.log("----------------------------------");
      console.log(
        `Vida inicial de seu pokemon ${this.nome} : ${mylife} , vida inicial de ${champion.nome} inimigo : ${champion.life}.`
      );
      chatreference.push(
        `Vida inicial de seu pokemon ${this.nome} : ${mylife} , vida inicial de ${champion.nome} inimigo : ${lifoponent}.`
      );
      //

      while (true) {
        //
        //
        //

        let meudano = lifoponent;
        lifoponent = lifoponent - this.damage();
        let dCausado = meudano - lifoponent;
        let SeuDanoTota = parseInt(0);
        SeuDanoTota = SeuDanoTota + dCausado;

        chatreference.push(
          `Seu ${this.nome} Tipo : ${this.tipo} Deu ${dCausado} de dano no ${champion.nome} `
        );

        console.log(
          `Seu ${this.nome} Tipo : ${this.tipo} Deu ${dCausado} de dano no ${champion.nome} `
        );
        console.log("vida do oponente " + lifoponent);
        if (lifoponent <= 0) {
          //
          if (player) {
            let youWin = {
              resultado: `Vitoria [${this.nome} - ${this.tipo}] contra [${champion.nome} - ${champion.tipo}] de ${champion.player.nome}`,
            };
            player.wins.push(youWin);
            if (champion.player) {
              let youLoos = {
                resultado: `Derrota [${champion.nome} - ${champion.tipo}] contra [${this.nome} - ${this.tipo}] de ${this.player.nome}`,
              };
              champion.player.wins.push(youLoos);
            }
          }
          if (champion.player) {
            let youLoos = {
              resultado: `Derrota [${champion.nome} - ${champion.tipo}] contra [${this.nome} - ${this.tipo}] de ${this.player.nome}`,
            };
            champion.player.wins.push(youLoos);
          }

          //
          chatreference.push(
            `Você venceu! ${champion.nome} inimigo esta com ${lifoponent} de vida! `
          );

          console.log(
            `Você venceu! ${champion.nome} inimigo esta com ${lifoponent} de vida! `
          );
          console.log(`Vida atual de Seu pokemon ${this.nome} é ${mylife}`);
          console.log("----------------------------------");
          chatreference.push(
            `Vida atual de Seu pokemon ${this.nome} é ${mylife}`
          );
          chatreference.push({ Win: "win" });

          break;
        }
        //
        //
        //

        let danoinim = mylife;
        mylife = mylife - champion.damage();
        let dCausadoOp = danoinim - mylife;
        let inDanoTota = parseInt(0);
        inDanoTota = SeuDanoTota + dCausado;
        chatreference.push(
          `${champion.nome} tipo: ${champion.tipo} deu ${dCausadoOp} em seu pokemon ${this.nome} `
        );
        console.log(
          `${champion.nome} tipo: ${champion.tipo} deu ${dCausadoOp} em seu pokemon ${this.nome} `
        );
        console.log("Sua vida " + mylife);
        chatreference.push(`Sua vida ${mylife} vida do oponente ${lifoponent}`);
        if (mylife <= 0) {
          console.log(`Você perdeu ${champion.nome} venceu!`);
          chatreference.push(`Você perdeu ${champion.nome} venceu!`);

          console.log("Sua vida: " + mylife);
          chatreference.push(`Sua vida:   ${mylife}`);
          chatreference.push({ Loose: "Loose" });

          console.log("----------------------------------");
          if (champion.player) {
            let youLoos = {
              resultado: `Derrota [${champion.nome} - ${champion.tipo}] contra [${this.nome} - ${this.tipo}] de ${this.player.nome}`,
            };
            champion.player.wins.push(youLoos);
            if (player) {
              let youWin = {
                resultado: `Vitoria [${this.nome} - ${this.tipo}] contra [${champion.nome} - ${champion.tipo}] de ${champion.player.nome}`,
              };
              player.wins.push(youWin);
            }
          }
          if (player) {
            let youWin = {
              resultado: `Vitoria [${this.nome} - ${this.tipo}] contra [${champion.nome} - ${champion.tipo}] de ${champion.player.nome}`,
            };
            player.wins.push(youWin);
          }

          break;
        }
      }
      //
    };
  }
}
