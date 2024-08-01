import React from 'react';
import styled, { keyframes } from 'styled-components';

// Анимация для скелетонов
const shimmer = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
`;

// Базовый стиль для заглушек
const Skeleton = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
  margin: 8px 0;
`;

// Заглушка для заголовка
const TitleSkeleton = styled(Skeleton)`
  width: 70%;
  height: 24px;
`;

// Заглушка для текста
const TextSkeleton = styled(Skeleton)`
  width: 100%;
  height: 16px;
`;

// Заглушка для изображения
const ImageSkeleton = styled(Skeleton)`
  width: 100%;
  height: 200px;
  border-radius: 8px;
`;

const MenuItemSkeleton = styled(Skeleton)`
  width: 100%;
  height: 27px;
  margin-bottom: 20px;
`;

// Компонент для заглушек
const ContentPlaceholder = ({ type }) => {
  switch (type) {
    case 'title':
      return <TitleSkeleton />;
    case 'text':
      return <TextSkeleton />;
    case 'image':
      return <ImageSkeleton />;
    case 'menu-item':
      return <MenuItemSkeleton />;
    default:
      return null;
  }
};

export default ContentPlaceholder;