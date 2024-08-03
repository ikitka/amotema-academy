import React from 'react'
import styled from 'styled-components';

const subdomain = APP.constant('account').subdomain;

const text = "😒😁👌😊😂🤣🙌👍🎶✌️😎🫥🫡😵🥶😱🤡😺💩";
const characters = Array.from(text);
const randomIndex = Math.floor(Math.random() * characters.length);
const randomChar = characters[randomIndex];
console.log(randomChar);

const Home = () => {
  return (
    <ContainerStyled>
      <div style={{ marginTop: '100px', marginBottom: '50px', fontSize: '100px' }}>
        {randomChar}
      </div>
      <div style={{ fontSize: '50px', textAlign: 'center' }}>
        База знаний проекта {subdomain}
      </div>
    </ContainerStyled>
  );
};

export default Home;


// Styles

const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;

  user-select: none; /* Для современных браузеров */
  -webkit-user-select: none; /* Для Safari */
  -moz-user-select: none; /* Для Firefox */
  -ms-user-select: none; /* Для старых версий IE и Edge */
`;
