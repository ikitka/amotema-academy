import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Компонент для отображения теста, если он существует
const TestView = ({ test, onEdit, onDelete }) => {

  console.log(test)

  return (
    <TestContainer>
      <ButtonGroup>
        <Button variant="success" onClick={onEdit}>Редактировать тест</Button>
        <Button variant="danger" onClick={onDelete}>Удалить тест</Button>
      </ButtonGroup>
      <h3>Тест для статьи</h3>
      {test.questions && test.questions.map((question, index) => (
        <QuestionBlock key={index}>
          <p>
            <strong>Вопрос {index + 1}:</strong> {question.question}
          </p>
          <AnswerList>
            {question.answers.map((answer, i) => (
              <AnswerItem key={i}>{answer}</AnswerItem>
            ))}
          </AnswerList>
        </QuestionBlock>
      ))}
    </TestContainer>
  );
};

export default TestView;







const TestContainer = styled.div`
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const AnswerList = styled.div`
  list-style-type: none;
  padding-left: 0;
`;

const AnswerItem = styled.div`
  margin-bottom: 0px;
  margin-left: 20px;
`;

const Button = styled.button`
  margin-right: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => {
    switch (props.variant) {
      case 'primary':
        return '#007bff';
      case 'secondary':
        return '#6c757d';
      case 'success':
        return '#28a745';
      case 'danger':
        return '#dc3545';
      case 'warning':
        return '#ffc107';
      case 'info':
        return '#17a2b8';
      default:
        return '#007bff'; // Default color
    }
  }};
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => {
      switch (props.variant) {
        case 'primary':
          return '#0056b3';
        case 'secondary':
          return '#5a6268';
        case 'success':
          return '#218838';
        case 'danger':
          return '#c82333';
        case 'warning':
          return '#e0a800';
        case 'info':
          return '#138496';
        default:
          return '#0056b3'; // Default hover color
      }
    }};
  }
`;

const QuestionBlock = styled.div`
  margin-bottom: 12px;
`;

const ButtonGroup = styled.div`
  margin-top: 16px;
`;