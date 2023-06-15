import React, { useRef, useContext } from 'react'
import { useDrag, useDrop } from 'react-dnd';
import BoardContext from '../Board/context';
import { Container, Label } from './styles';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import api from '../../services/ip';
import { Link, useNavigate } from "react-router-dom";

export default function Card({ data, index, listIndex }) {

  const navigate = useNavigate();
  const ref = useRef();
  const { move } = useContext(BoardContext)

  let memTime = 0;


  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: 'CARD',
      index,
      listIndex

    },

    collect: monitor => (
      {
        isDragging: monitor.isDragging(),
      }
    ),
  })


  async function excluirTarefa(id) {
    var op = window.confirm('Tem certeza que deseja excluir essa tarefa?');
    if (op) {
      const tokenAut = localStorage.getItem('token_tarefa');
      var config = {
        method: 'DELETE',
        url: api.url_base_api + '/tarefa/' + id,
        data: data,
        headers: {
          Authorization: "Bearer " + JSON.parse(tokenAut).token
        }
      };
      try {
        const response = await axios(config);
        if (response.status == 200) {

        }
      } catch (error) {
        // alert('Ops! ocorreu algum erro');
      }
    }
  }

  const [, dropRef] = useDrop({
    // quais tipos de elemento sendo arrastado
    // ele pode aceitar, definido em item: { type: '...' } 
    accept: 'CARD',
    hover(item, monitor) {

      var date = new Date();
      var now = date.getTime();
      if (memTime === 0) memTime = now;

      //console.log(item.index, index)
      const draggedIndex = item.index;
      const targetIndex = index;

      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) return;

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      if ((now - memTime) >= 300 || draggedListIndex === targetListIndex) {

        move(draggedListIndex, targetListIndex, draggedIndex, targetIndex, 'card');
        item.index = targetIndex;
        item.listIndex = targetListIndex;
        memTime = 0;
      }

    }
  })
  dragRef(dropRef(ref))

  return (
    // ref -> Para indicar a API de DnD que esse componente 
    // pode ser arrastado
    <Container isDragging={isDragging} ref={ref} style={{ backgroundColor: 'white' }}>
      <header>
        {data.labels.map(label => <Label key={label} color={label} />)}
        {data.user && <img src={data.user} alt="icon" />}

      </header>
      <p>
        {data.content}<br /><br />
        <Button onClick={() => { excluirTarefa(data.id); window.location.reload() }} variant="primary" size="sm">
          Excluir
        </Button>{' '}
      </p>
    </Container>
  );
}