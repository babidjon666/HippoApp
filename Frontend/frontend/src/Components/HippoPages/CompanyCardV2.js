import React, { useState } from 'react';
import axios from 'axios';
import { AppstoreOutlined, CalendarOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Button, List, message } from 'antd';

const CompanyCardV2 = ({ company }) => {
    const [showEmployees, setShowEmployees] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loadingAttendance, setLoadingAttendance] = useState(false);
    const [showAttendance, setShowAttendance] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleToggleEmployees = async () => {
        if (!showEmployees) {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5130/api/Workers/GetUsersOfCompany?companyName=${company.companyName}`);
                if (response.data && Array.isArray(response.data.$values)) {
                    setEmployees(response.data.$values);
                } else {
                    message.error('Invalid data format for employees');
                }
            } catch (error) {
                message.error('Failed to load employees');
            }
            setLoading(false);
        }
        setShowEmployees(prevState => !prevState);
    };

    const handleShowAttendance = async (userName) => {
        setLoadingAttendance(true);
        try {
            const response = await axios.get(`http://localhost:5130/api/AttendanceRecord/GetAttendanceRecord?userName=${userName}`);
            if (response.data && Array.isArray(response.data.$values)) {
                setAttendanceRecords(response.data.$values);
                setSelectedEmployee(userName);
                setShowAttendance(true);
            } else {
                message.error('Invalid data format for attendance records');
            }
        } catch (error) {
            message.error('Failed to load attendance records');
        }
        setLoadingAttendance(false);
    };

    const handleGeneratePdfReport = async (userName) => {
        try {
            const response = await axios.get(`http://localhost:5130/api/AttendanceRecord/GeneratePdfReport?userName=${userName}`, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `AttendanceReport_${userName}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            message.error('Failed to generate PDF report');
        }
    };

    return (
        <div className="company-card">
            <div className="company-info">
                <h2>Name: {company.companyName}</h2>
                <div className="company-details">
                    {showEmployees && (
                        <List
                            bordered
                            loading={loading}
                            dataSource={employees}
                            renderItem={employee => (
                                <List.Item key={employee.id}>
                                    <div className='padding-input'>
                                    <div>
                                        <h2>{employee.id - 1} {employee.userName}</h2>
                                    </div>
                                    <Button
                                        type="primary"
                                        icon={<CalendarOutlined />}
                                        onClick={() => handleShowAttendance(employee.userName)}
                                    >
                                        Attendance
                                    </Button>
                                    <Button
                                        type="primary"
                                        icon={<FilePdfOutlined />}
                                        onClick={() => handleGeneratePdfReport(employee.userName)}
                                        className='padding-input'
                                    >
                                        PDF
                                    </Button>
                                    </div>
                                </List.Item>
                            )}
                        />
                    )}
                </div>
                <Button type="primary" icon={<AppstoreOutlined />} onClick={handleToggleEmployees}>
                    {showEmployees ? 'Hide Employees' : 'Show Employees'}
                </Button>
                {showAttendance && (
                    <div className='padding-input'>
                        <div className="attendance-details">
                            <h3>Attendance Records for {selectedEmployee}</h3>
                            <List
                                bordered
                                loading={loadingAttendance}
                                dataSource={attendanceRecords}
                                renderItem={record => (
                                    <List.Item key={record.id}>
                                        <div>
                                            Date: {record.date.split('T')[0]}, Check In: {record.checkInTime}, Check Out: {record.checkOutTime}
                                        </div>
                                    </List.Item>
                                )}
                            />
                            <Button className="padding-input" type="primary" onClick={() => setShowAttendance(false)}>
                                Hide Attendance
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompanyCardV2;