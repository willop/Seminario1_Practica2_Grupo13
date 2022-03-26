import { Form, Button} from 'react-bootstrap'
import BarraNavegacion from '../components/BarraNavegacion'
import '../Style/SubirFoto.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AlbumComponent from './album/AlbumComponent'
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2'
import React, { useState, useEffect } from 'react'

export default function ExtraerTexto() {

    //constantes
    const [img, setimg] = useState()
    const [enviar, setenviar] = useState("")
    const [resp, setresp] = useState("Texto extraido")

    const filesSelectedHandler = async (event) => {
        ////console.log(event.target.files[0]);
        const filefoto = event.target.files[0];
        const base64 = await convertobase64(filefoto);
        var tipo = filefoto.name.slice( ( (filefoto.name.lastIndexOf(".") - 1) + 2) ) 
        var newbase64=base64
        if (tipo === "jpg"){
            newbase64 = base64.slice(23)
        }else{
            newbase64 = base64.slice(22)
        }

        //newbase64 = base64.slice()
        console.log(newbase64)
        //enviar.foto = newbase64;
        //console.log(enviar)
        setimg(URL.createObjectURL(event.target.files[0]))
        setenviar(newbase64)
    }

    const convertobase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result)
            };

            fileReader.onerror = (error) => {
                reject(error);
            }
        });
    }

    const enviarDatos = async (event) => {
        console.log(JSON.stringify({foto:enviar}))
        try {
            let configuracion = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({img:enviar})
            }
            //let respuesta = await fetch('http://balanceadorpractica1-723187498.us-east-2.elb.amazonaws.com:5000/cargarfoto', configuracion)
            let respuesta = await fetch('http://localhost:5000/ExtraerTexto', configuracion)
            let json = await respuesta.json();
            //console.log('valor de la respuesta json')
            //console.log(json)
            if (json.texto === "") {
                await Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'Error al subir una nuevo foto',
                    button: "Aceptar"
                })
                window.location.href = "/home";
            }
            else {
                await Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Foto subida exitosamente',
                    button: "Aceptar"
                })
                setresp(json.texto)
                //window.location.href = "/home";
            }
            //validacion si es true o false
            //realizar la redireccion de pagina
        } catch (error) {
        }
    }

    return (
        <div>
            <BarraNavegacion />
            <div id="id_contenedor">
                <center>
                    <img src={img} id="imagen" />
                    <br />
                    <br />
                    <Form.Group className="mb-3">
                        <center><h4>Agregar foto</h4></center>
                        <Form.Control type="file" onChange={filesSelectedHandler} name="foto" multiple />
                    </Form.Group>
                    <br />
                        <h1>{resp}</h1>
                    <br />
                    <br />
                    <Button variant="success" onClick={enviarDatos} >Obtener texto</Button>
                </center>
            </div>
        </div>
    )
}
