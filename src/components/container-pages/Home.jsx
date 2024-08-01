import React from 'react'

const subdomain = APP.constant('account').subdomain;

const text = "😒😁👌😊😂🤣🙌👍💕😘😍❤️🎶✌️😎😶‍🌫️🫥🫡😵🥶😱🤡😺💩🤡";
const characters = Array.from(text);
const randomIndex = Math.floor(Math.random() * characters.length);
const randomChar = characters[randomIndex];

const Home = () => {
  return (
    <div
      style={{ 
        height: '100%',
        width: '100%',
        fontSize: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ marginTop: '100px', marginBottom: '50px', fontSize: '100px' }}>
        {randomChar}
      </div>
      <div style={{ fontSize: '50px' }}>
        База знаний проекта {subdomain}
      </div>
    </div>
  );
};

export default Home;
