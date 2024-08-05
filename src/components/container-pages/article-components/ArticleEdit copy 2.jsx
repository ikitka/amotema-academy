import React, { useContext, useEffect, useState } from 'react'
import api from '../../api/api';
import { ModalContext } from '../../contexts/ModalContext';

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styled from 'styled-components';
import ArticleHeader from './article-components/ArticleHeader';





const ArticleEdit2 = () => {
  const { selectedArticle } = useContext(ModalContext);

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
          <input type="text" placeholder="Введите текст" />
          <ButtonGroup>
            <button>Кнопка 1</button>
            <button>Кнопка 2</button>
          </ButtonGroup>
        </TopContainer>

        {/* Второй контейнер */}
        <MiddleContainer>
          <button>Кнопка 3</button>
          <button>Кнопка 4</button>
          <button>Кнопка 5</button>
        </MiddleContainer>

        {/* Третий контейнер */}
        <BottomContainer>
          <LeftContainer>
            <p>Контент слева</p>
          </LeftContainer>
          <RightContainer>
            <p>Контент справа</p>
          </RightContainer>
        </BottomContainer>

        {/* Контейнер для отображения markdown */}
        <MarkdownContainer>
          <ReactMarkdown
            children={selectedArticle.content}
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
      </ContainerStyled>
    </>
  );
};

export default ArticleEdit2;

const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  input {
    flex: 1;
    margin-right: 10px;
    padding: 5px;
    font-size: 16px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;

  button {
    margin-left: 5px;
    padding: 5px 10px;
    font-size: 16px;
    cursor: pointer;
  }
`;

const MiddleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;

  button {
    margin: 0 5px;
    padding: 5px 10px;
    font-size: 16px;
    cursor: pointer;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const LeftContainer = styled.div`
  flex: 1;
  margin-right: 10px;
  padding: 10px;
  background-color: #f1f1f1;
`;

const RightContainer = styled.div`
  flex: 1;
  margin-left: 10px;
  padding: 10px;
  background-color: #f1f1f1;
`;

const MarkdownContainer = styled.div`
  margin-top: 25px;
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