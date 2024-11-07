import React, { useState } from 'react';

function App() {
  const [sqlOutput, setSqlOutput] = useState('');
  const [transposedText, setTransposedText] = useState(null);

  const transposeSQL = () => {
    const rows = sqlOutput.trim().split('\n');
    const headers = rows[0].replace(/\s+/g, '').split('|').map(header => header.trim());
    const data = rows.slice(2).map(row => row.split('|').map(cell => cell.trim()));

    const maxHeaderLength = Math.max(...headers.map(header => header.length))+ 4;

    let result = headers.map((header, index) => {
      const paddedHeader = header.padEnd(maxHeaderLength, ' ');
      const values = data.map(row => row[index]).join(', ');
      return `${paddedHeader}: ${values}`;
    }).join('\n');

    setTransposedText(result);
  };

  return (
  <div>
      <h2>SQL Transposer</h2>
      <textarea
      rows="10"
      placeholder="Paste here"
      value={sqlOutput}
      onChange={(e) => setSqlOutput(e.target.value)}
      style={{ width: '100%', padding: '10px', margin: '20px'}}
      />
      <button onClick={transposeSQL}>
      Transpose data
      </button>
      {transposedText && (
     <div style={{ margin: '20px', whiteSpace: 'pre-wrap', fontFamily: 'monospace'}}>
     <h3>Transposed Output</h3>
     <pre>{transposedText}</pre>
     </div>
     )}
  </div>
  );
}

export default App;
