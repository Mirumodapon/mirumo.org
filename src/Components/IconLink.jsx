import React from 'react';
import { Link as link } from 'react-router-dom';
import styled from 'styled-components';

import { MdOutlineDisabledByDefault } from 'react-icons/md';

// styled
const Link = styled(link)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  row-gap: 5px;
  width: 120px;
  color: inherit;
  text-decoration: none;
  span {
    width: 100%;
    font-size: ${({ fontSize }) => fontSize};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }
`;

function IconButton({ text, Icon: icon, to, fontSize, iconSize }) {
  const Icon = icon ?? MdOutlineDisabledByDefault; // eslint-disable-line react/jsx-pascal-case
  return (
    <Link to={to} fontSize={fontSize ?? '18px'}>
      <Icon size={iconSize ?? '2.4em'} />
      <span>{text}</span>
    </Link>
  );
}

export default IconButton;
