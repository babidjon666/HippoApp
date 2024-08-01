import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { UserContext } from './UserContext';
import { message, Form } from 'antd';
import CompanyCardV2 from "./CompanyCardV2";
const Workers = () => {
    const { user } = useContext(UserContext);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="companies">
            <h1>Choose Company</h1>
            {companies.length > 0 ? (
                <div className="companies-grid">
                    {companies.map((company) => (
                        <CompanyCardV2 key={company.id} company={company} />
                    ))}
                </div>
            ) : (
                <p>No companies found</p>
            )}
        </div>
    );
}

export default Workers;