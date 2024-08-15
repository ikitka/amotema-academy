import React, { useState, useEffect } from "react";
import api from "../../../api/api";
import styled from "styled-components";
import TestView from "./tests-components/TestView";
import TestEditor from "./tests-components/TestEditor";


const ArticleTest = ({ articleId }) => {
  const [test, setTest] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTest = async () => {
      const data = await api.getTest(articleId);
      setTest(data || null);
    };
    fetchTest();
  }, [articleId]);

  const handleCreateOrUpdateTest = async (newTest) => {
    const data = await api.handleCreateOrUpdateTest(test, articleId, newTest);
    setTest(data || null);
    setIsEditing(false);
  };

  const handleDeleteTest = async () => {
    const data = await api.handleDeleteTest(articleId);
    setTest(data || null);
    setIsEditing(false);
  };

  if (isEditing) {
    return <TestEditor test={test} onSave={handleCreateOrUpdateTest} setIsEditing={setIsEditing} />;
  }

  return (
    <ArticleTestContainer>
      {test ? (
        <TestView
          test={test}
          onEdit={() => setIsEditing(true)}
          onDelete={handleDeleteTest}
        />
      ) : (
        <Button onClick={() => setIsEditing(true)}>Создать тест</Button>
      )}
    </ArticleTestContainer>
  );
};

export default ArticleTest;





const Button = styled.button`
  margin-right: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ArticleTestContainer = styled.div`
  padding: 16px;
`;