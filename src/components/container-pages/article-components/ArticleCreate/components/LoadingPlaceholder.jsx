import React from 'react';
import styled from 'styled-components';
import ContentPlaceholder from '../../../../../ui/ContentPlaceholder/ContentPlaceholder';

const LoadingPlaceholder = () => {
  return (
    <ContainerStyled>
      <TopContainer>
        <ContentPlaceholder type="menu-item" />
        <ButtonGroup>
          <ContentPlaceholder type="menu-item" />
        </ButtonGroup>
      </TopContainer>

      <MiddleContainer>
        <ContentPlaceholder type="menu-item" />
        <ContentPlaceholder type="menu-item" />
        <ContentPlaceholder type="menu-item" />
      </MiddleContainer>

      <BottomContainer>
        <LeftContainer>
          <ContentPlaceholder type="menu-item" />
          <ContentPlaceholder type="menu-item" />
          <ContentPlaceholder type="menu-item" />
        </LeftContainer>
        <RightContainer>
          <ContentPlaceholder type="menu-item" />
          <ContentPlaceholder type="menu-item" />
          <ContentPlaceholder type="menu-item" />
        </RightContainer>
      </BottomContainer>
    </ContainerStyled>
  );
};

export default LoadingPlaceholder;

const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const TopContainer = styled.div`
  display: block;
  margin-bottom: 5px;
`;

const ButtonGroup = styled.div`
  display: inline-flex;
  flex-shrink: 0;
`;

const MiddleContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  gap: 5px;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  height: 100%;
`;

const LeftContainer = styled.div`
  flex: 1;
  padding: 10px;
  height: 100%;
  border-right: 1px solid #ccc;
`;

const RightContainer = styled.div`
  flex: 1;
  padding: 10px;
  height: 100%;
`;
