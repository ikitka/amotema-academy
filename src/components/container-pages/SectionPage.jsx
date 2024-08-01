import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { ModalContext } from '../../contexts/ModalContext';
import Home from './Home';


const SectionPage = () => {

  const { selectedSection } = useContext(ModalContext);

  if (!selectedSection) return (
    <Home />
  );

  return (
    <ContainerStyled>
      <ContainerSection>РАЗДЕЛ</ContainerSection>
      <ContainerName>{selectedSection.name}</ContainerName>
      <ContainerText>{selectedSection.description}</ContainerText>
    </ContainerStyled>
  )
};

export default SectionPage;




// Styles
const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const ContainerSection = styled.div`
  font-size: 37px;
  width: 800px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ContainerName = styled.div`
  font-size: 27px;
  width: 800px;
`;

const ContainerText = styled.div`
  width: 800px;
  margin-top: 40px;
  font-size: 16px;
`;