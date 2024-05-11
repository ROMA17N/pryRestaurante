//------------------------------------------------------------------------------------------------------------
//Crear elementos HTML
/*
const frmDatosPersonales = document.getElementById("frmDatosPersonales");
let contador = 1;
    
frmDatosPersonales.addEventListener("submit", function (event) {

        event.preventDefault();

        const { value: idPersona } = document.getElementById("idPersona");
        const { value: nombre } = document.getElementById("txtNombre");
        const { value: apellidos } = document.getElementById("txtApellidos");
        const { value: edad } = document.getElementById("txtEdad");
        const { value: nacionalidad } = document.getElementById("txtNacionalidad");
        const { value: ocupacion } = document.querySelector(`input[name="txtOcupacion"]:checked`);
        const { value: fecha } = document.getElementById("txtFecha");

        const dbSession = objDataManager.read();
        //validar que la base de taros tenga informaction
        //if
        const IdExixtente = dbSession.some(clavePersona => clavePersona.idPersona === idPersona);
        if (!IdExixtente) {
                const objPersona = new persona(idPersona, nombre, apellidos, edad, nacionalidad, ocupacion, fecha);
                objDataManager.create(objPersona);
                mostrarAlerta('los datos se registraron Exitosamente!!', 'alert alert-success');

        } else {
                mostrarAlerta('Error!!!\n EL ID ESTA EN USO', 'alert alert-danger');
        }

        /*  ----------------------------------------------------*/
