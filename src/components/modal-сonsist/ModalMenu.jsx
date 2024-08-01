import React, { useState, useEffect, useContext } from 'react';
import { MenuStyled } from './ModalMenu.style';
import ContentPlaceholder from '../../ui/ContentPlaceholder/ContentPlaceholder';
import { ModalContext } from '../../contexts/ModalContext';
import api from '../../api/api';

import MenuButton from '../menu-components/MenuButton';
import MenuSearch from '../menu-components/MenuSearch';
import CustomButton from '../../ui/CustomButton/CustomButton';
import MenuArticles from '../menu-components/MenuArticles';


const ModalMenu = () => {

  const { activeSection, setActiveSection, sectionData, setSectionData, userData, setUserData, usersData, setUsersData, activeType, setActiveType } = useContext(ModalContext);

  const [isLoading, setIsLoading] = useState(true);

  const [filteredSections, setFilteredSections] = useState([]);

  const [selectedSection, setSelectedSection] = useState(null);

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
      console.log(null);
    } else {
      setSelectedSection(section);
      setActiveType('article');
      console.log(section);
    }

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
      <MenuSearch sections={sectionData} onSearch={handleSearch} />
      {filteredSections.map((section, index) => (
        (selectedSection === section || selectedSection === null) ? (
          <div key={index}>
            <MenuButton
              id={section.id}
              name={section.name}
              handleClick={handleClick}
              section={section}
              mode={selectedSection === section ? 'active' : 'default'}
            />
            {selectedSection === section ? <MenuArticles sectionId={section.id}/> : null}
          </div>
        ) : null
      ))}

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
          onClick={() => setActiveSection('create-article')}
          style={{
            width: '100%',
            opacity: 1,
            cursor: 'pointer',
            marginTop: '10px',
          }}
        />
      )}

    </MenuStyled>
  )
};

export default ModalMenu;
