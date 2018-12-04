
    $("#btn-registrar").click(function() {
        
        
    var parametros=`nombre=${$("#nombre").val()}&apellido=${$("#apellido").val()}&email=${$("#email").val()}&password=${$("#password").val()}&idPlan=${$("#select-planes").val()}`;
    console.log(parametros);
	
	$.ajax({
		url:"/registrar-usuarios",
		data: parametros,
		dataType:"json",
		method:"POST",
		success:function(res){
			console.log(res);
			if (res.affectedRows==1){
				alert("excelente");
			}else{
				alert("Error al guardar mensaje");
			}
		},
		error:function(error){
			console.log(error);
		}
	});
	
});



$(document).ready(function(){
	//Se cargo todo el DOM
	$.ajax({
		url: "/Planes",
		method:"GET",
		dataType:"json",
		success:function(res){
			console.log(res);
		
			for (var i=0;i<res.length;i++){ 
				$("#select-planes").append(
					
					`<option value="${res[i].idTipo_plan}">${res[i].nombre_tipo_plan}</option>`);	
                    
                
                $("#precio-planes").append(
                `
                <div class="col-lg-4  col-sm-12 col-12 item-precio planes">
                  <h3>${res[i].nombre_tipo_plan}</h3>
                 
                  <p>${res[i].descripcion}</p>
                  <p><strong> $ ${res[i].precio_dolar} (Gratis) / mes </strong></p>
                  
                  </div> `
              )      
			
		}
	},
	error:function(error){
		console.error(error);
	}
});
});