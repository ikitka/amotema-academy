import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../contexts/ModalContext';

import SectionShow from '../container-pages/section-components/SectionShow/SectionShow';
import SectionCreate from '../container-pages/section-components/SectionCreate/SectionCreate';
import Home from '../container-pages/Home';

import ArticleShow from '../container-pages/article-components/ArticleShow/ArticleShow';
import ArticleCreate from '../container-pages/article-components/ArticleCreate/ArticleCreate';
import ArticleEdit from '../container-pages/article-components/ArticleEdit/ArticleEdit';



const ModalContainer = () => {

  const { activeContainer } = useContext(ModalContext);

  const renderContainer = () => {
    switch (activeContainer) {

      case 'show-article':
        return <ArticleShow />;

      case 'show-section':
        return <SectionShow />;

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
