import React, { useState, useEffect } from 'react';
import { components } from '../components';
import { api } from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import "../components/navbar.css";

const PatientInfo = () => {
    const { id } = useParams();
    const [tab, setTab] = useState('detailTab');
    const [data, setData] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async()=>{
        const response = await api.patient.getPatient(id);
        setData({patient : response.data});
      }
      if(!JSON.parse(localStorage.getItem('token_data')))
      {
        navigate("/login");
      }
      if(!data)
      {
        fetchData();
      }
    },[]);

    const handleTabChange = (e) => {
        setTab(e.target.id); 
    }
  return (
    <div>
        <components.Navbar/>
    <nav>
      <div className="nav-center">
        <div className="links-container">
          <ul className="links">
            <li id="detailTab" onClick={handleTabChange}>Details</li>
            <li id="prescriptions" onClick={handleTabChange}>Prescriptions</li> 
            <li id="medicalHistory" onClick={handleTabChange}>Medical history</li>
            <li id="testReports" onClick={handleTabChange}>Test reports</li>
          </ul>
        </div>
      </div>
    </nav>
        {data && tab === 'detailTab' && <components.PatientDetail doctor={data.patient}/>}
        {data && tab === 'prescriptions' && <components.Prescriptions prescriptions={data.patient.prescriptions}/>}
        {data && tab === 'medicalHistory' && <components.MedicalHistory medicalHistory={data.patient.medicalHistory}/>} 
        {data && tab === 'testReports' && <components.TestReports testReports={data.patient.testReports}/>}
    </div>
  )
}

export default PatientInfo