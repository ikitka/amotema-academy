// src/ArticleHeader.js
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import CustomButton from '../../../../../ui/CustomButton/CustomButton';
import takeAmoUser from '../../../../../handlers/takeAmoUser';
import dataConverter from '../../../../../handlers/dataConverter';
import { ModalContext } from '../../../../../contexts/ModalContext';
import api from '../../../../../api/api';
import ModalDelete from '../../../../modal-сonsist/modals/ModalDelete';

const ArticleHeader = ({ article }) => {
  const { setActiveSection, deleteArticle, setActiveContainer } = useContext(ModalContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articleIdToDelete, setArticleIdToDelete] = useState(null);

  const user = takeAmoUser(article.author);
  const userName = user ? user.title : 'Имя не известно';
  const userAvatar = user && user.avatar ? 'https://tematechnics.amocrm.ru/' + user.avatar : 'https://test-widget-9417.website/prod_projects/gktema/icon-user.png';

  const deleteArticleThere = async (id) => {
    console.log(id);
    const response = await api.deleteArticle(id);

    if (response) {
      console.log(response);
      deleteArticle(id);
      setActiveContainer('show-section');
    }
  }

  const handleArticleEdit = async (article) => {
    setActiveContainer('edit-article');
  }

  const handleDeleteClick = (id) => {
    setArticleIdToDelete(id);
    setIsModalOpen(true);
  }

  const handleConfirmDelete = () => {
    if (articleIdToDelete) {
      deleteArticleThere(articleIdToDelete);
      setArticleIdToDelete(null);
      setIsModalOpen(false);
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setArticleIdToDelete(null);
  }

  const handleGetStats = (text) => {
    let cleanedTextForWords = text.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');
    let charCount = cleanedTextForWords.length;
    let wordCount = cleanedTextForWords.trim().split(/\s+/).length;

    return 'Символы: ' + charCount + ' , Слова: ' + wordCount;
  }

  return (
    <>
      <Container>
        
        <LeftContainer>
          
          <NameContainer>
            {article.name}
          </NameContainer>

          <AuthorInfoContainer>
            <AuthorImage src={userAvatar} alt="Author" />
            <TextContainer>
              <div style={{ marginBottom: '5px', fontSize: '13px' }}>
                {userName}
              </div>
              <div style={{ fontSize: '13px' }}>
                {dataConverter(article.date_update)}
              </div>
            </TextContainer>
          </AuthorInfoContainer>

        </LeftContainer>

        <RightContainer>
          <CustomButton
            text='Редактировать'
            padding={'4px 10px'}
            color='white'
            onClick={() => handleArticleEdit(article)}
            style={{
              opacity: 1,
              cursor: 'pointer',
              border: '1px solid #bbbbbb',
            }}
          />

          <CustomButton
            text='Удалить'
            padding={'4px 10px'}
            color='red'
            onClick={() => handleDeleteClick(article.id)}
            style={{
              opacity: 1,
              cursor: 'pointer',
              border: '1px solid #bbbbbb',
              marginLeft: '5px',
            }}
          />

          <div style={{ fontSize: '13px', display: 'block', marginTop: '10px', textAlign: 'end' }}>{handleGetStats(article.content)}</div>

        </RightContainer>
      </Container>

      <ModalDelete
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default ArticleHeader;

const Container = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #bbbbbb;
  padding-bottom: 20px;
`;

const LeftContainer = styled.div`
  flex-grow: 1;
  height: 100%;
`;

const RightContainer = styled.div`
  padding: 5px;
  min-width: 210px;
`;

const NameContainer = styled.div`
  width: 100%;
  font-size: 21px;
  font-weight: bold;
`;

const AuthorInfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
`;

const AuthorImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
  display: block;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
