import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ContextMenu = ({ items, position, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <MenuContainer ref={menuRef} style={{ top: position.y, left: position.x }}>
      {items.map((item, index) => (
        <MenuItem key={index} onClick={item.onClick}>
          {item.label}
        </MenuItem>
      ))}
    </MenuContainer>
  );
};

export default ContextMenu;

const MenuContainer = styled.div`
  position: absolute;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 7px;
  border: 1px solid #ccc;
  padding: 6px;
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #ebebeb;
  }
`;