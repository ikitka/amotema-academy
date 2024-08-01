import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import api from '../../../api/api';
import { ModalContext } from '../../../contexts/ModalContext';

// Стили для контейнера формы
const FormContainer = styled.div`
  padding: 20px;
  margin: 0 auto;
`;

// Стили для заголовка
const Header = styled.h2`
  margin-top: 0;
`;

// Стили для формы
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

// Стили для полей ввода и текстовой области
const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: both;
`;

// Стили для кнопки отправки
const SubmitButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ArticleCreate = ({ onClose }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const { addArticle } = useContext(ModalContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userId = APP.constant('user').id;

    const newArticle = {
      name,
      content,
      author: userId,
      section: 2,
    };

    const response = await api.createArticle(newArticle);

    if (response) {
      addArticle(response);
      console.log(response);
    }
  };

  return (
    <FormContainer>
      <Header>Создать новый раздел</Header>
      <Form onSubmit={handleSubmit}>
        <label>
          Название:
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Текст:
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <SubmitButton type="submit">Создать статью</SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default ArticleCreate;