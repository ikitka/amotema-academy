import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';



const ContectsMenu = ({ options, value, onChange, width, backgroundColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <SelectContainer>
      <SelectedValue onClick={() => setIsOpen(!isOpen)} width={width} backgroundColor={backgroundColor}>
        {value}
      </SelectedValue>
      <Options isOpen={isOpen}>
        {options.map((option, index) => (
          <Option key={index} onClick={() => handleOptionClick(option)} width={width}>
            {option}
          </Option>
        ))}
      </Options>
    </SelectContainer>
  );
};

export default ContectsMenu;




// Styles
const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const SelectedValue = styled.div`
  padding: 9px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  width: ${props => props.width ? props.width : 'auto'};
  background-color: ${props => props.backgroundColor};
`;

const Options = styled.div`
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 100000;
`;

const Option = styled.div`
  cursor: pointer;
  border-radius: 2px;
  padding: 5px 10px;
  width: ${props => props.width ? props.width : 'auto'};

  &:hover {
    background-color: #ccc;
  }
`;