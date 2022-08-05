import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  width: 70%;
  margin: 0 auto;
  padding: 10px 3px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 0.5px solid black;

  & a {
    color: inherit;
    text-decoration: none;
  }

  & > a {
    font-size: 24px;
  }

  & > ul {
    list-style: none;
    font-size: 16px;

    display: flex;
    flex-direction: row;
    column-gap: 20px;
  }
`;

function _Nav(): JSX.Element {
  return (
    <Nav>
      <a href="/">咪路</a>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        {/* <li>
          <Link  to="/tools">Tools</Link>
        </li> */}
      </ul>
    </Nav>
  );
}

export default _Nav;
