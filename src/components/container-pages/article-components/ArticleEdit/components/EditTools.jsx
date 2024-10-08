import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const EditTools = ({ viewState, setViewState, text, setText }) => {
  const [history, setHistory] = useState([text]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isLoadingNeural, setIsLoadingNeural] = useState(false);

  const [showPromptModal, setShowPromptModal] = useState(false);
  const [promptText, setPromptText] = useState('Напиши на русском языке статью в разметке markdown по промпту');
  const [userPromptText, setUserPromptText] = useState('');
  const buttonRef = useRef(null);

  // Функция для обновления текста с добавлением в историю
  const updateText = (newText) => {
    const updatedHistory = [...history.slice(0, historyIndex + 1), newText];
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
    setText(newText);
  };

  const insertText = (before, after = '', removeIfExists = false) => {
    const textarea = document.querySelector('textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);

    let newText;
    let newCursorStart = start;
    let newCursorEnd = end + before.length + after.length;

    if (removeIfExists && selectedText.startsWith(before) && selectedText.endsWith(after)) {
      newText = text.substring(0, start) + selectedText.slice(before.length, -after.length) + text.substring(end);
      newCursorStart = start;
      newCursorEnd = end - before.length - after.length;
    } else {
      newText = text.substring(0, start) + before + selectedText + after + text.substring(end);
    }

    updateText(newText);

    // Восстановление позиции курсора и выделения
    requestAnimationFrame(() => {
      textarea.setSelectionRange(newCursorStart, newCursorEnd);
      textarea.focus();
    });
  };

  const handleNeural = async () => {
    setIsLoadingNeural(true);

    const url = 'https://test-widget-9417.website/prod_projects/gktema/knowledge-base/yandexGptRequest.php';

    const requestBody = {
      temperature: 0.6,
      maxTokens: 1000,
      systemText: promptText,
      userText: userPromptText,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      setText(data?.result?.alternatives?.[0]?.message?.text || 'Ответ не найден');
      setIsLoadingNeural(false);
      setShowPromptModal(false);  // Закрыть окно после генерации
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      setIsLoadingNeural(false);
    }
  };

  const handleBold = () => insertText('**', '**', true);
  const handleUnderline = () => insertText('__', '__', true);
  const handleStrikethrough = () => insertText('~~', '~~', true);
  const handleCode = () => insertText('`', '`', true);
  const handleNewline = () => insertText('', '<br><br>', true);
  const handleItalic = () => insertText('_', '_', true);
  const handleHeader = () => {
    const textarea = document.querySelector('textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);

    let newText;
    let newCursorStart = start;
    let newCursorEnd = end;

    if (selectedText.startsWith('# ')) {
      newText = text.substring(0, start) + selectedText.slice(2) + text.substring(end);
      newCursorEnd = end - 2;
    } else {
      newText = text.substring(0, start) + '# ' + selectedText + text.substring(end);
      newCursorEnd = end + 2;
    }

    updateText(newText);

    // Восстановление позиции курсора и выделения
    requestAnimationFrame(() => {
      textarea.setSelectionRange(newCursorStart, newCursorEnd);
      textarea.focus();
    });
  };

  const handleBlockquote = () => {
    const textarea = document.querySelector('textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);

    let newText;
    let newCursorStart = start;
    let newCursorEnd = end;

    if (selectedText.startsWith('> ')) {
      newText = text.substring(0, start) + selectedText.slice(2) + text.substring(end);
      newCursorEnd = end - 2;
    } else {
      newText = text.substring(0, start) + '> ' + selectedText + text.substring(end);
      newCursorEnd = end + 2;
    }

    updateText(newText);

    // Восстановление позиции курсора и выделения
    requestAnimationFrame(() => {
      textarea.setSelectionRange(newCursorStart, newCursorEnd);
      textarea.focus();
    });
  };

  const handleImage = () => insertText('![alt text](image_url)');
  const handleVideo = () => insertText('<iframe width="560" height="315" src="video_url" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevText = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setText(prevText);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextText = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setText(nextText);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.code === 'KeyZ') {
        e.preventDefault();
        handleUndo();
      }
      if (e.ctrlKey && e.code === 'KeyY') {
        e.preventDefault();
        handleRedo();
      }
      if (e.ctrlKey && e.code === 'KeyB') {
        e.preventDefault();
        handleBold();
      }
      if (e.ctrlKey && e.code === 'KeyI') {
        e.preventDefault();
        handleItalic();
      }
      if (e.ctrlKey && e.code === 'KeyH') {
        e.preventDefault();
        handleHeader();
      }
      if (e.ctrlKey && e.code === 'KeyQ') {
        e.preventDefault();
        handleBlockquote();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [historyIndex, history, text]);  // Добавлено text для актуальности состояния

  useEffect(() => {
    const handleInput = (e) => {
      updateText(e.target.value);
    };

    const textarea = document.querySelector('textarea');
    textarea.addEventListener('input', handleInput);

    return () => {
      textarea.removeEventListener('input', handleInput);
    };
  }, [historyIndex, history]);

  return (
    <MiddleContainer>
      
      <ButtonGroupContainer>
        <ButtonRow>
          <CustomButton onClick={() => setViewState('left')} active={viewState === 'left'}>
            Редактор
          </CustomButton>
          <CustomButton onClick={() => setViewState('both')} active={viewState === 'both'}>
            Вместе
          </CustomButton>
          <CustomButton onClick={() => setViewState('right')} active={viewState === 'right'}>
            Превью
          </CustomButton>
        </ButtonRow>
        <GroupLabel>Режим просмотра</GroupLabel>
      </ButtonGroupContainer>

      <ButtonGroupContainer>
        <ButtonRow>
          <CustomImage src="https://test-widget-9417.website/prod_projects/gktema/academy/bold.png" title="CTRL + B" onClick={handleBold}></CustomImage>
          <CustomImage src="https://test-widget-9417.website/prod_projects/gktema/academy/italic.png" title="CTRL + I" onClick={handleItalic}></CustomImage>
          <CustomImage src="https://test-widget-9417.website/prod_projects/gktema/academy/header.png" title="CTRL + H" onClick={handleHeader}></CustomImage>
          <CustomImage src="https://test-widget-9417.website/prod_projects/gktema/academy/blockquote.png" title="CTRL + Q" onClick={handleBlockquote}></CustomImage>
          <CustomImage src="https://test-widget-9417.website/prod_projects/gktema/academy/image.png" onClick={handleImage}></CustomImage>
          <CustomImage src="https://test-widget-9417.website/prod_projects/gktema/academy/video.png" onClick={handleVideo}></CustomImage>
          <CustomButton onClick={handleNewline}>Перенос</CustomButton>
        </ButtonRow>
        <GroupLabel>Форматирование</GroupLabel>
      </ButtonGroupContainer>

      <ButtonGroupContainer>
        <ButtonRow>
          <CustomButton ref={buttonRef} onClick={() => setShowPromptModal(!showPromptModal)} style={isLoadingNeural ? { cursor: 'not-allowed' } : {}} disabled={isLoadingNeural}>
            НейроGPT
          </CustomButton>
        </ButtonRow>
        <GroupLabel>Нейрожмыхинг</GroupLabel>
      </ButtonGroupContainer>

      {showPromptModal && (
        <PromptModal style={{ top: `${buttonRef.current.offsetTop + buttonRef.current.offsetHeight}px`, left: `${buttonRef.current.offsetLeft}px` }}>
          <ModalContent>
            <ModalLabel>Промпт</ModalLabel>
            <ModalInput
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
            />
            <ModalLabel>Текст</ModalLabel>
            <ModalInput
              value={userPromptText}
              onChange={(e) => setUserPromptText(e.target.value)}
            />
            <ModalButton onClick={handleNeural} disabled={isLoadingNeural}>
              Сгенерировать
            </ModalButton>
          </ModalContent>
        </PromptModal>
      )}

    </MiddleContainer>
  );
};

export default EditTools;











const MiddleContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  gap: 5px;
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
  gap: 5px;
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
  disable: ${({ disabled }) => (disabled ? 'true' : 'false')};

  &:hover {
    background-color: ${({ active }) => (active ? '#0056b3' : '#e0e0e0')};
  }
`;

const CustomImage = styled.img`
  width: 20px;
  height: 20px;
  padding: 3px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  background-color: #ffffff;

  &:hover {
    cursor: pointer;
    background-color: #e0e0e0;
  }
`;

const PromptModal = styled.div`
  position: absolute;
  top: 50px; /* Смещение от верхнего края окна, можно изменить */
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Выше остальных элементов */
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ModalLabel = styled.label`
  font-size: 12px;
  color: #333;
`;

const ModalInput = styled.textarea`
  padding: 5px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  resize: none;
  min-height: 70px;
  min-width: 300px;
`;

const ModalButton = styled.button`
  padding: 8px;
  font-size: 14px;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #ccc;
  }
`;