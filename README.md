## Seminario 1 -  Practica1
#### Grupo13

### Integrantes

|   | NOMBRE                                      | CARNE     |
| - | ------------------------------------------- | --------- |
| 1 | Santiago Gilberto Antonio Rivadeneira Ruano | 201313722 |
| 2 | Edwin Alfredo Lopez Gomez                   | 201314007 |
| 3 | Wilfred Stewart Perez Solorzano             | 201408419 |
| 4 | Hector Josue Orozco Salazar                 | 201314296 |

## Link de la pagina


# Arquitectura

<img src="images/arquitectura.png">

 
* EC2
    <br>Fueron utilizadas para realizar los servidores del backend, en los cuales uno fue implementado en NodeJS y el otro en python.   
* Bucket Imagenes
    <br>Bucket es el contenedor que Amazon S3 nos proporciona para el almacenamiento de objetos
    tales como archivos y metadatos 

    La apliacion FAUNADEX tendra la utilizacion de un bucket de Amazon S3 para el almacenamiento 
    de las imagenes utilzadas por los usuarios dentro de esta aplicacion, con el fin de tener
    un pyme desentralizado y publico, para el acceso de las diferentes API'S implementadas para
    este servicio, asi poder tener un resguardo de los datos con un nivel de integridad y 
    confiabilidad, disponibilidad de estos mismo

* Base de Datos
    <br>Se utilizó una base de datos tradicional RDS con un servidor SQL Server en el cual se diseñó un modelo relacional y se crearon procedimientos almacenados en los que se realizaron transacciones para el manejo de los datos.

* Amazon Translate
    <br>Se implemtado el servicio de Amazon Transalte de traduccion automatica neuronal el cual amazon ofrece una traduccion de idioms rentalbe y personalizable, el cual se ha implementado en la traduccion de las descripciones que pueden poseer las imagenes dentro de la aplicacion. 

* Rekognition
    <br>La aplicacion cuentan con la integracion de Amazon REkognitcion el cual facilita la incorporacion del analisis de imagen y video dentro de esta aplicacion. El cual tiene su implenteo en el segundo metodo de login dentro de esta en el cual permitira a los usuario poder ingresar por medio de una camar web la cual aplicara el reconocimiento facial con la imagen de perfil.



* Amazon lex
    <br>Tecnologia de vz y audio de compresion de lenguaje natrual(NLU), dicha tecnologia es implementada en el chatbot personalizado que cuenta la aplicacion para poder ayudar a los usuario con ayudas rapidas

# Usuarios IAM
* Usuario S3
Se creo un usuario con permisos de acceso a S3 para la gestion del Bucket en donde se encuentran las imagenes y paginas web, perteneciente al gurpo practica1-G13-S3.
El permiso utilizado para este usuario es: AmazonS3FullAcces
<img src="images/IAM1Imagenes.png">

* Usuario ec2
Se creo un usuario con permisos de acceso a ec2 con la cual se gestiono cada una de las vpc en las que se encuentran alojando los servidores de nodejs y python correspondientes, perteneciente al gurpo practica1-G13-S3.
El permiso utilizado para este usuario es: AmazonEC2FullAcces
<img src="images/IAM2Imagenes.png">

* Usuario AmazonLexFullAccess
Se realizacio la creacion deun usuario con permisos para amazonlex  el cual tiene la funcionalidad poder dar conexion a los servicio del chatbot.
El permiso utilizado para este usuario es: AmazonLexFullAccess
<img src="images/amazonlex.png'>


# Bucket S3

<img src="images/bucketImagenes.png">

# EC2
* Instancia utilizada para montaje del servidor de nodejs.
<img src="images/ec2nodejs.png">
* Instancia utilizada para montaje del servidor de python.
<img src="images/ec2python.png">

# RDS
Se creo un usuario con permisos de acceso a la base de datos relacional utilizando la base de datos de SQLserver, perteneciente al gurpo practica1-G13-S3.
El permiso utilizado para este usuario es: AmazonRDSFullAccess
<img src="images/rdsImagenes.png">
<img src="images/ER.png">

# Aplicacion Web

* Login
    <img src="images/login.png">
* Login camara
    <imag src="images/">
* Registro
    <img src="images/registro.png">
* Pantalla Inicio
    <img src="images/inicio.png">
* Editar Perfil
    <img src="images/editarPerfil.png">
* Subir Foto
    <img src="images/subirFoto.png">
* Ver Fotos
    <img src="images/verFotos.png">
* Extrer texto y Traduccir
    <img src="images/">
* Chatbot
    <img src="images">
