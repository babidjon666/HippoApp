import React, { useState } from "react";
import HippoSlideBar from './HippoSlideBar';
import { FaHippo } from 'react-icons/fa6';
import HippoContent from './HippoContent';

const HippoApp = () => {
  const [selectedContent, setSelectedContent] = useState('user');

  return (
    <div>
      <div className="header">
        <h1>Hippo App</h1>
        <FaHippo className="hippo-icon" />
      </div >
      <div className='center-content'>
        <HippoSlideBar onSelect={setSelectedContent} />
        <HippoContent selectedContent={selectedContent} />
      </div>
    </div>
  );
};

export default HippoApp;