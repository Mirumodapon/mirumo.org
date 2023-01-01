import React from 'react';
import styled from 'styled-components';
import { Link, Route, Routes } from 'react-router-dom';

// Icons
import { TiSortNumerically } from 'react-icons/ti';
import { AiOutlineFieldString } from 'react-icons/ai';

// Components
import RandomNumber from '../../Components/RandomNumber';
import RandomString from '../../Components/RandomString';

const Main = styled.main`
  width: 80%;
  margin: auto;
  h1 {
    padding: 10px;
    border-bottom: 0.5px solid black;
    display: flex;
    align-items: center;
  }
`;

const Options = styled.section`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 12px;
  margin: 0 20px;

  a {
    color: inherit;
  }
`;

function Random() {
  return (
    <Main>
      <h1>
        Random
        <Options>
          <Link to="/ran/n">
            <TiSortNumerically />
          </Link>
          <Link to="/ran/s">
            <AiOutlineFieldString />
          </Link>
        </Options>
      </h1>
      <Routes>
        <Route path="/n" element={<RandomNumber />} />
        <Route path="/s" element={<RandomString />} />
      </Routes>
    </Main>
  );
}

export default Random;
