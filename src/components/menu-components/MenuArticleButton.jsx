import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../contexts/ModalContext';
import api from '../../api/api';

const MenuArticleButton = ({ name, id, level, hasChildren, isExpanded, onToggleExpand }) => {
  const { selectedArticle, setSelectedArticle, setActiveSection } = useContext(ModalContext);
  const [isButtonVisible, setButtonVisible] = useState(false);


  const handleClick = async () => {
    const resArticle = await api.getArticle(id);
    setSelectedArticle(resArticle);
    setActiveSection('article');
  };

  const handleContainerMouseEnter = () => {
    setButtonVisible(true);
  };

  const handleContainerMouseLeave = () => {
    setButtonVisible(false);
  };
  

  return (
    <Container
      onMouseEnter={handleContainerMouseEnter}
      onMouseLeave={handleContainerMouseLeave}
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
        if (hasChildren) {
          onToggleExpand();
        }
      }}
      style={{ marginLeft: `${level * 20}px` }}
      isSelected={selectedArticle && selectedArticle.id === id}
    >
      <IconContainer style={{ color: hasChildren ? '#000000' : '#5e5e5e' }}>{hasChildren ? (isExpanded ? '=' : '>') : '•'}</IconContainer>
      <Text style={{ color: hasChildren ? '#000000' : '#5e5e5e' }}>{name}</Text>
      <Button visible={isButtonVisible} onClick={(e) => e.stopPropagation()}>+</Button>
    </Container>
  );
};

export default MenuArticleButton;






// Styles
const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${props => props.isSelected ? '#dfe2e6' : '#ffffff'};

  user-select: none; /* Для современных браузеров */
  -webkit-user-select: none; /* Для Safari */
  -moz-user-select: none; /* Для Firefox */
  -ms-user-select: none; /* Для старых версий IE и Edge */

  &:hover {
    background-color: ${props => props.isSelected ? '#dfe2e6' : '#EDF0F3'};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const IconContainer = styled.div`
  margin-right: 7px;
  margin-left: 7px;
  font-weight: bold;
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
