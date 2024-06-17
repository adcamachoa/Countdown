let interval;
let running = false;
let totalTime = 0;

const nombreInput = document.getElementById('nombre');
const minutosInput = document.getElementById('minutos');
const segundosInput = document.getElementById('segundos');
const temporizadorDisplay = document.getElementById('temporizador');
const nombreTemporizador = document.getElementById('nombreTemporizador');
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
    const minutos = parseInt(minutosInput.value) || 0;
    const segundos = parseInt(segundosInput.value) || 0;
    totalTime = (minutos * 60) + segundos;
    running = true;
    nombreTemporizador.textContent = nombreInput.value || 'Evento';
    temporizadorDisplay.classList.remove('alerta');
    interval = setInterval(actualizarTemporizador, 1000);
}

function actualizarTemporizador() {
    const minutos = Math.floor(Math.abs(totalTime) / 60);
    const segundos = Math.abs(totalTime) % 60;
    const signo = totalTime < 0 ? '-' : '';
    temporizadorDisplay.textContent = `${signo}${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    
    if (totalTime <= 0) {
        temporizadorDisplay.classList.add('parpadear');
    } else {
        temporizadorDisplay.classList.remove('parpadear');
    }
    
    if (totalTime < 0) {
        temporizadorDisplay.classList.add('alerta');
    } else {
        temporizadorDisplay.classList.remove('alerta');
    }

    if (totalTime === 0) {
        // Detener el temporizador solo si ya estaba en negativo
        if (signo === '-') {
            detenerTemporizador();
        }
    }
    totalTime--;
}

function detenerTemporizador() {
    if (!running) return;
    running = false;
    clearInterval(interval);
    temporizadorDisplay.classList.remove('parpadear'); // Detener parpadeo
    if (totalTime < 0) {
        temporizadorDisplay.classList.add('alerta');
    }
}

function reiniciarTemporizador() {
    detenerTemporizador();
    totalTime = 0;
    temporizadorDisplay.classList.remove('alerta');
    temporizadorDisplay.textContent = "00:00";
}

function limpiarTemporizador() {
    reiniciarTemporizador();
    nombreInput.value = '';
    minutosInput.value = '';
    segundosInput.value = '';
    nombreTemporizador.textContent = 'Evento';
}
