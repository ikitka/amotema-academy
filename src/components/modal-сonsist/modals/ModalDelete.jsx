// src/ModalDelete.js
import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;

const Buttons = styled.div`
  margin-top: 20px;

  button {
    margin: 0 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: white;
    font-size: 16px;

    &:first-of-type {
      background: #60c263;
      width: 100px;
    }

    &:last-of-type {
      background: #c9645d;
      width: 100px;
    }
  }
`;

const ModalDelete = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <Content>
        <h2>Вы уверены, что хотите удалить?</h2>
        <Buttons>
          <button onClick={onConfirm}>Да</button>
          <button onClick={onClose}>Нет</button>
        </Buttons>
      </Content>
    </Overlay>
  );
};

export default ModalDelete;
