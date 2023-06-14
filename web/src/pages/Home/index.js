import React from 'react';
import { useNavigate } from "react-router-dom";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from '../../components/Board';
import useAuth from "../../hooks/useAuth";
import Header from '../../components/Header';


const Home = () => {
 
  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <Board />
    </DndProvider>
  );
};

export default Home;
