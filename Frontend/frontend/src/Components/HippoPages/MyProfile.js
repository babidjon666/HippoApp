import React, { useState, useContext } from "react";
import { UserContext } from './UserContext';
import { EyeOutlined, EyeInvisibleOutlined, EditOutlined, CopyOutlined } from '@ant-design/icons';
import { message, Button, Input, Modal, Form } from 'antd';
import axios from 'axios';

const MyProfile = () => {
    const { user, setUser } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleEditProfile = () => {
        form.validateFields()
            .then(values => {
                const { username, password } = values;

                if (password.length <= 10) {
                    message.warning('Password must be more than 10 characters long');
                    return;
                }

                if (password.length > 30) {
                    message.warning('The password must not contain more than 30 characters.');
                    return;
                }

                if (username.length <= 5) {
                    message.warning('Name must be more than 5 characters long');
                    return;
                }

                if (username.length > 20) {
                    message.warning('The name must not contain more than 20 characters.');
                    return;
                }

                axios.post(`http://localhost:5130/api/Profile/api/EditProfile`, null, {
                    params: {
                        oldName: user.dbUser.userName,
                        newName: username,
                        newPassword: password
                    }
                })
                .then(response => {
                    setIsModalVisible(false);
                    form.resetFields();

                    setUser(prevUser => ({
                        ...prevUser,
                        dbUser: {
                            ...prevUser.dbUser,
                            userName: username,
                            password: password
                        }
                    }));

                    message.success('Profile changed!');
                })
                .catch(error => {
                    if (error.response && error.response.status === 409) {
                        message.error(error.response.data);
                    } else {
                        message.error('Failed to change profile!');
                    }
                });
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };
    
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            message.success('Copied to clipboard!');
        }).catch(err => {
            message.error('Failed to copy!');
        });
    };

    const toggleShowPassword = (userId) => {
        setShowPassword(prevState => ({
            ...prevState,
            [userId]: !prevState[userId]
        }));
    };

    return (
        <div className="profile-box">
            <h1 className="padding-input">My Profile</h1>
            <div className="profile-card">
                <h1>Name: {user.dbUser.userName}</h1>
                <h2>Role: {user.dbUser.role === 1 ? "Owner" : "Employee"}</h2>
                <Input 
                    value={user.dbUser.password} 
                    readOnly
                    type={showPassword[user.dbUser.id] ? 'text' : 'password'}
                    className="large-input"
                    suffix={
                        <>
                            {showPassword[user.dbUser.id] ? 
                                <EyeInvisibleOutlined onClick={() => toggleShowPassword(user.dbUser.id)} /> : 
                                <EyeOutlined onClick={() => toggleShowPassword(user.dbUser.id)} />
                            }
                            <CopyOutlined onClick={() => handleCopy(user.dbUser.password)} />
                        </>
                    }
                />
                <Button type="primary" icon={<EditOutlined />} className="edit-button" onClick={() => setIsModalVisible(true)}>Edit</Button>
            </div>

            <Modal
                title="Edit Profile"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleEditProfile}
            >
                <Form form={form} layout="vertical" name="form_in_modal" initialValues={{
                    username: user.dbUser.userName,
                    password: user.dbUser.password
                }}>
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default MyProfile;