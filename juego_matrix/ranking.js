// ========== RANKING DINÁMICO ==========

let operacionSeleccionada = 'suma';

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    console.log("🏆 Ranking cargado");

    // Cargar rankings de SUMA por defecto
    cargarRankings(operacionSeleccionada);

    // Configurar eventos de botones
    configurarBotones();
});

// Configurar eventos de botones
function configurarBotones() {
    const botones = document.querySelectorAll('.sidebar-btn[data-operacion]');

    botones.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos
            botones.forEach(b => b.classList.remove('active'));

            // Agregar clase active al clickeado
            this.classList.add('active');

            // Obtener operación seleccionada
            operacionSeleccionada = this.getAttribute('data-operacion');

            console.log('📊 Cargando operación:', operacionSeleccionada);

            // Cargar rankings
            cargarRankings(operacionSeleccionada);
        });
    });
}

// Cargar rankings para una operación específica
function cargarRankings(operacion) {
    const dificultades = ['facil', 'medio', 'dificil'];

    dificultades.forEach(dificultad => {
        cargarRanking(operacion, dificultad);
    });
}

// Cargar un ranking individual
function cargarRanking(operacion, dificultad) {
    const contenedor = document.getElementById(`tabla-${dificultad}`);
    if (!contenedor) return;

    // Mostrar loading
    contenedor.innerHTML = '<div class="loading">⏳ Cargando...</div>';

    // Convertir operación si es necesario
    let operacionParaAPI = operacion;
    if (operacion === 'suma') {
        operacionParaAPI = 'sumar';
    }

    // Hacer petición al servidor
    fetch(`obtener_ranking.php?operacion=${operacionParaAPI}&dificultad=${dificultad}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'ok') {
                mostrarRanking(contenedor, data.ranking);
            } else {
                throw new Error(data.mensaje || 'Error desconocido');
            }
        })
        .catch(error => {
            console.error('Error al cargar ranking:', error);
            contenedor.innerHTML = `
                <div class="no-data">
                    ❌ Error al cargar datos
                </div>
            `;
        });
}

// Mostrar ranking en tabla
function mostrarRanking(contenedor, ranking) {
    if (!ranking || ranking.length === 0) {
        contenedor.innerHTML = '<div class="no-data">📭 No hay datos aún</div>';
        return;
    }

    let html = `
        <table class="tabla-ranking">
            <thead>
                <tr>
                    <th>#</th>
                    <th>nombre</th>
                    <th>Puntaje</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody>
    `;

    ranking.forEach((nombre, index) => {
        const posClase = index < 3 ? `pos-${index + 1}` : '';
        const icono = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';

        html += `
            <tr class="${posClase}">
                <td>${icono} ${nombre.posicion}</td>
                <td>${nombre.nombre}</td>
                <td>${nombre.puntaje}</td>
                <td>${formatearFecha(nombre.fecha)}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    contenedor.innerHTML = html;
}

// Formatear fecha
function formatearFecha(fecha) {
    if (fecha === '-') return '-';

    try {
        const date = new Date(fecha);
        const opciones = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleString('es-ES', opciones);
    } catch (e) {
        return fecha;
    }
}

// Auto-actualizar cada 30 segundos
setInterval(() => {
    if (operacionSeleccionada) {
        cargarRankings(operacionSeleccionada);
        console.log('🔄 Rankings actualizados automáticamente');
    }
}, 30000);