import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { ModalContext } from '../../contexts/ModalContext';
import api from '../../api/api';



const MenuArticleButton = ({ name, id }) => {

  const { selectedArticle, setSelectedArticle, setActiveSection } = useContext(ModalContext);

  const handleClick = async () => {
    const resArticle = await api.getArticle(id);
    setSelectedArticle(resArticle);
    console.log(resArticle);
    setActiveSection('article');
  }


  const [isButtonVisible, setButtonVisible] = useState(false);

  const handleContainerMouseEnter = () => {
    setButtonVisible(true);
  };

  const handleContainerMouseLeave = () => {
    setButtonVisible(false);
  };

  const handleAddClick = (event) => {
    event.stopPropagation();
    console.log('Button clicked');
  };


  return (
    <Container
      onMouseEnter={handleContainerMouseEnter}
      onMouseLeave={handleContainerMouseLeave}
      onClick={handleClick}
      style={selectedArticle && selectedArticle.id === id ? { backgroundColor: '#dfe2e6' } : {}}
    >
      <IconContainer>•</IconContainer>
      <Text>{name}</Text>
      <Button visible={isButtonVisible} onClick={handleAddClick}>+</Button>
    </Container>
  );
};

export default MenuArticleButton;





// Styles
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

  &:active {
    transform: scale(0.98);
  }
`;

const IconContainer = styled.div`
  margin-right: 7px;
  margin-left: 3px;
`;

const Text = styled.div`
  flex: 1;
  font-size: 14px;
  color: #000;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Button = styled.div`
  padding: 0px 7px;
  margin: -2px -2px -2px -3px;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  transition: background-color 0.3s ease;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  opacity: ${props => (props.visible ? '0.5' : '0')};
  transition: visibility 0s, opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
    background-color: #DBDEE0;
  }
`;