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

  // 定义包含地图图标信息的数组
  const mapIconCells = [
    { row: 2, col: 4, content: 'Some text' },
    { row: 5, col: 9, content: ['image1.jpg', 'image2.jpg'] },
    { row: 10, col: 2, content: 'video.mp4' },
  ];

  return (
    <div className="container">
      <div className="background-image"></div>
      <div className="grid-container">
        {/* 循环渲染小方格 */}
        {coordinates.map((coord, index) => {
          const isMapIconCell = mapIconCells.some(
            cell => cell.row === coord.row && cell.col === coord.col
          );
          return (
            <div className="grid-cell" key={index}>
              {isMapIconCell ? (
                <FontAwesomeIcon icon={faMapMarkerAlt} className="map-icon" />
              ) : null}
              <span className="coord-x">{coord.col}</span>
              <span className="coord-y">{coord.row}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
