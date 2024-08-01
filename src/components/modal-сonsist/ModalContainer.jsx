import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../contexts/ModalContext';

import SectionPage from '../container-pages/SectionPage';
import ArticlePage from '../container-pages/ArticlePage';
import SectionCreate from '../container-pages/section-components/SectionCreate';
import ArticleCreate from '../container-pages/article-components/ArticleCreate';
import Home from '../container-pages/Home';



const ModalContainer = () => {

  const { activeSection, setActiveSection } = useContext(ModalContext);

  const renderContainer = () => {
    switch (activeSection) {

      case 'article':
        return <ArticlePage />;

      case 'section':
        return <SectionPage />;

      case 'create-section':
        return <SectionCreate />;

      case 'create-article':
        return <ArticleCreate />;

      default:
        return <Home />;
    }
  }

  return (
    <ContainerStyled>
      {renderContainer()}
    </ContainerStyled>
  )
};

export default ModalContainer;




// Styles
const ContainerStyled = styled.div`
  background-color: #FFFFFF;
  flex: 78%;
  padding: 25px;
  box-sizing: border-box;
  height: 100%;
`;
