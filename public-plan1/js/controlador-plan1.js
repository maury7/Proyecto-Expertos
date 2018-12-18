


$("#guargar-codigo").click(function() {
        
        
    var parametros=`prueba=${$("#htmleditor").html()}`;
    console.log(parametros);
	/*
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
	*/
});

