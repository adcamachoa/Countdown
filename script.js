let interval;
let running = false;
let totalTime = 0;

const nombreInput = document.getElementById('nombre');
const horasInput = document.getElementById('horas');
const minutosInput = document.getElementById('minutos');
const segundosInput = document.getElementById('segundos');
const temporizadorDisplay = document.getElementById('temporizador');
const iniciarButton = document.getElementById('iniciar');
const detenerButton = document.getElementById('detener');
const reiniciarButton = document.getElementById('reiniciar');
const limpiarButton = document.getElementById('limpiar');

iniciarButton.addEventListener('click', iniciarTemporizador);
detenerButton.addEventListener('click', detenerTemporizador);
reiniciarButton.addEventListener('click', reiniciarTemporizador);
limpiarButton.addEventListener('click', limpiarTemporizador);

function iniciarTemporizador() {
    if (running) return;
    const horas = parseInt(horasInput.value) || 0;
    const minutos = parseInt(minutosInput.value) || 0;
    const segundos = parseInt(segundosInput.value) || 0;
    totalTime = (horas * 3600) + (minutos * 60) + segundos;
    running = true;
    interval = setInterval(actualizarTemporizador, 1000);
}

function actualizarTemporizador() {
    if (totalTime >= 0) {
        const horas = Math.floor(totalTime / 3600);
        const minutos = Math.floor((totalTime % 3600) / 60);
        const segundos = totalTime % 60;
        temporizadorDisplay.textContent = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
        totalTime++;
    }
}

function detenerTemporizador() {
    if (!running) return;
    running = false;
    clearInterval(interval);
    temporizadorDisplay.classList.add('alerta');
}

function reiniciarTemporizador() {
    detenerTemporizador();
    totalTime = 0;
    temporizadorDisplay.classList.remove('alerta');
    temporizadorDisplay.textContent = "00:00:00";
}

function limpiarTemporizador() {
    reiniciarTemporizador();
    nombreInput.value = '';
    horasInput.value = '';
    minutosInput.value = '';
    segundosInput.value = '';
}