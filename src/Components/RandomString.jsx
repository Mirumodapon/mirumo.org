import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { ABC, abc, _123, symbol, string as randomString } from '../Utils/random';

// Components
import Popup from 'reactjs-popup';

const Section = styled.section`
  font-size: 20px;

  input[type='checkbox'] {
    margin: 10px;
  }

  p,
  label {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  input[type='text'],
  input[type='number'] {
    width: 130px;
    font-size: 18px;
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
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    column-gap: 15px;
    row-gap: 10px;
    overflow-y: auto;
    span {
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      :hover {
        color: red;
      }
    }
  }

  &-overlay {
    background: rgba(194, 194, 194, 0.6);
  }
`;

function RandomString() {
  const [count, setCount] = useState(3);
  const [length, setLength] = useState(10);
  const [result, setResult] = useState([]);
  const [open, setOpen] = useState(false);

  const A = useRef(0);
  const a = useRef(0);
  const s = useRef(0);
  const el = useRef(0);
  const els = useRef(0);
  const num = useRef(0);

  const handleGenerate = () => {
    setResult(
      randomString(
        `${A.current.checked ? ABC : ''}${a.current.checked ? abc : ''}${
          num.current.checked ? _123 : ''
        }${el.current.checked ? els.current.value : ''}${s.current.checked ? symbol : ''}`,
        length,
        count
      )
    );
    setOpen(true);
  };

  const handleCopy = (e) => {
    navigator.clipboard.writeText(e.target.innerHTML);
  };

  return (
    <Section>
      <p>
        <input type="checkbox" ref={A} />
        <label>A-Z</label>
      </p>
      <p>
        <input type="checkbox" ref={a} />
        <label>a-z</label>
      </p>
      <p>
        <input type="checkbox" ref={num} />
        <label>0-9</label>
      </p>
      <p>
        <input type="checkbox" ref={s} />
        <label>symbol({symbol})</label>
      </p>
      <p>
        <input type="checkbox" ref={el} />
        <label>Else: </label>
        <input type="text" ref={els} />
      </p>
      <p>
        <label>Length: </label>
        <input type="number" value={length} onChange={(e) => setLength(parseInt(e.target.value))} />
      </p>
      <p>
        <label>Count: </label>
        <input type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value))} />
      </p>
      <button onClick={handleGenerate}>Generate</button>
      <Result open={open} onClose={() => setOpen(false)} closeOnDocumentClick modal nested>
        <section className="modal">
          {result.map((x, i) => (
            <span key={i} onClick={handleCopy}>
              {x}
            </span>
          ))}
        </section>
      </Result>
    </Section>
  );
}

export default RandomString;
