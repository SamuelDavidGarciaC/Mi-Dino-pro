//Loop del Juego
let time = new Date()
let deltaTime = 0;

if (document.readyState === "complete" || document.readyState === "interactive"){
    setTimeout(init, 1)
}else{
    document.addEventListener("DOMContentLoaded", init)
}

function init(){
    time = new Date()
    start()
    loop()
}

function loop(){
    deltaTime = (new Date() - time) / 1000
    time = new Date
    update()
    requestAnimationFrame(loop)
}

//Esta es la logica del Juego
let sueloY = 22
let velY = 0
let impulso = 900
let gravedad = 2500

let dinoPosX = 42
let dinoPosY = sueloY

let sueloX = 0
let velEscenario = 1280/3
let gameVel = 1
let puntaje = 0

let parado = false
let saltando = false

let contenedor
let dino
let textoPuntaje
let suelo
let gameOver

function start(){
    suelo = document.querySelector(".suelo")
    contenedor = document.querySelector(".contenedor")
    textoPuntaje = document.querySelector(".puntaje")
    dino = document.querySelector(".dino")
    // aquí se añade el evento
    document.addEventListener("keydown", HandleKeyDown)
}
function update(){
    moverSuelo()
    MoverDinosaurio()

    velY -= gravedad * deltaTime;
}

function moverSuelo(){
    sueloX += calcularDesplazamiento()
    suelo.style.left = -(sueloX % contenedor.clientWidth) +"px"
}

function calcularDesplazamiento(){
    return velEscenario * deltaTime * gameVel
}

function HandleKeyDown(evento) {
    if (evento.keyCode == 32) {
        Saltar();
    }
}

function Saltar() {
    if (dinoPosY === sueloY) {
        saltando = true
        velY = impulso
        dino.classList.remove("dino-corriendo");
    }
}

function MoverDinosaurio() {
    dinoPosY += velY * deltaTime;

    if (dinoPosY < sueloY) {
        TocarSuelo();
    }
    dino.style.bottom = dinoPosY + "px";
}

function TocarSuelo() {
    dinoPosY = sueloY;
    velY = 0;
    if (saltando) {
        dino.classList.add("dino-corriendo")
    }
    saltando=false
}