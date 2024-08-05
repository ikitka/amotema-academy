import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../contexts/ModalContext';
import api from '../../api/api';

import ContentPlaceholder from '../../ui/ContentPlaceholder/ContentPlaceholder';
import MenuButtonSection from '../menu-components/MenuButtonSection';
import MenuSearch from '../menu-components/MenuSearch';
import CustomButton from '../../ui/CustomButton/CustomButton';
import MenuContainerArticles from '../menu-components/MenuContainerArticles';
import ModalHeader from './ModalHeader';



const ModalMenu = () => {

  const { activeSection, setActiveSection, sectionData, setSectionData, userData, setUserData, usersData, setUsersData, activeType, setActiveType, selectedSection, setSelectedSection, setArticleNewParent } = useContext(ModalContext);

  const [isLoading, setIsLoading] = useState(true);

  const [filteredSections, setFilteredSections] = useState([]);

  useEffect(() => {
    handleData(); // при монтировании вызываем получение данных нужных
  }, []);

  useEffect(() => {
    setFilteredSections(sectionData); // при изменении sectionData обновляем filteredSections для работы поиска
  }, [sectionData]);

  const handleData = async () => {
    // получаем пользователя (и его права)
    const resUser = await api.getUser();
    setUserData(resUser);
    console.log(resUser);

    // получаем данные секции
    const resUsers = await api.getUsers();
    setUsersData(resUsers);
    console.log(resUsers);

    // получаем разделы для пользователя
    const resSections = await api.getSections();
    setSectionData(resSections);
    setFilteredSections(resSections);
    console.log(resSections);

    setIsLoading(false);
  }

  const handleSearch = (searchTerm) => {
    const filtered = sectionData.filter(section =>
      section.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSections(filtered);
  };

  const handleClick = (section) => {
    if (selectedSection === section) {
      setSelectedSection(null);
      setActiveType('section');
      setActiveSection('home');
      console.log(null);
    } else {
      setSelectedSection(section);
      setActiveType('article');
      console.log(section);
      setActiveSection('section');
    }

  };

  const handleCreateArticleClick = () => {
    setArticleNewParent(null);
    setActiveSection('create-article');
  };

  if (isLoading) {
    return (
      <MenuStyled>
        <MenuSearch />
        <div style={{ padding: '15px' }}>
          {[...Array(6)].map((_, index) => (
            <ContentPlaceholder key={index} type="menu-item" />
          ))}
        </div>
      </MenuStyled>
    );
  }

  return (
    <MenuStyled>

      <SearchContainer>
        <MenuSearch sections={sectionData} onSearch={handleSearch} />
      </SearchContainer>

      <MenuContainer>
        {filteredSections.map((section, index) => (
          (selectedSection === section || selectedSection === null) ? (
            <div key={index}>
              <MenuButtonSection
                id={section.id}
                name={section.name}
                handleClick={handleClick}
                section={section}
                mode={selectedSection === section ? 'active' : 'default'}
              />
              {selectedSection === section ? <MenuContainerArticles sectionId={section.id}/> : null}
            </div>
          ) : null
        ))}
      </MenuContainer>

      <ButtonsContainer>
        {activeType === 'section' ? (
          <CustomButton
            text='Создать раздел'
            padding={'7px'}
            color='green'
            onClick={() => setActiveSection('create-section')}
            style={{
              width: '100%',
              opacity: 1,
              cursor: 'pointer',
              marginTop: '10px',
            }}
          />
        ) : (
          <CustomButton
            text='Создать статью'
            padding={'7px'}
            color='green'
            onClick={handleCreateArticleClick}
            style={{
              width: '100%',
              opacity: 1,
              cursor: 'pointer',
              marginTop: '10px',
            }}
          />
        )}
      </ButtonsContainer>

    </MenuStyled>
  )
};

export default ModalMenu;




// Styles
const MenuStyled = styled.div`
  background-color: #FFFFFF;
  flex: 22%;
  padding: 15px;
  min-width: 260px;
  box-sizing: border-box;
  border-right: 1px solid #E4E7ED;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SearchContainer = styled.div`
  flex-shrink: 0;
  height: 40px;
`;

const MenuContainer = styled.div`
  flex: 1; /* Позволяет MenuContainer занимать всё доступное пространство */
  overflow-y: auto; /* Добавляет прокрутку при необходимости */
`;

const ButtonsContainer = styled.div`
  flex-shrink: 0;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
