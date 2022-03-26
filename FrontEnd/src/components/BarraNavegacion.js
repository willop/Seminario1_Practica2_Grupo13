import React from 'react'
import "../Style/Navbar.css"
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import Cookies from 'universal-cookie'
import { HiAnnotation } from "react-icons/hi";

export default function BarraNavegacion(props) {

  function cerrarsecion() {
    const cookies = new Cookies();
    cookies.remove('cookieusername')
    cookies.remove('cookiepassword')
    cookies.remove('cookienombre')
    cookies.remove('cookieimg')
    window.location.href = "/";
  }


  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">FAUNADEX</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Navbar.Brand href="/editarperfil">Editar</Navbar.Brand>
              <Navbar.Brand href="/home">{props.name}</Navbar.Brand>
            </Nav> 
            <Nav className="justify-content-end">
              <Navbar.Brand href="/chat" className="icono"><HiAnnotation href="/Chat"/></Navbar.Brand>
              <Nav.Link onClick={cerrarsecion}>Cerrar sesion</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
