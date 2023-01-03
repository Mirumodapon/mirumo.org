import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ReactjsPopup from 'reactjs-popup';

import { AiOutlineSetting } from 'react-icons/ai';

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  textarea {
    position: fixed;
    width: 100vw;
    height: 100vh;
    border: 0;
    margin: 0;

    text-align: ${({ position: [_, pos] }) => pos};
    font-family: sans-serif;
    overflow: hidden;
    resize: none;

    font-size: ${({ fontSize }) => fontSize};
    padding: ${({ padding, position }) => (position[0] === 'center' ? padding : 0)};
    background-color: ${({ background }) => background};
    color: ${({ fontColor }) => fontColor};
  }

  span {
    font-size: 30px;
    border: 0;
    margin: 0;

    visibility: hidden;
    top: 0;
    z-index: 9999;

    white-space: pre;
    background: gold;
    opacity: 0.4;
  }

  svg {
    position: fixed;
    right: 20px;
    bottom: 20px;
    font-size: 30px;
    color: ${({ fontColor }) => fontColor};
    opacity: 0;
    transition: opacity 2s ease-in-out 0.1s;
  }

  & > svg:hover {
    opacity: 1;
    transition: none;
  }
`;

const Popup = styled(ReactjsPopup)`
  &-content {
    position: absolute !important;
    right: 20px;
    bottom: 20px;
    border: 2px solid black;
    border-radius: 10px;
    padding: 20px;
    background: white;

    .setting-popup > div {
      display: table-row;
      line-height: 30px;
    }

    .setting-popup > div :is(label, input, textarea) {
      display: table-cell;
    }

    .setting-popup > div label {
      text-align: right;
    }

    .setting-popup :is(input, textarea):focus {
      outline: none;
    }
  }
`;

function ScreenMessage() {
  const [text, setText] = useState('');
  const [test, setTest] = useState('');

  const [fontSize, setFontSize] = useState(0);
  const [padding, setPadding] = useState(0);

  const spanRef = useRef(0);

  const mode = useSelector((s) => s.themeMode);
  const [background, setBackground] = useState(mode === 'dark' ? '#191919' : '#ffffff');
  const [fontColor, setFontColor] = useState(mode === 'dark' ? '#ffffff' : '#000000');
  const [position, setPosition] = useState(['center', 'center']);

  const [settingPanel, triggerSettingPanel] = useState(false);

  useEffect(
    function () {
      if (text.slice(-1) == '\n' || test == '') setTest(text + '.');
      else setTest(text);
    },
    [text]
  );

  useEffect(
    function () {
      const { offsetWidth, offsetHeight } = spanRef.current;
      const { innerWidth, innerHeight } = window;
      const rate = Math.min(innerHeight / offsetHeight, innerWidth / offsetWidth);
      setFontSize(`${Math.floor(rate * 29.5)}px`);

      const padding = (innerHeight - Math.ceil(rate * offsetHeight)) / 2;
      setPadding(`${padding}px 0;`);
    },
    [test]
  );

  const handlePositionChange = (e) => {
    const { value } = e.target;
    setPosition(value.split(' '));
  };

  return (
    <Main
      fontSize={fontSize}
      padding={padding}
      background={background}
      fontColor={fontColor}
      position={position}
    >
      <textarea
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck="false"
      ></textarea>
      <span className="test" ref={spanRef}>
        {test}
      </span>
      <AiOutlineSetting onClick={(e) => triggerSettingPanel(true)} />
      <Popup
        className="setting"
        open={settingPanel}
        onClose={(e) => triggerSettingPanel(false)}
        closeOnDocumentClick
        position="right center"
        nested
        modal
      >
        <div className="setting-popup">
          <div>
            <label htmlFor="background">Background:</label>
            <input
              id="background"
              type="color"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="font-color">FontColor: </label>
            <input
              id="font-color"
              type="color"
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="position">Position</label>
            <select id="position" onChange={handlePositionChange} value={position.join(' ')}>
              <option value="top right">top right</option>
              <option value="top center">top center</option>
              <option value="top left">top left</option>
              <option value="center right">center right</option>
              <option value="center center">center center</option>
              <option value="center left">center left</option>
            </select>
          </div>
        </div>
      </Popup>
    </Main>
  );
}

export default ScreenMessage;
