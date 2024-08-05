import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ContentEditor = ({ text, setText, viewState }) => {
  const copyCodeToClipboard = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      alert('Код скопирован в буфер обмена!');
    } catch (err) {
      alert('Не удалось скопировать код');
    }
  };

  return (
    <BottomContainer>
      {viewState !== 'right' && (
        <LeftContainer>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', height: '100%', resize: 'none' }}
          />
        </LeftContainer>
      )}
      {viewState !== 'left' && (
        <RightContainer>
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
                },
              }}
            />
          </MarkdownContainer>
        </RightContainer>
      )}
    </BottomContainer>
  );
};

export default ContentEditor;

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
