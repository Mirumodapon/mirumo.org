import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  AiOutlineSetting,
  AiOutlineDelete,
  AiOutlineClear,
  AiOutlineCloseCircle
} from 'react-icons/ai';
import { MdRemove, MdOutlineAdd } from 'react-icons/md';
import { BiAlarmAdd } from 'react-icons/bi';
import { DateTime, Duration } from 'luxon';

import { removeAlarm, addAlarm, changeFormat, clearDue, sort } from '../../Store/alarm.slice';

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props[props.theme].background};
  color: ${(props) => props[props.theme].content};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & > time {
    font-size: ${({ fontSize }) => fontSize}px;
  }

  .due {
    color: red;
  }

  .buttons {
    color: ${(props) => props[props.theme].content};
    position: fixed;
    right: 20px;
    bottom: 20px;
    font-size: 30px;
    opacity: 0;
    transition: opacity 2s ease-in-out 0.1s;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .buttons * {
    margin: 0 3px;
  }

  & > .buttons:hover {
    opacity: 1;
    transition: none;
  }

  .setting .control {
    height: 95vh;
    width: 300px;
    position: fixed;
    top: 0;
    right: -400px;
    bottom: 0;
    margin: auto 0;
    border: 2px solid ${(props) => props[props.theme].content};
    border-radius: 15px;
    color: ${(props) => props[props.theme].content};
    background-color: ${(props) => props[props.theme].background};
    z-index: 12;
    transition: right 0.5s ease-out 0.1s;
  }

  .setting.active .control {
    right: 20px;
  }

  .setting .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: transparent;
    display: none;
    z-index: 10;
  }

  .setting.active .bg {
    display: block;
  }

  .option {
    width: 90%;
    margin: 15px auto 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 18px;
  }

  .option svg {
    font-size: 24px;
  }

  .option * {
    margin: 0 3px;
  }

  .option input {
    width: 100px;
  }

  .control {
    overflow-y: auto;
  }

  .control > div {
    // background: tomato;
    width: 90%;
    margin: 8px auto;
    border-bottom: 1px solid ${(props) => props[props.theme].content};
    padding: 20px 5px;
    position: relative;
  }

  .control > div div {
    font-size: 1.2em;
    margin: 5px 0;
    font-weight: bold;
  }

  .control > div.due > div {
    color: red;
  }

  .control > div svg {
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
    font-size: 20px;
  }

  .footer {
    position: fixed;
    bottom: 0;
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

function Alarm() {
  const mode = useSelector((s) => s.themeMode);
  const alarms = useSelector((s) => s.alarm.alarms);
  const format = useSelector((s) => s.alarm.format);
  const [setting, setSetting] = useState(false);
  const [fontSize, setFontSize] = useState(32);

  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    const interval = setInterval(function () {
      forceUpdate();
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const dispatch = useDispatch();

  const _removeAlarm = (index) => {
    if (confirm('Are you sure to delete?')) dispatch(removeAlarm({ index }));
  };
  const _addAlarm = (e) => {
    const time = prompt('Set Alarm...', DateTime.now().toString());
    if (time !== '') dispatch(addAlarm({ time }));
  };

  const toAlarmBlock = (x, i) => {
    const time = DateTime.fromISO(x);
    const reminder = time - DateTime.now();

    if (reminder < 0) {
      dispatch(sort());
    }

    return (
      <div key={i} className={reminder < 0 ? 'due' : ''}>
        <time>{time.toFormat('DD T')}</time>
        <div>{Duration.fromMillis(Math.abs(reminder)).toFormat(format)}</div>
        <AiOutlineDelete onClick={(e) => _removeAlarm(i)} />
      </div>
    );
  };

  const theCloseRemind = () => {
    if (alarms.length === 0) return <span>No Alarm...</span>;

    const time = DateTime.fromISO(alarms[0]);
    const reminder = time - DateTime.now();

    return (
      <>
        <time className={reminder < 0 ? 'due' : ''}>
          {Duration.fromMillis(Math.abs(reminder)).toFormat(format)}
        </time>
        <p>{DateTime.fromISO(alarms[0]).toFormat('DD TT')}</p>
      </>
    );
  };

  return (
    <Main theme={mode} fontSize={fontSize}>
      {theCloseRemind()}
      <section className="buttons">
        <MdOutlineAdd onClick={(e) => setFontSize(fontSize + 1)} />
        <MdRemove onClick={(e) => setFontSize(fontSize - 1)} />
        <AiOutlineSetting onClick={(e) => setSetting(true)} className="setting" />
      </section>
      <section className={`setting${setting ? ' active' : ''}`}>
        <div className="control">
          <p className="option">
            <label>Format: </label>
            <input
              value={format}
              onChange={(e) => dispatch(changeFormat({ format: e.target.value }))}
            />
            <BiAlarmAdd onClick={_addAlarm} />
            <AiOutlineClear
              onClick={(e) => (confirm('Clear due alarm?') ? dispatch(clearDue()) : null)}
            />
            <AiOutlineCloseCircle onClick={(e) => setSetting(false)} />
          </p>
          {alarms.map(toAlarmBlock)}
        </div>
        <div className="bg" onClick={(e) => setSetting(false)}></div>
      </section>
      <p className="footer">Current: {DateTime.now().toFormat('DD TT')}</p>
    </Main>
  );
}

export default Alarm;
