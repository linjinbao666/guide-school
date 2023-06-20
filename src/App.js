import './App.css';
import backgroundImage from './map.jpg';
import React, { useState } from 'react';

// 场馆数据
const venuesData = [
  { id: 1, name: '场馆1', description: '这是场馆1的详细介绍。' },
  { id: 2, name: '场馆2', description: '这是场馆2的详细介绍。' },
  { id: 3, name: '场馆3', description: '这是场馆3的详细介绍。' },
];

// 场馆组件
const Venue = ({ venue, onVenueClick }) => {
  let positionStyle = {};
  switch (venue.id) {
    case 1:
      positionStyle = { top: '20px', left: '20px' };
      break;
    case 2:
      positionStyle = { top: '70px', left: '20px' };
      break;
    case 3:
      positionStyle = { top: '20px', right: '20px' };
      break;
    default:
      break;
  }

  return (
    <button
      className="venue"
      style={positionStyle}
      onClick={() => onVenueClick(venue)}
    >
      {venue.name}
    </button>
  );
};

// 弹框组件
const Modal = ({ venue, onClose }) => {
  return (
    <div className="modal">
      <h2>{venue.name}</h2>
      <p>{venue.description}</p>
      <button onClick={onClose}>关闭</button>
    </div>
  );
};

// 应用程序组件
const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // 处理场馆点击事件
  const handleVenueClick = (venue) => {
    setSelectedVenue(venue);
    setIsOpen(true);
  };

  // 处理弹框关闭事件
  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedVenue(null);
  };

  // 处理放大缩小事件
  const handleZoom = (event) => {
    const newZoomLevel = zoomLevel + event.deltaY * -0.01;
    setZoomLevel(Math.min(Math.max(0.5, newZoomLevel), 3));
  };

  return (
    <div
      className="App"
      style={{
        transform: `scale(${zoomLevel})`,
        transformOrigin: 'center',
        transition: 'transform 0.5s ease-in-out',
        backgroundImage: `url(${backgroundImage})`, // 设置背景图片
        backgroundSize: 'auto 100%', // 背景图片在上下方向上完整显示
        backgroundRepeat: 'no-repeat', // 禁止背景图片重复平铺
        backgroundPosition: 'center top', // 将背景图片居中在顶部
        height: '100vh', // 设置容器高度为视窗高度
        overflow: 'hidden', // 隐藏容器的上下滚动条
      }}
      onWheel={handleZoom} // 监听鼠标滚轮事件
    >
      <div className="venue-list">
        {venuesData.map((venue) => (
          <Venue
            key={venue.id}
            venue={venue}
            onVenueClick={handleVenueClick}
          />
        ))}
      </div>
      
      {isOpen && selectedVenue && (
        <Modal venue={selectedVenue} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
