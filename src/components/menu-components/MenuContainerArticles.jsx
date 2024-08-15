import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import MenuButtonArticle from './MenuButtonArticle';
import { ModalContext } from '../../contexts/ModalContext';
import ContentPlaceholder from '../../ui/ContentPlaceholder/ContentPlaceholder';
import api from '../../api/api';

const MenuContainerArticles = ({ sectionId }) => {
  const { articleData, setArticleData, userData, setUserData } = useContext(ModalContext);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedArticles, setExpandedArticles] = useState(new Set());

  useEffect(() => {
    handleData();
  }, []);

  const handleData = async () => {
    const resArticles = await api.getArticles(sectionId);
    setArticleData(resArticles);
    console.log(resArticles);
    setIsLoading(false);
  };

  const handleToggleExpand = (articleId) => {
    setExpandedArticles(prevExpanded => {
      const newExpanded = new Set(prevExpanded);
      if (newExpanded.has(articleId)) {
        newExpanded.delete(articleId);
      } else {
        newExpanded.add(articleId);
      }
      return newExpanded;
    });
  };

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

  const renderArticles = (articles, level = 0) => {
    return articles.map((article) => {
      const isParentExpanded = expandedArticles.has(article.id);
      const children = articleData.filter(a => a.parent === article.id);

      return (
        <React.Fragment key={article.id}>
          <MenuButtonArticle 
            name={article.name}
            id={article.id}
            canEdit={article.can_edit}
            level={level}
            hasChildren={children.length > 0}
            isExpanded={isParentExpanded}
            onToggleExpand={() => handleToggleExpand(article.id)}
          />
          {isParentExpanded && renderArticles(children, level + 1)}
        </React.Fragment>
      );
    });
  };

  return (
    <div style={{ paddingLeft: '15px', height: '100%' }}>
      {articleData && renderArticles(articleData.filter(article => article.parent === null))}
    </div>
  );
};

export default MenuContainerArticles;
