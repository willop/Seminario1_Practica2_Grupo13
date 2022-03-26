import "../Style/Chat.css";
import { Form, Button } from 'react-bootstrap'
import {IoIosSend} from "react-icons/io";
import React, { useState , useEffect} from 'react'

export default function Chat() {
    
    const [mensaje, setmensaje] = useState('')
    const [mensajeglobal, setmensajeglobal] = useState('')


    const Enviarmensaje = async (event) => {
        var msg = mensajeglobal+ mensaje +"\n"
        setmensajeglobal(msg)
    }

    const handleuserchange = (evt) =>{
        setmensaje(evt.target.value)
        
    }

    return (
        <div>
            <div id="Contenedor">
                <Form>
                    <fieldset >
                        <Form.Group className="mb-3" >
                            <Form.Label><h2>Chat</h2></Form.Label>
                            <Form.Control value={mensajeglobal} as="textarea" readOnly  rows={22}  />
                        </Form.Group>
                        <div id="texto">
                        <Form.Group  >
                            <Form.Control placeholder="Ingrese un mensaje" id="areatexto" onChange={handleuserchange} />
                            
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