var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();
var credenciales = {
    host:"localhost",
    user:"root",
    password:"",
    port:"3306",
    database: "Sumachik"
};

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



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