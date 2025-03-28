//Moonlander. Um jogo de alunissagem
//Leonardo Gualberto(https://github.com/LeonardoGpaulo)
//28/03/2025
//Versão 0.1.0

/** @type {HTMLCanvasElement} */

//Seção de de modelagem de dados
let canvas  = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");

let moduloLunar = {
    posicao: {
        x: 100, 
        y: 100
    },
    angulo: 0,
    largura: 20,
    altura: 20, 
    cor: "lightgray",
    motorLigado: false,
    velocidade:{
        x: 0, 
        y: 0
    },
    combustivel:100
}

//seção de vizualização
function desenharModuloLunar(){
    contexto.save();
    contexto.beginPath();
    contexto.translate(moduloLunar.posicao.x, moduloLunar.posicao.y);
    contexto.rotate(moduloLunar.angulo);
    contexto.rect(moduloLunar.largura * -0.5, moduloLunar.altura * -0.5, moduloLunar.largura, moduloLunar.altura);
    contexto.fillStyle = moduloLunar.cor;
    contexto.fill();
    contexto.closePath();

    if(moduloLunar.motorLigado){
        desenharChama();
    }

    contexto.restore();
}

function desenharChama(){
    contexto.beginPath();
    contexto.moveTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.lineTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.5);
    //determina o tamanho da chama
    contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 20);
    //contexto.lineTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.closePath();
    contexto.fillStyle = "orange";
    contexto.fill();
}
 

function mostrarVelocidade(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let velocidade = `velocidade: ${(10 * moduloLunar.velocidade.y).toFixed(2)}`;
    contexto.fillText(velocidade, 100, 60);
}

function mostrarCombustivel(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let combustivel = `combustível: ${(moduloLunar.combustivel).toFixed(0)}`;
    contexto.fillText(combustivel, 100, 80)
}

 function gasto(){
    if (moduloLunar.combustivel > 0) {
        moduloLunar.combustivel --;
        }else{
            moduloLunar.combustivel = 0;
            moduloLunar.motorLigado = false;
        }
    }
function desenhar(){
    //limpar a tela
    contexto.clearRect(0, 0, canvas.width, canvas.height)

    //essa função atualiza a posição do moduloLunar em função da gravidade
    atracaoGravitacional();
    mostrarVelocidade();
    mostrarCombustivel();
    desenharModuloLunar();
    //esta função repete a execução da função desenhar a cada quadro
    if(moduloLunar.posicao.y >= (canvas.height - 0.5 * moduloLunar.altura)){

    if(moduloLunar.velocidade.y >= 0.5 ){
        return alert("voce morreu");
    }else{
        return alert ("voce não morreu");
    }
    }
       requestAnimationFrame(desenhar);
}
//seção de controle

document.addEventListener("keydown", teclaPressionada)
function teclaPressionada(evento){
    if(evento.keyCode== 38){
        moduloLunar.motorLigado = true;
        gasto();
    } 
    }

document.addEventListener("keyup", teclaSolta);
    function teclaSolta(evento){
        if(evento.keyCode == 38){
            moduloLunar.motorLigado = false;
        }
    }


    let gravidade = 0.1;
    function atracaoGravitacional(){
        moduloLunar.posicao.x += moduloLunar.velocidade.x;
        moduloLunar.posicao.y += moduloLunar.velocidade.y;

        if(moduloLunar.motorLigado){
            moduloLunar.velocidade.y -= 0.2;
        }
        moduloLunar.velocidade.y += gravidade;
        if(moduloLunar.posicao.y < 10){
            moduloLunar.posicao.y = 10;
            moduloLunar.velocidade.y = 0;

        }if(moduloLunar.posicao.y > 590){
            moduloLunar.posicao.y = 590;
            moduloLunar.velocidade.y = 0;
            
        }
        
    }

desenhar(); 