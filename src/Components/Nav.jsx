import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

// Icons
import { MdLightMode, MdDarkMode } from 'react-icons/md';

import { changeMode } from '../Store/mode.slice';

const Nav = styled.nav`
  width: 70%;
  margin: 20px auto;
  padding: 7px 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid ${(props) => props[props.theme].content};
  background-color: ${(props) => props[props.theme].background};
  & a {
    color: ${(props) => props[props.theme].content};
    text-decoration: none;
  }
  & > a {
    font-size: 24px;
  }
  & > ul {
    color: ${(props) => props[props.theme].content};
    list-style: none;
    font-size: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 20px;
  }

  & .themeTrigger {
    cursor: pointer;
    font-size: 1.5em;
  }
`;

Nav.defaultProps = {
  dark: {
    content: 'white',
    background: '#191919'
  },
  light: {
    content: '#191919',
    background: 'white'
  }
};

function _Nav() {
  const mode = useSelector((s) => s.themeMode);
  const dispatch = useDispatch();
  return (
    <Nav theme={mode}>
      <a href="/">咪路</a>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li onClick={(e) => dispatch(changeMode())} className="themeTrigger">
          {mode === 'dark' ? <MdLightMode /> : ''}
          {mode === 'light' ? <MdDarkMode /> : ''}
        </li>
        {/* <li>
          <Link  to="/tools">Tools</Link>
        </li> */}
      </ul>
    </Nav>
  );
}

export default _Nav;
