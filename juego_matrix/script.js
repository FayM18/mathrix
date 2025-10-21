// ========== CANVAS Y PARTÍCULAS ==========
const canvas = document.getElementById("fondo");
const ctx = canvas ? canvas.getContext("2d") : null;

if (canvas && ctx) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particula {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * (canvas ? canvas.width : window.innerWidth);
        this.y = Math.random() * (canvas ? canvas.height : window.innerHeight);
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 24 + 12;
        const simbolos = ["+", "-", "×", "÷", "√", "π", "∑", "∫", "∂", "≈", "≠", "≤", "≥"];
        this.text = simbolos[Math.floor(Math.random() * simbolos.length)];
        this.alpha = Math.random() * 0.6 + 0.2;
        this.rotacion = Math.random() * Math.PI * 2;
        this.velocidadRotacion = (Math.random() - 0.5) * 0.02;
    }

    update(cardRect) {
        this.x += this.vx;
        this.y += this.vy;
        this.rotacion += this.velocidadRotacion;

        const canvasWidth = canvas ? canvas.width : window.innerWidth;
        const canvasHeight = canvas ? canvas.height : window.innerHeight;

        if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
        if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;

        if (cardRect &&
            this.x > cardRect.left - 50 && this.x < cardRect.right + 50 &&
            this.y > cardRect.top - 50 && this.y < cardRect.bottom + 50) {
            this.vx *= -1;
            this.vy *= -1;
        }
    }

    draw() {
        if (!ctx) return;

        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotacion);
        ctx.font = `bold ${this.size}px Orbitron`;
        ctx.fillStyle = `hsl(${Math.random() * 60 + 150}, 100%, ${Math.random() * 30 + 50}%)`;
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
    }
}

let particulas = [];
for (let i = 0; i < 80; i++) {
    particulas.push(new Particula());
}

function animar() {
    if (!canvas || !ctx) return;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cards = document.querySelectorAll('.card, .ranking-container');
    const cardVisible = Array.from(cards).find(e => e.offsetParent !== null);
    const cardRect = cardVisible ? cardVisible.getBoundingClientRect() : null;

    particulas.forEach(p => {
        p.update(cardRect);
        p.draw();
    });

    requestAnimationFrame(animar);
}

if (canvas && ctx) {
    animar();
}

// ========== VARIABLES DEL JUEGO ==========
let tiempo = 10;
let intervalo = null;
let puntaje = 0;
let record = 0;
let respuestaCorrecta = 0;
let operacionActual = '';
let dificultadActual = '';

// ========== GESTIÓN DE ESCENAS ==========
function mostrarEscena(num) {
    document.querySelectorAll('.escena').forEach(e => e.style.display = 'none');
    const escena = document.getElementById(`escena${num}`);
    if (escena) {
        escena.style.display = 'block';
        escena.style.animation = 'cardEntrance 0.5s ease-out';
    }
}

// ========== ELEMENTOS DEL DOM ==========
const elementos = {
    iniciarBtn: document.getElementById("iniciar"),
    enviarBtn: document.getElementById("enviar"),
    preguntaDiv: document.getElementById("pregunta"),
    tiempoDiv: document.getElementById("tiempo"),
    puntajeDiv: document.getElementById("puntaje"),
    recordDiv: document.getElementById("record"),
    respuestaInput: document.getElementById("respuesta"),
    timeProgress: document.getElementById("timeProgress"),
    operacionSelect: document.getElementById("operacion"),
    dificultadSelect: document.getElementById("dificultad"),
    aciertoAudio: document.getElementById("acierto"),
    falloAudio: document.getElementById("fallo"),
    nombreInput: document.getElementById("nombreJugador"),
    volverInicioBtn: document.getElementById("volverInicio"),
    puntajeFinalDiv: document.getElementById("puntajeFinal"),
    mensajeDiv: document.getElementById("mensaje"),
    creditosBtn: document.getElementById("creditos"),
    cerrarCreditosBtn: document.getElementById("cerrarCreditos")
};

