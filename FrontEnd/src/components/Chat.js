import "../Style/Chat.css";
import { Form, Button, Container } from 'react-bootstrap'
import {IoIosSend} from "react-icons/io";
import React, { useState } from 'react'
import Mensaje from "./Comp_msg/Mensaje"

export default function Chat() {
    
    const [mensaje, setmensaje] = useState('')
    const [tmp, settemp]=useState('')
    const [mensajeglobal, setmensajeglobal] = useState('')
    var [prueba,setprueba] =useState([
        {idp: 1,
        msgp:"Bienvenido!!!!!!"}
    ])
    /*const [aux, setaux] = useState({
        idp: 0, //
        msgp:""
    })*/


    const Enviarmensaje = async (event) => {
        //console.log("valor del mensaje: "+mensaje)
        var p = {
            idp: 0,
            msgp: mensaje
        }
        prueba.push(p)
        var msg = mensajeglobal+ mensaje +"\n"
        setmensajeglobal(msg) 
        setmensaje("")
        //console.log("la nueva lista es: ", prueba)
    }

    const handleuserchange = (evt) =>{
        setmensaje(evt.target.value)
    }

    return (
        <div>
            <div id="Contenedor">
                <Container id="Contenedor_textos">
                    <div id="Comp_msg">
                        <br/>
                        {prueba.map((mensajeee,index)=>{
                            return(
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
                               <IoIosSend className="icono"/>                       
                            </Button>
                        </Form.Group>
                        </div>                        
                    </fieldset>
                </Form>
            </div>
        </div>
    )
}