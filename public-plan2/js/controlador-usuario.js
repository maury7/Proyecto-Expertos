
$(document).ready(function(){
    //Se cargo todo el DOM
    	
$.ajax({
	url:"/obtener-session-codigo",
	method:"GET",
	dataType:"json",
	success:function(respuesta){
		console.log(respuesta);
		$("#formulario-registrar").append(
			`<input type="hidden" class="form-control" placeholder="Usuario" value="${respuesta}" id="valor-usuario-perfil">`
		); 
		},
	error:function(error){
		console.error(error);
	}
});

});

$("#btn-actualizar").click(function() {
    var parametros=`nombre=${$("#nombreU").val()}&apellido=${$("#apellidoU").val()}&email=${$("#emailU").val()}&password=${$("#passwordU").val()}&idUsuarios=${$("#valor-usuario-perfil").val()}`;
    console.log(parametros);
    
    $.ajax({
        url:"/actualizar-usuario",
        method:"POST",
        dataType:"json",
        data:parametros,
        success:function(respuesta){
            console.log(respuesta);
            },
        error:function(error){
            console.error(error);
        }
    });
    

});
