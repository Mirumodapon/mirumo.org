import React, { useState } from 'react';
import styled from 'styled-components';
import { Document, Page } from 'react-pdf/dist/esm/entry';
import 'pdfjs-dist/build/pdf.worker.entry';

// Icons
import { GrFormPreviousLink, GrFormNextLink } from 'react-icons/gr';
import { BiFullscreen } from 'react-icons/bi';

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .react-pdf__Document {
    max-width: 80vw;
    max-height: 80vh;
    canvas {
      width: auto !important;
      height: auto !important;
      max-width: 80vw !important;
      max-height: 80vh !important;
    }
  }
`;

const Bar = styled.div`
  input {
    display: none;
  }
  label {
    font-size: 16px;
    text-decoration: underline;
  }

  svg {
    font-size: 32px;
  }

  position: fixed;
  width: 100vw;
  bottom: 20px;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
`;

const Options = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 20px;
  font-size: 20px;
`;

function PdfSlide({ pdf }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState(pdf ?? null);

  const handleKeydown = ({ keyCode }) => {
    switch (keyCode) {
      case 32:
      case 39:
      case 40:
        handleNextPage();
        break;
      case 37:
      case 38:
        handlePreviousPage();
        break;
      default:
        break;
    }
  };
  const handleFullscreen = (e) => document.body.requestFullscreen();

  const onDocumentLoadSuccess = (e) => setNumPages(e.numPages);
  const onLoadError = (e) => setFile(null);

  const handleFileSelect = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
      setFile(e.target.result);
    };
  };

  const handleNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber((prevState) => prevState + 1);
    }
  };
  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prevState) => prevState - 1);
    }
  };

  return (
    <Main tabIndex={0} onKeyDown={handleKeydown}>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onLoadError}
        options={{
          cMapUrl: '/pdf/',
          cMapPacked: true
        }}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <Bar>
        <GrFormPreviousLink onClick={handlePreviousPage} />
        {file ? (
          <span>
            {pageNumber}/{numPages}
          </span>
        ) : (
          <>
            <label htmlFor="file-selector">Select File.</label>
            <input type="file" onChange={handleFileSelect} id="file-selector" />
          </>
        )}
        <GrFormNextLink onClick={handleNextPage} />
      </Bar>
      <Options>
        <BiFullscreen onClick={handleFullscreen} color="black" />
      </Options>
    </Main>
  );
}

export default PdfSlide;