// ========== EVENTOS ==========
if (elementos.iniciarBtn) {
    elementos.iniciarBtn.addEventListener("click", () => {
        const nombre = elementos.nombreInput.value.trim();
        if (nombre === "") {
            alert("⚠️ Debes ingresar tu nombre antes de jugar.");
            elementos.nombreInput.focus();
            return;
        }
        if (nombre.length < 2) {
            alert("⚠️ El nombre debe tener al menos 2 caracteres.");
            return;
        }
        mostrarEscena(2);
        iniciarJuego();
    });
}

if (elementos.enviarBtn) {
    elementos.enviarBtn.addEventListener("click", verificarRespuesta);
}

if (elementos.respuestaInput) {
    elementos.respuestaInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") verificarRespuesta();
    });
}

if (elementos.volverInicioBtn) {
    elementos.volverInicioBtn.addEventListener("click", () => {
        mostrarEscena(1);
        reiniciarVariables();
    });
}

if (elementos.creditosBtn) {
    elementos.creditosBtn.addEventListener("click", () => {
        mostrarEscena(4);
    });
}

if (elementos.cerrarCreditosBtn) {
    elementos.cerrarCreditosBtn.addEventListener("click", () => {
        mostrarEscena(1);
    });
}

// ========== FUNCIONES DEL JUEGO ==========
function iniciarJuego() {
    puntaje = 0;
    tiempo = 10;
    operacionActual = elementos.operacionSelect.value;
    dificultadActual = elementos.dificultadSelect.value;

    actualizarPuntaje();

    if (elementos.enviarBtn) {
        elementos.enviarBtn.disabled = false;
    }

    nuevaPregunta();
    actualizarBarraTiempo();
    iniciarTemporizador();
}

function iniciarTemporizador() {
    if (intervalo) clearInterval(intervalo);

    intervalo = setInterval(() => {
        tiempo--;

        if (elementos.tiempoDiv) {
            elementos.tiempoDiv.innerText = `Tiempo: ${tiempo}s`;
        }

        actualizarBarraTiempo();

        if (tiempo <= 0) {
            clearInterval(intervalo);
            gameOver("⏰ ¡Se acabó el tiempo!");
        }
    }, 1000);
}

function actualizarBarraTiempo() {
    if (!elementos.timeProgress) return;

    let porcentaje = Math.max((tiempo / 10) * 100, 0);
    elementos.timeProgress.style.width = `${porcentaje}%`;

    if (porcentaje > 60) {
        elementos.timeProgress.style.background = "linear-gradient(90deg, #00ff99, #00cc66)";
    } else if (porcentaje > 30) {
        elementos.timeProgress.style.background = "linear-gradient(90deg, #ffaa00, #ff8800)";
    } else {
        elementos.timeProgress.style.background = "linear-gradient(90deg, #ff5555, #cc0000)";
    }
}

function nuevaPregunta() {
    if (!elementos.dificultadSelect || !elementos.operacionSelect ||
        !elementos.preguntaDiv || !elementos.respuestaInput) return;

    let max = 10;
    if (dificultadActual === "medio") max = 50;
    else if (dificultadActual === "dificil") max = 100;

    let num1 = Math.floor(Math.random() * max) + 1;
    let num2 = Math.floor(Math.random() * max) + 1;
    let operacion = operacionActual;

    if (operacion === "aleatorio") {
        const ops = ["sumar", "restar", "multiplicar", "dividir"];
        operacion = ops[Math.floor(Math.random() * ops.length)];
    }

    if (operacion === "dividir") {
        num1 = num1 * num2;
    }

    let simbolo = "+";
    switch (operacion) {
        case "sumar":
            simbolo = "+";
            respuestaCorrecta = num1 + num2;
            break;
        case "restar":
            if (num1 < num2)[num1, num2] = [num2, num1];
            simbolo = "-";
            respuestaCorrecta = num1 - num2;
            break;
        case "multiplicar":
            simbolo = "×";
            respuestaCorrecta = num1 * num2;
            break;
        case "dividir":
            simbolo = "÷";
            respuestaCorrecta = num1 / num2;
            break;
    }

    elementos.preguntaDiv.innerText = `¿Cuánto es ${num1} ${simbolo} ${num2}?`;
    elementos.respuestaInput.value = "";
    elementos.respuestaInput.focus();
}

