
import styled from 'styled-components';

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 65px;
  width: calc(100% - 65px);
  height: 100%;
  background-color: white;
  z-index: 999;
  box-sizing: border-box;
  display: flex;
  font-family: 'Trebuchet MS', Helvetica, sans-serif;
`;

export { ModalStyled }