import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { ModalContext } from '../../contexts/ModalContext';
import api from '../../api/api';

// Styled components
const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 5px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #EDF0F3;
  }
`;

const IconContainer = styled.div`
  margin-right: 10px;
  font-size: 24px;
  color: #6260c7;
`;

const Text = styled.div`
  flex: 1;
  font-size: 14px;
  color: #000;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;


const MenuArticleButton = ({ name, id }) => {

  const { selectedArticle, setSelectedArticle, setActiveSection } = useContext(ModalContext);

  const handleClick = async () => {
    const resArticle = await api.getArticle(id);
    setSelectedArticle(resArticle);
    console.log(resArticle);
    setActiveSection('article');
  }

  return (
    <Container onClick={handleClick} style={selectedArticle && selectedArticle.id === id ? { backgroundColor: '#dfe2e6' } : {}}>
      <IconContainer></IconContainer>
      <Text>{name}</Text>
    </Container>
  );
};

export default MenuArticleButton;