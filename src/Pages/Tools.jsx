import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Components
import { GridSection } from '../Components/GridBox';
import IconLink from '../Components/IconLink';

// Icons
import { MdLightMode, MdDarkMode, MdEditNote, MdQrCode } from 'react-icons/md';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { BsMarkdown } from 'react-icons/bs';
import { GrDocumentPdf } from 'react-icons/gr';
import { AiOutlineClockCircle } from 'react-icons/ai';

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  ${(props) => {
    if (props.mode === 'light')
      return `
      background: #fff;
      color: #000;
    `;
    return `background: #000;
      color: #fff;`;
  }}

  h1 {
    width: 80%;
    margin: auto;
    padding: 30px 20px 10px;
    border-bottom: 0.5px solid ${(props) => (props.mode === 'light' ? '#000' : '#fff')};
    display: flex;
    justify-content: space-between;
  }
  section {
    width: 80%;
    margin: 30px auto;
  }
`;

function Tools() {
  const [mode, setMode] = useState(window.localStorage.getItem('mode'));

  useEffect(() => {
    window.localStorage.setItem('mode', mode);
  }, [mode]);

  const changeMode = (e) => {
    if (mode === 'dark') setMode('light');
    else setMode('dark');
  };
  return (
    <Main mode={mode}>
      <h1>
        <span>Tools</span>
        <span onClick={changeMode}>{mode !== 'light' ? <MdLightMode /> : <MdDarkMode />}</span>
      </h1>
      <GridSection>
        <IconLink text="Screen Message" Icon={MdEditNote} to="/sm" />
        <IconLink text="QRcode" Icon={MdQrCode} to="/qr" />
        <IconLink text="Random" Icon={GiPerspectiveDiceSixFacesRandom} to="/ran" />
        {/* <IconLink text="Pdf Viewer " Icon={GrDocumentPdf} to="/pdf-viewer" /> */}
        {/* <IconLink text="Markdown" Icon={BsMarkdown} to="#" /> */}
        <IconLink text="Clock" Icon={AiOutlineClockCircle} to="/clock" />
      </GridSection>
    </Main>
  );
}

export default Tools;
