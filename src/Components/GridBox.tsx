import React from 'react';
import styled from 'styled-components';

export const GridSection = styled.section`
  display: grid;

  grid-template-columns: repeat(auto-fill, 100px);
  justify-content: center;
  column-gap: 15px;
  row-gap: 15px;
`;
