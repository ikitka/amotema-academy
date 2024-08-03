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

const ContainerStyled = styled.div`

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

const ArticlePage = () => {

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
      {selectedArticle && 
      <div>
        <ArticleHeader article={selectedArticle} />
        
        <ContainerStyled>
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
        </ContainerStyled>
      </div>
      }
    </>
  )
};

export default ArticlePage;
