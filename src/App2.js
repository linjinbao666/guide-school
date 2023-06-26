import React, { useState, useEffect, useRef } from 'react';
import './App2.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, Tabs, Typography, Carousel } from 'antd';
import { FaPlay, FaPause } from 'react-icons/fa';

const { TabPane } = Tabs;
const { Text } = Typography;

const App2 = () => {

  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogText, setDialogText] = useState(null);
  const [dialogImages, setDialogImages] = useState(null);
  const [dialogaudio, setDialogaudio] = useState(null);
  const [dialogvideo, setDialogvideo] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('text');
  const [mapIconCells, setMapIconCells] = useState([]);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [isVideoPlaying, setVideoIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayClick = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if(isVideoPlaying){
        videoRef.current.pause();
      }else{
        videoRef.current.play();
      }
      setVideoIsPlaying(!isVideoPlaying);
    }
  };

  useEffect(() => {
    const directory = '/assets';

    const fetchData = async () => {
      const dataPromises = [];

      // 遍历目录下的文件夹
      for (let i = 24; i <= 41; i++) {
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

  useEffect(() => {
    // 在组件卸载时停止音频播放
    return () => {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      if (isVideoPlaying) {
        videoRef.current.pause();
        setVideoIsPlaying(false);
      }
    };
  }, []);

  // 创建坐标数组
  const coordinates = [];
  for (let row = 0; row < 24; row++) {
    for (let col = 0; col < 12; col++) {
      coordinates.push({ row, col });
    }
  }

  const disablePageZoom = () => {
    document.documentElement.style.zoom = '1';
    const metaTag = document.querySelector('meta[name="viewport"]');
    metaTag.content = 'width=device-width, initial-scale=1, maximum-scale=1';
  };

  const enablePageZoom = () =>{
    document.documentElement.style.zoom = '1';
    const metaTag = document.querySelector('meta[name="viewport"]');
    metaTag.content = 'width=device-width, initial-scale=1';
  };

  const handleGridCellClick = (title, text, images, audio, video) => {
    setDialogTitle(title);
    setDialogText(text);
    setDialogImages(images);
    setDialogaudio(audio);
    setDialogvideo(video);
    setDialogVisible(true);

    disablePageZoom();

    if (videoRef.current) {
      videoRef.current.pause();
      setVideoIsPlaying(false);
      videoRef.current.src = video; // 设置新的视频源
    }
  };

  const closeDialog = () => {
    setDialogTitle('');
    setDialogText(null);
    setDialogImages(null);
    setDialogaudio(null);
    setDialogvideo(null);
    setDialogVisible(false);

    // 关闭弹窗时暂停播放
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }

    if (isVideoPlaying) {
      videoRef.current.pause();
      setVideoIsPlaying(false);
    }

    enablePageZoom();
  };

  const handleTabChange = (key) => {
    setActiveTab(key);

    if (key !== "audio" && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }

    if (key !== "video" && isVideoPlaying) {
      videoRef.current.pause();
      setVideoIsPlaying(false);
    }
  };

  return (
    <div className="container2">
      <div className="background-image2"></div>
      <div className="grid-container2">
        {/* 循环渲染小方格 */}
        {coordinates.map((coord, index) => {
          const mapIconCellsForCoord = mapIconCells.filter(
            cell => cell.row === coord.row && cell.col === coord.col
          );
          const isMapIconCell = mapIconCellsForCoord.length > 0;

          return (
            <div className="grid-cell2" key={index}>
              <span className="coord-x">{coord.col}</span>
              <span className="coord-y">{coord.row}</span>

              {mapIconCellsForCoord.map((mapIconCell, i) => (
                <div
                  className={`grid-icon ${i > 0 ? 'offset-grid-icon' : ''}`}
                  onClick={() =>
                    handleGridCellClick(
                      mapIconCell.title,
                      mapIconCell.text,
                      mapIconCell.images,
                      mapIconCell.audio,
                      mapIconCell.video
                    )
                  }
                  key={i}
                >
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="map-icon" />
                </div>
              ))}
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
        className="my-modal"
        maskStyle={{ backdropFilter: 'blur(8px)' }}
      >
        <Tabs
          type="card"
          accessKey={activeTab}
          tabBarStyle={{ justifyContent: 'center' }}
          onChange={handleTabChange}
          centered
          style={{ height: '380px' }} >
          <TabPane tab="文字" key="text">
            <div className="scrollable-content">
              <Text>
                <div className="text-container2">{dialogText}</div>
              </Text>
            </div>
          </TabPane>
          <TabPane tab="图片" key="image">
            <Carousel autoplay={false} dots className="custom-carousel">
              {dialogImages && dialogImages.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Image ${index + 1}`} className="carousel-image" />
                </div>
              ))}
            </Carousel>
          </TabPane>
          <TabPane tab="音频" key="audio">
            <div className="audio-player">
              {isPlaying ? (
                <FaPause className="play-icon" onClick={handlePlayClick} />
              ) : (
                <FaPlay className="play-icon" onClick={handlePlayClick} />
              )}
              <audio ref={audioRef} src={dialogaudio} type="audio/mpeg" />
            </div>
          </TabPane>
          <TabPane tab="视频" key="video">
            <div className="video-player" onClick={handleVideoClick}>
              <video ref={videoRef} className="video-element">
                <source src={dialogvideo} type="video/mp4" />
              </video>
            </div>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
}

export default App2;
