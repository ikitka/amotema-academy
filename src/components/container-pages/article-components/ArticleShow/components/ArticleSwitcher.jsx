// src/ArticleHeader.js
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import SwitcherTab from './SwitcherTab';
import { ModalContext } from '../../../../../contexts/ModalContext';


const ArticleSwitcher = () => {

  const { typeArticleSwitcher, setTypeArticleSwitcher, selectedArticle } = useContext(ModalContext);

  return (
    <SwitcherContainer>
      <TabButtons>
        <SwitcherTab
          label="Статья"
          isActive={typeArticleSwitcher === 'article'}
          onClick={() => setTypeArticleSwitcher('article')}
        />
        {selectedArticle.can_edit && (
          <SwitcherTab
            label="Проверочные вопросы"
            isActive={typeArticleSwitcher === 'tests'}
            onClick={() => setTypeArticleSwitcher('tests')}
          />
        )}
      </TabButtons>
    </SwitcherContainer>
  );
};

export default ArticleSwitcher;



const SwitcherContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  border-bottom: 1px solid #B3B3B3;
  margin-bottom: -1px;
`;

const TabButtons = styled.div`
  display: flex;
  user-select: none;
  width: 100%;
  margin-bottom: -1px;
`;