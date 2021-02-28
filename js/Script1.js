//Variables Globales
var hora,minuto,segundo;
var recibioTituloAlarma, reciboMensajeAlarma, reciboHoraAlarma, reciboMinutoAlarma;
var alarmas=[];
//OJO esta variable validación es para cuando se envían los datos
//Se modifica en la función validar
var validación=true;

//OBTEN LA HORA Y MUESTRALA
function mostrarHora(){
    //Crea la constante que ocupa el Date para obtener las horas
    const tiempo=new Date();
    hora = tiempo.getHours();
    minuto = tiempo.getMinutes();
    segundo = tiempo.getSeconds();
    //Usa  la función que arregla los numeros
    hora = agregarCero(hora);
    minuto = agregarCero(minuto);
    segundo = agregarCero(segundo);
    //Pasarlo al elemento reloj en el html (el div)
    document.getElementById('reloj').innerHTML=`${hora}:${minuto}:${segundo}`;
    
    //Cada cuando se va a actualizar el reloj
    t=setTimeout('mostrarHora()',1000);
}

//Arregla los números que sean menores a 10, de otra manera saldría sin 0
function agregarCero(i){
    if (i<10) {
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
    if (titulo==""||mensaje==""||numerohora==""||numerominuto=="") {
        console.log(`Nungun campo puede ser nulo`);
        validación=false;
    }else{ //Valida la Hora
        if (numerohora<0 || numerohora>23 || numerohora == '-0') {
            console.log(`${numerohora} no es una hora valida`);
            validación=false;
        }else{ //Valida el minuto
            if (numerominuto<0 || numerominuto>59 || numerominuto == '-0') {
                console.log(`${numerominuto} no es un minuto valido`);
                validación=false;
            }else{ validación=true } }
         } 
}
//Se ejecuta al apretar boton de "Enviar Alarma"
function agregaAlarma(){
    console.log(`Obten los valores de los campos`);
    //Obten los valores de los campos
    recibioTituloAlarma=document.getElementById('Titulo_Alarma').value;
    reciboMensajeAlarma=document.getElementById('Texto_Alarma').value;
    reciboHoraAlarma=document.getElementById('Hora_Alarma').value;
    reciboMinutoAlarma=document.getElementById('Minuto_Alarma').value;
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
        console.log(`Se agregó la alarma ${alarmas.length}`);
        swal('Bien Hecho!', `Se agrego la alarma: \n${recibioTituloAlarma}`,'success');

    }else{
          swal('Un problema con tus campos...','No dejes campos vacíos, usa el formato de 24 horas, y cada hora tiene 60 minutos','error');
    }

    return false;
}

//Como las variables hora, minuto, segundo son globales, se actualizan cada segundo
//Fuck yeah

