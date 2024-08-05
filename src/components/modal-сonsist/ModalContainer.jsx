import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../contexts/ModalContext';

import SectionPage from '../container-pages/SectionPage';
import ArticlePage from '../container-pages/ArticlePage';
import SectionCreate from '../container-pages/section-components/SectionCreate';
import Home from '../container-pages/Home';
import ArticleCreate from '../container-pages/article-components/ArticleCreate';
import ArticleEdit from '../container-pages/article-components/ArticleEdit';



const ModalContainer = () => {

  const { activeSection, setActiveSection, articleNewParent, setArticleNewParent } = useContext(ModalContext);

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

      case 'edit-article':
        return <ArticleEdit />;

      case 'home':
        return <Home />;

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
  padding: 20px;
  box-sizing: border-box;
  height: 100%;
`;
