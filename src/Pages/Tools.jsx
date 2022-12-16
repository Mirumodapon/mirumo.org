import React from 'react';
import styled from 'styled-components';

// Components
import { GridSection } from '../Components/GridBox';
import IconLink from '../Components/IconLink';

// Icons
import { MdEditNote, MdQrCode } from 'react-icons/md';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { BsMarkdown } from 'react-icons/bs';
import { GrDocumentPdf } from 'react-icons/gr';
import { AiOutlineClockCircle } from 'react-icons/ai';

const Main = styled.main`
  width: 80%;
  margin: auto;
  h1 {
    padding: 10px;
    border-bottom: 0.5px solid black;
  }
  section {
    margin: 30px 0;
  }
`;

function Tools() {
  return (
    <Main>
      <h1>Tools</h1>
      <GridSection>
        <IconLink text="Screen Message" Icon={MdEditNote} to="/sm" />
        <IconLink text="QRcode" Icon={MdQrCode} to="/qr" />
        <IconLink text="Random" Icon={GiPerspectiveDiceSixFacesRandom} to="/ran" />
        <IconLink text="Pdf Viewer " Icon={GrDocumentPdf} to="/pdf-viewer" />
        {/* <IconLink text="Markdown" Icon={BsMarkdown} to="#" /> */}
        <IconLink text="Clock" Icon={AiOutlineClockCircle} to="/clock" />
      </GridSection>
    </Main>
  );
}

export default Tools;
