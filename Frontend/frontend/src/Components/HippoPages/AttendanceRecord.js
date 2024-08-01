import React, { useState, useContext } from "react";
import { UserContext } from './UserContext';
import { Button, DatePicker, TimePicker, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';

const AttendanceRecord = () => {
    const { user } = useContext(UserContext);
    const [date, setDate] = useState(null);
    const [startWorkTime, setStartWorkTime] = useState(null);
    const [endWorkTime, setEndWorkTime] = useState(null);

    const handleAccept = async () => {
        if (!date || !startWorkTime || !endWorkTime) {
            message.error("Please select date and times.");
            return;
        }

        const formattedDate = date.format('YYYY-MM-DD');
        const formattedStartWorkTime = startWorkTime.format('HH:mm:ss');
        const formattedEndWorkTime = endWorkTime.format('HH:mm:ss');

        const url = `http://localhost:5130/api/AttendanceRecord/DoAttendanceRecord`;
        const params = {
            userName: user.dbUser.userName,
            date: formattedDate,
            startWorkTime: formattedStartWorkTime,
            endWorkTime: formattedEndWorkTime
        };

        try {
            const response = await axios.post(url, null, { params });
            message.success("Added");
        } catch (error) {
            message.error("An error occurred while adding attendance record.");
        }
    };

    return (
        <div className="profile-box">
            <h1 className="padding-input">Attendance Record</h1>
            <div className="profile-card">
                <DatePicker 
                    className="padding-input" 
                    onChange={(date) => setDate(date)} 
                />
                <TimePicker 
                    className="padding-input" 
                    onChange={(time) => setStartWorkTime(time)} 
                />
                <TimePicker 
                    className="padding-input" 
                    onChange={(time) => setEndWorkTime(time)} 
                />
                <Button 
                    type="primary" 
                    icon={<EditOutlined />} 
                    className="edit-button" 
                    onClick={handleAccept}
                >
                    Accept
                </Button>
            </div>
        </div>
    );
}

export default AttendanceRecord;