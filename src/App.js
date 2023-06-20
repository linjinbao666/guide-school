import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, Tabs, Typography, Carousel } from 'antd';

const { TabPane } = Tabs;
const { Text } = Typography;

const App = () => {

  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogText, setDialogText] = useState(null);
  const [dialogImages, setDialogImages] = useState(null);
  const [dialogaudio, setDialogaudio] = useState(null);
  const [dialogvideo, setDialogvideo] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('text');

  const [mapIconCells, setMapIconCells] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/alldata.json'); // 根据实际的 JSON 文件路径进行修改
        const data = await response.json();
        setMapIconCells(data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };

    fetchData();
  }, []);

  // 创建坐标数组
  const coordinates = [];
  for (let row = 0; row < 24; row++) {
    for (let col = 0; col < 12; col++) {
      coordinates.push({ row, col });
    }
  }

  const handleGridCellClick = (title, text, images, audio, video) => {
    setDialogTitle(title);
    setDialogText(text);
    setDialogImages(images);
    setDialogaudio(audio);
    setDialogvideo(video);
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogTitle('');
    setDialogText(null);
    setDialogImages(null);
    setDialogaudio(null);
    setDialogvideo(null);
    setDialogVisible(false);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
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
          const title = isMapIconCell ? mapIconCell.title : null;
          const text = isMapIconCell ? mapIconCell.text : null;
          const images = isMapIconCell ? mapIconCell.images : null;
          const audio = isMapIconCell ? mapIconCell.audio : null;
          const video = isMapIconCell ? mapIconCell.video : null;
          return (
            <div className="grid-cell" key={index}>
              {isMapIconCell ? (
                <div
                  className="grid-icon"
                  onClick={() => handleGridCellClick(title, text, images, audio, video)}
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
      <Modal
        title={<div style={{ textAlign: 'center' }}>{dialogTitle}</div>}
        visible={dialogVisible}
        onCancel={closeDialog}
        footer={null}
        centered
      >
        <Tabs
          type="card"
          accessKey={activeTab}
          tabBarStyle={{ justifyContent: 'center' }}
          onChange={handleTabChange}
          centered
          style={{ height: '400px' }} >
          <TabPane tab="Text" key="text">
            <Text>{dialogText}</Text>
          </TabPane>
          <TabPane tab="Image" key="image">
            <Carousel autoplay>
              {dialogImages && dialogImages.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Image ${index + 1}`} className="carousel-image" />
                </div>
              ))}
            </Carousel>
          </TabPane>
          <TabPane tab="Audio" key="audio">
            <audio src={dialogaudio} controls width="100%" />
          </TabPane>
          <TabPane tab="Video" key="video">
            <video src={dialogvideo} controls width="100%" />
          </TabPane>

        </Tabs>
      </Modal>
    </div>
  );
}

export default App;
