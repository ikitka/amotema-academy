import React, { useState } from 'react';
import styled from 'styled-components';



const MenuSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div>
      <InputStyled 
        type="text" 
        placeholder="Поиск по названию..." 
        value={searchTerm} 
        onChange={handleChange} 
      />
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