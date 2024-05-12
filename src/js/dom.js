import { persona as persona } from "./Persona.js";
import { DataManager } from "./DataManager.js";
let objDataManager = new DataManager('persona');
window.objDataManager = objDataManager;

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

        document.querySelector("#frmDatosPersonales").reset();

});
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
        ocultarTabla();
        document.querySelector("#frmDelete").reset();

});
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
});

