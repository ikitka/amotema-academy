
import React from 'react'
import { ModalContext } from './contexts/ModalContext';
import { B_Button, B_Title } from './App.style';


const App = () => {

  const { openModal } = useContext(ModalContext);
  
  return (
    <>

      <B_Button onClick={openModal}>
        <B_Title> База знаний </B_Title>
      </B_Button>

      <Modal />

    </>
  );
};

export default App;
