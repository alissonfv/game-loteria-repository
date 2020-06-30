const sorteio = {
    board: [],
    sequenciaSorteio: [],
    sequenciaSelecionada: [],
    qtdAposta: document.getElementById('qtdaposta'),
    nome: document.getElementById('nome'),
    valorPremio: document.getElementById('valorpremio'),
    cont: 0,

    init: function (container) {
        this.containerElement = container;

    },

    // na função abaixo vamos preencher o objeto board, com os números de 1 a 60.
    pushBoard: function () {
        for (var i = 1; i <= 60; i++) {
            this.board.push(i);

        }

    },
    // na função abaixo vamos preencher o objeto sequenciaSorteio, com seis números.
    pushSequenciaSorteio: function () {
        let max = 60;
        let min = 1;
        for (var i = 1; i <= 6; i++) {
            let numSorteio = Math.floor(Math.random() * (max - min) + 1);
            while (this.sequenciaSorteio.includes(numSorteio)) {
                numSorteio = Math.floor(Math.random() * (max - min) + 1);
            }
            this.sequenciaSorteio.push(numSorteio);

        }
        console.log(`Sequecia do sorteio: ${this.sequenciaSorteio}`);

    },

    gameover: false,
    containerElement: null,

    // função para compar vetores 
    compararVetores: function (vetor1, vetor2) {
        let numSelecionados = vetor1;
        let numSorteados = vetor2;
        let cont = 0;

        for (var i = 0; i < numSelecionados.length; i++) {
            for (var j = 0; j < numSorteados.length; j++) {
                if (numSelecionados[Number(i)] == numSorteados[Number(j)]) {
                    cont++
                }
            }
        }
        return cont;
    },

    // função que faz aparecer o cenário.
    makePlay: function (posicao) {

        if (this.gameover) return false;
        if (this.qtdAposta.value > 5 && this.qtdAposta.value < 16) {
            if (this.sequenciaSelecionada.length < this.qtdAposta.value) {
                // a linha 58 é pra mudar a cor do background de cada bolinha ao serem cliccadas.
                document.querySelector(`.div${posicao}`).style.backgroundColor = 'blue'
                // armazena os valores do que for clicado em no vetor de números selecionados.
                this.sequenciaSelecionada.push(posicao + 1);

            }
            if (this.sequenciaSelecionada.length == this.qtdAposta.value) {
                this.pushSequenciaSorteio();
                this.cont = this.compararVetores(this.sequenciaSelecionada, this.sequenciaSorteio);

                console.log(this.sequenciaSelecionada);
                console.log(this.cont);
                this.gameover = true;
                console.log(`gameover: ${this.gameover}`)

            }

        } else {
            this.qtdAposta.focus();
        }

    },

    start: function () {
        this.pushBoard();
        this.draw();
        this.gameover = false;

    },

    content: '',

    draw: function () {
        console.log(this.board);
        for (i in this.board) {
            this.content += `<div onclick ="sorteio.makePlay(${i})" class="div${i}">${this.board[i]}</div>`
        }

        this.containerElement.innerHTML = this.content;

    },

    mostarResultados: function () {
        let resultados = document.querySelector('.resultados')
        if (this.gameover == true) {
            resultados.innerHTML = `${this.nome.value}, você acertou ${this.cont} Números`

            // mudar as cores dos números selecionados se acertou e do sorteio
            for (i in this.sequenciaSorteio) {
                if (this.sequenciaSelecionada.includes(this.sequenciaSorteio[i])) {
                    
                    document.querySelector(`.div${this.sequenciaSorteio[i]}`).style.backgroundColor = 'green'

                } else {
                    document.querySelector(`.div${this.sequenciaSorteio[i]}`).style.backgroundColor = 'red'

                }

            }

        } else {
            resultados.innerHTML = 'Você precisa completar todas as etapas antes de sortear!'

        }

    }

}

