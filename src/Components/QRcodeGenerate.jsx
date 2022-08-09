import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 25px;
  margin: 35px auto;

  textarea {
    font-size: 18px;
    resize: vertical;
  }
`;

// Components
import QRcode from 'qrcode.react';

function QRcodeGenerate({ renderAs, size, bgColor, fgColor, includeMargin }) {
  const [data, setData] = useState('');
  const handleChanges = (e) => setData(e.target.value);

  return (
    <Section>
      <QRcode
        value={data}
        renderAs={renderAs}
        size={size}
        bgColor={bgColor}
        fgColor={fgColor}
        includeMargin={includeMargin}
      />
      <textarea value={data} onChange={handleChanges} />
    </Section>
  );
}

export default QRcodeGenerate;
