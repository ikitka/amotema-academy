import React, { useState, useEffect, useRef } from 'react';
import { ModalContext } from '../contexts/ModalContext';


import { ModalStyled } from './ModalContainer.style';



const ModalContainer = () => {

  const { isModalOpen } = useContext(ModalContext);

  useEffect(() => {
    if (isModalOpen) {
      const body = document.body;
      body.style.overflow = 'hidden';
    }
    return () => {
      const body = document.body;
      body.style.overflow = 'visible';
    };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <>
      
        <ModalStyled>
          
        </ModalStyled>

    </>
  );
};

export default ModalContainer;

