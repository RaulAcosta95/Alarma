//Obten la lista de alarmas
var alarmas=require('./Script1')
module.export=alarmas;
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
        // ponerAlarmas();
        console.log(`Se agregó la alarma ${alarmas.length}`);
        swal('Bien Hecho!', `Se agrego la alarma: \n${recibioTituloAlarma}`,'success');

    }else{
          swal('Un problema con tus campos...','No dejes campos vacíos, usa el formato de 24 horas, y cada hora tiene 60 minutos','error');
    }

    return false;
}
