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
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  padding: 25px;
  box-sizing: border-box;
  border-bottom: 1px solid #E4E7ED;
`;
