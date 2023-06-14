import React, { useState, useEffect } from 'react';
import { DropTarget } from 'react-dnd';
import { MdAdd } from 'react-icons/md';
import Card from '../Card';
import { Container } from './styles';
import { useParams } from "react-router-dom";

function List({ data, index: listIndex, connectDropTarget }) {

  const { id_aplicativo } = useParams();
  const [idAplicativo, setIdAplicativo] = useState(null);

  async function utualizaTarefa(index, card_id, listIndex, card) {
    console.log(index)
    console.log(card_id)
    console.log(listIndex) // é o principal
    console.log(card)
  }

  useEffect(() => {
    setIdAplicativo(id_aplicativo);
  }, []);

  return connectDropTarget(
    <div style={{ flexGrow: 0, flexShrink: 0, flexBasis: 320}}>  
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
                  {utualizaTarefa(index, card.id, listIndex, card)}
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