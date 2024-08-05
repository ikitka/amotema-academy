import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import CustomButton from '../../../../../ui/CustomButton/CustomButton';
import takeAmoUser from '../../../../../handlers/takeAmoUser';
import dataConverter from '../../../../../handlers/dataConverter';
import { ModalContext } from '../../../../../contexts/ModalContext';
import api from '../../../../../api/api';


const ArticleHeader = ({ article }) => {

  const { setActiveSection, usersData, deleteArticle } = useContext(ModalContext);

  const user = takeAmoUser(article.author);
  const userName = user ? user.title : 'Имя не известно';
  const userAvatar = user && user.avatar ? 'https://tematechnics.amocrm.ru/' + user.avatar : 'https://test-widget-9417.website/prod_projects/gktema/icon-user.png';

  const deleteArticleThere = async (id) => {
    console.log(id);
    const response = await api.deleteArticle(id);

    if (response) {
      console.log(response);
      deleteArticle(id);
      setActiveSection('section');
    }
  }

  return (
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
          onClick={() => setActiveSection('edit-article')}
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
          onClick={() => deleteArticleThere(article.id)}
          style={{
            opacity: 1,
            cursor: 'pointer',
            border: '1px solid #bbbbbb',
            marginLeft: '5px',
          }}
        />

        <CustomButton
          text='...'
          padding={'4px 4px'}
          color='white'
          style={{
            opacity: 1,
            cursor: 'pointer',
            border: '1px solid #bbbbbb',
            marginLeft: '5px',
          }}
        />
      </RightContainer>
    </Container>
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
  align-items: flex-start; /* Выравнивание по верхнему краю */
  margin-top: 20px;
`;

const AuthorImage = styled.img`
  width: 35px;            /* Ширина изображения */
  height: 35px;           /* Высота изображения */
  border-radius: 50%;     /* Округляем изображение */
  margin-right: 10px;     /* Отступ справа для текста */
  object-fit: cover;      /* Сохраняет пропорции и обрезает изображение, если оно не подходит по размеру */
  display: block;         /* Убирает возможные пробелы под изображением */
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column; /* Располагаем элементы по вертикали */
  justify-content: center; /* Выравнивание по центру по вертикали */
`;