import './App.css';
import myImage from './map.jpg'
import React, { useEffect, useState } from 'react';

function App() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();

      const delta = Math.max(-1, Math.min(1, event.deltaY));
      const zoomSpeed = 0.1;

      setScale((prevScale) => {
        const newScale = prevScale + delta * zoomSpeed;
        return Math.max(0.5, Math.min(3, newScale)); // 设置最小和最大缩放值
      });
    };

    document.addEventListener('wheel', handleWheel);

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <img
        src={myImage}
        alt="sss"
        style={{
          maxHeight: '100%',
          maxWidth: '100%',
          objectFit: 'contain',
          transform: `scale(${scale})`,
        }}
      />
    </div>
  );
}

export default App;
