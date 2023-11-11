import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, Tabs, Typography, Carousel } from 'antd';
import { FaPlay, FaPause } from 'react-icons/fa';
import canvasImage from './map.jpg';

const { TabPane } = Tabs;
const { Text } = Typography;

const App = () => {

  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogText, setDialogText] = useState(null);
  const [dialogText2, setDialogText2] = useState(null);
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
  const [errorMessage, setErrorMessage] = useState('');

  const handlePlayClick = () => {
    if (dialogaudio && audioRef.current) {
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
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setVideoIsPlaying(!isVideoPlaying);
    }
  };

  useEffect(() => {
    console.log(process.env.PUBLIC_URL)
    const directory = process.env.PUBLIC_URL+'/assets';

    const fetchData = async () => {
      const dataPromises = [];

      // 遍历目录下的文件夹
      for (let i = 1; i <= 23; i++) {
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

  const disablePageZoom = () => {
    document.documentElement.style.zoom = '1';
    const metaTag = document.querySelector('meta[name="viewport"]');
    metaTag.content = 'width=device-width, initial-scale=1, maximum-scale=1';
  };

  const enablePageZoom = () => {
    document.documentElement.style.zoom = '1';
    const metaTag = document.querySelector('meta[name="viewport"]');
    metaTag.content = 'width=device-width, initial-scale=1';
  };

  const handleGridCellClick = (title, text,text2, images, audio, video) => {
    setDialogTitle(title);
    setDialogText(text);
    setDialogText2(text2);
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
    setDialogText2(null);
    setDialogImages(null);
    setDialogaudio(null);
    setDialogvideo(null);
    setDialogVisible(false);

    // 关闭弹窗时暂停播放
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    if (dialogvideo) {
      if (videoRef !== null && videoRef.current !== null) {
        videoRef.current.pause();
      }
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

    if (key !== "video" && dialogvideo) {
      if (videoRef !== null && videoRef.current !== null) {
        videoRef.current.pause();
      }
      setVideoIsPlaying(false);
    }

  };

  const mapIconElements = mapIconCells.map((item) => (
    <div
      key={item.id}
      className="pixel"
      onClick={() =>
        handleGridCellClick(
          item.title,
          item.text,
          item.text2,
          item.images,
          item.audio,
          item.video
        )
      }
      style={{
        top: item.title ? `${item.row - 145}px` : '-100px',
        left: item.title ? `${item.col - 5}px` : '-100px'
      }}
    >
      {item.title ? (
        <FontAwesomeIcon icon={faMapMarkerAlt} className="map-icon" />
      ) : null}
    </div>
  ));

  return (
    <div className="container">
      <div className="canvas-container">
        <img src={canvasImage} alt="Canvas" className="canvas" />
        {mapIconElements}
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
                <div className="text-container">{dialogText}</div>
                {dialogText2 &&(<pre>{dialogText2}</pre>)}
              </Text>
            </div>
          </TabPane>

          <TabPane tab="图片" key="image">
            <Carousel autoplay={false} dots className="custom-carousel">
              {dialogImages && dialogImages.map((image, index) => (
                <div key={index}>
                  <img src={process.env.PUBLIC_URL+image} alt={`Image ${index + 1}`} className="carousel-image" />
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
              <audio ref={audioRef} src={process.env.PUBLIC_URL+dialogaudio} type="audio/mpeg" onError={() => setErrorMessage('缺少音频文件')} />
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </TabPane>

          {dialogvideo && (
            <TabPane tab="视频" key="video">
              <div className="video-player" onClick={handleVideoClick}>
                <video ref={videoRef} className="video-element" controls>
                  <source src={process.env.PUBLIC_URL+dialogvideo} type="video/mp4" />
                </video>
              </div>
            </TabPane>
          )}
        </Tabs>
      </Modal>
    </div>
  );
}

export default App;
