import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Dialog from './Dialog';

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

  const [dialogContent, setDialogContent] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  // 点击小方格图标时弹出对话框
  const handleGridCellClick = (content) => {
    setDialogContent(content);
    setDialogOpen(true);
  };

  // 关闭对话框
  const closeDialog = () => {
    setDialogContent(null);
    setDialogOpen(false);
  };

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
                  onClick={() => handleGridCellClick(content)}
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

      {/* 对话框 */}
      {dialogContent !== null && (
        <Dialog content={dialogContent} onClose={closeDialog} />
      )}
    </div>
  );
}

export default App;
