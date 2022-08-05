import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// interfaces
interface linkType {
  label: string;
  url: string;
  iat: Number;
  exp: Number;
}

interface sectionType {
  links: Array<linkType>;
  title: string;
}

const Main = styled.main`
  width: min(500px, 100vw);
  height: 100vh;
  margin: 0 auto;

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

function Link(): JSX.Element {
  const [sections, setSections] = useState([] as Array<sectionType>);
  const now = Date.now() / 1000;

  const linkFilter = (x: linkType) =>
    x.iat >= 0 && x.exp >= 0 && ((x.iat === 0 && x.exp === 0) || (x.iat < now && x.exp > now));

  const fetchLinks = () =>
    fetch('https://raw.githubusercontent.com/Mirumodapon/mirumo.org/link/link.json')
      .then((x) => x.json())
      .then((x) => x.sections)
      .then((x: Array<sectionType>) => setSections(x));

  useEffect(function () {
    fetchLinks();
  }, []);

  return (
    <Main>
      {(sections as Array<sectionType>).map((x: sectionType, index: React.Key) => (
        <section key={index}>
          <h1>{x.title}</h1>
          {(x.links as Array<linkType>).filter(linkFilter).map((y: linkType, _index: React.Key) => (
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
