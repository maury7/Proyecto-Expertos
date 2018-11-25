
var db;
function guardarUsuarios(){
    var usuario ={
        nombre:  document.getElementById("nombre").value,
        apellido:  document.getElementById("apellido").value,
        email:  document.getElementById("email").value,
        password:  document.getElementById("password").value,
       }

    var transaccion = db.transaction(["Usuarios"],"readwrite");///readwrite: Escritura/lectura, readonly: Solo lectura
    var objectStoreUsuarios = transaccion.objectStore("Usuarios");
    var solicitud = objectStoreUsuarios.add(usuario);
    solicitud.onsuccess = function(evento){
        console.log("Se agrego el Usuario correctamente");
        }
        

    solicitud.onerror = function(evento){
        console.log("Ocurrio un error al guardar Usuario");
    }

   
}

(function(){
    if (!('indexedDB' in window)){
        console.error("El navegador no soporta indexedDB");
        return;
    }

    var solicitud = window.indexedDB.open("Sumachik", 1);

    solicitud.onsuccess = function(evento){
        console.log("Se abrio la base de datos");
        db = solicitud.result;
        
       // llenarSelect();
      //  llenarVideo();
    };

    solicitud.onerror = function(evento){
        console.error("No se pudo abrir la base datos");
    };

    
    solicitud.onupgradeneeded = function(evento){
        console.log("La base de datos se creara o se actualizara");
        db = evento.target.result; 
        var objectStoreUsuarios = db.createObjectStore("Usuarios", {keyPath: "codigo", autoIncrement: true});
   
        objectStoreUsuarios.transaction.oncomplete = function(evento){
            console.log("El object store de Usuarios se creo con exito");
        }

        objectStoreUsuarios.transaction.onerror = function(evento){
            console.log("Error al crear el object store de Usuarios");
        }

        
    }
})();

//Funciones para Imprimir

function llenarSelect(){
   
    var transaccion = db.transaction(["Canales"],"readonly");
    var objectStoreCanales = transaccion.objectStore("Canales");
    var cursor = objectStoreCanales.openCursor();
    cursor.onsuccess = function(evento){
       
        if(evento.target.result){
            console.log(evento.target.result.value);
            var nombrecanal = evento.target.result.value.canal;  
            document.getElementById("select-canales").innerHTML += 
            
            '<option value="'+ nombrecanal +'">'+ nombrecanal +'</option>';
            
            evento.target.result.continue();
        }
    }
}

function llenarVideo(){
   
    var transaccion = db.transaction(["Videos"],"readonly");
    var objectStoreVideos = transaccion.objectStore("Videos");
    var cursor = objectStoreVideos.openCursor();
    cursor.onsuccess = function(evento){
       
        if(evento.target.result){
            console.log(evento.target.result.value);
            var videos = evento.target.result.value;  
            document.getElementById("elvis").innerHTML += 
            
            `
            <section class="form-control col-lg-2 col-md-2 col-md-12 col-xs-12 formulario" id="for-uno" >
                        <table>
                            <tr>
                                <td> <img src="${videos.caratula}" id="imagen-uno"></td>
                                
                            </tr>  
                        <table>
                        
                        <table>
                                <tr>
                                    <td> <strong>${videos.titulo}</strong></td>
                                    
                                </tr>  
                            <tr>
                                    <td> <strong></strong>${videos.select} </strong></td>
                                    
                            </tr> 
                            <tr>
                                <td>${videos.visualizaciones}</td>
                                <td>| ${videos.duracion} </td>
                            </tr> 
                    </table>
    
                            
                    </section>
                    `;
            
            evento.target.result.continue();
        }
    }
}