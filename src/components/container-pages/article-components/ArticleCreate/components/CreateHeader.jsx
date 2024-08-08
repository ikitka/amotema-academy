import React, { useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../../../../contexts/ModalContext';

const CreateHeader = ({ selectedSection, articleNewParent, name, setName, handleCreateArticle }) => {
  
  const { setActiveContainer } = useContext(ModalContext);

  const handleCancel = () => {
    setActiveContainer('show-article');
  }
  
  return (
    <TopContainer>
      {selectedSection && (
        <TextPath>
          {`${selectedSection.name}`} {articleNewParent && ` > ${articleNewParent.name}`}
        </TextPath>
      )}
      <ContainerInput>
        <InputName
          type="text"
          placeholder="Название статьи"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <ButtonGroup>
          <ButtonSave onClick={handleCreateArticle}>Сохранить</ButtonSave>
          <ButtonCancel onClick={handleCancel}>Отменить</ButtonCancel>
        </ButtonGroup>
      </ContainerInput>
    </TopContainer>
  );
};

export default CreateHeader;

const TopContainer = styled.div`
  display: block;
  margin-bottom: 5px;
`;

const TextPath = styled.p`
  font-size: 13px;
  margin-bottom: 7px;
  color: #7e7e7e;
`;

const ContainerInput = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const InputName = styled.input`
  flex: 1;
  margin-top: 4px;
  padding: 8px 5px;
  font-size: 18px;
  background-color: #f0f0f0;
  margin-right: 10px;
`;

const ButtonGroup = styled.div`
  display: inline-flex;
  flex-shrink: 0;
`;

const ButtonSave = styled.button`
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  background-color: #0BA869;
  border-radius: 5px;
  margin-right: 10px;
  color: white;

  &:hover {
    background-color: #0f8657;
  }
`;

const ButtonCancel = styled.button`
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  background-color: #FFFFFF;
  border: 1px solid #9F9F9F;
  border-radius: 5px;

  &:hover {
    background-color: #b9b9b9;
  }
`;
