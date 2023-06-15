import React, { useState, useCallback, useEffect } from 'react';
import { produce } from 'immer'
import BoardContext from './context'
import List from '../List'
import { Container } from './styles';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from "react-router-dom";
import axios from 'axios';
import api from '../../services/ip';
import { useNavigate } from "react-router-dom";


export default function Board(props) {

  const navigate = useNavigate();
  const { id_aplicativo } = useParams();

  const [lists, setLists] = useState([]);
  const [isMovingCard, setIsMovingCard] = useState(false)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showFinalizado, setShowFinalizado] = useState(false);
  const handleCloseFinalizado = () => setShowFinalizado(false);
  const handleShowFinalizado = () => setShowFinalizado(true);
  const [tarefa, setTarefa] = useState('');
  const [github, setGithub] = useState('');
  const [observacao, setObservacao] = useState('');


  const [idAplicativo, setIdAplicativo] = useState(null);

  useEffect(() => {
    setIdAplicativo(id_aplicativo);
    carregarTarefas();
  }, []);

  async function finalizarTarefa() {
    var op = window.confirm("Tem certeza que deseja finalizar esse Aplicativo");
    if (op) {
      const tokenAut = localStorage.getItem('token_tarefa');
      var data = {
        'observacao': observacao,
        'github': github
      }
      var config = {
        method: 'PUT',
        url: api.url_base_api + `/aplicativo/${Number(id_aplicativo)}`,
        data: data,
        headers: {
          Authorization: "Bearer " + JSON.parse(tokenAut).token
        }
      };
      try {
        const response = await axios(config);
        if (response.status == 200) {
          navigate('/Tarefa');
        }
      } catch (error) {
        alert('Ops! ocorreu algum erro');
      }
    }
  }


  async function carregarTarefas() {
    console.log(id_aplicativo)
    const tokenAut = localStorage.getItem('token_tarefa');
    var config = {
      method: 'GET',
      url: api.url_base_api + `/tarefa/${Number(id_aplicativo)}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(tokenAut).token
      }
    };
    try {
      const response = await axios(config);
      if (response.status == 200) {
        setLists(response.data)
      }
    } catch (error) {
      alert('Ops! ocorreu algum erro');
    }
  }

  async function salvarTarefa() {
    if (!tarefa) {
      alert('Descrição da tarefa é obrigatorio');
      return;
    }
    if (!idAplicativo || idAplicativo == '' || idAplicativo == undefined) {
      alert('ID aplicativo é obrigatorio');
      return;
    }
    const tokenAut = localStorage.getItem('token_tarefa');
    var dados = { 'descricao': tarefa, 'id_aplicativo': idAplicativo }
    var config = {
      method: 'POST',
      url: api.url_base_api + '/tarefa',
      data: dados,
      headers: {
        Authorization: "Bearer " + JSON.parse(tokenAut).token
      }
    };
    try {
      const response = await axios(config);
      if (response.status == 201) {
        setShow(false);
        carregarTarefas();
      }
    } catch (error) {
      alert('Ops! ocorreu algum erro');
    }
  }

  const handleDrop = useCallback(
    (index, item) => {
      if (!isMovingCard) {
        setLists(produce(lists, draft => {
          const dragged = draft[item.listIndex].cards[item.index]
          draft[item.listIndex].cards.splice(item.index, 1)
          draft[index].cards.push(dragged)
        }))
      }
      else {
        setIsMovingCard(false)
      }
    },

  )

  function move(fromList, toList, from, to) {

    setLists(produce(lists, draft => {

      const dragged = draft[fromList].cards[from]

      setIsMovingCard(true);
      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged)

    }))

  }


  return (
    <>
      <BoardContext.Provider value={{ lists, move }}>
        <Button onClick={handleShow} style={{ marginLeft: 25, marginTop: 25 }} variant="primary">Nova Tarefa</Button>
        <Button onClick={handleShowFinalizado} style={{ marginLeft: 25, marginTop: 25 }} variant="primary">Finalizar</Button>
        <Container>
          {lists.map((list, index) => <List index={index} accepts={['CARD']} onDrop={item => handleDrop(index, item)} key={list.title} data={list} />)}

        </Container>
      </BoardContext.Provider>

      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cadastro de Tarefa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              type="text"
              placeholder="Digite o nome da tarefa"
              onChange={(e) => [setTarefa(e.target.value)]}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Sair
            </Button>
            <Button variant="primary" onClick={() => { salvarTarefa() }}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div>
        <Modal show={showFinalizado} onHide={handleCloseFinalizado}>
          <Modal.Header closeButton>
            <Modal.Title>Finalizar Tarefa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              type="text"
              placeholder="Observação"
              onChange={(e) => [setObservacao(e.target.value)]}
            /><br />
            <Form.Control
              type="text"
              placeholder="GitHub"
              onChange={(e) => [setGithub(e.target.value)]}
            /><br />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseFinalizado}>
              Sair
            </Button>
            <Button variant="primary" onClick={finalizarTarefa}>
              Finalizar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}