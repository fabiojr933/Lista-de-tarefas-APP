import React, { useState } from 'react';
import Header from '../../components/Header';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Tarefa = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Header />

            <div style={{ width: '100%', padding: 50, marginRight: 20 }}>
                <div style={{ marginBottom: 25 }}>
                    <Button onClick={handleShow} variant="primary">Novo Aplicativo</Button>
                </div>
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="home" title="Em andamento">
                        <div>
                            <Container>
                                <Row>
                                    <Col xs lg="3" style={{ marginBottom: 20}}>
                                        <Card>
                                            <Card.Header>Em andamento</Card.Header>
                                            <Card.Body>
                                                <Card.Title>Special title treatment</Card.Title>
                                                <Card.Text>
                                                    With supporting text below as a natural lead-in to additional content.
                                                </Card.Text>
                                                <Button variant="primary">Acessar</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xs lg="3" style={{ marginBottom: 20}}>
                                        <Card>
                                            <Card.Header>Em andamento</Card.Header>
                                            <Card.Body>
                                                <Card.Title>Special title treatment</Card.Title>
                                                <Card.Text>
                                                    With supporting text below as a natural lead-in to additional content.
                                                </Card.Text>
                                                <Button variant="primary">Acessar</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                </Row>
                            </Container>
                        </div>
                    </Tab>
                    <Tab eventKey="finalizado" title="Finalizado">                        
                        <div >
                            <Container>
                                <Row>
                                    <Col xs lg="3" style={{ marginBottom: 20}}>
                                        <Card>
                                            <Card.Header>Finalizado</Card.Header>
                                            <Card.Body>
                                                <Card.Title>Special title treatment</Card.Title>
                                                <Card.Text>
                                                    With supporting text below as a natural lead-in to additional content.
                                                </Card.Text>
                                                <Button variant="primary">Acessar</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col> 
                                    <Col xs lg="3" style={{ marginBottom: 20}}>
                                        <Card>
                                            <Card.Header>Finalizado</Card.Header>
                                            <Card.Body>
                                                <Card.Title>Special title treatment</Card.Title>
                                                <Card.Text>
                                                    With supporting text below as a natural lead-in to additional content.
                                                </Card.Text>
                                                <Button variant="primary">Acessar</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xs lg="3" style={{ marginBottom: 20}}>
                                        <Card>
                                            <Card.Header>Finalizado</Card.Header>
                                            <Card.Body>
                                                <Card.Title>Special title treatment</Card.Title>
                                                <Card.Text>
                                                    With supporting text below as a natural lead-in to additional content.
                                                </Card.Text>
                                                <Button variant="primary">Acessar</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xs lg="3" style={{ marginBottom: 20}}>
                                        <Card>
                                            <Card.Header>Finalizado</Card.Header>
                                            <Card.Body>
                                                <Card.Title>Special title treatment</Card.Title>
                                                <Card.Text>
                                                    With supporting text below as a natural lead-in to additional content.
                                                </Card.Text>
                                                <Button variant="primary">Acessar</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xs lg="3" style={{ marginBottom: 20}}>
                                        <Card>
                                            <Card.Header>Finalizado</Card.Header>
                                            <Card.Body>
                                                <Card.Title>Special title treatment</Card.Title>
                                                <Card.Text>
                                                    With supporting text below as a natural lead-in to additional content.
                                                </Card.Text>
                                                <Button variant="primary">Acessar</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xs lg="3" style={{ marginBottom: 20}}>
                                        <Card>
                                            <Card.Header>Finalizado</Card.Header>
                                            <Card.Body>
                                                <Card.Title>Special title treatment</Card.Title>
                                                <Card.Text>
                                                    With supporting text below as a natural lead-in to additional content.
                                                </Card.Text>
                                                <Button variant="primary">Acessar</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                </Row>
                            </Container>
                        </div>
                    </Tab>
                </Tabs>
            </div>
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastro de Aplicativo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control
                            type="text"
                            placeholder="Digite o nome de aplicativo"                          
                        />
                        <br/>
                         <Form.Control
                            type="text"
                            placeholder="Descrição do aplicativo"                           
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Sair
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Salvar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>

    );
};

export default Tarefa;
