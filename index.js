var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var app = express();
var credenciales = {
    host:"localhost",
    user:"root",
    password:"",
    port:"3306",
    database: "Sumachikk"
};


app.use(bodyParser.json());                //middelware
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static("public"));
app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));


//Verificar si existe una variable de sesion para poner publica la carpeta public plan

var publicPlan1 = express.static("public-plan1");
var publicPlan2 = express.static("public-plan2");
var publicPlan3 = express.static("public-plan3");

app.use( //seria por tipo de pla, consulta entre usuario, plam, y tipo plan,
    function(req,res,next){
        if (req.session.email){
            //Significa que el usuario si esta logueado
            if (req.session.idTipoPlan == 1)
                publicPlan1(req,res,next);
            else if (req.session.idTipoPlan == 2)
                publicPlan2(req,res,next);
            else if (req.session.idTipoPlan == 3)
                publicPlan3(req,res,next);
        }
        else   
        return next();
    }
);




///Para agregar seguridad a una ruta especifica:


app.post("/login",function(req, res){
    var conexion = mysql.createConnection(credenciales);
    conexion.query(
        `SELECT a.idUsuarios, a.email, a.nombre, c.idTipo_plan FROM usuarios as a
        inner join planes as b
        on (a.idPlan=b.idPlan)
        inner join tipos_plan as c
        on(b.idTipo_plan=c.idTipo_plan)
         WHERE a.password = ? and a.email=?`,
        [req.body.contrasenia, req.body.email],
        function(error, data, fields){
            if (error){
                res.send(error);
                res.end();
            }else{
                if (data.length==1){
                    req.session.idUsuarios = data[0].idUsuarios;
                    req.session.email = data[0].email;
                    req.session.idTipoPlan = data[0].idTipo_plan;
                } 
                res.send(data);
                res.end();
            }
        }
    )
});

   //ejecutar al darle click en salir
app.get("/cerrar-sesion",function(req,res){
    req.session.destroy();
    res.send("Sesion eliminada");
    res.end();
});


app.get("/obtener-session-codigo",function(req,res){
    res.send(String(req.session.idUsuarios));
    res.end();
});

/*
app.get("/contenido-registringido",verificarAutenticacion,function(req, res){
    res.send("Este es un contenido restringido");
    res.end();
});
*/

//Registrar usuarios

app.post("/registrar-usuarios",function(req,res){
    var conexion = mysql.createConnection(credenciales);   //se define la conexion
    conexion.query("INSERT INTO Usuarios(nombre, apellido, email, password, idPlan) VALUES (?,?,?,?,?)",
        [   
            req.body.nombre,
            req.body.apellido,
            req.body.email,
            req.body.password,
            req.body.idPlan
        ],
        function(error, data, fields){
            if (error)
                res.send(error);    
            else
                res.send(data);
            res.end();
        }
    );
});

app.post("/registrar-plan/:idTipoPlan",function(req,res){
    var conexion = mysql.createConnection(credenciales);   //se define la conexion
    conexion.query("INSERT INTO planes(idTipo_plan) VALUES (?)",
        [   
            req.params.idTipoPlan
        ],
        function(error, data, fields){
            if (error)
                res.send(error);    
            else
                res.send(data);
            res.end();
        }
    );
});



app.post("/mostrar-idplan",function(req,res){
    var conexion = mysql.createConnection(credenciales);   //se define la conexion
    conexion.query("SELECT idPlan FROM planes ORDER BY idPlan DESC LIMIT 1",
        [],
        function(error, data, fields){
            if (error)
                res.send(error);    
            else
                res.send(data);
            res.end();
        }
    );
});

app.get("/planes",function(req,res){
    var conexion = mysql.createConnection(credenciales);   //se define la conexion
    conexion.query("SELECT idTipo_plan, nombre_tipo_plan, precio_dolar, descripcion FROM tipos_plan ORDER BY idTipo_plan ASC ",
        [],
        function(error, data, fields){
            if (error)
                res.send(error);    
            else
                res.send(data);
            res.end();
        }
    );
});
app.get("/usuarios",function(req,res){
    var conexion = mysql.createConnection(credenciales);   //se define la conexion
    conexion.query("SELECT idUsuarios, nombre FROM usuarios ORDER BY idUsuarios ASC ",
        [],
        function(error, data, fields){
            if (error)
                res.send(error);    
            else
                res.send(data);
            res.end();
        }
    );
});



