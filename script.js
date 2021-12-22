// Chaves referencia objeto
//           Chave. Valor.
var jogador1 = {
  avatar:
    "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255634-stock-illustration-avatar-icon-male-profile-gray.jpg",
  nome: "Jogador 1",
  vitorias: 0,
  empates: 0,
  derrotas: 0,
  pontos: 0
};
var jogador2 = {
  avatar:
    "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255634-stock-illustration-avatar-icon-male-profile-gray.jpg",
  nome: "Jogador 2",
  vitorias: 0,
  empates: 0,
  derrotas: 0,
  pontos: 0
};

function calculoPontos(jogador) {
  var pontos = jogador.vitorias * 3 + jogador.empates;
  return pontos;
}

jogador1.pontos = calculoPontos(jogador1);
jogador2.pontos = calculoPontos(jogador2);

var jogadores = [jogador1, jogador2];

function exibeJogadoresNaTela(jogadores) {
  var elemento = "";

  for (var i = 0; i < jogadores.length; i++) {
    elemento +=
      "<tr class = 'colunas'><td class = 'colunas'><img src=" +
      jogadores[i].avatar +
      " class = 'avatar'></td>";
    elemento += "<td>" + jogadores[i].nome + "</td>";
    elemento += "<td>" + jogadores[i].vitorias + "</td>";
    elemento += "<td>" + jogadores[i].empates + "</td>";
    elemento += "<td>" + jogadores[i].derrotas + "</td>";
    elemento += "<td>" + jogadores[i].pontos + "</td>";
    elemento +=
      "<td class='colunas'><button class ='acoes vitoria' onClick='adicionarVitoria(" +
      i +
      ")'>Vitória</button></td>";
    elemento +=
      "<td class='colunas'><button class ='acoes empate' onClick='adicionarEmpate(" +
      i +
      ")'>Empate</button></td>";
    elemento +=
      "<td class='colunas'><button class ='acoes derrota' onClick='adicionarDerrota(" +
      i +
      ")'>Derrota</button></td>";
    elemento += "</tr>";
  }

  var tabelaJogadores = document.getElementById("tabelaJogadores");

  tabelaJogadores.innerHTML = elemento;
}

exibeJogadoresNaTela(jogadores);

function adicionarVitoria(i) {
  var jogador = jogadores[i];

  jogador.vitorias++;

  jogador.pontos = calculoPontos(jogador);

  exibeJogadoresNaTela(jogadores);
}

function adicionarEmpate(i) {
  var jogador = jogadores[i];

  jogador.empates++;

  jogador.pontos = calculoPontos(jogador);

  var verificadorEmpate = document.getElementsByClassName("vitoria")[i]
    .disabled;

  if (verificadorEmpate == false) {
    exibeJogadoresNaTela(jogadores);

    var botaoEmpateClicado = document.getElementsByClassName("empate")[i];

    botaoEmpateClicado.disabled = true;

    botaoEmpateClicado.classList.toggle("clicado");

    for (var q = 0; q < jogadores.length; q++) {
      var desabilitaBotoesVitoria = document.getElementsByClassName("vitoria")[
        q
      ];

      var desabilitaBotoesDerrota = document.getElementsByClassName("derrota")[
        q
      ];

      desabilitaBotoesVitoria.disabled = true;

      desabilitaBotoesDerrota.disabled = true;

      desabilitaBotoesVitoria.classList.toggle("disabled");

      desabilitaBotoesDerrota.classList.toggle("disabled");
    }
  } else {
    exibeJogadoresNaTela(jogadores);
  }
}

function adicionarDerrota(i) {
  var jogador = jogadores[i];

  jogador.derrotas++;

  exibeJogadoresNaTela(jogadores);
}

function exibeListaJogadores(jogadores) {
  var listaNomes =
    "<option value='' class='placeholder'disabled selected>Selecione um jogador</option>";

  for (i = 0; i < jogadores.length; i++) {
    listaNomes +=
      "<option value='" +
      jogadores[i].nome +
      "'>" +
      jogadores[i].nome +
      "</option>";
  }

  listaJogadores.innerHTML = listaNomes;
}

function removeTagHTML(string) {
  const htmlEntities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"
  };

  var temp = document.createElement("DIV");

  temp.innerHTML = string;

  return string.replace(/([&<>\"'])/g, (match) => htmlEntities[match]);
}

function adicionarJogador() {
  var entradaAvatar = document.getElementById("avatar").value.trim();
  var enderecoAvatar = removeTagHTML(entradaAvatar);

  var entradaJogadorNovo = document.getElementById("jogadorNovo").value.trim();
  var nomeJogadorNovo = removeTagHTML(entradaJogadorNovo);
  var nomeRepetido = jogadores.findIndex(
    (jogador) => jogador.nome === nomeJogadorNovo
  );

  if (
    enderecoAvatar.endsWith(".jpg") ||
    enderecoAvatar.endsWith(".jpeg") ||
    enderecoAvatar.endsWith(".png") ||
    enderecoAvatar == ""
  ) {
    if (nomeRepetido < 0 && nomeJogadorNovo != "") {
      if (entradaAvatar == "") {
        var jogadorNovo = {
          avatar:
            "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255634-stock-illustration-avatar-icon-male-profile-gray.jpg",
          nome: nomeJogadorNovo,
          vitorias: 0,
          empates: 0,
          derrotas: 0,
          pontos: 0
        };
      } else {
        var jogadorNovo = {
          avatar: enderecoAvatar,
          nome: nomeJogadorNovo,
          vitorias: 0,
          empates: 0,
          derrotas: 0,
          pontos: 0
        };
      }

      jogadores.push(jogadorNovo);
      exibeJogadoresNaTela(jogadores);
      exibeListaJogadores(jogadores);
    } else {
      alert("Campo vazio ou inválido.");
    }
  } else {
    alert("Somente imagens de extensão .JPG e .PNG.");
  }

  document.getElementById("jogadorNovo").value = "";
  document.getElementById("avatar").value = "";
}

function removerJogador() {
  var entradaRemocaoJogador = document.getElementById("listaJogadores").value;
  var nomeJogador = removeTagHTML(entradaRemocaoJogador);
  var nomeJogadorSelecionado = jogadores.findIndex(
    (jogador) => jogador.nome === nomeJogador
  );

  if (nomeJogador != "") {
    if (document.getElementsByClassName("vitoria")[0].disabled == true) {
      alert("teste");
    } else {
      jogadores.splice(nomeJogadorSelecionado, 1);
      exibeJogadoresNaTela(jogadores);
      exibeListaJogadores(jogadores);
    }
  }
}

function resetarPontos() {
  for (var i = 0; i < jogadores.length; i++) {
    jogadores[i].vitorias = 0;
    jogadores[i].derrotas = 0;
    jogadores[i].empates = 0;
    jogadores[i].pontos = 0;
  }
  exibeJogadoresNaTela(jogadores);
}

function resetarTabela() {
  jogadores = [];

  exibeJogadoresNaTela(jogadores);
  exibeListaJogadores(jogadores);
}

exibeListaJogadores(jogadores);