import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 10px;
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
  font-size: 15px;
  color: #000;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Button = styled.div`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s ease;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  opacity: ${props => (props.visible ? '0.5' : '0')};
  transition: visibility 0s, opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
    background-color: #DBDEE0;
  }
`;

const MenuButton = ({ name, handleClick, section, id, mode }) => {

  return (
    <Container onClick={() => handleClick(section)} >
      <IconContainer>
        {mode === 'default' && <img src={'https://test-widget-9417.website/prod_projects/gktema/icon-book2.png'} style={{width: '20px', height: '20px'}}/>}
        {mode === 'active' && <img src={'https://test-widget-9417.website/prod_projects/gktema/icon-backward.png'} style={{width: '20px', height: '20px'}}/>}
      </IconContainer>
      <Text>{name}</Text>
    </Container>
  );
};

export default MenuButton;