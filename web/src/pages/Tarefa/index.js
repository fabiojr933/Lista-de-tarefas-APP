import React, { useState, useEffect } from 'react';
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
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import api from '../../services/ip';
import moment from 'moment';

const Tarefa = () => {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [aplicativo, setAplicativo] = useState('');
    const [observacao, setObservacao] = useState(null);
    const [appPendentes, setAppPendentes] = useState([]);
    const [appFinalizados, setAppFinalizados] = useState([]);

    useEffect(() => {
        const tokenAut = localStorage.getItem('token_tarefa');
        if (!tokenAut || tokenAut == '' || tokenAut == undefined) {
            navigate("/login");
        }
        ListaAppPendentes();
        ListaAppFinalizados();
    }, []);

    async function aplicativoExcluir(id) {
        if (!id) {
            alert('Selecione um aplicativo');
            return;
        }
        const tokenAut = localStorage.getItem('token_tarefa');
        var config = {
            method: 'DELETE',
            url: api.url_base_api + '/aplicativo/' + id,
            headers: {
                Authorization: "Bearer " + JSON.parse(tokenAut).token
            }
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                ListaAppFinalizados();
                ListaAppPendentes();
            }
        } catch (error) {
            alert('Ops! ocorreu algum erro');
        }
    }

    async function ListaAppPendentes() {
        const tokenAut = localStorage.getItem('token_tarefa');
        var config = {
            method: 'GET',
            url: api.url_base_api + '/aplicativoPendente',
            headers: {
                Authorization: "Bearer " + JSON.parse(tokenAut).token
            }
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                setAppPendentes(response.data)
            }
        } catch (error) {
            alert('Ops! ocorreu algum erro');
        }
    }

    async function ListaAppFinalizados() {
        const tokenAut = localStorage.getItem('token_tarefa');
        var config = {
            method: 'GET',
            url: api.url_base_api + '/aplicativoFinalizado',
            headers: {
                Authorization: "Bearer " + JSON.parse(tokenAut).token
            }
        };
        try {
            const response = await axios(config);
            if (response.status == 200) {
                setAppFinalizados(response.data)
            }
        } catch (error) {
            alert('Ops! ocorreu algum erro');
        }
    }



    async function handleAdd() {
        if (aplicativo == '' || aplicativo == undefined || !aplicativo) {
            alert("Preencha todos os campos");
            return;
        }
        var data = {
            'descricao': aplicativo,
            'observacao': observacao
        }

        const tokenAut = localStorage.getItem('token_tarefa');

        var config = {
            method: 'POST',
            url: api.url_base_api + '/aplicativo',
            data: data,
            headers: {
                Authorization: "Bearer " + JSON.parse(tokenAut).token
            }
        };
        try {
            const response = await axios(config);
            if (response.status == 201) {
                console.log(response)
                ListaAppFinalizados();
                ListaAppPendentes();
                navigate("/tarefa");
                setShow(false)
            } else {
                alert('Ops! ocorreu algum erro');
                return
            }
        } catch (error) {
            alert('Ops! ocorreu algum erro');
        }
    }

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
                                    {appPendentes.map((item) => (
                                        <Col xs lg="3" style={{ marginBottom: 20 }} key={item.id}>
                                            <Card >
                                                <Card.Header>Em andamento</Card.Header>
                                                <Card.Body>
                                                    <Card.Title>{item.descricao}</Card.Title>
                                                    <Card.Text>
                                                        {item.observacao}<br /><br />
                                                        <Form.Text>
                                                            Inicio: {moment(item.data).format('L')}
                                                        </Form.Text>
                                                    </Card.Text>
                                                    <Button onClick={() => { navigate('/home/' + item.id) }} variant="primary">Acessar</Button>
                                                    <Button onClick={() => { aplicativoExcluir(item.id) }} variant="danger" style={{ marginLeft: 20 }}>Excluir</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                        </div>
                    </Tab>
                    <Tab eventKey="finalizado" title="Finalizado">
                        <div >
                            <Container>
                                <Row>
                                    {appFinalizados.map((item) => (
                                        <Col xs lg="3" style={{ marginBottom: 20 }} key={item.id}>
                                            <Card>
                                                <Card.Header>Finalizado</Card.Header>
                                                <Card.Body>
                                                    <Card.Title>{item.descricao}</Card.Title>
                                                    <Card.Text>
                                                        {item.observacao} <br /><br />
                                                        <Form.Text>
                                                            Inicio: {moment(item.data).format('L')}
                                                        </Form.Text><br />
                                                        <Form.Text>
                                                            Fim: {moment(item.data_finalizado).format('L')}
                                                        </Form.Text>
                                                    </Card.Text>
                                                    <Button variant="primary">Acessar</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
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
                            onChange={(e) => [setAplicativo(e.target.value)]}
                        />
                        <br />
                        <Form.Control
                            type="text"
                            placeholder="Descrição do aplicativo"
                            onChange={(e) => [setObservacao(e.target.value)]}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Sair
                        </Button>
                        <Button variant="primary" onClick={handleAdd}>
                            Salvar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>

    );
};

export default Tarefa;