app.get("",function(req,res){
    var conexion = mysql.createConnection(credenciales);   //se define la conexion
    conexion.query("SELECT idCarpeta, nombre_carpeta FROM carpetas ",
        [],
        function(error, data, fields){
            if (error)
                res.send(error);    
            else
                res.send(data);
            res.end();
        }
    );
});





app.post("/mostrar-idPlan2/:idUsuario",function(req,res){
    var conexion = mysql.createConnection(credenciales);   //se define la conexion
    conexion.query(`SELECT idPlan FROM usuarios 
       where idUsuarios=?`,
        [   
            req.params.idUsuario
        ],
        function(error, data, fields){
            if (error)
                res.send(error);    
            else
                res.send(data);
            res.end();
        }
    );
});


app.post("/crear-carpeta",function(req,res){
    var conexion = mysql.createConnection(credenciales);   //se define la conexion
    conexion.query("INSERT INTO  carpetas (nombre_carpeta ,  idPlan ,  idCarpetaP ) VALUES ( ?, ?, ?)",
        [   
            req.body.nombre_carpeta,
            req.body.idPlan,
            req.body.idCarpetaP
        ],
        function(error, data, fields){
            if (error)
                res.send(error);    
            else
                res.send(data);
            res.end();
        }
    );
});

app.post("/crear-carpeta-nueva",function(req,res){
    var conexion = mysql.createConnection(credenciales);   //se define la conexion
    conexion.query("INSERT INTO  carpetas (nombre_carpeta ,  idPlan ) VALUES ( ?, ?)",
        [   
            req.body.nombre_carpeta,
            req.body.idPlan
        ],
        function(error, data, fields){
            if (error)
                res.send(error);    
            else
                res.send(data);
            res.end();
        }
    );
});

app.post("/carpetas/:idUsuario",function(req,res){
    var conexion = mysql.createConnection(credenciales);   //se define la conexion
    conexion.query(`SELECT c.idCarpeta, c.nombre_carpeta FROM usuarios as a
    INNER join planes as b
    on(a.idPlan=b.idPlan)
    inner join carpetas as c
    on(b.idplan=c.idPlan) 
    where idUsuarios=?`,
        [   
            req.params.idUsuario
        ],
        function(error, data, fields){
            if (error)
                res.send(error);    
            else
                res.send(data);
            res.end();
        }
    );
});


app.post("/compartir",function(req,res){
    var conexion = mysql.createConnection(credenciales);   //se define la conexion
    conexion.query("INSERT INTO compartir(idUsuarioEmisor, idUsuarioReceptor, idCarpetaCompartida) VALUES (?,?,?)",
        [   
            req.body.usuarioEmisor,
            req.body.usuarioReceptor,
            req.body.carpetaCompartida
        ],
        function(error, data, fields){
            if (error)
                res.send(error);    
            else
                res.send(data);
            res.end();
        }
    );
});


app.post("/guardar-codigo",function(req,res){
    var conexion = mysql.createConnection(credenciales);   //se define la conexion
    conexion.query("INSERT INTO  archivos (ArchivoHTML ,  ArchivoCSS ,  ArchivoJS ,  idCarpeta ) VALUES ( ?, ? ,? ,?)",
        [   req.body.codHTML,
            req.body.codCSS,
            req.body.codJS,
            req.body.idCarpeta   
        ],
        function(error, data, fields){
            if (error)
                res.send(error);    
            else
                res.send(data);
            res.end();
        }
    );
});
app.post("/actualizar-usuario",function(req,res){
    var conexion = mysql.createConnection(credenciales);   //se define la conexion
    conexion.query("UPDATE  usuarios  SET  nombre = ?, apellido = ? , email = ?, password = ?  WHERE idUsuarios=? ",
        [   
            
            req.body.nombre,
            req.body.apellido,
            req.body.email,
            req.body.password,
            req.body.idUsuarios
        ],
        function(error, data, fields){
            if (error)
                res.send(error);    
            else
                res.send(data);
            res.end();
        }
    );
});


app.listen(8111, function(){ console.log("Servidorcito iniciado");});