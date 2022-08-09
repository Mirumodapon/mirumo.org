import React, { useState } from 'react';
import styled from 'styled-components';

const defaultStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: '25px;',
  margin: '35px auto',
  textarea: { fontSize: '18px', resize: 'vertical' },
  input: { display: 'none' }
};
const activeStyled = {
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgba(194, 194, 194, 0.6)',

  textarea: { display: 'none' },
  input: { position: 'fixed', bottom: '20px' }
};

const Section = styled.section((props) => (props.active ? activeStyled : defaultStyle));

// Components
import QRcode from 'qrcode.react';

function QRcodeGenerate({ renderAs, size, bgColor, fgColor, includeMargin }) {
  const [data, setData] = useState('');
  const handleChanges = (e) => setData(e.target.value);

  const [activeSize, setActiveSize] = useState(300);
  const [isActive, setActive] = useState(false);
  const handleDoubleClick = (e) => setActive(true);
  const handleClose = (e) => {
    if (isActive && window.innerHeight - e.pageY > 60) {
      setActive(false);
    }
  };
  return (
    <Section active={isActive} onClick={handleClose}>
      <QRcode
        value={data}
        renderAs={renderAs}
        size={isActive ? activeSize : size}
        bgColor={bgColor}
        fgColor={fgColor}
        includeMargin={isActive ? true : includeMargin}
        onDoubleClick={handleDoubleClick}
      />
      <textarea value={data} onChange={handleChanges} />
      <input
        type="range"
        value={activeSize}
        onChange={(e) => setActiveSize(e.target.value)}
        max="500"
        min="128"
      />
    </Section>
  );
}

export default QRcodeGenerate;
