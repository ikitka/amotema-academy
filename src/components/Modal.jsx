import React, { useState, useEffect, useContext } from 'react';
import { ModalContext } from '../contexts/ModalContext';
import styled from 'styled-components';

import ModalMenu from './modal-сonsist/ModalMenu';
import ModalContainer from './modal-сonsist/ModalContainer';
import ModalHeader from './modal-сonsist/ModalHeader';


const Modal = () => {

  const { isModalOpen } = useContext(ModalContext);

  useEffect(() => {
    const body = document.body;
    if (isModalOpen) {
      body.style.overflow = 'hidden';
    }
    return () => {
      body.style.overflow = 'visible';
    };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <ModalStyled>

      <ModalHeader />
      
      <ContainerBind>
        <ModalMenu />
        <ModalContainer />
      </ContainerBind>
    
    </ModalStyled>
  );
};

export default Modal;




// Styles
const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 65px;
  width: calc(100% - 65px);
  height: 100%;
  background-color: white;
  z-index: 999;
  box-sizing: border-box;
  display: flex;
  font-family: 'Trebuchet MS', Helvetica, sans-serif;
  flex-direction: column;
`;

const ContainerBind = styled.div`
  flex-direction: initial;
  display: flex;
  height: 91%;
`;