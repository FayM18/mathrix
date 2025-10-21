<?php
// Configuración de errores
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Configuración de la base de datos
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'juego_matrix');
define('DB_CHARSET', 'utf8mb4');

// Crear conexión con manejo de errores
try {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    if ($conn->connect_error) {
        throw new Exception("Error de conexión: " . $conn->connect_error);
    }
    
    // Establecer charset
    if (!$conn->set_charset(DB_CHARSET)) {
        throw new Exception("Error al establecer charset: " . $conn->error);
    }
    
} catch (Exception $e) {
    error_log($e->getMessage());
    die(json_encode([
        'status' => 'error',
        'mensaje' => 'Error al conectar con la base de datos'
    ]));
}

// Función para sanitizar entrada
function sanitizar($data) {
    global $conn;
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $conn->real_escape_string($data);
}
?>