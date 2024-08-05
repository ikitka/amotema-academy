import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../../../contexts/ModalContext';
import api from '../../../../api/api';

import LoadingPlaceholder from './components/LoadingPlaceholder';
import ContentEditor from './components/ContentEditor';
import CreateHeader from './components/CreateHeader';
import CreateTools from './components/CreateTools';



const ArticleCreate = () => {
  const { selectedSection, articleNewParent, addArticle } = useContext(ModalContext);

  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [viewState, setViewState] = useState('both'); // 'left', 'right', 'both'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  const handleCreateArticle = async () => {
    console.log('Create article');

    const userId = APP.constant('user').id;

    const newArticle = {
      name: name,
      content: text,
      author: userId,
      parent: articleNewParent ? articleNewParent.id : null,
      section: selectedSection ? selectedSection.id : null,
    };

    const response = await api.createArticle(newArticle);

    if (response) {
      addArticle(response);
      console.log(response);
    }
  };

  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  return (
    <ContainerStyled>
      
      <CreateHeader
        selectedSection={selectedSection}
        articleNewParent={articleNewParent}
        name={name}
        setName={setName}
        handleCreateArticle={handleCreateArticle}
      />

      <CreateTools
        viewState={viewState}
        setViewState={setViewState}
      />
      
      <ContentEditor
        text={text}
        setText={setText}
        viewState={viewState}
      />

    </ContainerStyled>
  );
};

export default ArticleCreate;

const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
