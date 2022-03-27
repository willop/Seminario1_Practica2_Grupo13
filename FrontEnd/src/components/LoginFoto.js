import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap'
import "../Style/Loginfoto.css"
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import Webcam from "react-webcam";
import React, { useState, useRef } from 'react'

export default function LoginFoto() {

  const [deviceId, setDeviceId] = React.useState({});
  const [devices, setDevices] = React.useState([]);
  const [dispositivo, setDisositivo] = useState("");
  const [datos, setDatos] = useState({
    username: '',
    password: ''
  })
  const [imagenmostrar, setimg] = useState("https://cdn.pixabay.com/photo/2015/02/09/20/03/koala-630117__340.jpg")
  const [show, setShow] = useState(true);
  const webRef = useRef(null);
  const handleDevices = React.useCallback(
    mediaDevices =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  React.useEffect(
    () => {
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
    },
    [handleDevices]
  );

  function handleClick(key) {
    setDisositivo(key)
  }

  const handleuserchange = (evt) => {
    const value = evt.target.value;
    setDatos({
      ...datos,
      [evt.target.name]: value
    });
  }

  const Foto = () => {
    //console.log(webRef.current.getScreenshot())
    setimg(webRef.current.getScreenshot())
    datos.password = webRef.current.getScreenshot().slice(23)  // para quitar el base64 .slice(23)
    console.log("despues del slice "+datos.password)
    setShow(!show)
  }

  const enviarDatos = async (event) => {
    console.log(datos.password)
    console.log(datos)
    try {
        let configuracion = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        }
        let respuesta = await fetch('http://18.208.114.136:5000/EntrarCamara', configuracion)
        let json = await respuesta.json();
        console.log('valor de la respuesta json')
        console.log(json)
        let resp = json.response
        if(resp != ""){
          //si es true redirect
          const cookies = new Cookies();
          cookies.set('cookieusername',datos.username,{path:'/'});
          window.location.href = "/home";
        }
        else{
          await Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: 'Usuario o foto incorrecta',
            button: "Aceptar"
          })
        }
        //validacion si es true  o false
        //realizar la redireccion de pagina
    } catch (error) {
    }
  }


  return (
    <div>
      <center>
        <div id="botones">
          {devices.map((devices, key) => (
            <Button key={key} variant="primary" onClick={() => handleClick(key)}>
              {devices.label}
            </Button>
          ))}
        </div>
      </center>
      <br />
      <br />
      <br />
      <br />

      {show ? (
        <div id="video-stream" visible="false">
          <Webcam
            ref={webRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={devices[dispositivo]}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50px',
            }}
          />
          <center>
            <Button variant="danger" onClick={Foto}>
              Click
            </Button>
          </center>
        </div>) : (
        <div id="screen">
          <img src={imagenmostrar} />
          <br />
          <br />
          <br />
          <Form>
            <Form.Group className="mb-2" >
              <h3>Username</h3>
              <Form.Control type="user" name="username" onChange={handleuserchange} placeholder="Ingese username" />
            </Form.Group>
          </Form>
          <Button id="ingresar" variant="success" onClick={enviarDatos} >
            Ingresar
          </Button>
        </div>)}
      <center>
        <br />
        <br />
        <Button id="reg_log" variant="danger" href="/" >
          Login
        </Button>
      </center>
    </div>
  )
}
