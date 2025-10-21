# MATHRIX GAME - Juego Matemático Interactivo

Un juego matemático emocionante inspirado en The Matrix. Resuelve operaciones matemáticas contra el tiempo y compite con otros jugadores en los rankings.

## Características

- **5 Operaciones Matemáticas**: Suma, Resta, Multiplicación, División y Aleatorio
- **3 Niveles de Dificultad**: Fácil, Medio y Difícil
- **Sistema de Rankings**: 15 tablas independientes (5 operaciones × 3 dificultades)
- **Top 10 Jugadores**: Visualiza los mejores puntajes por categoría
- **Efectos Visuales**: Partículas animadas, efectos de neón y animaciones fluidas
- **Interfaz Responsive**: Compatible con desktop y dispositivos móviles
- **Base de Datos Persistente**: Todos los puntajes se guardan automáticamente

## Estructura del Proyecto

```
mathrix_game/
├── index.php                 # Página principal del juego
├── ranking.php              # Página de rankings
├── conexion.php             # Conexión a base de datos
├── guardar_puntaje.php      # API para guardar puntajes
├── obtener_ranking.php      # API para obtener rankings
├── style.css                # Estilos CSS
├── script.js                # Lógica del juego
├── ranking.js               # Lógica del ranking
├── canvas_ranking.js        # Partículas del ranking
└── README.md                # Este archivo
```

## Requisitos

- XAMPP (Apache + MySQL + PHP 7.0+)
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexión a internet (para fuentes de Google)

## Instalación

### 1. Instalar XAMPP

Descarga XAMPP desde [https://www.apachefriends.org/](https://www.apachefriends.org/) e instálalo en tu sistema.

### 2. Crear la Base de Datos

1. Inicia Apache y MySQL desde el panel de control de XAMPP
2. Abre phpMyAdmin: `http://localhost/phpmyadmin`
3. Haz clic en la pestaña **SQL**
4. Ejecuta el siguiente comando para crear la base de datos:

```sql
CREATE DATABASE juego_matrix CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE juego_matrix;

-- Crear 15 tablas (5 operaciones × 3 dificultades)
CREATE TABLE suma_facil (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    puntaje INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_puntaje (puntaje DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE suma_medio (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    puntaje INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_puntaje (puntaje DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE suma_dificil (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    puntaje INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_puntaje (puntaje DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Repite lo anterior para: resta, multiplicar, dividir, aleatorio
-- (Cambia solo "suma" por el nombre de la operación)
```

### 3. Copiar Archivos

1. Crea una carpeta llamada `mathrix_game` en `C:\xampp\htdocs\`
2. Copia TODOS los archivos del proyecto en esa carpeta

### 4. Acceder al Juego

Abre tu navegador y ve a:
```
http://localhost/mathrix_game/
```

## Cómo Jugar

1. **Ingresa tu nombre** (mínimo 2 caracteres)
2. **Selecciona la dificultad**: Fácil, Medio o Difícil
3. **Elige la operación**: Suma, Resta, Multiplicación, División o Aleatorio
4. **Haz clic en "Iniciar Juego"**
5. **Resuelve las operaciones** lo más rápido posible
6. **Por cada respuesta correcta**:
   - Ganas 1 punto
   - Se suman 5 segundos al tiempo (máximo 15 segundos)
7. **Una respuesta incorrecta** = Game Over
8. **Tu puntaje se guarda automáticamente** en el ranking

## Sistema de Ranking

### Estructura

- **15 tablas independientes** en la base de datos
- **5 botones laterales** para seleccionar operación
- **3 tablas por operación** (Fácil, Medio, Difícil)
- **Top 10 jugadores** por categoría
- **Medallas** para los 3 primeros lugares (🥇🥈🥉)
- **Auto-actualización** cada 30 segundos

### Acceder al Ranking

1. Ve a `http://localhost/mathrix_game/ranking.php`
2. O haz clic en "Ver Ranking" desde la página principal

## Base de Datos

### Tablas Creadas

```
suma_facil, suma_medio, suma_dificil
resta_facil, resta_medio, resta_dificil
multiplicar_facil, multiplicar_medio, multiplicar_dificil
dividir_facil, dividir_medio, dividir_dificil
aleatorio_facil, aleatorio_medio, aleatorio_dificil
```

### Estructura de Tabla

```sql
id          INT (Primary Key, Auto Increment)
nombre      VARCHAR(50) - Nombre del jugador
puntaje     INT - Puntos obtenidos
fecha       TIMESTAMP - Fecha y hora del registro
```

## Configuración

### Cambiar Credenciales de Base de Datos

Abre `conexion.php` y modifica:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'juego_matrix');
```

### Personalizar Créditos

Abre `index.php` y busca la sección "ESCENA 4: CRÉDITOS" (línea ~92).

Modifica los nombres y enlaces:

```html
<div class="desarrollador">
    <p><strong>Tu Nombre Aquí</strong></p>
    <div class="enlaces">
        <a href="https://facebook.com/tu_perfil" target="_blank">📘 Facebook</a>
        <a href="https://instagram.com/tu_perfil" target="_blank">📷 Instagram</a>
    </div>
