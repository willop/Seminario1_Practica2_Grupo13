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
        const newbase64 = base64.slice(23)
        ////console.log(base64)
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
                    <Button variant="success" >Obtener texto</Button>
                </center>
            </div>
        </div>
    )
}
