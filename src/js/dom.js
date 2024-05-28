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



// ==========================================================================================
/*
document.getElementById("btnExportPDF").addEventListener("click", async () => {

        try {
                //obtener la ruta de la img
                const urlImage = document.getElementById("txtURLimg").value;
                const datosImg = await cargarImg(urlImage);

                const doc = new jspdf.jsPDF({
                        orientation: 'portrait',//landscape
                        format: 'letter',
                        unit: 'mm'
                });

                encabezado(doc, datosImg);
                cuerpoT(doc);

                //Recuperar datos del local Storage
                const personas = objDataManager.read();
                const datosTabla = personas.map(persona => [persona.idPersona, persona.nombre, persona.apellidos, persona.edad, persona.nacionalidad, persona.ocupacion, persona.fecha]);
                // console.log(datosTabla);
                //console.log(datosTabla);
                const options = {
                        startY: 145,
                        theme: 'grid',
                        headStyles: {
                                fillColor: [250, 27, 209],
                                textColor: 0,
                                fondSize: 12,
                                font: 'Helvetica',
                                fontStyle: "bold",
                                halign: 'center'
                        },
                        bodyStyles: {
                                textColor: 0,
                                fondSize: 8,
                                font: 'Times'
                        },
                        autoSize: true
                };
                doc.autoTable({
                        head: [['ID', 'NOMBRE', 'APELLIDOS', 'EDAD', 'NACIONALIDAD', 'OCUPACION', 'FECHA DE ACTUALIZACION DE DATOS']],
                        body: datosTabla,
                        ...options,
                        didParseCell: function (data) {
                                if (data.section !== 'Head' && data.column.index === 3) {
                                        const edad = parseFloat(data.cell.raw);
                                        if (!isNaN(edad)) {
                                                const formatoMoneda = '$' + edad.toFixed(2);
                                                data.cell.text = formatoMoneda;
                                        }
                                }
                        }
                });


                const categoryCounts = {};
                for (const persona of personas) {
                        if (categoryCounts.hasOwnProperty(persona.ocupacion)) {
                                categoryCounts[persona.ocupacion]++;
                        } else {
                                categoryCounts[persona.ocupacion] = 1;
                        }
                }

                doc.addPage();
                encabezado(doc, datosImg);

                const chartPosX = 25; //cm a la izquierda
                const charTposY = 250; //Margen superior hasta el inicio de la pagina
                const chartWidth = 180; //Ancho de la grafica
                const chartHeight = 100; //altura de la grafica
                const barSpacing = 5; //espaciado

                grafica(doc, categoryCounts, chartPosX, charTposY, chartWidth, chartHeight, barSpacing);
                cuerpoT(doc);

                //Estilo para pie de pagina
                doc.setFont('Helvetica', 'Bold');
                doc.setFontSize(10);
                doc.setTextColor(16, 106, 234);
                const totalPaginas = doc.internal.getNumberOfPages();

                if (totalPaginas === 1) {
                        doc.text(`Pagina 1 de ${totalPaginas}`, doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10, { align: 'right' });
                }

                for (let i = 1; i <= totalPaginas; i++) {
                        doc.setPage(i);
                        doc.text(`Pagina ${i} de ${totalPaginas}`, doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10, { align: 'right' });
                }


                const pdfBlob = new Promise((resolve) => {
                        const blob = doc.output('blob');
                        resolve(blob);
                });

                const blob = await pdfBlob;
                saveAs(blob, 'doc.pdf')
        }
        catch (error) {
                console.log("Error" + error);
        }
});

function cargarImg(url) {
        return new Promise(function (resolve, reject) {
                let img = new Image();
                img.crossOrigin = "anonymous";

                //onload va a cargar la imagen
                img.onload = function () {
                        let canvas = document.createElement('canvas');
                        let contexto = canvas.getContext('2d');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        contexto.drawImage(img, 0, 0);

                        //convertir en jpg
                        let dataUrl = canvas.toDataURL('image,/JPG');
                        resolve(dataUrl);
                },
                        img.onerror = function () {
                                reject(new Error('Error al cargar la Imagen!!'));
                        };
                img.src = url;
        });
}

function encabezado(doc, datosImg) {
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(20);
        doc.setTextColor(32, 37, 105);
        doc.text('Reporte de Personal', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
        doc.addImage(datosImg, 'JPEG', 170, 10, 30, 30);
}

function cuerpoT(doc) {
        doc.setFont('times', 'italic')
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);

        const text = ['Reporte de Personal del Restaurante "DeliTic´s"\n\n' +
                'Fecha: 27 de mayo de 2024\n\n' +
                'Elaborado por: Juanito Pérez\n\n' +
                'Introducción:\n' +
                'El restaurante "El Buen Sabor", fundado el 15 de marzo de 2015, ha sido\n' +
                'un pilar de la comunidad local, ofreciendo una experiencia culinaria\n' +
                'excepcional. Ubicado en la calle Principal 123, en el corazón del centro\n' +
                'de la ciudad, "El Buen Sabor" se ha destacado por su compromiso con la\n' +
                'calidad, el servicio al cliente y un ambiente acogedor. Desde su apertura,\n' +
                'el restaurante ha evolucionado continuamente para satisfacer las necesidades\n' +
                'y expectativas de sus clientes, manteniendo siempre un alto estándar de\n' +
                'excelencia.\n\n' +
                'Este reporte tiene como objetivo proporcionar una visión detallada del\n' +
                'personal del restaurante durante el último trimestre. El equipo de "El Buen\n' +
                'Sabor" está compuesto por individuos talentosos y dedicados que desempeñan\n' +
                'roles cruciales para el éxito diario de las operaciones del restaurante. A\n' +
                'continuación, se presenta una descripción exhaustiva de las funciones y el\n' +
                'desempeño del personal, así como observaciones sobre sus contribuciones al\n' +
                'restaurante y recomendaciones para futuras mejoras y capacitaciones.'

        ].join('\n');
        
        doc.text(text, 35, 33);

}
function grafica(doc, categoryCounts, chartPosX, charTposY, chartWidth, chartHeight, barSpacing) {
        const categoryColors = {
                cocinero: [0, 0, 255],
                camarero: [207, 16, 234],
                limpiador: [207, 16, 234],
                gerente: [16, 234, 74],
                reepartidor: [134, 2, 58]
        };
        //Determina el ancho de la barra
        const barWhidth = (chartWidth - (barSpacing * (Object.keys(categoryCounts).length - 1))) / Object.keys(categoryCounts).length;
        let maxCount = 0;
        for (const category in categoryCounts) {
                if (categoryCounts[category] > maxCount) {
                        maxCount = categoryCounts[category]
                }
        }
        let currentBarX = chartPosX;

        for (const category in categoryCounts) {
                const barHeight = (categoryCounts[category] / maxCount) * chartHeight;
                console.log('categoryCounts', categoryCounts[category], 'maxCount', maxCount, 'chartHeight', chartHeight)

                const color = categoryColors[category];// Recuperamos el nomero de 
                console.log(color)
                doc.setFillColor(color[0], color[1], color[2], color[3], color[4]);
                doc.rect(currentBarX, charTposY, barWhidth, -barHeight, 'F')

                doc.setTextColor(0);
                doc.setFontSize(12);

                doc.text(currentBarX + (barWhidth / 2) - 5, charTposY + 5, String(categoryCounts[category]));
                doc.setFont('Helvetica', 'bold')
                doc.setFontSize(10);
                doc.text(currentBarX + (barWhidth / 2) - 5, charTposY + 10, category, { maxWhidth: barWhidth, align: 'center' })

                currentBarX += barWhidth + barSpacing;
        }
}*/
//Con un forEcach para valorar la posicion 