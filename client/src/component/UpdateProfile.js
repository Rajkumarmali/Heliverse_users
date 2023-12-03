import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProfile = () => {
    const { updateId } = useParams();
    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        avtar: '',
        domain: '',
        available: '',
    };
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/put/api/users/${updateId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                //  console.log('User updated successfully');
                navigate('/');
            } else {
                console.error('Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <form onSubmit={handleSubmit} className="card">
                <div className="card-body text-center">
                    <label>
                        First Name:
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="form-control" />
                    </label>
                    <br />
                    <label>
                        Last Name:
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="form-control" />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
                    </label>
                    <br />
                    <label>
                        Gender:
                        <select name="gender" value={formData.gender} onChange={handleChange} className="form-control">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Agender">Agender</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Image Url:
                        <input type="text" name="avtar" value={formData.avtar} onChange={handleChange} className="form-control" />
                    </label>
                    <br />
                    <label>
                        Domain:
                        <select name='domain' value={formData.domain} onChange={handleChange} className='form-control'>
                            <option value="">Select Domain</option>
                            <option value='Sales'>Sales</option>
                            <option value='Finance'>Finance</option>
                            <option value='Marketing'>Marketing</option>
                            <option value='IT'>IT</option>
                            <option value='Management'>Management</option>
                            <option value='UI Designing'>UI Designing</option>
                            <option value='Business Development'>Business Development</option>
                        </select>
                    </label>
                    <br />
                    <div className="form-check">
                        <input type="checkbox" name="available" checked={formData.available} onChange={(e) => setFormData((prevData) => ({ ...prevData, available: e.target.checked }))} className="form-check-input" />
                        <label className="form-check-label">Available</label>
                    </div>
                    <br />
                    {loading && <p>Loading...</p>}
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;
