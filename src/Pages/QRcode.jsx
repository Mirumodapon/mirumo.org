import React from 'react';
import styled from 'styled-components';
import { Routes, Route, NavLink as Link } from 'react-router-dom';

// Components
import QRcodeGenerate from '../Components/QRcodeGenerate';
import QRcodeScanner from '../Components/QRcodeScanner';

// Icons
import { AiOutlineQrcode, AiOutlineCamera } from 'react-icons/ai';

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
    section {
      margin: 0 18px;
      display: flex;
      align-items: flex-end;
      flex-wrap: wrap;
      column-gap: 8px;
      row-gap: 5px;
    }
    a {
      color: inherit;
      text-decoration: none;
      font-weight: normal;
      font-size: 32px;
    }
  }
`;

function QRcode() {
  return (
    <Main>
      <h1>
        QRcode
        <section>
          <Link to="/qr/g">
            <AiOutlineQrcode />
          </Link>
          <Link to="/qr/s">
            <AiOutlineCamera />
          </Link>
        </section>
      </h1>

      <Routes>
        <Route path="/g" element={<QRcodeGenerate />} />
        <Route path="/s" element={<QRcodeScanner />} />
      </Routes>
    </Main>
  );
}

export default QRcode;
