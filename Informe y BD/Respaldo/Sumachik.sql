Create database Sumachik

use Sumachik

CREATE TABLE Usuarios(
			idUsuarios int Primary Key,
            nombre Varchar(25),
            apellido Varchar(25),
            email Varchar(40),
            password Varchar(25),
			idTipo_usuarios int,
            idPlan int
)

CREATE TABLE Tipos_usuarios(
			idTipo_usuarios int Primary Key,
            nombre_tipo_usuario Varchar(25),
            descripcion Varchar(25)
)


CREATE TABLE Planes(
			idPlan int Primary Key,
            nombre_plan Varchar(25),
            descripcion Varchar(25),
            idTipo_plan int
)

CREATE TABLE Tipos_plan(
			idTipo_plan int Primary Key,
            nombre_tipo_plan Varchar(25),
            descripcion Varchar(25)
)



CREATE TABLE Carpetas(
			idCarpeta int Primary Key,
            nombre_carpeta Varchar(25),
            descripcion Varchar(25)
)

CREATE TABLE Proyectos(
			idProyecto int Primary Key,
            nombre_proyecto Varchar(25),
            descripcion Varchar(25)
)

CREATE TABLE Archivos(
			idProyecto int Primary Key,
            nombre_archivo Varchar(25),
            descripcion Varchar(25)
)


CREATE TABLE Tipo_archivos(
			idTipo_archivo int Primary Key,
            nombre_tipo_archivo Varchar(25),
            descripcion Varchar(25)
)




ALTER TABLE Usuarios ADD FOREIGN KEY (idTipo_usuarios) REFERENCES Tipo_usuarios (idTipo_usuarios)

ALTER TABLE Usuaios ADD FOREIGN KEY (idTipo_usuarios) REFERENCES Tipo_usuarios (idTipo_usuarios)

ALTER TABLE Usuarios ADD FOREIGN KEY (idTipo_usuarios) REFERENCES Tipo_usuarios (idTipo_usuarios)
ALTER TABLE Usuarios ADD FOREIGN KEY (idTipo_usuarios) REFERENCES Tipo_usuarios (idTipo_usuarios)
ALTER TABLE Usuarios ADD FOREIGN KEY (idTipo_usuarios) REFERENCES Tipo_usuarios (idTipo_usuarios)
ALTER TABLE Usuarios ADD FOREIGN KEY (idTipo_usuarios) REFERENCES Tipo_usuarios (idTipo_usuarios)
ALTER TABLE Usuarios ADD FOREIGN KEY (idTipo_usuarios) REFERENCES Tipo_usuarios (idTipo_usuarios)
ALTER TABLE Usuarios ADD FOREIGN KEY (idTipo_usuarios) REFERENCES Tipo_usuarios (idTipo_usuarios)
ALTER TABLE Usuarios ADD FOREIGN KEY (idTipo_usuarios) REFERENCES Tipo_usuarios (idTipo_usuarios)
ALTER TABLE Usuarios ADD FOREIGN KEY (idTipo_usuarios) REFERENCES Tipo_usuarios (idTipo_usuarios)
ALTER TABLE Usuarios ADD FOREIGN KEY (idTipo_usuarios) REFERENCES Tipo_usuarios (idTipo_usuarios)
ALTER TABLE Usuarios ADD FOREIGN KEY (idTipo_usuarios) REFERENCES Tipo_usuarios (idTipo_usuarios)
ALTER TABLE Usuarios ADD FOREIGN KEY (idTipo_usuarios) REFERENCES Tipo_usuarios (idTipo_usuarios)



