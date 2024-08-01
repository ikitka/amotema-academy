import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import MenuArticleButton from './MenuArticleButton';
import { ModalContext } from '../../contexts/ModalContext';
import ContentPlaceholder from '../../ui/ContentPlaceholder/ContentPlaceholder';
import api from '../../api/api';


const MenuArticles = ({ sectionId }) => {

  const { articleData, setArticleData, userData, setUserData } = useContext(ModalContext);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleData(); // при монтировании вызываем получение данных нужных
  }, []);

  const handleData = async () => {
    const resArticles = await api.getArticles(sectionId);
    setArticleData(resArticles);
    console.log(resArticles);

    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <div>
        <div style={{ padding: '10px' }}>
          {[...Array(4)].map((_, index) => (
            <ContentPlaceholder key={index} type="text" />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div style={{ paddingLeft: '15px', height: '100%' }}>
      {articleData && articleData.map((article, index) => (
          <MenuArticleButton 
            key={index}
            name={article.name}
            id={article.id}
          />
      ))}
    </div>
  )
};

export default MenuArticles;
