import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TeamCreate = ({ selectedUsers, onUpdateSelectedUsers }) => {
    //console.log(selectedUsers);
    const [teamName, setTeamName] = useState();
    const navigate = useNavigate()
    const handleTeaCreate = async () => {
        // console.log(selectedUsers);
        try {
            const response = await fetch('http://localhost:3001/team/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    teamName: teamName,
                    members: selectedUsers,
                }),
            });

            if (response.ok) {
                navigate('/')
            } else {
                console.error('Error creating team');
            }
        } catch (error) {
            console.error('Error creating team:', error.message);
        }
    }

    const handleRemove = (userId) => {
        //console.log(userId)
        const updatedUsers = selectedUsers.filter((user) => user._id !== userId);
        onUpdateSelectedUsers(updatedUsers);
    }

    return (
        <div className='container mt-4'>
            <h2>Create Team</h2>
            <div className='d-flex justify-content-center mt-5' role='search'>
                <input className='form-control me-4' value={teamName} placeholder='Enter Team Name' onChange={(e) => setTeamName(e.target.value)} style={{ width: '84%' }} />
            </div>
            <div className='row justify-content-center'>
                {selectedUsers.map((user) => (
                    <div className='card col-12 col-md-6 col-lg-3 bg-light' style={{ width: '18rem', margin: '1rem' }}>
                        <div className='cart-body'>
                            <img src={user.avtar} alt='' />
                            <h6>Name : {user.firstName}{user.lastName}</h6>
                            <p>Email : {user.email}</p>
                            <p>Gender : {user.gender} </p>
                            <p>Domain : {user.domain}</p>
                            <p> Available : {user.available}</p>
                        </div>
                        <button className='btn btn-danger' onClick={() => handleRemove(user._id)}>Remove</button>
                    </div>

                ))}
            </div>
            <div className='d-flex justify-content-center mt-4'>
                <button className='btn btn-primary' onClick={handleTeaCreate}>Create Team</button>
            </div>
        </div>
    );
};
export default TeamCreate;
