import "../Style/Chat.css";
import { Form, Button, Container } from 'react-bootstrap'
import { IoIosSend } from "react-icons/io";
import React, { useState } from 'react'
import BarraNavegacion from '../components/BarraNavegacion'
import Cookies from 'universal-cookie'
import Mensaje from "./Comp_msg/Mensaje"

export default function Chat() {
    const cookies = new Cookies();
    const [mensaje, setmensaje] = useState('')
    const [tmp, settemp] = useState('')
    const [mensajeglobal, setmensajeglobal] = useState('')
    var [prueba, setprueba] = useState([
        {
            idp: 1,
            msgp: "Bienvenido!!!!!!"
        }
    ])
    /*const [aux, setaux] = useState({
        idp: 0, //
        msgp:""
    })*/
    const [enviar, setenviar] = useState({
        username: cookies.get('cookieusername'),
        mensaje: '',
    })


    const Enviarmensaje = async (event) => {
        //console.log("valor del mensaje: "+mensaje)
        var p = {
            idp: 0,
            msgp: mensaje
        }
        prueba.push(p)
        //var msg = mensajeglobal + mensaje + "\n"
        //setmensajeglobal(msg) 
        enviar.mensaje = mensaje
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
            //let respuesta = await fetch('http://:5000/home', configuracion)
            let respuesta = await fetch('http://18.208.114.136:5000/Chat', configuracion)
            let json = await respuesta.json();
            console.log('valor de la respuesta json')
            console.log(json)
            let resp = json.respuesta
            var p = {
                idp: 1,
                msgp: resp
            }
            prueba.push(p)
            

        } catch (error) {
        }
        setmensaje("")
        //console.log("la nueva lista es: ", prueba)
    }

    const handleuserchange = (evt) => {
        setmensaje(evt.target.value)
    }

    return (
        <div>
            <BarraNavegacion/>
            <div id="Contenedor">
                <Container id="Contenedor_textos">
                    <div id="Comp_msg">
                        <br />
                        {prueba.map((mensajeee, index) => {
                            return (
                                <div key={index}>
                                    <Mensaje msg={mensajeee.msgp} idd={mensajeee.idp} key={index} />
                                </div>
                            )
                        })}
                    </div>
                </Container>
                <Form>
                    <fieldset >
                        <div id="texto">
                            <Form.Group  >
                                <Form.Control placeholder="Ingrese un mensaje" value={mensaje} id="areatexto" onChange={handleuserchange} />

                                <Button id="btnenviar" variant="warning" onClick={Enviarmensaje} >
                                    <IoIosSend className="icono" />
                                </Button>
                            </Form.Group>
                        </div>
                    </fieldset>
                </Form>
            </div>
        </div>
    )
}