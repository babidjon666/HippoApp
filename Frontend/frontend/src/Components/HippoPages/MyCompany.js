import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { UserContext } from './UserContext';
import { message, Button, Input, Modal, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CompanyCard from './CompanyCard';

const MyCompany = () => {
    const { user } = useContext(UserContext);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (user && user.dbUser && user.dbUser.userName) {
            axios.get(`http://localhost:5130/api/Company/GetMyOwnCompanies?userName=${user.dbUser.userName}`)
                .then(response => {
                    const companiesData = response.data.$values;
                    setCompanies(companiesData); 
                    setLoading(false);
                })
                .catch(error => {
                    message.warning("Fail");
                    setError(error);
                    setLoading(false);
                });
        } else {
            setLoading(false); 
        }
    }, [user]);

    const handleAddCompany = () => {
        form.validateFields()
            .then(values => {
                axios.post(`http://localhost:5130/api/Company/CreateNewCompany`, null, {
                    params: {
                        userName: user.dbUser.userName,
                        companyName: values.companyName,
                        companyPassword: values.companyPassword
                    }
                }).then(response => {
                    axios.get(`http://localhost:5130/api/Company/GetMyOwnCompanies?userName=${user.dbUser.userName}`)
                        .then(response => {
                            const companiesData = response.data.$values;
                            setCompanies(companiesData);
                            setLoading(false);
                        })
                        .catch(error => {
                            message.warning("Fail");
                            setError(error);
                            setLoading(false);
                        });

                    setIsModalVisible(false);
                    form.resetFields();
                    message.success('Company added successfully!');
                }).catch(error => {
                    message.error('Failed to add company!');
                });
            }).catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <h2>You registered as an employee</h2>;
    }

    return (
        <div className="companies">
            <h1>My Companies</h1>
            <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={() => setIsModalVisible(true)}
                style={{ marginBottom: 20 }}
            >
                Add Company
            </Button>
            {companies.length > 0 ? (
                <div className="companies-grid">
                    {companies.map((company) => (
                        <CompanyCard key={company.id} company={company} />
                    ))}
                </div>
            ) : (
                <p>No companies found</p>
            )}

            <Modal
                title="Add New Company"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleAddCompany}
            >
                <Form form={form} layout="vertical" name="form_in_modal">
                    <Form.Item
                        name="companyName"
                        label="Company Name"
                        rules={[{ required: true, message: 'Please input the company name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="companyPassword"
                        label="Company Password"
                        rules={[{ required: true, message: 'Please input the company password!' }]}
                    >
                        <Input type="password" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default MyCompany;