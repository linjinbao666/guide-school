import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import SwipeableViews from 'react-swipeable-views';
import './index.css';
import App from './App';
import App2 from './App2';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

const AppContainer = () => {
  const [currentPage, setCurrentPage] = useState(0); // 当前页面的索引

  const handleChangePage = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <SwipeableViews index={currentPage} onChangeIndex={handleChangePage}>
      <App />
      <App2 />
    </SwipeableViews>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>,
  rootElement
);

// ...
