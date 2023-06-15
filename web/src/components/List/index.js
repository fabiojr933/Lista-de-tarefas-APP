import React, { useState, useEffect } from 'react';
import { DropTarget } from 'react-dnd';
import { MdAdd } from 'react-icons/md';
import Card from '../Card';
import { Container } from './styles';
import { useParams } from "react-router-dom";
import axios from 'axios';
import api from '../../services/ip';


function List({ data, index: listIndex, connectDropTarget }) {

  const { id_aplicativo } = useParams();
  const [idAplicativo, setIdAplicativo] = useState(null);

  async function atualizaTarefa(index, card_id, listIndex, card) {
    if (listIndex === 0) {
      // Backlog
      var data = {
        "backlog": "S",
        "andamento": "",
        "revisao_aprovacao": "",
        "deploy": "",
        "arquivado": ""
      }

      const tokenAut = localStorage.getItem('token_tarefa');
      var config = {
        method: 'PUT',
        url: api.url_base_api + '/tarefa/' + card.id,
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
    if (listIndex == 1) {
      // Em andamento
      var data = {
        "backlog": "",
        "andamento": "S",
        "revisao_aprovacao": "",
        "deploy": "",
        "arquivado": ""
      }
      const tokenAut = localStorage.getItem('token_tarefa');
      var config = {
        method: 'PUT',
        url: api.url_base_api + '/tarefa/' + card.id,
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
    if (listIndex == 2) {
      // Revisão/Aprovação
      var data = {
        "backlog": "",
        "andamento": "",
        "revisao_aprovacao": "S",
        "deploy": "",
        "arquivado": ""
      }
      const tokenAut = localStorage.getItem('token_tarefa');
      var config = {
        method: 'PUT',
        url: api.url_base_api + '/tarefa/' + card.id,
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
    if (listIndex == 3) {
      // Deploy
      var data = {
        "backlog": "",
        "andamento": "",
        "revisao_aprovacao": "",
        "deploy": "S",
        "arquivado": ""
      }
      const tokenAut = localStorage.getItem('token_tarefa');
      var config = {
        method: 'PUT',
        url: api.url_base_api + '/tarefa/' + card.id,
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
    if (listIndex == 4) {
      // Arquivado
      var data = {
        "backlog": "",
        "andamento": "",
        "revisao_aprovacao": "",
        "deploy": "",
        "arquivado": "S"
      }
      const tokenAut = localStorage.getItem('token_tarefa');
      var config = {
        method: 'PUT',
        url: api.url_base_api + '/tarefa/' + card.id,
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
    //   console.log(index)
    //   console.log(card_id)
    //   console.log(listIndex) // é o principal
    //   console.log(card)
  }

  useEffect(() => {
    setIdAplicativo(id_aplicativo);
  }, []);

  return connectDropTarget(
    <div style={{ flexGrow: 0, flexShrink: 0, flexBasis: 320 }}>
      <Container done={data.done}>

        <header>
          <h2 >{data.title}</h2>
          <label>{data.cards.length}</label>
          {/*    {data.creatable && (
            <button onClick={handleShow} type="button">
              <MdAdd size={24} color="#FFF" />
            </button>
    )}   */}
        </header>

        <ul >
          {
            data.cards.map(
              (card, index) =>
                <Card
                  index={index}
                  listIndex={listIndex}
                  key={card.id}
                  data={card}>
                  {atualizaTarefa(index, card.id, listIndex, card)}                
                </Card>

            )
          }
        </ul>
      </Container>
    </div>



  );
}

export default DropTarget(
  props => props.accepts,
  {
    drop(props, monitor) {
      props.onDrop(monitor.getItem())
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }),
)(List)