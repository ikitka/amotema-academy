
import styled from 'styled-components';

const B_Button = styled.button`
  position: fixed;
  top: 80%;
  right: 20px;
  z-index: 999;
  padding: 10px 15px;
  background-color: #ffffff;
  color: rgb(31, 31, 31);
  border: none;
  border-radius: 9px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #78a7ff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }
`;

const B_Title = styled.span`
  display: inline-block;
  font-weight: bold;
`;

export { B_Button, B_Title }