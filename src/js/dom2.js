
//=============================================================================================================
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

function mostrarGii() {
    document.getElementById('miGif').style.display = 'block'
    const miGif = document.getElementById('miGif');
    miGif.src = '../assets/gii.gif';
};
//mostrarGii();
function mostrarFormulario(opcion) {
    document.getElementById('frmAgregar').style.display = 'none';
    document.getElementById('frmMostrar').style.display = 'none';
    document.getElementById('Buscar').style.display = 'none';
    document.getElementById('eliminarBD').style.display = 'none';
    document.getElementById('eliminarId').style.display = 'none';
    document.getElementById('carouselExampleCaptions').style.display = 'none';


    if (opcion === 'agregar') {
            document.getElementById('frmAgregar').style.display = 'block';
    } else if (opcion === 'mostrar') {
            const dbPersona = objDataManager.read();

            if (dbPersona.length !== 0) {
                    const divTabla = document.getElementById('valoresTabla');
                    divTabla.style.display = "block";
                    document.getElementById("cuerpoTabla").textContent = "";

                    for (const persona of dbPersona) {
                            // crear una nueva fila
                            const fila = document.createElement('tr');

                            const celdas = ['idPersona', 'nombre', 'apellidos', 'edad', "nacionalidad", "ocupacion", "fecha"].map(propiedad => {
                                    const celda = document.createElement('td');
                                    celda.textContent = persona[propiedad];
                                    return celda;
                            });

                            const celdaAcciones = document.createElement('td');
                            const divBotones = crearBotones();
                            // Añadimos los botones a las celdas
                            celdaAcciones.appendChild(divBotones);

                            fila.append(...celdas, celdaAcciones);

                            // agregar la fila a la tabla
                            document.getElementById("cuerpoTabla").appendChild(fila);
                            mostrarAlerta('Visualizacion exitosa', 'alert alert-success')

                    }
            } else {
                    mostrarAlerta('La base de datos esta vacia!!', 'alert alert-danger')
            }
            document.getElementById('frmMostrar').style.display = 'block';

    } else if (opcion === 'buscar') {
            ocultarTabla();
            document.getElementById('Buscar').style.display = 'block';
            document.getElementById('valoresTa').style.display = 'none';
    } else if (opcion === 'eliminar') {
            document.getElementById('eliminarBD').style.display = 'block';
            const db = objDataManager.read();
            if (db.length !== 0) {
                    if (confirm('Estas seguro de borrar la BD?')) {
                            objDataManager.deleteAll();
                            mostrarAlerta('La BD ha sido eliminado etsitosamente!!', 'alert alert-success');
                    }
            } else {
                    mostrarAlerta('No hay informacion en la base de datos', 'alert alert-danger');
            }
            ocultarTabla();
    } else if (opcion === 'eliminarId') {
            document.getElementById('eliminarId').style.display = 'block';
    }
}


