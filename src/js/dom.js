
// ====================================================================================================================================


const frmDatosPersonales = document.getElementById("frmDatosPersonales");
let contador = 1;

frmDatosPersonales.addEventListener("submit", function (event){

        event.preventDefault();



        const txtNombre=document.getElementById("txtNombre").value;
        const txtApellidos=document.querySelector("#txtApellidos").value;
        const txtEdad=document.getElementById("txtEdad").value;
        const txtNacionalidad=document.getElementById("txtNacionalidad").value;
        const txtOcupacion=document.querySelector(`input[name="txtOcupacion"]:checked`).value;
        const txtFecha = document.getElementById("txtFecha").value;
       
    

        //crear Fila
        const fila = document.createElement("tr");

        //crear celdas
        const celdaNumero = document.createElement("td");
        const celdaNombre = document.createElement("td");
        const celdaApellidos = document.createElement("td");
        const celdaEdad = document.createElement("td");
        const celdaAcciones = document.createElement("td");
        const celdaNacionalidad = document.createElement("td")
        const celdaOcupacion = document.createElement("td");
        const celdaFecha = document.createElement("td");

        const divBotones = createBotones();
        //Aniadir en las celdad valores de las cajas de texto
        celdaNumero.textContent = contador;
        celdaNombre.textContent = txtNombre;
        celdaApellidos.textContent = txtApellidos;
        celdaEdad.textContent = txtEdad;
        celdaNacionalidad.textContent = txtNacionalidad;
        celdaOcupacion.textContent = txtOcupacion;
        celdaFecha.textContent = txtFecha;
        celdaAcciones.appendChild(divBotones);

        //Aniadir las celdas a la fila 
        fila.appendChild(celdaNumero);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaApellidos);
        fila.appendChild(celdaEdad);
        fila.appendChild(celdaNacionalidad);
        fila.appendChild(celdaOcupacion);
        fila.appendChild(celdaFecha);
        fila.appendChild(celdaAcciones);

 
        //Agregar la fila al cuerpo de la tabla
        document.getElementById("cuerpoTabla").appendChild(fila);
        //limpiar el formulario
        document.querySelector("#frmDatosPersonales").reset();
        contador ++;

});


function createBotones(){
        const divBotones = document.createElement("div");
        divBotones.className = "bnt-group";

        const btnEditar = document.createElement("button");
        const btnEliminar = document.createElement("button");
        const btnAceptar = document.createElement("button");
        btnEditar.className = "btn btn-primary";
        btnEliminar.className = "btn btn-danger";
        btnAceptar.className = "btn btn-success";

        btnEditar.innerHTML = "<img src='src/assets/edit.png'>";
        btnEliminar.innerHTML = "<img src='src/assets/delete.png'>";
        btnAceptar.innerHTML = "<img src='src/assets/check.png'>";

        divBotones.appendChild(btnEditar);
        divBotones.appendChild(btnEliminar);
        divBotones.appendChild(btnAceptar);

        btnAceptar.disabled = true;

        let filaEditar = null;
        btnEditar.addEventListener("click", function(){
                btnAceptar.disabled = false;
                btnEliminar.disabled = true;
                btnEditar.disabled = true;

                const fila = this.closest("tr");

                if(fila){
                        filaEditar = fila;
                        habilitarEdicion(filaEditar);
                }else{
                        console.log("No se logro localizar la fila Compadre!!");
                }
        });

        btnAceptar.addEventListener("click", function(){
                if(filaEditar){
                        filaEditar.querySelectorAll("td").forEach(function(celda, index){
                        if(index !==0 && index !== filaEditar.cells.length-1){
                                const nuevoValor = celda.textContent;
                                celda.textContent = nuevoValor;
                                celda.contentEditable = false;
                        }
        });
                }
                filaEditar = null;
                btnAceptar.disabled = true;
                btnEditar.disabled = false;
                btnEliminar.disabled = false;

                
        });
        btnEliminar.addEventListener("click", function(){
                const filaEliminar = this.closest("tr");
                if(filaEliminar){
                        filaEliminar.remove();
                }else{
                        console.log("No se pudo detectar la fila actual compadre !!");
                }
        });
        return divBotones;
}


function habilitarEdicion(fiaActual){
        const celdas = fiaActual.querySelectorAll("td");
        if(celdas.length > 0){
                celdas.forEach(function(celda, index){
                        if(index !== 0 && index != celda.length-1){
                        celda.contentEditable = true;
                celdas[1].focus();
                        }

                })
        }else{
                console.log("No hay celdas en la fila seleccionada Compadre !!");
        }
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


document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir envío del formulario

    const usuario = document.getElementById("txtUsuario").value;
    const contrasenia = document.getElementById("txtPass").value;
    const loginResponse = document.getElementById("loginResponse");
    loginResponse.textContent = ""; // Limpiar div

    const accessLogin = document.createElement("div");
    accessLogin.setAttribute("role", "alert");

    if (usuario === "admin@Admin.com" && contrasenia === "admin") {
        accessLogin.textContent = "Datos Correctos";
        accessLogin.classList.add("alert", "alert-success");
        loginResponse.appendChild(accessLogin);
        setTimeout(function() {
            window.location.href = "dashboard.html";
        }, 1000);  // Redirigir después de 2 segundos
    } else {
        
        accessLogin.textContent = "Datos Incorrectos";
        accessLogin.classList.add("alert", "alert-danger");
        loginResponse.appendChild(accessLogin);
        document.getElementById("loginForm").reset();
    }
});
