// Array com os botões do jogo
let botoes = ['red', 'blue', 'green', 'yellow'];
// Sequencia do jogo, baseada nos números aleatórios abaixo
let sequenciaDoJogo = [];
// Sequencia do jogador
let sequenciaJogador = [];

let started = false;
let level = 0;

document.querySelector('h1').addEventListener('click', function(){
    if (!started) {
        document.getElementById('level-title').innerHTML = 'Level ' + level;
        proxSequencia();
        started = true;
    }
})

// Receber click do jogador
document.querySelectorAll(".btn").forEach(function (button) {
    button.addEventListener("click", function () {
        var botaoEscolhido = this.id;
        sequenciaJogador.push(botaoEscolhido);

        animacaoClique(botaoEscolhido)
        tocarSom(botaoEscolhido);

        checarResposta(sequenciaJogador.length-1)

    });
});

function checarResposta(nivelAtual) {

    // If para checar se a resposta mais recente do jogador é a mesma do que da sequenciaDoJogo.
    if (sequenciaDoJogo[nivelAtual] === sequenciaJogador[nivelAtual]) {
        // Se o jogador acertou a resposta mais recente, verificar se ele terminou a sequencia.
        if (sequenciaJogador.length === sequenciaDoJogo.length){
            // Aqui chamamos o proximo botão aleatório da sequencia.
          setTimeout(function () {
            proxSequencia();
          }, 1000);
        }
      } else {
        tocarSom('wrong')
        animacaoErro()
        document.getElementById('level-title').innerHTML = 'Game over:<br> Clique aqui para recomeçar.';

        novoJogo()
      }

}

// Função para gerar a próxima sequência de números (de 1 a 4)
function proxSequencia() {
    sequenciaJogador = []
    // Aumenta o nível cada vez que essa função for chamada
    level++;
    document.getElementById('level-title').innerHTML = 'Level ' + level;
    // Pega um número aleatório de 1 a 4
    let numAleatorio = Math.floor((Math.random() * 4));
    // O número aleatório é "convertido" em uma cor com base na posição númerica da array "botoes"
    let corAleatoria = botoes[numAleatorio];
    // Adiciona-se o botão à sequencia do jogo
    sequenciaDoJogo.push(corAleatoria);

    animacao(corAleatoria);
    tocarSom(corAleatoria);



}

// Fazer o botão piscar e o audio tocar
function animacao(animarBotao) {
    setTimeout(function () {
        document.querySelector('.' + animarBotao).classList.add('fadeOut');
    });
    setTimeout(function () {
        document.querySelector('.' + animarBotao).classList.remove('fadeOut');
    }, 70);
}

// Fazer o botão piscar e o audio tocar no clique do usuário
function animacaoClique(animarBotao) {
  setTimeout(function () {
      document.querySelector('.' + animarBotao).classList.add('pressed');
  });
  setTimeout(function () {
      document.querySelector('.' + animarBotao).classList.remove('pressed');
  }, 70);
}

function animacaoErro() {
        setTimeout(function () {
        document.querySelector('body').classList.add('game-over');
    });
    setTimeout(function () {
        document.querySelector('body').classList.remove('game-over');
    }, 200);
}

// Tocar som
function tocarSom(nomeBotao) {
    var audio = new Audio('sounds/' + nomeBotao + '.mp3');
    audio.play();
}

function novoJogo() {
    level = 0;
    sequenciaDoJogo = [];
    started = false;
}