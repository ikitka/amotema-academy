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

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, activeSection, setActiveSection, sectionData, setSectionData, articleData, setArticleData, addArticle, addSection, userData, setUserData, usersData, setUsersData, selectedArticle, setSelectedArticle, activeType, setActiveType }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };