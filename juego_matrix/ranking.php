<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ranking MATHRIX</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <canvas id="fondo"></canvas>
    
    <div class="ranking-container">
        <!-- Botones laterales -->
        <div class="sidebar">
            <button class="sidebar-btn active" data-operacion="suma">SUMA</button>
            <button class="sidebar-btn" data-operacion="resta">RESTA</button>
            <button class="sidebar-btn" data-operacion="multiplicar">MULTIPLICAR</button>
            <button class="sidebar-btn" data-operacion="dividir">DIVIDIR</button>
            <button class="sidebar-btn" data-operacion="aleatorio">ALEATORIO</button>
            <a href="index.php"><button class="sidebar-btn volver-btn">VOLVER</button></a>
        </div>

        <!-- Contenedor de tablas -->
        <div class="tablas-container">
            <h1 class="ranking-title">🏆 TOP 10 JUGADORES</h1>
            
            <div class="tablas-grid" id="tablasGrid">
                <!-- Las tablas se cargarán dinámicamente -->
                <div class="tabla-wrapper" data-dificultad="facil">
                    <h2 class="tabla-header">⭐ FÁCIL</h2>
                    <div class="tabla-content" id="tabla-facil">
                        <div class="loading">Cargando...</div>
                    </div>
                </div>

                <div class="tabla-wrapper" data-dificultad="medio">
                    <h2 class="tabla-header">⭐⭐ MEDIO</h2>
                    <div class="tabla-content" id="tabla-medio">
                        <div class="loading">Cargando...</div>
                    </div>
                </div>

                <div class="tabla-wrapper" data-dificultad="dificil">
                    <h2 class="tabla-header">⭐⭐⭐ DIFÍCIL</h2>
                    <div class="tabla-content" id="tabla-dificil">
                        <div class="loading">Cargando...</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="canvas_ranking.js"></script>
    <script src="ranking.js"></script>
</body>
</html>