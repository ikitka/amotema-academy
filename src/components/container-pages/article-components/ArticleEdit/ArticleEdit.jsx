// src/ArticleEdit.js
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../../../contexts/ModalContext';
import api from '../../../../api/api';

import EditContentEditor from './components/EditContentEditor';
import EditHeader from './components/EditHeader';
import EditTools from './components/EditTools';
import LoadingPlaceholder from '../ArticleCreate/components/LoadingPlaceholder';
import ModalSave from '../../../modal-сonsist/modals/ModalSave';

const ArticleEdit = () => {
  const { selectedSection, selectedArticle, updateArticle, setActiveContainer, setSelectedArticle } = useContext(ModalContext);

  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [viewState, setViewState] = useState('both'); // 'left', 'right', 'both'
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);

      if (selectedArticle) {
        setName(selectedArticle.name);
        setText(selectedArticle.content);
      }

    }, 150);

    return () => clearTimeout(timer);
  }, [selectedArticle]);

  const handleSaveArticle = async () => {
    setIsModalOpen(true); // Открываем модальное окно
  };

  const confirmSaveArticle = async () => {
    const userId = APP.constant('user').id;

    const resaveArticle = {
      name: name,
      content: text,
      author: userId,
      parent: selectedArticle.parent,
      section: selectedArticle.section,
      id: selectedArticle.id,
      position: selectedArticle.position
    };

    const response = await api.saveArticle(resaveArticle);
    console.log(response);

    if (response) {
      updateArticle(response);
      setActiveContainer('show-article');
      setSelectedArticle(response);
    }

    setIsModalOpen(false); // Закрываем модальное окно
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Закрываем модальное окно без сохранения
  };

  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  return (
    <ContainerStyled>
      
      <EditHeader
        selectedSection={selectedSection}
        selectedArticle={selectedArticle}
        name={name}
        setName={setName}
        handleSaveArticle={handleSaveArticle}
      />

      <EditTools
        viewState={viewState}
        setViewState={setViewState}
        text={text}
        setText={setText}
      />
      
      <EditContentEditor
        text={text}
        setText={setText}
        viewState={viewState}
      />

      <ModalSave
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={confirmSaveArticle}
      />

    </ContainerStyled>
  );
};

export default ArticleEdit;





const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
