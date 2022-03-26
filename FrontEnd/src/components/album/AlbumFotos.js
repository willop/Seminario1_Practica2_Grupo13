import React from 'react'
import Cookies from 'universal-cookie'
import { Form, Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const AlbumFotos = (props) => {
    
    const cookies = new Cookies();
    const val = props.keyy
    function clickimagen(valor){
        alert("Se hizo click en id: "+val )
        cookies.set('cookieidimage',val,{path:'/'});
        window.location.href = "/TraducirDescripcion";
      }

    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={"data:image/png;base64, "+props.imagen} height="360px" onClick={()=>clickimagen(props.keyy)} />
            </Card>
        </div>
    )
}

export default AlbumFotos