function verificarRespuesta() {
    if (!elementos.respuestaInput) return;

    let resp = parseFloat(elementos.respuestaInput.value);

    if (isNaN(resp)) {
        alert("⚠️ Por favor ingresa un número válido");
        elementos.respuestaInput.focus();
        return;
    }

    if (Math.abs(resp - respuestaCorrecta) < 0.001) {
        // ✓ RESPUESTA CORRECTA
        puntaje++;
        tiempo = Math.min(tiempo + 5, 15);

        if (elementos.aciertoAudio) {
            elementos.aciertoAudio.currentTime = 0;
            elementos.aciertoAudio.play().catch(e => console.log("Audio error:", e));
        }

        if (elementos.puntajeDiv) {
            elementos.puntajeDiv.classList.add("animate");
            setTimeout(() => elementos.puntajeDiv.classList.remove("animate"), 500);
        }

        if (puntaje > record) {
            record = puntaje;
        }

        actualizarPuntaje();
        nuevaPregunta();
        actualizarBarraTiempo();

    } else {
        // ✗ RESPUESTA INCORRECTA
        gameOver(`❌ Respuesta incorrecta. La respuesta correcta era ${respuestaCorrecta}`);
    }
}

function gameOver(mensaje) {
    if (intervalo) clearInterval(intervalo);

    if (elementos.falloAudio) {
        elementos.falloAudio.currentTime = 0;
        elementos.falloAudio.play().catch(e => console.log("Audio error:", e));
    }

    mostrarEscena(3);

    if (elementos.puntajeFinalDiv) {
        elementos.puntajeFinalDiv.innerText = `Puntaje final: ${puntaje}`;
    }

    if (elementos.mensajeDiv) {
        elementos.mensajeDiv.innerText = mensaje;
    }

    guardarPuntaje();
}

function actualizarPuntaje() {
    if (elementos.puntajeDiv) {
        elementos.puntajeDiv.innerText = `Puntaje: ${puntaje}`;
    }
    if (elementos.recordDiv) {
        elementos.recordDiv.innerText = `Récord: ${record}`;
    }
}

function reiniciarVariables() {
    puntaje = 0;
    tiempo = 10;
    respuestaCorrecta = 0;
    if (intervalo) clearInterval(intervalo);
    actualizarPuntaje();
}

// ========== GUARDAR PUNTAJE ==========
function guardarPuntaje() {
    const nombre = elementos.nombreInput.value.trim();
    if (!nombre || puntaje === 0) {
        console.log("No se guarda: nombre vacío o puntaje 0");
        return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('puntaje', puntaje);
    formData.append('operacion', operacionActual);
    formData.append('dificultad', dificultadActual);

    console.log("Guardando puntaje:", {
        nombre: nombre,
        puntaje: puntaje,
        operacion: operacionActual,
        dificultad: dificultadActual
    });

    fetch("guardar_puntaje.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta del servidor:", data);
            if (data.status === 'ok') {
                console.log(`✓ Puntaje guardado en tabla: ${data.tabla}`);
            } else {
                console.error(`✗ Error: ${data.mensaje}`);
            }
        })
        .catch(error => {
            console.error("Error al guardar:", error);
        });
}

// ========== REDIMENSIONAR CANVAS ==========
window.addEventListener("resize", () => {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particulas.forEach(p => p.reset());
    }
});

// ========== INICIALIZACIÓN ==========
document.addEventListener("DOMContentLoaded", () => {
    console.log("🎮 Matrix Game Cargado");
    if (elementos.nombreInput) {
        elementos.nombreInput.focus();
    }
});