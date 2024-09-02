// src/components/LoadingSpinner.js
import React from 'react';

const spinnerStyle = {
  border: '4px solid rgba(0, 0, 0, 0.1)', // Light grey background
  borderLeft: '4px solid #3498db', // Blue spinner color
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  animation: 'spin 1s linear infinite',
  margin: 'auto',
};

const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);

const LoadingSpinner = () => {
  return (<div style={spinnerStyle} />)
};

export default LoadingSpinner;
