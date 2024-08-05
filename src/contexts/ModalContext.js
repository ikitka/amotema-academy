import React, { createContext, useState } from 'react';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [sectionData, setSectionData] = useState({});
  const [articleData, setArticleData] = useState({});
  const [userData, setUserData] = useState({});
  const [usersData, setUsersData] = useState({});

  const [activeType, setActiveType] = useState('section');

  const [selectedArticle, setSelectedArticle] = useState({});
  const [selectedSection, setSelectedSection] = useState(null);

  const [articleNewParent, setArticleNewParent] = useState({});

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const addSection = (newSection) => {
    setSectionData((prevSections) => {
      const updatedSections = [...prevSections, newSection];
      console.log('Updated Sections:', updatedSections);
      return updatedSections;
    });
  };

  const addArticle = (newArticle) => {
    setArticleData((prevArticles) => {
      const updatedArticles = [...prevArticles, newArticle];
      console.log('Updated Articles:', updatedArticles);
      return updatedArticles;
    });
  };

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
        isModalOpen, openModal, closeModal,
        activeSection, setActiveSection,
        sectionData, setSectionData,
        articleData, setArticleData,
        
        addArticle, deleteArticle,
        addSection,
        
        userData, setUserData,
        usersData, setUsersData,
        
        selectedArticle, setSelectedArticle,
        selectedSection, setSelectedSection,
        
        activeType, setActiveType,

        articleNewParent, setArticleNewParent
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };