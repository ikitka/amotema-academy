import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import api from '../../../../api/api';
import { ModalContext } from '../../../../contexts/ModalContext';

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
  resize: vertical;
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

const SectionCreate = ({ onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState('');

  const { addSection } = useContext(ModalContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newSection = {
      name,
      description,
      position,
    };

    const response = await api.createSection(newSection);

    if (response) {
      addSection(response);
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
          Описание:
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Позиция:
          <Input
            type="number"
            value={position}
            onChange={(e) => setPosition(parseInt(e.target.value))}
            required
          />
        </label>
        <SubmitButton type="submit">Создать раздел</SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default SectionCreate;