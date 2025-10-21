<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MATHRIX GAME</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <canvas id="fondo"></canvas>
    
    <!-- ESCENA 1: INICIO -->
    <div id="escena1" class="card escena">
        <h1>🎮 MATHRIX</h1>
        <div class="settings">
            <label>
                <span class="label-text">Nombre:</span>
                <input type="text" id="nombreJugador" placeholder="Ingresa tu nombre" maxlength="50">
            </label>
            <label>
                <span class="label-text">Dificultad:</span>
                <select id="dificultad">
                    <option value="facil">⭐ Fácil</option>
                    <option value="medio">⭐⭐ Medio</option>
                    <option value="dificil">⭐⭐⭐ Difícil</option>
                </select>
            </label>
            <label>
                <span class="label-text">Operación:</span>
                <select id="operacion">
                    <option value="sumar">➕ Sumar</option>
                    <option value="restar">➖ Restar</option>
                    <option value="multiplicar">✖️ Multiplicar</option>
                    <option value="dividir">➗ Dividir</option>
                    <option value="aleatorio" selected>🎲 Aleatorio</option>
                </select>
            </label>
        </div>
        <div class="controls">
            <button id="iniciar" class="btn-primary">🚀 Iniciar Juego</button>
            <a href="ranking.php"><button class="btn-secondary">🏆 Ver Ranking</button></a>
            <button id="creditos" class="btn-info">ℹ️ INFORMACION</button>
        </div>
    </div>

    <!-- ESCENA 2: JUEGO -->
    <div id="escena2" class="card escena" style="display:none;">
        <h1>🎮 MATHRIX GAME</h1>
        <div id="stats">
            <div id="puntaje">Puntaje: 0</div>
            <div id="record">Récord: 0</div>
        </div>
        <div id="pregunta"></div>
        <div class="controls">
            <input type="number" id="respuesta" placeholder="Tu respuesta" autocomplete="off">
            <button id="enviar" class="btn-primary">✓ Enviar</button>
        </div>
        <div class="time-bar">
            <div class="time-progress" id="timeProgress"></div>
        </div>
        <div id="tiempo">Tiempo: 10s</div>
    </div>

    <!-- ESCENA 3: GAME OVER -->
    <div id="escena3" class="card escena" style="display:none;">
        <h1>💀 ¡GAME OVER!</h1>
        <div id="puntajeFinal">Puntaje final: 0</div>
        <div id="mensaje"></div>
        <div class="controls">
            <button id="volverInicio" class="btn-primary">🔄 Volver al Inicio</button>
            <a href="ranking.php"><button class="btn-secondary">🏆 Ver Ranking</button></a>
        </div>
    </div>

    <!-- ESCENA 4: CRÉDITOS -->
    <div id="escena4" class="card escena" style="display:none;">
        <h1>ℹ️ INFORMACION</h1>
        <div class="creditos-content">
            <h2>🎯 MATHRIX GAME v2.0</h2>
            <p class="descripcion">Un juego matemático inspirado en The Mathrix. Pon a prueba tus habilidades con operaciones matemáticas bajo presión.</p>
            
            <div class="seccion-creditos">
                <h3>👨‍💻 Desarrolladores</h3>
                <div class="desarrollador">
                    <p><strong>Fabiola Noe Cuellar</strong></p>
                    <div class="enlaces">
                        <a href="https://facebook.com/usuario1" target="_blank">📘 Facebook</a>
                        <a href="https://instagram.com/usuario1" target="_blank">📷 Instagram</a>
                        <a href="https://github.com/usuario1" target="_blank">💻 GitHub</a>
                    </div>
                </div>
                <div class="desarrollador">
                    <p><strong>Carlos Silva Lopez</strong></p>
                    <div class="enlaces">
                        <a href="https://www.facebook.com/share/1F7VwZW5KV/" target="_blank">📘 Facebook</a>
                        <a href="https://www.instagram.com/charl_es91100?igsh=MXFsM2I2enJsNnI1bA==" target="_blank">📷 Instagram</a>
                        <a href="https://linkedin.com/in/usuario2" target="_blank">💼 LinkedIn</a>
                    </div>
                </div>
            </div>

            <div class="seccion-creditos">
                <h3>🏢 Empresa</h3>
                <p><strong>Nombre de la Empresa</strong></p>
                <div class="enlaces">
                    <a href="https://www.empresa.com" target="_blank">🌐 Sitio Web</a>
                    <a href="https://facebook.com/empresa" target="_blank">📘 Facebook</a>
                    <a href="https://instagram.com/empresa" target="_blank">📷 Instagram</a>
                </div>
            </div>

            <div class="seccion-creditos">
                <p class="copyright">© 2025 - Todos los derechos reservados</p>
            </div>
        </div>
        <div class="controls">
            <button id="cerrarCreditos" class="btn-primary">✕ Cerrar</button>
        </div>
    </div>

    <!-- Sonidos -->
    <audio id="acierto" src="https://freesound.org/data/previews/320/320181_5260871-lq.mp3"></audio>
    <audio id="fallo" src="https://freesound.org/data/previews/109/109662_945474-lq.mp3"></audio>

    <script src="script.js"></script>
</body>
</html>