import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactjsPopup from 'reactjs-popup';
import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import { AiOutlineSetting } from 'react-icons/ai';

const Main = styled.main`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props[props.theme].background};
  color: ${(props) => props[props.theme].content};

  background-color: ${({ background }) => background};

  & > time {
    white-space: pre;
    text-align: center;
    ${({ fontColor, fontSize }) => `
      color: ${fontColor};
      font-size: ${fontSize};
    `};
  }

  & > svg {
    position: absolute;
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

function Clock() {
  const mode = useSelector((s) => s.themeMode);
  const [format, setFormat] = useState('DDD\nhh:mm:ss');
  const [time, setTime] = useState('loading...');

  const [popupSettingTrigger, setPopupSettingTrigger] = useState(false);
  const [fontSize, setFontSize] = useState('32px');
  const [background, setBackground] = useState(mode === 'dark' ? '#191919' : '#ffffff');
  const [fontColor, setFontColor] = useState(mode === 'dark' ? '#ffffff' : '#000000');

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(DateTime.now().toFormat(format));
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [format, fontSize, background, fontColor]);

  return (
    <Main fontSize={fontSize} background={background} fontColor={fontColor} theme={mode}>
      <time>{time}</time>
      <AiOutlineSetting onClick={(e) => setPopupSettingTrigger(true)} />
      <Popup
        className="setting"
        open={popupSettingTrigger}
        onClose={(e) => setPopupSettingTrigger(false)}
        closeOnDocumentClick
        position="right center"
        nested
        modal
      >
        <div className="setting-popup">
          <div>
            <label htmlFor="date-format">Format: </label>
            <textarea
              id="date-format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="font-size">FontSize:</label>
            <input
              id="font-size"
              type="text"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            />
          </div>
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
        </div>
      </Popup>
    </Main>
  );
}

export default Clock;
