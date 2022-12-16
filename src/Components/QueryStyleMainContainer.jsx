import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const _Main = styled.main`
  ${(props) => `
    color: ${props.color};
    background: ${props.background}`}
`;

function Main({ children, ...props }) {
  const [color, setColor] = useState('white');
  const [background, setBackground] = useState('black');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    const mode = window.localStorage.getItem('mode');

    setBackground(
      query.get('background') || query.get('b') || (mode === 'light' ? '#fff' : '#000')
    );
    setColor(query.get('color') || query.get('c') || (mode === 'light' ? '#000' : '#fff'));
  }, []);

  return <_Main {...{ ...props, color, background }}>{children}</_Main>;
}

export default Main;
