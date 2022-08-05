import React from 'react';
import styled from 'styled-components';

// Icons
import instagramIcon from '../Assets/instagram.png';
import githubIcon from '../Assets/github.png';
import telegramIcon from '../Assets/telegram.png';

const Main = styled.main`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;

  & > img {
    width: 150px;
    height: 150px;

    border: 2px solid black;
    border-radius: 50%;
  }

  & > section {
    padding: 30px 0;

    display: flex;
    justify-content: center;

    column-gap: 25px;

    a {
      color: inherit;
      text-decoration: none;
    }

    img {
      width: 30px;
    }
  }
`;

function Cover(): JSX.Element {
  return (
    <Main>
      <img src="/avatar.png" alt="avatar" />
      <section>
        <a href="https://ig.mirumo.org">
          <img src={githubIcon} />
        </a>
        <a href="https://github.mirumo.org">
          <img src={instagramIcon} />
        </a>
        <a href="https://tg.mirumo.org">
          <img src={telegramIcon} />
        </a>
      </section>
    </Main>
  );
}

export default Cover;
