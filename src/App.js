import React, { useState } from 'react';
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
    { row: 2, col: 4, title: '标题1', content: 'Some text' },
    { row: 5, col: 9, title: '标题2',content: ['image1.jpg', 'image2.jpg'] },
    { row: 10, col: 2, title: '标题3', content: 'video.mp4' },
  ];

  

  return (
    <div className="container">
      <div className="background-image"></div>
      <div className="grid-container">
        {/* 循环渲染小方格 */}
        {coordinates.map((coord, index) => {
          const mapIconCell = mapIconCells.find(
            cell => cell.row === coord.row && cell.col === coord.col
          );
          const isMapIconCell = !!mapIconCell;
          const content = isMapIconCell ? mapIconCell.content : null;
          return (
            <div className="grid-cell" key={index}>
              {isMapIconCell ? (
                <div
                  className="grid-icon"
                  
                >
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="map-icon" />
                </div>

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
