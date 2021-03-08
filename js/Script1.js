//Variables Globales
var hora,minuto,segundo;
var recibioTituloAlarma, reciboMensajeAlarma, reciboHoraAlarma, reciboMinutoAlarma;
var alarmas=[];
//OJO esta variable validación es para cuando se envían los datos
//Se modifica en la función validar
var validación=true;
//Esta variable es para imprimir las alarmas
var alarmas_html="";

//Oculta la sección de agregar alarma
//SECCIÓN JQUERY
$(document).ready(function () {
    $('#NuevaAlarma').hide();
    $('#BotonNuevaAlarma').click(function () { 
        $('#Pantalla_Principal').hide();
        $('#NuevaAlarma').show();
    });
    $('#BotonRegresar').click(function () { 
        $('#Pantalla_Principal').show();
        $('#NuevaAlarma').hide();
    });
});

//OBTEN LA HORA Y MUESTRALA
function mostrarHora(){
    //Crea la constante que ocupa el Date para obtener las horas
    const tiempo=new Date();
    hora = tiempo.getHours();
    minuto = tiempo.getMinutes();
    segundo = tiempo.getSeconds();
    //Usa  la función que arregla los numeros
    hora = agregarCeroReloj(hora);
    minuto = agregarCeroReloj(minuto);
    segundo = agregarCeroReloj(segundo);
    //Pasarlo al elemento reloj en el html (el div)
    document.getElementById('reloj').innerHTML=`${hora}:${minuto}:${segundo}`;
    
    //Cada cuando se va a actualizar el reloj
    t=setTimeout('mostrarHora()',1000);
}

//Arregla los números que sean menores a 10, de otra manera saldría sin 0
function agregarCeroReloj(i){
    if (i<10 || i.length<2) {
        i='0' + i;
    }
    return i;
}
//Arregla los números que sean menores a 10, de otra manera saldría sin 0
function agregarCero(i){
    if (i<10 && i.length<2) {
        i='0' + i;
    }
    return i;
}
//Esta función no se puede ejecutar así
// mostrarHora();

//El Evento load se dispara cuando el documento ha terminado de cargarse
window.onload=function(){
    mostrarHora();
}

//RECIBE HORA PARA ALARMAS
//Funciónes para validad campos
function validar(titulo,mensaje,numerohora,numerominuto){
    //Valida campos nulos
    if (titulo===""||mensaje===""||titulo.length>30||numerohora===""||numerominuto==="") {
        console.log(`Ningun campo puede ser nulo`);
        validación=false;
    }else{ //Valida la Hora
        if (numerohora<0 || numerohora>23 || numerohora === '-0'||numerohora.length!=2) {
            console.log(`${numerohora} no es una hora valida`);
            validación=false;
        }else{ //Valida el minuto
            if (numerominuto<0 || numerominuto>59 || numerominuto === '-0'||numerominuto.length!=2) {
                console.log(`${numerominuto} no es un minuto valido`);
                validación=false;
            }else{ validación=true } }
         }
         console.log(`Se validó ${titulo}, ${mensaje} ${numerohora}, ${numerominuto}`);
}

function agregaAlarma(){
    console.log(`Obten los valores de los campos`);
    //Obten los valores de los campos
    recibioTituloAlarma=document.getElementById('Titulo_Alarma').value;
    reciboMensajeAlarma=document.getElementById('Texto_Alarma').value;
    reciboHoraAlarma=document.getElementById('Hora_Alarma').value;
    reciboMinutoAlarma=document.getElementById('Minuto_Alarma').value;
    //Agrega ceros
    reciboHoraAlarma = agregarCero(reciboHoraAlarma);
    reciboMinutoAlarma = agregarCero(reciboMinutoAlarma);
    //Valida los campos
    validar(recibioTituloAlarma,reciboMensajeAlarma,reciboHoraAlarma,reciboMinutoAlarma);
    //Guarda los valores en posiciones del arreglo de alarmas
    //Si la validación fue bien, la variable validación será true
    if (validación) {
        alarmas.push(
            {
            TituloAlarma:`${recibioTituloAlarma}`,
            TextoAlarma:`${reciboMensajeAlarma}`,
            HoraAlarma:`${reciboHoraAlarma}`,
            MinutoAlarma:`${reciboMinutoAlarma}`
            }
        );
        ponerAlarmas();
        console.log(`Se agregó la alarma ${alarmas.length}`);
        swal('Bien Hecho!', `Se agrego la alarma: \n${recibioTituloAlarma}`,'success');

    }else{
          swal('Un problema con tus campos...','No dejes campos vacíos\n El título debe ser menor a 30 letras\n Usa el formato de 24 horas\n Recuerda que cada hora tiene 60 minutos','error');
    }

    return false;
}


//Como las variables hora, minuto, segundo son globales, se actualizan cada segundo
//Fuck yeah



//Función borrar alarma
function borrarAlarma(id) {
    //Borrala del arreglo
    //Encuentra que id es en el arreglo
    for (let i = 0; i < alarmas.length; i++) {
        if(i===id){
            console.log(`Borrar la alarma: ${alarmas[i].TituloAlarma}`);
            //Pregunta al usuario si está seguro
            swal({
                title: "Eliminar Alarma",
                text: "Una vez que se elimine la alarma, se quitará de la lista",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                //Elimina la alarma https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array
                alarmas.splice(i, 1)
                ponerAlarmas();
                  swal("La alarma ha sido eliminada con exito!", {
                    icon: "success",
                  });
                } else {
                    //No la elimina
                    ponerAlarmas();
                  swal("No se elimino la alarma");
                }
              });
        }
        
    }
    console.log(`Se borro la alarma ${id}`);
    return null;
}

//MANIPULAR ALARMAS
//función para poner la alarma en el html
function ponerAlarmas() {
    //Recorre las alarmas
    //El siguiente if es para cuando elimina la última alarma
    if (alarmas.length>0) {
        for (let i = 0; i < alarmas.length; i++) {
            //Captura la alarma de la posición actual
            var titulo=alarmas[i].TituloAlarma;
            var hora=alarmas[i].HoraAlarma;
            var minuto=alarmas[i].MinutoAlarma;
            //Agrega el codigo html a la variable alarmas_html para usarlo después
            //el id i es para identificar y saber cual borrar
            alarmas_html=`
                <div class="row" id="Alarma${i}">
                    <div class="col-4 col-md-2 text-center" id="AlarmasPendientesTiempo">
                        ${hora} : ${minuto}
                    </div>
                    <div class="col text-center" id="AlarmasPendientesTitulo">
                        ${titulo}
                    </div>
                    <div class="col text-center" id="EliminarAlarma">
                        <button type="button" class="btn btn-outline-danger" onclick="return borrarAlarma(${i})" id="EliminarAlarma${i}">Eliminar Alarma</button>
                    </div>
                </div>
                
        `+alarmas_html;

        }
    }else{
        //En caso que el arreglo de Alarmas no tenga nada
        //Esto ocurre cuando se borran las alarmas por el usuario, y de todos modos debe reimprimir algo
        alarmas_html=``;
    }
                //Agrega el string de alarmas_html para que imprima todas las alarmas y no solo la última
                const div_html = document.querySelector("#Alarmas_Html");
                div_html.innerHTML = `
                ${alarmas_html}
                `;
                console.log(`Se imprimió la alarma`);

    //Limpia la variable, pues en cada for se llena con el arreglo completo
    alarmas_html="";
}