import React from 'react';
import styled from 'styled-components';

const ModalHeader = () => {
  
  
  return (
    <HeaderStyled>
      <h2 style={{ fontSize: '27px'}}>База знаний</h2>
    </HeaderStyled>
  );
};

export default ModalHeader;




// Styles
const HeaderStyled = styled.div`

  margin: -15px;

  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  padding: 15px;
  padding-left: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #E4E7ED;

  user-select: none; /* Для современных браузеров */
  -webkit-user-select: none; /* Для Safari */
  -moz-user-select: none; /* Для Firefox */
  -ms-user-select: none; /* Для старых версий IE и Edge */
`;
