import React, { useState, useEffect } from 'react'
import { Form, Button, Dropdown } from 'react-bootstrap'
import BarraNavegacion from '../components/BarraNavegacion'
import Cookies from 'universal-cookie'
import AlbumFotos from '../components/album/AlbumFotos'
import '../Style/TraducirDecripcion.css'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function TraducirDescripcion() {
    const cookies = new Cookies();
    const [imagenmostrar, setimg] = useState("https://cdn.pixabay.com/photo/2015/02/09/20/03/koala-630117__340.jpg")
    const [estadopag, setestadopag] = useState(false)
    const [desc, setdesc] = useState("Descripcion provicional esta es una jalmsdflasd fals dfasmdfmlkasdmklfklmadfkljadsf asdj ad fdaj ladljkrovicional esta es una jalmsdflasd fals dfasmdfmlkasdmklfklmadfkljadsf asdj ad fdaj ladljkrovicional esta es una jalmsdflasd fals dfasmdfmlkasdmklfklmadfkljadsf asdj ad fdaj ladljk")
    const [idioma, setidioma] = useState("Idioma")
    const [textotraducido, settextrad] = useState("")
    const [username, setusername] = useState(cookies.get('cookieusername'))
    const [idimg, setidimg] = useState(cookies.get('cookieidimage'))
    const [enviar, setenviar] = useState({
        username: username,
        idfoto: idimg
    })

    const [enviar2, setenviar2] = useState({
        idioma: idioma,
        texto: desc
    })

    /*--------------------------------------------------------------------------
                                    CARGA INICIAL 
    ----------------------------------------------------------------------------*/
    const InicioDatos = async (event) => {
        console.log(enviar)
        try {
            let configuracion = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(enviar)
            }
            //let respuesta = await fetch('http://balanceadorpractica1-723187498.us-east-2.elb.amazonaws.com:5000/verfotos', configuracion)
            let respuesta = await fetch('http://18.208.114.136:5000/DetalleFoto', configuracion)
            let json = await respuesta.json();
            console.log('valor de la respuesta json')
            console.log(json)
            //console.log("mostrando el vector de respuesta:\n", json)
            setimg("data:image/png;base64, " + json.foto)
            setdesc(json.descripcion)
            //console.log("Mostrando los albumes almacenados",controlabum)
        } catch (error) {
        }
    }

    useEffect(function () {
        //console.log("Hola al iniciar la app")
        if (estadopag == false) {
            InicioDatos()
            setestadopag(true)
        }
        else {
            setestadopag(true)
        }
    })

    /*--------------------------------------------------------------------------
                                    Enviar a traducir
    ----------------------------------------------------------------------------*/
    const Traducirtexto = async (event) => {
        enviar2.texto = desc
        console.log(enviar2)
        try {
            let configuracion = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(enviar2)
            }
            //let respuesta = await fetch('http://balanceadorpractica1-723187498.us-east-2.elb.amazonaws.com:5000/verfotos', configuracion)
            let respuesta = await fetch('http://18.208.114.136:5000/Traducir', configuracion)
            let json = await respuesta.json();
            console.log('valor de la respuesta json')
            console.log(json)
            //console.log("mostrando el vector de respuesta:\n", json)
            settextrad(json.traduccion)
            //console.log("Mostrando los albumes almacenados",controlabum)
        } catch (error) {
        }
    }


    const handlenamechange = (e) => {
        //console.log(e.target.name)
        setidioma(e.target.name)
        enviar2.idioma = e.target.name
    }

    return (
        <div>
            <BarraNavegacion name={username} />

            <br />
            <br />
            <div id="id_bodyHome">
                <div id="id_fotooo">

                    <br />
                    <br />
                    <img id="foto_id" src={imagenmostrar} />
                    <div id="dec_fotooo">
                    <Form>
                        <fieldset disabled>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Descripcion</Form.Label>
                                <Form.Control as="textarea" value={desc} rows={10} />
                            </Form.Group>
                        </fieldset>
                    </Form>
                    </div>
                </div>
                <Button id="ingresar" variant="warning" onClick={Traducirtexto} >
                    Traducir
                </Button>
            </div>
            <br />
            <br />
            <center>
                <Dropdown className="d-inline mx-2" onClick={handlenamechange} >
                    <Dropdown.Toggle id="dropdown-autoclose-true" >
                        {idioma}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item name="en" >Ingles</Dropdown.Item>
                        <Dropdown.Item name="es">Espaniol </Dropdown.Item>
                        <Dropdown.Item name="fr">Frances</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </center>
            <br />
            <br />
            <br />
            <br />
            <center>
                <div id="TextoTraducido">
                    <Form>
                        <fieldset disabled>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label><h2>Descripcion</h2></Form.Label>
                                <Form.Control as="textarea" rows={10} value={textotraducido} />
                            </Form.Group>
                        </fieldset>
                    </Form>
                </div>
            </center>
        </div>
    )
}
