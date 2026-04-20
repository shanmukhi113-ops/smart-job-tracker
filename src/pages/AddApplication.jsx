import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useContext } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  company: yup.string().required("Company name is required"),
  role: yup.string().required("Role is required"),
  status: yup.string().required(),
  appliedDate: yup.string().required("Date is required"),
}).required();

const AddApplication = () => {
  const { addApplication } = useContext(ApplicationContext);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    addApplication(data);
    navigate('/applications');
  };

  return (
    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h2>Track New Application</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Company Name</label><br/>
          <input {...register("company")} style={{ width: '100%', padding: '8px' }} />
          <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.company?.message}</p>
        </div>

        <div>
          <label>Job Role</label><br/>
          <input {...register("role")} style={{ width: '100%', padding: '8px' }} />
          <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.role?.message}</p>
        </div>

        <div>
          <label>Status</label><br/>
          <select {...register("status")} style={{ width: '100%', padding: '8px' }}>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label>Applied Date</label><br/>
          <input type="date" {...register("appliedDate")} style={{ width: '100%', padding: '8px' }} />
        </div>

        <button type="submit" style={{ padding: '10px', background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
          Save Application
        </button>
      </form>
    </div>
  );
};

export default AddApplication;