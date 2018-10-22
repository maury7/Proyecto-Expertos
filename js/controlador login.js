
$("#btn-guardar").click(function(){
    $.ajax({
        url:"ajax/iniciar.php",
        data:"correo="+$("#correo").val()+"&contrasenia="+$("#contrasenia").val(),
        method:"POST",
        dataType:"json",
        success:function(respuesta){
            console.log(respuesta);
            
            
            if (respuesta.codigo == 0){
                window.location = "my-drive.php";  //Redirreccionar desde js
            }else{
               $("#elmensaje").append(
                `
                <H7 style="color:red;">${respuesta.mensaje}</H7>
                ` 
                )
            }
        },
        error:function(error){
            console.log(error);
           
        }
    });
});





