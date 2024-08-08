import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const EditContentEditor = ({ text, setText, viewState }) => {
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

export default EditContentEditor;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 84%;
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

  ol {
    margin: 20px 0; /* Отступы сверху и снизу */
    padding-left: 20px; /* Отступ слева для маркеров списка */
    list-style-type: decimal; /* Включаем цифры для списка */
    font-size: 16px; /* Размер шрифта */
  }

  li {
    margin-bottom: 10px; /* Отступ между пунктами списка */
  }

  blockquote {
    margin: 20px 0; /* Отступы сверху и снизу */
    padding: 10px 20px; /* Внутренний отступ для текста */
    border-left: 5px solid #ccc; /* Линия слева */
    background-color: #f9f9f9; /* Легкий фон для блока */
    font-style: italic; /* Курсивный шрифт для цитаты */
  }

  blockquote p {
    margin: 0; /* Убираем отступы у параграфа внутри blockquote */
    font-size: 16px; /* Размер шрифта */
  }

  table {
    width: 100%; /* Таблица занимает всю ширину контейнера */
    border-collapse: collapse; /* Убираем двойные границы между ячейками */
    margin: 20px 0; /* Отступы сверху и снизу */
    font-size: 16px; /* Размер шрифта */
  }

  th, td {
    padding: 10px; /* Внутренние отступы у ячеек */
    border: 1px solid #ccc; /* Граница для всех ячеек */
  }

  th {
    background-color: #f5f5f5; /* Легкий фон для заголовков столбцов */
    font-weight: bold; /* Жирный шрифт для заголовков */
  }

  td {
    text-align: left; /* Выравнивание текста по левому краю по умолчанию */
  }

  th:nth-child(2), td:nth-child(2) {
    text-align: center; /* Выравнивание по центру для второго столбца */
  }

  th:nth-child(3), td:nth-child(3) {
    text-align: right; /* Выравнивание по правому краю для третьего столбца */
  }

  a {
    color: #007BFF; /* Цвет ссылок */
    text-decoration: underline; /* Подчеркивание для ссылок */
    cursor: pointer; /* Курсор указателя */
  }

  a:hover {
    color: #0056b3; /* Темнее при наведении */
  }

  img {
    max-width: 100%; /* Изображение не выходит за пределы контейнера */
    height: auto; /* Автоматическая настройка высоты */
    display: block; /* Убирает отступы снизу */
    margin: 20px 0; /* Отступы сверху и снизу */
  }

  h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 18px;
    margin-top: 18px;
  }

  h3 {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 16px;
    margin-top: 16px;
  }

  h4 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 14px;
    margin-top: 14px;
  }

  h5 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 12px;
    margin-top: 12px;
  }

  h6 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  blockquote blockquote {
    margin-left: 20px;
    border-left: 3px solid #bbb; /* Более тонкая граница для вложенных цитат */
  }

  ul {
    margin: 20px 0; /* Отступы сверху и снизу */
    padding-left: 20px; /* Отступ слева для маркеров списка */
    list-style-type: disc; /* Маркеры в виде дисков */
    font-size: 16px; /* Размер шрифта */
  }

  ul ul {
    margin-left: 20px; /* Дополнительный отступ для вложенных списков */
    list-style-type: circle; /* Изменяем стиль маркеров для вложенных списков */
  }

  hr {
    border: 0;
    height: 1px;
    background-color: #ccc; /* Цвет линии */
    margin: 20px 0; /* Отступы сверху и снизу */
  }

  p {
    max-width: 1400px;
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
