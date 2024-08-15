
import React from 'react';
import styled from 'styled-components';

const SwitcherTabContainer = styled.div`
  display: inline-block;
`;

const SwitcherTabStatsStyled = styled.div`
  padding: 8px 10px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  color: ${props => (props.isActive ? '#333333' : '#B3B3B3')};
  cursor: pointer;
`;

const SwitcherTabContainerStyled = styled.div`
  height: ${props => (props.isActive ? '3px' : '0px')};
  width: 100%;
  background-color: ${props => (props.isActive ? '#333333' : '#B3B3B3')};
`;

const SwitcherTab = ({ label, isActive, onClick }) => {
  return (
    <SwitcherTabContainer>
      <div>
        <SwitcherTabStatsStyled
          isActive={isActive}
          onClick={onClick}
        >
          {label}
        </SwitcherTabStatsStyled>
        <SwitcherTabContainerStyled isActive={isActive} />
      </div>
    </SwitcherTabContainer>
  );
};

export default SwitcherTab;