/*
        // limpar los campos del formulario
        document.querySelector("#frmDatosPersonales").reset();

});/*


function mostrarAlerta(mensaje, alerta) {
        const divResponsInformation = document.getElementById('responsInformation');
        divResponsInformation.textContent = mensaje;
        divResponsInformation.className = alerta;
        divResponsInformation.style.display = 'block';
        divResponsInformation.classList.add('fade-in');

        setTimeout(() => {
                divResponsInformation.classList.add("fade-out");
                setTimeout(() => {
                        divResponsInformation.style.display = 'none';
                        divResponsInformation.classList.remove('fade-in', 'fade-out');
                }, 1000);
        }, 2000);
};

function crearBotones() {
        const divBotones = document.createElement("div");
        divBotones.className = "bnt-group";
        const btnEditar = crearBoton('../assets/edit.png', 'Editar', 0, () => { });
        const btnEliminar = crearBoton('../assets/delete.png', 'Eliminar', 1, () => { });
        const btnAceptar = crearBoton('../assets/cheked.png', 'Aceptar', 2, () => { });

        const imgAceptar = document.createElement("img");
    //    imgAceptar.src = "src/assets/cheked.png";
       // imgAceptar.alt = "Aceptar";
        btnAceptar.appendChild(imgAceptar);
        btnAceptar.disabled = true;

        // Añadir los botones al div
        divBotones.append(btnEditar, btnEliminar, btnAceptar);


        let filaEditar = null;
        btnEditar.addEventListener("click", function () {
                // Desabilitamos y habilitamos botones
                btnAceptar.disabled = false;
                btnEliminar.disabled = true;
                btnEditar.disabled = true;

                // identifica la fila a editar su elemento padre
                const fila = this.closest("tr");

                if (fila) {
                        filaEditar = fila;
                        // Habilitar la edición solo en las celdas necesarias
                        habilitarEdicion(filaEditar);
                } else {
                        console.log("No se logro localizar la fila Compadre!!");
                }
        });

        btnAceptar.addEventListener("click", function () {
                if (filaEditar) {
                        // Recorrer las celdas de la fila editada
                        filaEditar.querySelectorAll("td").forEach(function (celda, index) {
                                if (index !== 0 && index !== filaEditar.cells.length - 1) {
                                        // Obtener el nuevo valor de la celda si se ha editado
                                        const nuevoValor = celda.textContent;
                                        // Actualizar el contenido de la celda con el nuevo valor
                                        celda.textContent = nuevoValor;
                                        // Deshabilitar la edición de la celda
                                        celda.contentEditable = false;
                                }
                        });

                        const idPersona = filaEditar.cells[0].textContent;
                        const nombre = filaEditar.cells[1].textContent;
                        const apellidos = filaEditar.cells[2].textContent;
                        const edad = filaEditar.cells[3].textContent;

                        const dbSession = objDataManager.read();
                        for (const persona of dbSession) {
                                if (idPersona === persona.idPersona) {
                                        persona.nombre = nombre;
                                        persona.apellidos = apellidos;
                                        persona.edad = edad;
                                }
                                objDataManager.update(dbSession);
                        }

                        // Reiniciar la variable de la fila editada
                        filaEditar = null;

                        btnAceptar.disabled = true;
                        btnEliminar.disabled = false;
                        btnEditar.disabled = false;
                }
        });


        btnEliminar.addEventListener("click", function () {
                const db = objDataManager.read();
                const filaEliminar = this.closest("tr");
                console.log(filaEliminar.cells[0].textContent);
                //-------------------------------------
                const IdExixtente = db.findIndex(clavePersona => clavePersona.idPersona == filaEliminar.cells[0].textContent);
                if (db.length === 1) {
                        objDataManager.deleteAll();
                        ocultarTabla();
                } else {
                        objDataManager.deletePerson(IdExixtente);
                        filaEliminar.remove();
                }
                mostrarAlerta('La persona se elimino correctamente!!', 'alert alert-success');
                if (db.length === 0) { ocultarTabla(); mostrarAlerta('Base de datos Vacia!!', 'alert alert-success'); }

        });
        return divBotones;
}

function crearBoton(rutaImg, alt, tipo, event) {
        const boton = document.createElement('button');
        switch (tipo) {
                case 0: boton.className = 'btn btn-primary'; break;
                case 1: boton.className = 'btn btn-danger'; break;
                case 2: boton.className = 'btn btn-success'; break;
        }
        boton.innerHTML = `<img src='${rutaImg}' alt='${alt}'>`
        boton.addEventListener('click', event);
        return boton;

}

function habilitarEdicion(fiaActual) {
        const celdas = fiaActual.querySelectorAll("td");
        if (celdas.length > 0) {
                // Recorrer las celdas de la fila y habilitar la edición solo en las necesarias
                celdas.forEach(function (celda, index) {
                        if (index !== 0 && index != celda.length - 1) {
                                celda.contentEditable = true;
                                celdas[1].focus();
                        }

                })
        } else {
                console.log("No hay celdas en la fila seleccionada Compadre !!");
        }
}

document.getElementById('frmBuscar').addEventListener('submit', (event) => {
        event.preventDefault();
        const idPersona = document.getElementById('txtIdPersona').value;
        console.log(idPersona)

        const dbSession = objDataManager.read();
        const datosPersona = buscarId(idPersona, dbSession);
        console.log("BD: " + dbSession.length);

        if (datosPersona !== undefined) {
                const divTabla = document.getElementById('valoresTa');
                divTabla.style.display = 'block';
                document.getElementById('cuerpoTa').textContent = "";
                const fila = document.createElement('tr');

                const celdas = ['idPersona', 'nombre', 'apellidos', 'edad', "nacionalidad", "ocupacion", "fecha"].map(propiedad => {
                        const celda = document.createElement('td');
                        celda.textContent = datosPersona[propiedad];
                        return celda;
                });

                const celdaAcciones = document.createElement('td');
                const divBotones = crearBotones();
                // Añadimos los botones a las celdas
                celdaAcciones.appendChild(divBotones);

                fila.append(...celdas, celdaAcciones);

                // agregar la fila a la tabla

                document.getElementById("cuerpoTa").appendChild(fila);
                mostrarAlerta('Persona Encontrada', 'alert alert-success');


        } else if (dbSession.length === 0) {
                mostrarAlerta('La base de datos esta vacia', 'alert alert-danger');
                document.getElementById('valoresTa').style.display = 'none';
        } else {
                mostrarAlerta('No se encontro la persona', 'alert alert-danger');
                document.getElementById('valoresTa').style.display = 'none';
        }
        // limpar los campos del formulario
        document.querySelector("#frmBuscar").reset();

});

document.getElementById('btnDelete').addEventListener('click', (event) => {
        const db = objDataManager.read();
        //----------------------------------------
        event.preventDefault();
        const idPersona = document.getElementById('delete').value;
        // --------------------------------------
        const IdExixtente = db.findIndex(clavePersona => clavePersona.idPersona === idPersona);

        if (db.length === 0) {
                ocultarTabla();
                mostrarAlerta('La base de datos esta vacia', 'alert alert-danger');
        } else if (IdExixtente !== -1) {
                if (confirm('Estas seguro de borrar a la persona en la BD?')) {
                        if (db.length === 1) {
                                objDataManager.deleteAll();
                        } else {
                                objDataManager.deletePerson(IdExixtente);
                        }
                        mostrarAlerta('La persona se elimino correctamente!!', 'alert alert-success');
                        //   if (db.length === 0) { ocultarTabla(); }

                }
        } else {
                mostrarAlerta('No existe esta persona!!', 'alert alert-danger');
        }
        // ----------------------------------------
        // limpar los campos del formulario
        ocultarTabla();
        document.querySelector("#frmDelete").reset();

});

*/
function buscarId(id, db) {

    return db.find(clavePersona => clavePersona.idPersona === id);
} //va a devolver un undefined
//fineIndex Que me devuelva la posicion en el que esta


