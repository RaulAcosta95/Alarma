//Variables Globales
var hora,minuto,segundo;
var recibioTituloAlarma, reciboMensajeAlarma, reciboHoraAlarma, reciboMinutoAlarma;
var alarmas=[];

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
//Se ejecuta al apretar boton de "Enviar Alarma"
function agregaAlarma(){
    //Obten los valores de los campos
    recibioTituloAlarma=document.getElementById('Titulo_Alarma').value;
    reciboMensajeAlarma=document.getElementById('Texto_Alarma').value;
    reciboHoraAlarma=document.getElementById('Hora_Alarma').value;
    reciboMinutoAlarma=document.getElementById('Minuto_Alarma').value;
    //Guarda los valores en posiciones del arreglo de alarmas
    alarmas.push(
        {
        TituloAlarma:`${recibioTituloAlarma}`,
        TextoAlarma:`${reciboMensajeAlarma}`,
        HoraAlarma:`${reciboHoraAlarma}`,
        MinutoAlarma:`${reciboMinutoAlarma}`
        }
    );
    return false;
}

//Como las variables hora, minuto, segundo son globales, se actualizan cada segundo
//Fuck yeah
