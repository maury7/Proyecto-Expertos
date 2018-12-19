
$(document).ready(function(){
    //Se cargo todo el DOM
    	
$.ajax({
	url:"/obtener-session-codigo",
	method:"GET",
	dataType:"json",
	success:function(respuesta){
		console.log(respuesta);
		$("#formulario-actualizar").append(
			`<input type="hidden" class="form-control" placeholder="Usuario" value="${respuesta}" id="valor-usuario-perfil">`
		); 
		},
	error:function(error){
		console.error(error);
	}
});

});

$("#btn-actualizar").click(function() {
    var parametros=`nombre=${$("#nombre").text()}&apellido=${$("#apellido").text()}&email=${$("#email").text()}&password=${$("#password").val()}&idUsuario=${$("#valor-usuario-perfil").val()}`;
    console.log(parametros);
    /*
    $.ajax({
        url:`/actualizar-usuario/${$("#valor-usuario-perfil").text()}`,
        method:"POST",
        dataType:"json",
        success:function(respuesta){
            console.log(respuesta);
            $("#formulario-plan2").append(
                `<input type="hidden" class="form-control" placeholder="Usuario" value="${respuesta}" id="valor-usuario">`
            ); 
            },
        error:function(error){
            console.error(error);
        }
    });
    
*/
});
