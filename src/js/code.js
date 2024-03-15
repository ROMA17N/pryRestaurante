// Función para manejar el menú responsivo
function myMenuFunction() {
    // Obtener el elemento del menú de navegación
    let i = document.getElementById("navMenu");

    // Verificar la clase actual del menú de navegación
    if (i.className === "nav-menu") {
        // Si la clase es "nav-menu", añadir la clase "responsive" para mostrar el menú en dispositivos móviles

        i.className += " responsive";
    } else {
        // Si la clase no es "nav-menu", quitar la clase "responsive" para ocultar el menú en dispositivos móviles
        i.className = "nav-menu";
    }
}

// Obtener elementos relacionados con el botón de inicio de sesión, el botón de registro y los formularios de inicio de sesión y registro
let a = document.getElementById("loginBtn");
let b = document.getElementById("registerBtn");
let x = document.getElementById("login");
let y = document.getElementById("register");

// Función para mostrar el formulario de inicio de sesión
function login() {
    // Mover el formulario de inicio de sesión a la posición visible
    x.style.left = "4px";
    // Mover el formulario de registro fuera de la pantalla
    y.style.right = "-520px";
    // Cambiar estilos de los botones para resaltar el botón de inicio de sesión
    a.className += " white-btn";
    b.className = "btn";
    // Ajustar la opacidad para mostrar el formulario de inicio de sesión y ocultar el formulario de registro
    x.style.opacity = 1;
    y.style.opacity = 0;
}

// Función para mostrar el formulario de registro
function register() {
    // Mover el formulario de inicio de sesión fuera de la pantalla
    x.style.left = "-510px";
    // Mover el formulario de registro a la posición visible
    y.style.right = "5px";
    // Cambiar estilos de los botones para resaltar el botón de registro
    a.className = "btn";
    b.className += " white-btn";
    // Ajustar la opacidad para mostrar el formulario de registro y ocultar el formulario de inicio de sesión
    x.style.opacity = 0;
    y.style.opacity = 1;
}

