import React from 'react';
import styled from 'styled-components';

// Components
import { Section, P, Ul, H1, Table } from '../Components/AboutComponents';

// Icons
// import { FaNodeJs } from 'react-icons/fa';
import {
  FaNodeJs,
  FaReact,
  FaDocker,
  FaGitAlt,
  FaVuejs,
  FaPython,
  FaPhp,
  FaSass
} from 'react-icons/fa';
import { BiCodeAlt } from 'react-icons/bi';
import { SiMysql, SiMongodb, SiRedux } from 'react-icons/si';

const Main = styled.main`
  margin: 0 auto;
  width: min(90%, 700px);
  font-size: 10px;
  @media screen and (max-width: 700px) {
    font-size: 9px;
  }
  @media screen and (max-width: 500px) {
    font-size: 8px;
  }
`;

function About() {
  return (
    <Main>
      <Section>
        <H1>Website of 咪路</H1>
        <P>Hi! My name is 林冠渝, as know as 咪路.</P>
        <P>I am a Computer Science major at National Ping-Tung University.</P>
      </Section>
      <Section>
        <H1>I Am Interesting in...</H1>
        <Ul>
          <li>Web Application Develop</li>
          <li>FUll Stack Develop</li>
          <li>Mobile Application Develop</li>
          <li>UI/UX Design</li>
        </Ul>
      </Section>
      <Section>
        <H1>Experiences</H1>
        <Ul>
          <li>哈佛文理補習班 數學科/自然科 助教 (2019.7-2019.8)</li>
          <li>SITCON Develop Group (2020-2021)</li>
          <li>110年度智慧創新跨域人才培育計畫--物聯網應用微學程 基礎 python 講師 (2021)</li>
          <li>110年度智慧創新跨域人才培育計畫--物聯網應用微學程 Arduino 研習課程講師 (2021)</li>
        </Ul>
      </Section>
      <Section>
        <H1>My Skill...</H1>
        <P
          style={{
            display: 'flex',
            fontSize: '40px',
            columnGap: '20px',
            rowGap: '20px',
            flexWrap: 'wrap'
          }}
        >
          <BiCodeAlt title="web" />
          <FaNodeJs title="node.js" />
          <FaReact title="react.js" />
          <FaVuejs title="vue.js" />
          <SiRedux title="redux" />
          <FaSass title="sass" />
          <FaDocker title="docker" />
          <FaGitAlt title="git" />
          <SiMongodb title="mongodb" />
          <SiMysql title="mysql" />
          <FaPython title="python3" />
          <FaPhp title="php" />
        </P>
        <P>
          You can watch my works in my <a href="https://github.com/mirumodapon">GitHub</a>.
        </P>
      </Section>
      <Section>
        <H1>Contact</H1>
        <Table cellPadding="5">
          <thead></thead>
          <tbody>
            <tr>
              <td>EMAIL: </td>
              <td>mail@mirumo.org</td>
            </tr>
            <tr>
              <td>INSTAGARM: </td>
              <td>@mirumo_0915</td>
            </tr>
            <tr>
              <td>TELEGRAM: </td>
              <td>@Mirumodapon</td>
            </tr>
          </tbody>
          <tfoot></tfoot>
        </Table>
      </Section>
    </Main>
  );
}

export default About;
