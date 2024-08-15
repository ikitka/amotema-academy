import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../contexts/ModalContext';
import api from '../../api/api';
import ContextMenu from '../../ui/ContextMenu/ContextMenu';

const MenuButtonArticle = ({ name, id, level, hasChildren, isExpanded, onToggleExpand, canEdit }) => {
  const { selectedArticle, setSelectedArticle, setActiveContainer, setArticleNewParent } = useContext(ModalContext);
  const [isButtonVisible, setButtonVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  const handleClick = async () => {
    const resArticle = await api.getArticle(id);
    setSelectedArticle(resArticle);
    setActiveContainer('show-article');
  };

  const handleContainerMouseEnter = () => {
    setButtonVisible(true);
  };

  const handleContainerMouseLeave = () => {
    setButtonVisible(false);
  };

  const handleClickAdditional = async (e) => {
    e.stopPropagation();
    setArticleNewParent({name: name, id: id});
    setActiveContainer('create-article');
  };

  const handleContextMenu = (event) => {
    event.preventDefault();

    setMenuItems([
      { label: 'Создать подстатью', onClick: () => console.log('Underarticle clicked') },
      { label: 'Редактировать', onClick: () => console.log('Edit clicked') },
      { label: 'Удалить', onClick: () => console.log('Delete clicked') },
    ]);

    setMenuPosition({ x: event.pageX - 65, y: event.pageY });
  };

  const handleCloseMenu = () => {
    setMenuPosition(null);
  };

  return (
    <div>
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
        onContextMenu={handleContextMenu} // Добавляем обработчик события правого клика
        style={{ marginLeft: `${level * 20}px` }}
        isSelected={selectedArticle && selectedArticle.id === id}
      >
        <IconContainer style={{ color: hasChildren ? '#000000' : '#5e5e5e' }}>{hasChildren ? (isExpanded ? '=' : '>') : '•'}</IconContainer>
        <Text style={{ color: hasChildren ? '#000000' : '#5e5e5e' }}>{name}</Text>
        {canEdit && (
          <Button visible={isButtonVisible} onClick={handleClickAdditional}>+</Button>
        )}
      </Container>
      {menuPosition && (
        <ContextMenu
          items={menuItems}
          position={menuPosition}
          onClose={handleCloseMenu}
        />
      )}
    </div>
  );
};

export default MenuButtonArticle;

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
    background-color: #c6c9ca;
  }
`;
