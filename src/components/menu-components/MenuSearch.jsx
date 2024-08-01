import React, { useState } from 'react';
import styled from 'styled-components';



const MenuSearch = ({ sections, onSearch }) => {
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
        placeholder="Search..." 
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
  padding: 7px;
  box-sizing: border-box;
  border-radius: 7px;
  border: 1px solid #E4E7ED;
  margin-bottom: 15px;
`;