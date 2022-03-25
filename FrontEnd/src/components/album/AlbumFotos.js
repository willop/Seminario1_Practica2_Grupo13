import React from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const AlbumFotos = (props) => {
    
    const val = props.keyy
    function clickimagen(valor){
        alert("Se hizo click en id: "+val )
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