</div>
```

### Cambiar Colores del Tema

Abre `style.css` y busca:

```css
color: #00ff99;  /* Color principal (verde Matrix) */
```

Reemplaza `#00ff99` con tu color hexadecimal favorito.

## Solución de Problemas

### Error: "No se puede conectar a la base de datos"

**Solución:**
- Verifica que MySQL esté corriendo en XAMPP
- Verifica las credenciales en `conexion.php`
- Verifica que la base de datos `juego_matrix` existe

### El ranking no carga

**Solución:**
- Presiona F12 (abre consola)
- Verifica si hay errores en rojo
- Confirma que `obtener_ranking.php` existe
- Verifica que las tablas tienen datos

### Los puntos no se guardan

**Solución:**
- Verifica que escribiste correctamente tu nombre (mínimo 2 caracteres)
- Verifica que el puntaje es mayor a 0
- Revisa la consola (F12) para ver errores
- Verifica en phpMyAdmin que los datos se guardaron

### Los sonidos no funcionan

**Solución:**
- Los navegadores bloquean audio automático
- Haz clic primero en la página y luego intenta jugar
- Comprueba que los URLs de los audios sean accesibles

## URLs Importantes

| URL | Propósito |
|-----|-----------|
| `http://localhost/` | Panel de XAMPP |
| `http://localhost/phpmyadmin` | Gestor de base de datos |
| `http://localhost/mathrix_game/` | Juego principal |
| `http://localhost/mathrix_game/ranking.php` | Rankings |

## Mejoras Futuras

- [ ] Sistema de logros y medallas
- [ ] Modo multijugador en tiempo real
- [ ] Temporizador personalizable
- [ ] Estadísticas personales detalladas
- [ ] Exportar resultados a PDF
- [ ] Modo oscuro/claro
- [ ] Leaderboard global
- [ ] Sistema de niveles progresivos
- [ ] Sonidos personalizables

## Seguridad

- Uso de Prepared Statements para prevenir SQL Injection
- Validación de datos en servidor
- Sanitización de inputs
- Headers de seguridad

## Archivos Importantes

- **script.js**: Lógica del juego principal
- **ranking.js**: Lógica del sistema de rankings
- **conexion.php**: Configuración de la base de datos
- **guardar_puntaje.php**: API para guardar puntajes
- **obtener_ranking.php**: API para obtener rankings

## Créditos

**Desarrolladores:**
- Fabiola Noe Cuellar
- Carlos Silva Lopez

**Versión:** 2.0  
**Año:** 2025  
**Licencia:** Código Abierto

## Soporte

Si tienes problemas:

1. Revisa esta documentación completamente
2. Verifica la consola del navegador (F12)
3. Revisa los logs de PHP en XAMPP
4. Verifica la estructura de la base de datos en phpMyAdmin

## Notas Técnicas

- **PHP 7.0+** requerido
- **MySQL 5.7+** requerido
- **Charset UTF8MB4** para caracteres especiales
- **Responsive** desde 320px hasta 1920px
- **Compatible** con todos los navegadores modernos

---

¡Disfruta del juego! 🎮✨
