import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { changeMode } from '../Store/mode.slice';
// Components
import { GridSection } from '../Components/GridBox';
import IconLink from '../Components/IconLink';

// Icons
import { MdEditNote, MdQrCode, MdDarkMode, MdLightMode } from 'react-icons/md';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
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
      color: #191919;
    `;
    return `background: #191919;
      color: #fff;`;
  }}

  h1 {
    width: 80%;
    margin: auto;
    padding: 30px 20px 10px;
    border-bottom: 0.5px solid ${(props) => (props.mode === 'light' ? '#191919' : '#fff')};
    display: flex;
    justify-content: space-between;
  }
  section {
    width: 80%;
    margin: 30px auto;
  }
`;

function Tools() {
  const mode = useSelector((s) => s.themeMode);
  const dispatch = useDispatch();

  return (
    <Main mode={mode}>
      <h1>
        <span>Tools</span>
        <span onClick={(e) => dispatch(changeMode())} className="themeTrigger">
          {mode === 'dark' ? <MdLightMode /> : ''}
          {mode === 'light' ? <MdDarkMode /> : ''}
        </span>
      </h1>
      <GridSection>
        <IconLink text="Screen Message" Icon={MdEditNote} to="/sm" />
        <IconLink text="QRcode" Icon={MdQrCode} to="/qr" />
        <IconLink text="Random" Icon={GiPerspectiveDiceSixFacesRandom} to="/ran" />
        <IconLink text="Clock" Icon={AiOutlineClockCircle} to="/clock" />
      </GridSection>
    </Main>
  );
}

export default Tools;
