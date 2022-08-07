import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Main = styled.main`
  width: min(500px, 100vw);
  height: 100vh;
  margin: 0 auto;
  padding: 10px 0;
  h1 {
    font-size: 1.3em;
    text-align: center;
    &::before,
    &::after {
      content: '-';
      margin: 0 5px;
    }
  }
  a {
    display: flex;
    width: 80%;
    height: 40px;
    margin: 20px auto;
    border: 2px solid black;
    border-radius: 20px;
    text-align: center;
    color: inherit;
    text-decoration: none;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    &:hover {
      background: tomato;
      color: gold;
      font-weight: bold;
    }
  }
`;

function Link() {
  const [sections, setSections] = useState([]);
  const now = Date.now() / 1000;

  const linkFilter = (x) =>
    x.iat >= 0 && x.exp >= 0 && ((x.iat === 0 && x.exp === 0) || (x.iat < now && x.exp > now));

  const fetchLinks = () =>
    fetch('https://raw.githubusercontent.com/Mirumodapon/mirumo.org/link/link.json')
      .then((x) => x.json())
      .then((x) => x.sections)
      .then((x) => setSections(x));

  useEffect(function () {
    fetchLinks();
  }, []);

  return (
    <Main>
      {sections.map((x, index) => (
        <section key={index}>
          <h1>{x.title}</h1>
          {x.links.filter(linkFilter).map((y, _index) => (
            <a key={_index} href={y.url}>
              {y.label}
            </a>
          ))}
        </section>
      ))}
    </Main>
  );
}

export default Link;
