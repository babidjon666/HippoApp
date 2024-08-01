import React, { useContext } from "react";
import { UserContext } from './UserContext';

import MyProfile from "./MyProfile";
import MyCompany from "./MyCompany";
import Workers from "./Workers";
import AttendanceRecord from "./AttendanceRecord";

const HippoContent = ({ selectedContent }) => {
    const { user } = useContext(UserContext);

    const renderContent = () => {
        switch (selectedContent) {
            case 'user':
                return <div>
                    <MyProfile/>
                    <AttendanceRecord/>
                </div>;
            case 'company':
                return <MyCompany />;
            case 'workers':
                return <Workers />;
            case 'salary':
                return (
                    <div>
                        <h1>Salary</h1>
                        <p>Salary details will be displayed here.</p>
                    </div>
                );
            case 'stats':
                return (
                    <div>
                        <h1>Statistics</h1>
                        <p>Statistics will be displayed here.</p>
                    </div>
                );
            case 'logout':
                return (
                    <div>
                        <h1>Logout</h1>
                        <p>You have been logged out. <a href="/login">Login again</a></p>
                    </div>
                );
            default:
                return <div>Select an option</div>;
        }
    };

    return <div className="page-box">{renderContent()}</div>;
};

export default HippoContent;