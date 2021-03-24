import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Modal,
  Button,
} from "react-bootstrap";

const Header = () => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Give Me Advice</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link onClick={handleShow}>About Me</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>About Me</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Hi! I'm{" "}
          <a
            href="https://github.com/sandippakhanna"
            target="_blank"
            rel="noreferrer"
          >
            Sandip Sadhukhan
          </a>
          , a Computer enthusiastic guy who loves to create projects and solve
          real-world problems. I create this project to share advice among the
          peoples.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
