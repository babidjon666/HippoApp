import React, { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined, EditOutlined, CopyOutlined } from '@ant-design/icons';
import { Button, Input, message } from 'antd';

const CompanyCard = ({ company }) => {
    const [showSeedPhrase, setShowSeedPhrase] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            message.success('Copied to clipboard!');
        }).catch(err => {
            message.error('Failed to copy!');
        });
    };

    const toggleShowSeedPhrase = () => {
        setShowSeedPhrase(!showSeedPhrase);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="company-card">
            <div className="company-info">
                <h2>Name: {company.companyName}</h2>
                <div className="company-details">
                    <div className="detail">
                        <span>Seed Phrase:</span>
                        <div className="input-group">
                            <Input 
                                value={company.seedPhase} 
                                type={showSeedPhrase ? 'text' : 'password'} 
                                readOnly
                                className="large-input"
                                suffix={
                                    <>
                                        {showSeedPhrase ? 
                                            <EyeInvisibleOutlined onClick={toggleShowSeedPhrase} /> : 
                                            <EyeOutlined onClick={toggleShowSeedPhrase} />
                                        }
                                        <CopyOutlined onClick={() => handleCopy(company.seedPhase)} />
                                    </>
                                }
                            />
                        </div>
                    </div>
                    <div className="detail">
                        <span>Password:</span>
                        <div className="input-group">
                            <Input 
                                value={company.companyPassword} 
                                type={showPassword ? 'text' : 'password'} 
                                readOnly
                                className="large-input"
                                suffix={
                                    <>
                                        {showPassword ? 
                                            <EyeInvisibleOutlined onClick={toggleShowPassword} /> : 
                                            <EyeOutlined onClick={toggleShowPassword} />
                                        }
                                        <CopyOutlined onClick={() => handleCopy(company.companyPassword)} />
                                    </>
                                }
                            />
                        </div>
                    </div>
                </div>
                <Button type="primary" icon={<EditOutlined />} className="edit-button">Edit</Button>
            </div>
        </div>
    );
};

export default CompanyCard;