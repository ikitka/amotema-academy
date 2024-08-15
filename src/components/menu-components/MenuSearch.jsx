import React, { useState } from 'react';
import styled from 'styled-components';
import CustomButton from '../../ui/CustomButton/CustomButton';



const MenuSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    onSearch(value);
  };


  return (
    <div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 0px 7px 0px' }}>
      
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          TeMa
        </div>

        <CustomButton
          icon={'https://test-widget-9417.website/prod_projects/gktema/academy/icon-setting.png'}
          padding={'4px 1px'}
          color='white'
          onClick={() => handleDeleteClick(article.id)}
          style={{
            opacity: 1,
            cursor: 'pointer',
            border: '1px solid #bbbbbb',
            display: 'flex',
            alignItems: 'center'
          }}
        />

      </div>

      <div>
        <InputStyled
          type="text"
          placeholder="Поиск по названию..."
          value={searchTerm}
          onChange={handleChange}
        />
      </div>

    </div>
  );

};

export default MenuSearch;




// Styles
const InputStyled = styled.input`
  width: 100%;
  padding: 4px 10px;
  box-sizing: border-box;
  border-radius: 7px;
  border: 1px solid #E4E7ED;
  background-color: #E4E7ED;
`;