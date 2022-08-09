import React, { useState } from 'react';
import styled from 'styled-components';

// Components
import popup from 'reactjs-popup';
import QRcodeGenerate from '../Components/QRcodeGenerate';

// Icons
import { AiOutlineQrcode, AiOutlineSetting } from 'react-icons/ai';

// styled
const Main = styled.main`
  width: 80%;
  margin: auto;
  & > h1 {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 0.5px solid black;
    font-size: 28px;

    button {
      margin: 0 20px;
      padding: 0;
      border: 0;
      background: transparent;
      font-size: 32px;
      color: inherit;
      cursor: pointer;
    }
  }
`;

const SettingPopup = styled(popup)`
  &-overlay .setting {
    background: white;
    width: min(270px, 75vw);
    border: 2px solid black;
    border-radius: 10px;
    padding: 20px;
    display: table;

    section {
      display: table-row;

      & > * {
        display: table-cell;
        padding: 8px;
        vertical-align: middle;
      }

      div {
        display: flex;
        align-items: center;
      }

      input {
        font-size: 16px;
        margin: 0;
        padding: 0;
        vertical-align: middle;
      }
      input[type='text'] {
        width: 70px;
      }
      input[type='range'] {
        width: 120px;
      }
      label {
        text-align: right;
      }
    }
  }
  &-overlay {
    background: rgba(194, 194, 194, 0.6);
  }
`;

function QRcode() {
  const [renderAs, setReaderAs] = useState('svg');
  const [size, setSize] = useState(128);
  const [bgColor, setBgColor] = useState('white');
  const [fgColor, setFgColor] = useState('black');
  const [includeMargin, setIncludeMArgin] = useState(false);

  const handleBgColor = (e) => setBgColor(e.target.value);
  const handleFgColor = (e) => setFgColor(e.target.value);
  const handleSize = (e) => setSize(e.target.value);
  const handleRenderAs = (e) => setReaderAs(e.target.value);
  const handleIncludeMargin = (e) => setIncludeMArgin(e.target.checked);

  return (
    <Main>
      <h1>
        QRcode
        <SettingPopup
          trigger={
            <button>
              <AiOutlineSetting />
            </button>
          }
          modal
          nested
        >
          <form className="setting">
            <section>
              <label>Background Color:</label>
              <div>
                <input type="text" value={bgColor} onChange={handleBgColor} />
              </div>
            </section>
            <section>
              <label>QRcode Color:</label>
              <div>
                <input type="text" value={fgColor} onChange={handleFgColor} />
              </div>
            </section>
            <section>
              <label>Size:</label>
              <div>
                <input type="range" max="200" min="50" onChange={handleSize} value={size} />
              </div>
            </section>
            <section>
              <label>Render As: </label>
              <div>
                <input
                  type="radio"
                  value="svg"
                  name="render"
                  onChange={handleRenderAs}
                  checked={renderAs === 'svg'}
                />
                <label>SVG</label>
                <input
                  type="radio"
                  value="canvas"
                  name="render"
                  onChange={handleRenderAs}
                  checked={renderAs === 'canvas'}
                />
                <label>Canvas</label>
              </div>
            </section>
            <section>
              <label>Include Margin:</label>
              <div>
                <input type="checkbox" value={includeMargin} onChange={handleIncludeMargin} />
              </div>
            </section>
          </form>
        </SettingPopup>
      </h1>
      <QRcodeGenerate {...{ bgColor, fgColor, size, includeMargin, renderAs }} />
    </Main>
  );
}

export default QRcode;
