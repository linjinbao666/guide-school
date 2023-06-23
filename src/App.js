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
    const directory = '/assets';

    const fetchData = async () => {
      const dataPromises = [];

      // 遍历目录下的文件夹
      for (let i = 1; i <= 36; i++) {
        const folderPath = `${directory}/${i}`;
        const dataFilePath = `${folderPath}/data.json`;

        // 读取每个目录中的data.json文件
        const dataPromise = fetch(dataFilePath).then((response) => response.json());
        dataPromises.push(dataPromise);
      }

      // 等待所有data.json文件的读取完成
      const jsonDataArray = await Promise.all(dataPromises);

      // 将所有data.json文件的内容合并成一个数组
      const mergedData = jsonDataArray.reduce((result, jsonData) => {
        return result.concat(jsonData);
      }, []);

      setMapIconCells(mergedData);
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
              {/* <span className="coord-x">{coord.col}</span>
              <span className="coord-y">{coord.row}</span> */}
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
          <TabPane tab="文字" key="text">
            <Text>{dialogText}</Text>
          </TabPane>
          <TabPane tab="图片" key="image">
            <Carousel autoplay>
              {dialogImages && dialogImages.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Image ${index + 1}`} className="carousel-image" />
                </div>
              ))}
            </Carousel>
          </TabPane>
          <TabPane tab="音频" key="audio">
            <audio src={dialogaudio} controls width="100%" />
          </TabPane>
          <TabPane tab="视频" key="video">
            <video src={dialogvideo} controls width="100%" />
          </TabPane>

        </Tabs>
      </Modal>
    </div>
  );
}

export default App;
