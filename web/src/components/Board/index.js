import React, { useState, useCallback, useEffect } from 'react';
import { produce } from 'immer'
import { loadLists } from '../../services/api'
import BoardContext from './context'
import List from '../List'
import { Container } from './styles';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from "react-router-dom";

const data = loadLists()
export default function Board(props) {
  const { id_aplicativo } = useParams();
  
  const [lists, setLists] = useState(data);
  const [isMovingCard, setIsMovingCard] = useState(false)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showFinalizado, setShowFinalizado] = useState(false);
  const handleCloseFinalizado = () => setShowFinalizado(false);
  const handleShowFinalizado = () => setShowFinalizado(true);


  const [idAplicativo, setIdAplicativo] = useState(null);

  useEffect(() => {
    setIdAplicativo(id_aplicativo);
  }, []);

  console.log(lists)
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
              readOnly
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Sair
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Finalizar
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
              readOnly
            /><br />
            <Form.Control
              type="text"
              placeholder="GitHub"
              readOnly
            /><br />
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Selecione as imagem do projeto</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseFinalizado}>
              Sair
            </Button>
            <Button variant="primary" onClick={handleCloseFinalizado}>
              Finalizar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}