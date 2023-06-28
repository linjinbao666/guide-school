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
      <div style={{ display: currentPage === 0 ? 'block' : 'none' }}>
      <App />
      </div>
      <div style={{ display: currentPage === 1 ? 'block' : 'none' }}>
      <App2 />
      </div>
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
