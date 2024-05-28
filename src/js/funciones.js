
function buscarId(id, db) {

    return db.find(clavePersona => clavePersona.idPersona === id);
}

function ocultarTabla() {
    document.getElementById('valoresTabla').style.display = 'none';
}

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

function mostrarGii() {
    document.getElementById('miGif').style.display = 'block'
    const miGif = document.getElementById('miGif');
    miGif.src = '../assets/gii.gif';
};




/*
var navLinks = document.querySelectorAll('.nav-link');

    // Iterar sobre los elementos y agregar un listener para el evento de clic
    navLinks.forEach(function(navLink) {
      navLink.addEventListener("click", function(event) {
        // Evitar el comportamiento predeterminado del enlace (navegación)
        event.preventDefault();
        
        // Llamar a la función mostrarFormulario
        //mostrarFormulario('mostrar', window.objDataManager);
        alert('Hola');
      });
    });

*/


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
    } else if (opcion === 'exportPDF') {
        const db = objDataManager.read();
        if (db.length !== 0) {
            exportPDF();
            mostrarAlerta('PDF Exportado Exitosamente!!', 'alert alert-success');

        } else {
            mostrarAlerta('No hay informacion en la base de datos', 'alert alert-danger');
        }
    }
}
async function exportPDF() {
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
            startY: 60,
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

        const chartPosX = 10; //cm a la izquierda
        const charTposY = 200; //Margen superior hasta el inicio de la pagina
        const chartWidth = 180; //Ancho de la grafica
        const chartHeight = 100; //altura de la grafica
        const barSpacing = 5; //espaciado

        grafica(doc, categoryCounts, chartPosX, charTposY, chartWidth, chartHeight, barSpacing);

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
        saveAs(blob, 'Reporte de personal.pdf')
    }
    catch (error) {
        console.log("Error" + error);
    }
}

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
        'Fecha: 27 de mayo de 2024\n' +
        'Este reporte esta echo con fines informativos dichos dwtos son responsables y\n' +
        'proporcionados por el gerente Procopio Pérez.'].join('\n');
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
