import React, { createContext, useState } from 'react';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeContainer, setActiveContainer] = useState('home');
  const [sectionData, setSectionData] = useState({});
  const [articleData, setArticleData] = useState({});
  const [userData, setUserData] = useState({});
  const [usersData, setUsersData] = useState({});

  const [activeType, setActiveType] = useState('section');

  const [selectedArticle, setSelectedArticle] = useState({});
  const [selectedSection, setSelectedSection] = useState(null);

  const [articleNewParent, setArticleNewParent] = useState({});

  const [typeArticleSwitcher, setTypeArticleSwitcher] = useState('article');

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // для добавления секции в дерево
  const addSection = (newSection) => {
    setSectionData((prevSections) => {
      const updatedSections = [...prevSections, newSection];
      console.log('Updated Sections:', updatedSections);
      return updatedSections;
    });
  };

  // для добавления статьи в дерево
  const addArticle = (newArticle) => {
    setArticleData((prevArticles) => {
      const updatedArticles = [...prevArticles, newArticle];
      console.log('Updated Articles:', updatedArticles);
      return updatedArticles;
    });
  };

  // для обновления статьи в дереве после сохранения изменений
  const updateArticle = (updatedArticle) => {
    setArticleData((prevArticles) => {
      const updatedArticles = prevArticles.map((article) => {
        if (article.id === updatedArticle.id) {
          return updatedArticle;
        }
        return article;
      });
      console.log('Updated Articles:', updatedArticles);
      return updatedArticles;
    });
  };

  // для удаления статьи и ее дочерних статей из дерева
  const deleteArticle = (articleId) => {
    const removeArticleRecursively = (articles, id) => {
      return articles
        .filter((article) => article.id !== id)
        .map((article) => ({
          ...article,
          children: removeArticleRecursively(article.children || [], id),
        }));
    };
  
    setArticleData((prevArticles) => {
      const updatedArticles = removeArticleRecursively(prevArticles, articleId);
      console.log('Updated Articles:', updatedArticles);
      return updatedArticles;
    });
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen, openModal, closeModal,     // для открытия и закрытия модального окна
        activeContainer, setActiveContainer,    // для отображения нужно контейнера справа
        sectionData, setSectionData,            // данные по разделам
        articleData, setArticleData,            // данные по статьям
        
        addArticle, updateArticle, deleteArticle,  // для добавления, обновления и удаления статьи
        addSection,                                // для добавления и удаления секции
        
        userData, setUserData,      // данные по пользователю
        usersData, setUsersData,    // данные по пользователям

        
        
        selectedArticle, setSelectedArticle,  // выбранная сейчас статья
        selectedSection, setSelectedSection,  // выбранный сейчас раздел
        
        activeType, setActiveType,            // для отображения кнопки создания статьи или раздела

        articleNewParent, setArticleNewParent, // данные по родительской статье при добавлении новой статьи

        typeArticleSwitcher, setTypeArticleSwitcher // для переключения между статьями и разделами
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };