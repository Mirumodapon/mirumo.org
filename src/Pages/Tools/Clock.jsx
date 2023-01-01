import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactjsPopup from 'reactjs-popup';
import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';

// Components
import QueryStyleMainContainer from '../../Components/QueryStyleMainContainer';
// Icon
import { AiOutlineSetting } from 'react-icons/ai';
import { BsInfoCircleFill } from 'react-icons/bs';

const Main = styled(QueryStyleMainContainer)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props[props.theme].background};
  color: ${(props) => props[props.theme].content};

  time {
    white-space: pre;
    text-align: center;
    line-height: 40px;
    ${(props) => `
      font-family: ${props.family};
      font-size: ${props.size};`}
  }

  .setting {
    position: fixed;
    bottom: 10px;
    right: 10px;
    font-size: 32px;
    opacity: 0;
    transition: opacity 2s ease-in-out 0.1s;
  }

  .setting:hover {
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
  &-overlay {
    background-color: rgba(150, 150, 150, 0.6);
  }

  &-content {
    background: white;
    border: 2px solid black;
    border-radius: 10px;
    padding: 5px;
    position: absolute !important;
    right: 20px;
    bottom: 30px;
  }

  &-content > div {
    display: table;
  }
  &-content > div > div {
    margin: 15px;
  }
  &-content :is(input, label, textarea) {
    display: table-cell;
    font-size: 18px;
    resize: vertical;
    word-break: break-word;
  }
  &-content :is(input, label, textarea):focus {
    outline: none;
  }

  &-content table > tr > td {
    margin: 0;
  }
  &-content table > tr > td:first-child {
    border-right: 1px solid black;
  }
`;

function Clock() {
  const [format, setFormat] = useState('DDD\nhh:mm:ss');
  const [family, setFamily] = useState('inherit');
  const [size, setSize] = useState('32px');
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(false);
  const [time, setTime] = useState(DateTime.now().toFormat(format));
  const mode = useSelector((s) => s.themeMode);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(DateTime.now().toFormat(format));
    }, 100);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <Main family={family} size={size} theme={mode}>
      <time>{time}</time>
      <AiOutlineSetting className="setting" onClick={(e) => setOpen(true)} />
      <Popup
        className="setting"
        open={open}
        onClose={(e) => setOpen(false)}
        closeOnDocumentClick
        modal
        nested
      >
        <div>
          <div>
            <BsInfoCircleFill
              style={{ float: 'right' }}
              onClick={(e) => {
                setInfo(true);
                setOpen(false);
              }}
            />
            <label>Format:</label>
            <textarea value={format} onChange={(e) => setFormat(e.target.value)}></textarea>
          </div>
          <div>
            <label>Family: </label>
            <input value={family} onChange={(e) => setFamily(e.target.value)} />
          </div>
          <div>
            <label>Size: </label>
            <input value={size} onChange={(e) => setSize(e.target.value)} />
          </div>
        </div>
      </Popup>
      <Popup open={info} onClose={(e) => setInfo(false)} closeOnDocumentClick modal nested>
        <table border="0" cellPadding={5}>
          <tr>
            <td>D,DD,DDD,DDDD</td>
            <td>full date</td>
          </tr>
          <tr>
            <td>y,yy,yyyy</td>
            <td>year</td>
          </tr>
          <tr>
            <td>L, LL, M, MM</td>
            <td>month</td>
          </tr>
          <tr>
            <td>LLL, MMM</td>
            <td>month word(abbreviated)</td>
          </tr>
          <tr>
            <td>LLLL, MMMM</td>
            <td>month word</td>
          </tr>
          <tr>
            <td>d, dd</td>
            <td>day of month</td>
          </tr>
          <tr>
            <td>H, HH</td>
            <td>hour in 24-hour</td>
          </tr>
          <tr>
            <td>h, hh</td>
            <td>hour in 12-hour</td>
          </tr>
          <tr>
            <td>m, mm</td>
            <td>minute</td>
          </tr>
          <tr>
            <td>s, ss</td>
            <td>second</td>
          </tr>
          <tr>
            <td>u, uu, uuu</td>
            <td>fraction second</td>
          </tr>
          <tr>
            <td>S, SSS</td>
            <td>millisecond</td>
          </tr>
        </table>
        <a
          href="https://moment.github.io/luxon/#/formatting?id=table-of-tokens"
          style={{ float: 'right' }}
        >
          more
        </a>
      </Popup>
    </Main>
  );
}

export default Clock;
