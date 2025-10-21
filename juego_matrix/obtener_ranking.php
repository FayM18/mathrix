<?php
header('Content-Type: application/json; charset=utf-8');
include("conexion.php");

// Validar parámetros
$operacion = isset($_GET['operacion']) ? sanitizar($_GET['operacion']) : 'sumar';
$dificultad = isset($_GET['dificultad']) ? sanitizar($_GET['dificultad']) : 'facil';

// Validar operación
$operaciones_validas = ['sumar', 'restar', 'multiplicar', 'dividir', 'aleatorio'];
if (!in_array($operacion, $operaciones_validas)) {
    $operacion = 'sumar';
}

// Validar dificultad
$dificultades_validas = ['facil', 'medio', 'dificil'];
if (!in_array($dificultad, $dificultades_validas)) {
    $dificultad = 'facil';
}

// Convertir operacion a nombre de tabla correcto
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
        $operacion_tabla = 'suma';
}

// Determinar tabla correcta: operacion_dificultad
$tabla = $operacion_tabla . '_' . $dificultad;

// Preparar consulta
$sql = "SELECT nombre, puntaje, fecha 
        FROM `$tabla` 
        ORDER BY puntaje DESC, fecha ASC 
        LIMIT 10";

$result = $conn->query($sql);

if (!$result) {
    echo json_encode([
        'status' => 'error',
        'mensaje' => 'Error al consultar la base de datos'
    ]);
    exit;
}

$ranking = [];
$posicion = 1;

while ($row = $result->fetch_assoc()) {
    $ranking[] = [
        'posicion' => $posicion,
        'nombre' => htmlspecialchars($row['nombre'], ENT_QUOTES, 'UTF-8'),
        'puntaje' => intval($row['puntaje']),
        'fecha' => date('Y-m-d H:i:s', strtotime($row['fecha']))
    ];
    $posicion++;
}

// Completar con posiciones vacías si hay menos de 10
while ($posicion <= 10) {
    $ranking[] = [
        'posicion' => $posicion,
        'nombre' => '-',
        'puntaje' => 0,
        'fecha' => '-'
    ];
    $posicion++;
}

echo json_encode([
    'status' => 'ok',
    'operacion' => $operacion,
    'dificultad' => $dificultad,
    'tabla' => $tabla,
    'ranking' => $ranking
]);

$conn->close();
?>