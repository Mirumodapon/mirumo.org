import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const Main = styled.main`
  width: 100vw;
  height: 100vh;

  textarea {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    font-family: sans-serif;
    text-align: center;
    padding: 0;
    border: 0;
    margin: 0;
    overflow: hidden;
    resize: none;
  }

  span {
    position: fixed;
    top: 0;
    left: 0;
    font-size: 30px;
    font-family: sans-serif;
    border: 0;
    margin: 0;
    padding: 2px 10px;
    visibility: hidden;
    white-space: pre;
  }
`;

function ScreenMessage() {
  const [text, setText] = useState('');
  const textarea = useRef(null);
  const span = useRef(null);

  const calculate = () => {
    const spanElement = span.current;
    const textareaElement = textarea.current;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (spanElement && textareaElement) {
      spanElement.innerHTML = text;

      if (text[text.length - 1] == '\n' || text == '') spanElement.innerHTML += '.';

      const rate = Math.min(
        screenWidth / spanElement.offsetWidth,
        screenHeight / spanElement.offsetHeight
      );
      textareaElement.style.fontSize = `${Math.floor(rate * 30)}px`;

      const paddingTopBottom = Math.floor(
        (screenHeight - Math.ceil(spanElement.offsetHeight * rate)) / 2
      );

      textareaElement.style.padding = `${paddingTopBottom}px 0`;
    }
  };

  useEffect(() => {
    calculate();
  }, [text]);

  return (
    <Main>
      <textarea
        ref={textarea}
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <span ref={span}></span>
    </Main>
  );
}

export default ScreenMessage;