function ocultarTabla() {
    document.getElementById('valoresTabla').style.display = 'none';
}


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
/*
document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevenir envío del formulario

        const usuario = document.getElementById("txtUsuario").value;
        const contrasenia = document.getElementById("txtPass").value;
        const loginResponse = document.getElementById("loginResponse");
        loginResponse.textContent = ""; // Limpiar div

        const accessLogin = document.createElement("div");
        accessLogin.setAttribute("role", "alert");

        if (usuario === "admin@Admin.com" && contrasenia === "admin") {
                mostrarAlerta('Datos Correctos', 'alert alert-success')
                setTimeout(function () {
                        window.location.href = "src/pages/dashboard.html";
                }, 1000);  // Redirigir después de 2 segundos
        } else {
                mostrarAlerta('Datos Incorrectos', 'alert alert-danger')
                document.getElementById("loginForm").reset();
        }
});*/

function mostrarGii() {
    document.getElementById('miGif').style.display = 'block'
    const miGif = document.getElementById('miGif');
    miGif.src = '../assets/gii.gif';
};

//mostrarGii();

function mostrarFormulario(opcion, objDataManager) {
    console.log(opcion)
    console.log(objDataManager)

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
                mostrarAlerta('Visualizacion exitosa', 'alert alert-success');
            }
        } else {
            mostrarAlerta('La base de datos esta vacia!!', 'alert alert-danger');
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

function mostrarAlerta(mensaje, alerta) {
    const divResponsInformation = document.getElementById('responsInformation');
    divResponsInformation.textContent = mensaje;
    divResponsInformation.className = alerta;
    divResponsInformation.style.display = 'block';
    divResponsInformation.classList.add('fade-in');

    setTimeout(() => {
        divResponsInformation.classList.add("fade-out");
        setTimeout(() => {
            divResponsInformation.style.display = 'none';
            divResponsInformation.classList.remove('fade-in', 'fade-out');
        }, 1000);
    }, 2000);
};

function mostrarAlerta(mensaje, alerta) {
    const divResponsInformation = document.getElementById('responsInformation');
    divResponsInformation.textContent = mensaje;
    divResponsInformation.className = alerta;
    divResponsInformation.style.display = 'block';
    divResponsInformation.classList.add('fade-in');

    setTimeout(() => {
        divResponsInformation.classList.add("fade-out");
        setTimeout(() => {
            divResponsInformation.style.display = 'none';
            divResponsInformation.classList.remove('fade-in', 'fade-out');
        }, 1000);
    }, 2000);
};
function crearBotones() {
    const divBotones = document.createElement("div");
    divBotones.className = "bnt-group";
    const btnEditar = crearBoton('../assets/edit.png', 'Editar', 0, () => { });
    const btnEliminar = crearBoton('../assets/delete.png', 'Eliminar', 1, () => { });
    const btnAceptar = crearBoton('../assets/cheked.png', 'Aceptar', 2, () => { });

    const imgAceptar = document.createElement("img");
    //    imgAceptar.src = "src/assets/cheked.png";
    // imgAceptar.alt = "Aceptar";
    btnAceptar.appendChild(imgAceptar);
    btnAceptar.disabled = true;

    // Añadir los botones al div
    divBotones.append(btnEditar, btnEliminar, btnAceptar);


    let filaEditar = null;
    btnEditar.addEventListener("click", function () {
        // Desabilitamos y habilitamos botones
        btnAceptar.disabled = false;
        btnEliminar.disabled = true;
        btnEditar.disabled = true;

        // identifica la fila a editar su elemento padre
        const fila = this.closest("tr");

        if (fila) {
            filaEditar = fila;
            // Habilitar la edición solo en las celdas necesarias
            habilitarEdicion(filaEditar);
        } else {
            console.log("No se logro localizar la fila Compadre!!");
        }
    });

    btnAceptar.addEventListener("click", function () {
        if (filaEditar) {
            // Recorrer las celdas de la fila editada
            filaEditar.querySelectorAll("td").forEach(function (celda, index) {
                if (index !== 0 && index !== filaEditar.cells.length - 1) {
                    // Obtener el nuevo valor de la celda si se ha editado
                    const nuevoValor = celda.textContent;
                    // Actualizar el contenido de la celda con el nuevo valor
                    celda.textContent = nuevoValor;
                    // Deshabilitar la edición de la celda
                    celda.contentEditable = false;
                }
            });

            const idPersona = filaEditar.cells[0].textContent;
            const nombre = filaEditar.cells[1].textContent;
            const apellidos = filaEditar.cells[2].textContent;
            const edad = filaEditar.cells[3].textContent;

            const dbSession = objDataManager.read();
            for (const persona of dbSession) {
                if (idPersona === persona.idPersona) {
                    persona.nombre = nombre;
                    persona.apellidos = apellidos;
                    persona.edad = edad;
                }
                objDataManager.update(dbSession);
            }

            // Reiniciar la variable de la fila editada
            filaEditar = null;

            btnAceptar.disabled = true;
            btnEliminar.disabled = false;
            btnEditar.disabled = false;
        }
    });


    btnEliminar.addEventListener("click", function () {
        const db = objDataManager.read();
        const filaEliminar = this.closest("tr");
        console.log(filaEliminar.cells[0].textContent);
        //-------------------------------------
        const IdExixtente = db.findIndex(clavePersona => clavePersona.idPersona == filaEliminar.cells[0].textContent);
        if (db.length === 1) {
            objDataManager.deleteAll();
            ocultarTabla();
        } else {
            objDataManager.deletePerson(IdExixtente);
            filaEliminar.remove();
        }
        mostrarAlerta('La persona se elimino correctamente!!', 'alert alert-success');
        if (db.length === 0) { ocultarTabla(); mostrarAlerta('Base de datos Vacia!!', 'alert alert-success'); }

    });
    return divBotones;
}

function crearBoton(rutaImg, alt, tipo, event) {
    const boton = document.createElement('button');
    switch (tipo) {
        case 0: boton.className = 'btn btn-primary'; break;
        case 1: boton.className = 'btn btn-danger'; break;
        case 2: boton.className = 'btn btn-success'; break;
    }
    boton.innerHTML = `<img src='${rutaImg}' alt='${alt}'>`
    boton.addEventListener('click', event);
    return boton;

}

function habilitarEdicion(fiaActual) {
    const celdas = fiaActual.querySelectorAll("td");
    if (celdas.length > 0) {
        // Recorrer las celdas de la fila y habilitar la edición solo en las necesarias
        celdas.forEach(function (celda, index) {
            if (index !== 0 && index != celda.length - 1) {
                celda.contentEditable = true;
                celdas[1].focus();
            }

        })
    } else {
        console.log("No hay celdas en la fila seleccionada Compadre !!");
    }
}
