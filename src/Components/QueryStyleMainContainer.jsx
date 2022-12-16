import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const _Main = styled.main`
  ${(props) => `
    color: ${props.color};
    background: ${props.background}`}
`;

function Main({ children, ...props }) {
  const [color, setColor] = useState('black');
  const [background, setBackground] = useState('white');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    setBackground(query.get('background') || query.get('b') || 'white');
    setColor(query.get('color') || query.get('c') || 'black');
  }, []);

  return <_Main {...{ ...props, color, background }}>{children}</_Main>;
}

export default Main;
