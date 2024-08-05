import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ModalContext } from '../../../contexts/ModalContext';
import ContentPlaceholder from '../../../ui/ContentPlaceholder/ContentPlaceholder';
import api from '../../../api/api';





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
  }



  if (isLoading) {
    return (
      <>
        <ContainerStyled>
          {/* Первый контейнер */}
          <TopContainer>
            <ContentPlaceholder type="menu-item" />
            <ButtonGroup>
              <ContentPlaceholder type="menu-item" />
            </ButtonGroup>
          </TopContainer>

          {/* Второй контейнер */}
          <MiddleContainer>
            <ContentPlaceholder type="menu-item" />
            <ContentPlaceholder type="menu-item" />
            <ContentPlaceholder type="menu-item" />
          </MiddleContainer>

          {/* Третий контейнер */}
          <BottomContainer>
            <LeftContainer>
              <ContentPlaceholder type="menu-item" />
              <ContentPlaceholder type="menu-item" />
              <ContentPlaceholder type="menu-item" />
            </LeftContainer>
            <RightContainer>
              <ContentPlaceholder type="menu-item" />
              <ContentPlaceholder type="menu-item" />
              <ContentPlaceholder type="menu-item" />
            </RightContainer>
          </BottomContainer>
        </ContainerStyled>
      </>
    );
  }

  const copyCodeToClipboard = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      alert('Код скопирован в буфер обмена!');
    } catch (err) {
      alert('Не удалось скопировать код');
    }
  };

  return (
    <>
      <ContainerStyled>
        {/* Первый контейнер */}
        <TopContainer>
          {selectedSection &&
            <p style={{ fontSize: '13px', marginBottom: '3px'}}>{`${selectedSection.name}`} {articleNewParent && ` > ${articleNewParent.name}`}</p>
          }
          <InputName
            type="text"
            placeholder="Название статьи"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <ButtonGroup>
            <ButtonSave onClick={handleCreateArticle}>Сохранить</ButtonSave>
            <ButtonCancel>Отменить</ButtonCancel>
          </ButtonGroup>
        </TopContainer>

        {/* Второй контейнер */}
        <MiddleContainer>
          
          <ButtonGroupContainer>
            <ButtonRow>
                <CustomButton onClick={() => setViewState('left')} active={viewState === 'left'}>Редактор</CustomButton>
                <CustomButton onClick={() => setViewState('both')} active={viewState === 'both'}>Вместе</CustomButton>
                <CustomButton onClick={() => setViewState('right')} active={viewState === 'right'}>Превью</CustomButton>
            </ButtonRow>
            <GroupLabel>Режим просмотра</GroupLabel>
          </ButtonGroupContainer>

          <ButtonGroupContainer>
            <ButtonRow>
                <CustomButton onClick={() => setViewState('left')} active={viewState === 'left'}>Редактор</CustomButton>
                <CustomButton onClick={() => setViewState('both')} active={viewState === 'both'}>Вместе</CustomButton>
                <CustomButton onClick={() => setViewState('right')} active={viewState === 'right'}>Превью</CustomButton>
            </ButtonRow>
            <GroupLabel>Режим просмотра</GroupLabel>
          </ButtonGroupContainer>

        </MiddleContainer>

        {/* Третий контейнер */}
        <BottomContainer>
          {/* Условно отображаемые контейнеры */}
          {viewState !== 'right' && (
            <LeftContainer style={{ display: 'flex' }}>
              <textarea value={text} onChange={(e) => setText(e.target.value)} style={{ width: '100%', height: '100%', resize: 'none' }}></textarea>
            </LeftContainer>
          )}
          {viewState !== 'left' && (
            <RightContainer style={{ display: 'flex' }}>
              <MarkdownContainer>
                <ReactMarkdown
                  children={text}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      if (inline) {
                        return <code className={className} {...props}>{children}</code>;
                      }

                      const language = /language-(\w+)/.exec(className || '')?.[1] || 'text';
                      const codeString = String(children).replace(/\n$/, '');

                      return (
                        <CodeContainer>
                          <SyntaxHighlighter
                            {...props}
                            PreTag="div"
                            language={language}
                            style={a11yDark}
                            children={codeString}
                          />
                          <CopyButton onClick={() => copyCodeToClipboard(codeString)}>
                            Копировать
                          </CopyButton>
                        </CodeContainer>
                      );
                    }
                  }}
                />
              </MarkdownContainer>
            </RightContainer>
          )}
        </BottomContainer>
      </ContainerStyled>
    </>
  );
};

export default ArticleCreate;





const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const TopContainer = styled.div`
  display: block;
  margin-bottom: 5px;
`;

const ButtonGroup = styled.div`
  display: inline;
  float: inline-end;
`;

const MiddleContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  gap: 5px;

  button {
    padding: 5px 10px;
    font-size: 16px;
    cursor: pointer;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  height: 100%;
`;

const LeftContainer = styled.div`
  flex: 1;
  padding: 10px;
  height: 100%;
  border-right: 1px solid #ccc;
`;

const RightContainer = styled.div`
  flex: 1;
  padding: 10px;
  height: 100%;
`;

const MarkdownContainer = styled.div`
  height: 100%;
  overflow-y: auto;

  h1 {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  strong {
    font-weight: bold;
  }

  code {
    font-size: 14px;
  }

  em {
    font-style: italic;
  }
`;

const CopyButton = styled.button`
  margin-left: 10px;
  padding: 3px 6px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 3px;
  font-size: 12px;
  position: absolute;
  top: 5px;
  right: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const CodeContainer = styled.div`
  position: relative;
  margin-bottom: 1em;
`;









const InputName = styled.input`
  width: 50%;
  margin-top: 4px;
  padding: 8px 5px;
  font-size: 18px;
  background-color: #f0f0f0;;
`;

const InputName2 = styled.input`
  width: 50%;
  margin-top: 4px;
  padding: 8px 5px;
  font-size: 18px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 7px;
`;

const ButtonSave = styled.button`
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  background-color: #0BA869;
  border-radius: 5px;
  margin-right: 10px;
  color: white;

  &:hover {
    background-color: #0f8657;
  }
`;

const ButtonCancel = styled.button`
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  background-color: #FFFFFF;
  border: 1px solid #9F9F9F;
  border-radius: 5px;

  &:hover {
    background-color: #b9b9b9;
  }
`;


const ButtonGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #f0f0f0;
  border-radius: 4px;
  padding: 5px;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px; /* Отступ между кнопками */
`;

const GroupLabel = styled.div`
  margin-top: 5px;
  font-size: 10px;
  color: #666;
  text-align: center;
  width: 100%;
`;

const CustomButton = styled.span`
  font-size: 14px;
  padding: 3px 6px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid ${({ active }) => (active ? '#007bff' : '#ccc')};
  background-color: ${({ active }) => (active ? '#007bff' : '#ffffff')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${({ active }) => (active ? '#0056b3' : '#e0e0e0')};
  }
`;