import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { changeMode } from '../Store/mode.slice';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import axios from 'axios';

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props[props.theme].background};
  color: ${(props) => props[props.theme].content};

  & :is(article, section, h1, a) {
    margin: 0;
    padding: 0;
    margin: 0;
    border: 0;
  }

  article {
    width: min(500px, 100vw);
    padding: 20px 0;
    margin: 0 auto;
  }

  section {
  }

  h1 {
    text-align: center;
  }

  a {
    display: block;
    border: 2px solid ${(props) => props[props.theme].content};
    display: flex;
    width: 80%;
    height: 40px;
    margin: 20px auto;
    border-radius: 20px;
    text-align: center;
    color: inherit;
    text-decoration: none;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  .themeTrigger {
    display: block;
    position: fixed;
    top: 10px;
    right: 10px;
    font-size: 24px;
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

function Link() {
  const mode = useSelector((s) => s.themeMode);
  const [lns, setIns] = useState({ sections: [] });

  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/Mirumodapon/mirumo.org/link/link.json'
        );
        setIns(response.data);
      } catch (error) {}
      return () => {};
    })();
  }, []);

  return (
    <Main theme={mode}>
      <article>
        {lns.sections.map((x) => (
          <section key={x.title}>
            <h1>- {x.title} -</h1>
            {x.links.map((y) => (
              <a href={y.url} target="_blank">
                {y.label}
              </a>
            ))}
          </section>
        ))}
      </article>
      <span onClick={(e) => dispatch(changeMode())} className="themeTrigger">
        {mode === 'dark' ? <MdLightMode /> : ''}
        {mode === 'light' ? <MdDarkMode /> : ''}
      </span>
    </Main>
  );
}

export default Link;
