
	
	function modalCompartir(){
		$("#modalComaprtir").modal("show");
		//alert("holamodal");
	
		$.ajax({
			url:"/usuarios",
			method:"GET",
			dataType:"json",
			success:function(res){
				console.log(res);
				for (var i=0;i<res.length;i++){
				$("#slc-usuarios").append(
					
					`<option value="${res[i].idUsuarios}">${res[i].nombre}</option>`
				);}
			}, 
			error:function(error){
				console.error(error);
			}
		});
		
	};
	
	function modalCarpetas(){
		$("#modalCarpetas").modal("show");
		//alert("holamodal");
		
		$.ajax({
			url:`/mostrar-idPlan2/${$("#valor-usuario").val()}`,
			method:"POST",
			dataType:"json",
			success:function(res){
				console.log(res);
					$("#carpeta").append(
						`<input type="hidden" value="${res[0].idPlan}" id="valor-plan">`
					); 
			}, 
			error:function(error){
				console.error(error);
			}
		});
		
		
		
		
$.ajax({
	url:`/carpetas/${$("#valor-usuario").val()}`,
	method:"POST",
	dataType:"json",
	success:function(respuesta){
		console.log(respuesta);
		$("#slc-carpetas").html("");
		for (var i=0;i<respuesta.length;i++){
			$("#slc-carpetas").append(
				
				`<option value="${respuesta[i].idCarpeta}">${respuesta[i].nombre_carpeta}</option>`
			);}
		},
	error:function(error){
		console.error(error);
	}
	});
};
	
	
	
	
	$("#crear-carpeta").click(function() {
		var parametros=`nombre_carpeta=${$("#nombreCarpeta").val()}&idPlan=${$("#valor-plan").val()}&idCarpetaP=${$("#slc-carpetas").val()}`;
    	console.log(parametros);
	
		$.ajax({
			url:"/crear-carpeta",
			method:"POST",
			data:parametros,
			dataType:"json",
			success:function(res){
				console.log(res);
			//	if(res.affectedRows=1)
			//		alert("Excelente");
				
			//	else
			//		alert("maloooo");
				
			}, 
			error:function(error){
				console.error(error);
			}
		});
	
	});
	
	$("#crear-nueva-carpeta").click(function() {
        
        
		var parametros=`nombre_carpeta=${$("#nombreCarpeta").val()}&idPlan=${$("#valor-plan").val()}`;
		console.log(parametros);
		
		
		$.ajax({
			url:"/crear-carpeta-nueva",
			data: parametros,
			dataType:"json",
			method:"POST",
			success:function(res){
				console.log(res);
			//	if (res.affectedRows==1){
			//		alert("excelente");
			//	}else{
			//		alert("Error al guardar mensaje");
			//	}
			},
			error:function(error){
				console.log(error);
			}
		});
		
		
	});
	


	
	$("#compartir-carpeta").click(function() {
        
        
    var parametros=`usuarioEmisor=${$("#valor-usuario").val()}&usuarioReceptor=${$("#slc-usuarios").val()}&carpetaCompartida=${$("#slc-carpetasI").val()}`;
    console.log(parametros);
	$.ajax({
		url:"/compartir",
		data: parametros,
		dataType:"json",
		method:"POST",
		success:function(res){
			console.log(res);
		//	if (res.affectedRows==1){
		//		alert("excelente ");
		//	}else{
		//		alert("Error al guardar mensaje");
		//	}
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
         //       alert("Credenciales invalidas");
		 window.location.href = "/login.html";
            
		},
        error:function(error){
            console.error(error);
        }
    });
});



$(document).ready(function(){
	//Se cargo todo el DOM
	
$.ajax({
	url:"/obtener-session-codigo",
	method:"GET",
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
});
function cargarCarpetas(){
	
$.ajax({
	url:`/carpetas/${$("#valor-usuario").val()}`,
	method:"POST",
	dataType:"json",
	success:function(respuesta){
		console.log(respuesta);
		$("#slc-carpetasI").html("");
		
		for (var i=0;i<respuesta.length;i++){
			$("#slc-carpetasI").append(
				
				`<option value="${respuesta[i].idCarpeta}">${respuesta[i].nombre_carpeta}</option>`
			);}
		},
	error:function(error){
		console.error(error);
	}
	});
};


$("#guargar-codigo").click(function() {
	var parametros=`codHTML=${$("#htmleditor").text()}&codCSS=${$("#csseditor").text()}&codJS=${$("#jseditor").text()}&idCarpeta=${$("#slc-carpetasI").val()}`;
	console.log(parametros);

	$.ajax({
		url:"/guargar-codigo",
		method:"POST",
		data:parametros,
		dataType:"json",
		success:function(res){
			console.log(res);
		//	if(res.affectedRows=1)
		//		alert("Excelente");
			
		//	else
		//		alert("maloooo");
			
		}, 
		error:function(error){
			console.error(error);
		}
	});

});


