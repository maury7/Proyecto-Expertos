$("#btn-facturar").click(function() {
   
	
var parametross=`idTipoPlan=${$("#select-planes").val()}`;
console.log(parametross);

$.ajax({
	url:`/registrar-plan/${$("#select-planes").val()}`,
	dataType:"json",
	method:"POST",
	success:function(res){
		console.log(res);
		if (res.affectedRows==1){
				
				alert("excelente");
		}else{
			alert("Error al guardar mierda");
		}
	},
	error:function(error){
		console.log(error);
	}
	});	



$.ajax({
	url:"/mostrar-idplan",
	dataType:"json",
	method:"POST",
	success:function(respuesta){
		console.log(respuesta);
		if (respuesta.length>=1){
			$("#formulario-registrar").append(
					
				`<input type="hidden" value="${respuesta[0].idPlan}" id="idplan"><br>`);	
				
				alert("excelente imprimio");
		}else{
			alert("Error al guardar pueta");
		}
	},
	error:function(error){
		console.log(error);
	}
	});
});

$("#btn-registrar").click(function() {
        
        
    var parametros=`nombre=${$("#nombre").val()}&apellido=${$("#apellido").val()}&email=${$("#email").val()}&password=${$("#password").val()}&idPlan=${$("#idplan").val()}`;
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


$("#btn-login").click(function(){
	var parametros=`email=${$("#email").val()}&contrasenia=${$("#password").val()}`;
	console.log(parametros);
	
	$.ajax({
        url:"/login",
        method:"POST",
        data:parametros,
        dataType:"json",
        success:function(respuesta){
            console.log(respuesta);
            if (respuesta.length == 1)
                window.location.href = "/editor.html";
            else 
                alert("Credenciales invalidas");
        },
        error:function(error){
            console.error(error);
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