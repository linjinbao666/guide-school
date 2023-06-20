import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  // 创建坐标数组
  const coordinates = [];
  for (let row = 0; row < 24; row++) {
    for (let col = 0; col < 12; col++) {
      coordinates.push({ row, col });
    }
  }

  return (
    <div className="container">
      <div className="background-image"></div>
      <div className="grid-container">
        {coordinates.map((coord, index) => (
          <div className="grid-cell" key={index}>
            {coord.row%7===0 ? (
              <FontAwesomeIcon icon={faMapMarkerAlt} className="map-icon" />
            ) : null}
            <span className="coord-x">{coord.col}</span>
            <span className="coord-y">{coord.row}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
