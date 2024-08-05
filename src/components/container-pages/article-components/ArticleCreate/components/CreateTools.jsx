import React from 'react';
import styled from 'styled-components';

const CreateTools = ({ viewState, setViewState }) => {
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
    </MiddleContainer>
  );
};

export default CreateTools;

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

  &:hover {
    background-color: ${({ active }) => (active ? '#0056b3' : '#e0e0e0')};
  }
`;
