import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

// Icons
import IG from './icons/Instagram';
import Github from './icons/Github';
import Tg from './icons/Telegram';

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
  background-color: ${(props) => props[props.theme].background};
  & > img {
    width: 150px;
    height: 150px;
    border: 2px solid ${(props) => props[props.theme].content};
    border-radius: 50%;
  }
  & > section {
    padding: 30px 0;
    display: flex;
    justify-content: center;
    column-gap: 25px;
    a {
      color: ${(props) => props[props.theme].content};
      text-decoration: none;
    }
    img {
      width: 30px;
    }
  }
`;

Main.defaultProps = {
  dark: {
    content: 'white',
    background: '#191919'
  },
  light: {
    content: '#191919',
    background: 'white'
  }
};

function Cover() {
  const mode = useSelector((s) => s.themeMode);
  return (
    <Main theme={mode}>
      <img src="/avatar.png" alt="avatar" />
      <section>
        <a href="https://github.mirumo.org">
          <Github theme={mode} />
        </a>

        <a href="https://tg.mirumo.org">
          <Tg theme={mode} />
        </a>
        <a href="https://ig.mirumo.org">
          <IG theme={mode} />
        </a>
      </section>
    </Main>
  );
}

export default Cover;
