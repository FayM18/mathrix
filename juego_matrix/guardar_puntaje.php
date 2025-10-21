<?php
header('Content-Type: application/json; charset=utf-8');
include("conexion.php");

// Validar que sea POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'mensaje' => 'Método no permitido']);
    exit;
}

// Validar datos recibidos
if (!isset($_POST['nombre']) || !isset($_POST['puntaje']) || 
    !isset($_POST['operacion']) || !isset($_POST['dificultad'])) {
    echo json_encode(['status' => 'error', 'mensaje' => 'Datos incompletos']);
    exit;
}

// Sanitizar y validar datos
$nombre = sanitizar($_POST['nombre']);
$puntaje = intval($_POST['puntaje']);
$operacion = sanitizar($_POST['operacion']);
$dificultad = sanitizar($_POST['dificultad']);

// Validaciones específicas
if (strlen($nombre) < 2 || strlen($nombre) > 50) { 
    echo json_encode(['status' => 'error', 'mensaje' => 'Nombre debe tener entre 2 y 50 caracteres']);
    exit;
}

if ($puntaje < 0 || $puntaje > 10000) {
    echo json_encode(['status' => 'error', 'mensaje' => 'Puntaje inválido']);
    exit;
}

$operaciones_validas = ['sumar', 'restar', 'multiplicar', 'dividir', 'aleatorio'];
if (!in_array($operacion, $operaciones_validas)) {
    echo json_encode(['status' => 'error', 'mensaje' => 'Operación inválida: ' . $operacion]);
    exit;
}

$dificultades_validas = ['facil', 'medio', 'dificil'];
if (!in_array($dificultad, $dificultades_validas)) {
    echo json_encode(['status' => 'error', 'mensaje' => 'Dificultad inválida']);
    exit;
}

// Convertir operación a nombre de tabla correcto
$operacion_tabla = $operacion;

// Mapeo correcto de operaciones
switch($operacion) {
    case 'sumar':
        $operacion_tabla = 'suma';
        break;
    case 'restar':
        $operacion_tabla = 'resta';
        break;
    case 'multiplicar':
        $operacion_tabla = 'multiplicar';
        break;
    case 'dividir':
        $operacion_tabla = 'dividir';
        break;
    case 'aleatorio':
        $operacion_tabla = 'aleatorio';
        break;
    default:
        echo json_encode(['status' => 'error', 'mensaje' => 'Operación no válida: ' . $operacion]);
        exit;
}

// Determinar tabla correcta: operacion_dificultad
$tabla = $operacion_tabla . '_' . $dificultad;

// Verificar que la tabla existe
$check_table = $conn->query("SHOW TABLES LIKE '$tabla'");
if ($check_table->num_rows === 0) {
    echo json_encode(['status' => 'error', 'mensaje' => 'Tabla no existe: ' . $tabla]);
    exit;
}

// Usar prepared statement para mayor seguridad
$stmt = $conn->prepare("INSERT INTO `$tabla` (nombre, puntaje) VALUES (?, ?)");
if (!$stmt) {
    echo json_encode(['status' => 'error', 'mensaje' => 'Error al preparar consulta: ' . $conn->error]);
    exit;
}

$stmt->bind_param("si", $nombre, $puntaje);

if ($stmt->execute()) {
    echo json_encode([
        'status' => 'ok',
        'mensaje' => 'Puntaje guardado exitosamente',
        'tabla' => $tabla,
        'nombre' => $nombre,
        'puntaje' => $puntaje,
        'id' => $stmt->insert_id
    ]);
} else {
    error_log("Error al guardar puntaje: " . $stmt->error);
    echo json_encode([
        'status' => 'error',
        'mensaje' => 'Error al guardar el puntaje: ' . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>