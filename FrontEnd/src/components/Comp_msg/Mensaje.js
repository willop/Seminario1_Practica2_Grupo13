//atajo rafce
import React from 'react'
import { Badge } from 'react-bootstrap'
//import '../../Style/Mensaje.css'
import { FaRobot } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";


const Mensaje = (props) => {

    const estilo ={textAlign:'left'}
    if (props.idd==1){
        ////// ROBOT
        //console.log(props.idd)
        estilo.textAlign = 'left';
        return (
            <div id="msgtotal">
                <div id="mensajeretorno" style={estilo}>
                <h4><FaRobot />       <Badge pill bg="primary">
                    {props.msg}
                </Badge></h4>
                </div>
            </div>
        )
    }else{
        // USUARIO
        //console.log(props.idd)
        estilo.textAlign = 'right';
        return (
            <div id="msgtotal">
                <div id="mensajeretorno" style={estilo}>
                <h4><FaUserCircle />       <Badge pill bg="success">
                    {props.msg}
                </Badge></h4>
                </div>
            </div>
        )
    }
    
}

export default Mensaje