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
    database: "Sumachik"
};


app.use(bodyParser.json());                //middelware
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static("public"));
app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));


//Verificar si existe una variable de sesion para poner publica la carpeta public admin
/*
var publicAdmin = express.static("public-admin");
var publicCajero = express.static("public-cajero");

app.use( //seria por tipo de pla, consulta entre usuario, plam, y tipo plan,
    function(req,res,next){
        if (req.session.correo){
            //Significa que el usuario si esta logueado
            if (req.session.idplan == 1)
                publicCajero(req,res,next);
            else if (req.session.idTipoUsuario == 2)
                publicAdmin(req,res,next);
        }
        else
            return next();
    }
);

*/


///Para agregar seguridad a una ruta especifica:

function verificarAutenticacion(req, res, next){
	if(req.session.correo)
		return next();
	else
		res.send("ERROR, ACCESO NO AUTORIZADO");
}


app.post("/login",function(req, res){
    var conexion = mysql.createConnection(credenciales);
    conexion.query(
        "SELECT idUsuarios, email, idPlan FROM usuarios WHERE password = ? and email=?",
        [req.body.contrasenia, req.body.email],
        function(error, data, fields){
            if (error){
                res.send(error);
                res.end();
            }else{
                if (data.length==1){
                    req.session.idUsuarios = data[0].idUsuarios;
                    req.session.email = data[0].email;
                    req.session.idPlan = data[0].idPlan
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
app.get("/planes",function(req,res){
    var conexion = mysql.createConnection(credenciales);   //se define la conexion
    conexion.query("SELECT idTipo_plan, nombre_tipo_plan, precio_dolar, descripcion FROM Tipos_plan ORDER BY idTipo_plan ASC ",
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

app.listen(8111, function(){ console.log("Servidorcito iniciado");});