import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState("");
  const [encryptedData, setEncryptedData] = useState("");
  const [decryptedData, setDecryptedData] = useState("");
  const [hash, setHash] = useState("");

  const handleEncrypt = () => {
    axios.post('http://localhost:3500/data', { message: data })
      .then((response) => {
        console.log("Encrypted data:", response.data);
        setEncryptedData(response.data); // Store the encrypted data
        setDecryptedData(""); // Clear decrypted data when new data is encrypted
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDecrypt = () => {
    if (encryptedData.encryptedData && encryptedData.iv) {
      axios.post('http://localhost:3500/decrypt', {
        encryptedData: encryptedData.encryptedData,
        iv: encryptedData.iv,
      })
      .then((response) => {
        console.log("Decrypted data:", response.data);
        setDecryptedData(response.data); // Store the decrypted data
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      console.error("No encrypted data available to decrypt.");
    }
  };

  const handleHash = () => {
    axios.post('http://localhost:3500/hash', { message: data })
      .then((response) => {
        console.log("Hashed data:", response.data);
        setHash(response.data.hash); // Store the hashed data
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <form onSubmit={(e) => { e.preventDefault(); handleEncrypt(); }}>
        <input
          type="text"
          onChange={(e) => setData(e.target.value)}
          value={data}
          placeholder="Enter your message"
        />
        <input type="submit" value="Encrypt" />
      </form>
      
      <button onClick={handleDecrypt} disabled={!encryptedData.encryptedData}>
        Decrypt
      </button>
      <button onClick={handleHash}>
        Hash
      </button>

      {encryptedData && (
        <div>
          <h2>Encrypted Data:</h2>
          <p>{encryptedData.encryptedData}</p>
          <p>IV: {encryptedData.iv}</p>
        </div>
      )}
      
      {decryptedData && (
        <div>
          <h2>Decrypted Data:</h2>
          <p>{decryptedData}</p>
        </div>
      )}
      
      {hash && (
        <div>
          <h2>Hashed Data:</h2>
          <p>{hash}</p>
        </div>
      )}
    </div>
  );
}

export default App;
