import React, { useState } from "react";
import { FaUser, FaBuilding, FaUsers, FaDollarSign, FaChartLine, FaPowerOff } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const HippoSlideBar = ({onSelect}) =>{

    const navigate = useNavigate(); 

    const handleClick = (content) => {
        onSelect(content);
    };

    return(
        <div className="sidebar">
                <div className="sidebar-item" onClick={() => handleClick('user')}>
                    <FaUser className="sidebar-icon" />
                </div>
                <div className="sidebar-item" onClick={() => handleClick('company')}>
                    <FaBuilding className="sidebar-icon" />
                </div>
                <div className="sidebar-item" onClick={() => handleClick('workers')}>
                    <FaUsers className="sidebar-icon" />
                </div>
                <div className="sidebar-item" onClick={() => handleClick('salary')}>
                    <FaDollarSign className="sidebar-icon" />
                </div>
                <div className="sidebar-item" onClick={() => handleClick('stats')}>
                    <FaChartLine className="sidebar-icon" />
                </div>
                <div className="sidebar-item" onClick={() => navigate('/')}>
                    <FaPowerOff className="sidebar-icon" />
                </div>
            </div>
    );
}

export default HippoSlideBar