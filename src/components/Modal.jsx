import React, { useState, useEffect, useContext } from 'react';
import { ModalContext } from '../contexts/ModalContext';


import { ModalStyled, ContainerBind } from './Modal.style';


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

