import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const Textarea = styled.textarea`
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
  ${(props) => `
  color: ${props.fontColor};
  background: ${props.background}`}
`;

const Span = styled.span`
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
`;

function ScreenMessage() {
  const textarea = useRef(null);
  const span = useRef(null);

  const [color, setColor] = useState('black');
  const [background, setBackground] = useState('white');

  const calculate = () => {
    const spanElement = span.current;
    const textareaElement = textarea.current;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (spanElement && textareaElement) {
      const value = textareaElement.value;
      spanElement.textContent = value;

      if (value[value.length - 1] === '\n' || value === '') spanElement.innerHTML += '.';

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

  const handleTextareaChange = (e) => calculate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (textarea.current) textarea.current.value = query.get('text') || query.get('t') || '';
    setBackground(query.get('background') || query.get('b') || 'white');
    setColor(query.get('color') || query.get('c') || 'black');

    calculate();
  }, []);

  return (
    <>
      <Textarea
        ref={textarea}
        onChange={handleTextareaChange}
        autoFocus
        fontColor={color}
        background={background}
      ></Textarea>
      <Span ref={span}></Span>
    </>
  );
}

export default ScreenMessage;
