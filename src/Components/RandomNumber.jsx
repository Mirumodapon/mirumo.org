import React, { useState } from 'react';
import styled from 'styled-components';
import { number as randomNumber } from '../Utils/random';

// Components
import Popup from 'reactjs-popup';

const Section = styled.section`
  display: table;
  font-size: 20px;
  p {
    display: table-row;
    margin: 10px 0;
  }
  p > * {
    display: table-cell;
  }
  p > label {
    padding: 10px 5px;
    text-align: right;
  }
  input {
    width: 75px;
  }
  select,
  option {
    background: transparent;
    outline: none;
    border: none;
    font-size: 16px;
  }
  button {
    margin: 10px;
    font-size: 16px;
  }
`;
const Result = styled(Popup)`
  &-overlay .modal {
    background: white;
    width: min(500px, 75vw);
    height: min(300px, 80vw);
    border: 2px solid black;
    border-radius: 10px;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 50px);
    justify-content: center;
    align-items: flex-start;
    column-gap: 15px;
    row-gap: 25px;
    overflow-y: auto;
    font-size: 24px;
  }

  &-overlay {
    background: rgba(194, 194, 194, 0.6);
  }
`;

function RandomNumber() {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(100);
  const [type, setType] = useState('int');
  const [count, setCount] = useState(3);
  const [repeat, setRepeat] = useState(true);
  const [point, setPoint] = useState(2);

  const [result, setResult] = useState([]);
  const [open, setOpen] = useState(false);

  const handleGenerate = () => {
    setResult(randomNumber(from, to, type, repeat, count, point));
    setOpen(true);
  };

  return (
    <Section>
      <p>
        <label>From: </label>
        <input type="number" value={from} onChange={(e) => setFrom(parseInt(e.target.value), 10)} />
      </p>
      <p>
        <label>To: </label>
        <input type="number" value={to} onChange={(e) => setTo(parseInt(e.target.value), 10)} />
      </p>
      <p>
        <label>Type: </label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="int">Integer</option>
          <option value="float">Float</option>
        </select>
      </p>
      <p>
        <label>Point: </label>
        <input
          value={point}
          type="number"
          onChange={(e) => setPoint(parseInt(e.target.value), 10)}
          disabled={type === 'int'}
        />
      </p>
      <p>
        <label>Count: </label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value), 10)}
        />
      </p>
      <p>
        <label>Repeat: </label>
        <input type="checkbox" checked={repeat} onChange={(e) => setRepeat(e.target.value)} />
      </p>
      <button onClick={handleGenerate}>Generate</button>
      <Result open={open} onClose={() => setOpen(false)} closeOnDocumentClick modal nested>
        <section className="modal">
          {result.map((x, i) => (
            <span key={i}>{x}</span>
          ))}
        </section>
      </Result>
    </Section>
  );
}

export default RandomNumber;
