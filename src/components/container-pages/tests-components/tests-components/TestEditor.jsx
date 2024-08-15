import React, { useState } from "react";
import styled from "styled-components";

const TestEditor = ({ test, onSave, setIsEditing }) => {
  const [questions, setQuestions] = useState(test?.questions || []);

  const handleQuestionChange = (index, updatedQuestion) => {
    // Определяем тип вопроса в зависимости от количества правильных ответов
    const questionType = updatedQuestion.right_answers.length > 1 ? "multiple" : "single";
      
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestion, type: questionType };
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { type: "single", question: "", answers: [], right_answers: [] },
    ]);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSave = () => {
    onSave({ questions });
  };

  return (
    <EditorContainer>
      <h3>{test ? "Редактировать тест" : "Создать тест"}</h3>
      {questions.map((question, index) => (
        <QuestionBlock key={index}>
          <Input
            type="text"
            placeholder="Введите вопрос"
            value={question.question}
            onChange={(e) =>
              handleQuestionChange(index, { ...question, question: e.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Введите ответы через запятую"
            value={question.answers.join(",")}
            onChange={(e) =>
              handleQuestionChange(index, { ...question, answers: e.target.value.split(",") })
            }
          />
          <Input
            type="text"
            placeholder="Введите правильные ответы через запятую"
            value={question.right_answers.join(",")}
            onChange={(e) =>
              handleQuestionChange(index, { ...question, right_answers: e.target.value.split(",") })
            }
          />
          <DeleteButton onClick={() => handleDeleteQuestion(index)}>Удалить вопрос</DeleteButton>
        </QuestionBlock>
      ))}
      <ButtonGroup>
        <Button variant="primary" onClick={handleAddQuestion}>Добавить вопрос</Button>
        <Button variant="success" onClick={handleSave}>
          {test ? "Сохранить изменения" : "Сохранить тест"}
        </Button>
        <Button variant="secondary" onClick={() => setIsEditing(false)}>Отменить</Button>
      </ButtonGroup>
    </EditorContainer>
  );
};

export default TestEditor;







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

const DeleteButton = styled.button`
  margin-top: 8px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: #dc3545;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;


const EditorContainer = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  background-color: #f1f1f1;
`;

const QuestionBlock = styled.div`
  margin-bottom: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  margin-top: 16px;
`;