Create database Sumachikk

use Sumachikk


CREATE TABLE Usuarios(
			idUsuarios int Primary Key,
            nombre Varchar(25),
            apellido Varchar(25),
            email Varchar(40),
            password Varchar(25),
			idTipo_usuario int,
            idPlan int
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
            descripcion longtext
)



CREATE TABLE Compartir(
			idUsuarioEmisor int,
            idUsuarioReceptor int,
			idCarpetaCompartida int
)


CREATE TABLE Carpetas(
			idCarpeta int Primary Key,
            nombre_carpeta Varchar(25),
            descripcion Varchar(25),
            idPlan int,
            idSubCarpeta int
)


CREATE TABLE Archivos(
			idArchivo int Primary Key,
            nombre_archivo Varchar(25),
            descripcion longtext,
            idCarpeta int,
            idTipo_archivo int
)


CREATE TABLE Tipo_archivos(
			idTipo_archivo int Primary Key,
            nombre_tipo_archivo Varchar(25),
            descripcion Varchar(25)
)



ALTER TABLE Usuarios ADD FOREIGN KEY (idTipo_usuario) REFERENCES Tipo_usuario (idTipo_usuario)

ALTER TABLE Usuarios ADD FOREIGN KEY (idPlan) REFERENCES Planes (idPlan)

ALTER TABLE Planes ADD FOREIGN KEY (idTipo_plan) REFERENCES Tipo_Plan (idTipo_plan)

ALTER TABLE Carpetas ADD FOREIGN KEY (idPlan) REFERENCES Plan (idPlan)

ALTER TABLE Compartir ADD FOREIGN KEY (idUsuarioEmisor) REFERENCES Usuarios (idUsuarios)

ALTER TABLE Compartir ADD FOREIGN KEY (idUsuarioReceptor) REFERENCES Usuarios (idUsuarios)

ALTER TABLE Compartir ADD FOREIGN KEY (idCarpetaCompartida) REFERENCES Carpetas (idCarpeta)

ALTER TABLE Archivos ADD FOREIGN KEY (idCarpeta) REFERENCES Carpetas (idCarpetas)

ALTER TABLE Archivos ADD FOREIGN KEY (idTipo_archivo) REFERENCES Tipo_archivos (idTipo_archivo)

ALTER TABLE Carpetas ADD FOREIGN KEY (idSubCarpeta) REFERENCES Carpetas (idCarpetas)
