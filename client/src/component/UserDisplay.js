import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const UserDisplay = (props) => {
    const [user, setUser] = useState('')

    const navigate = useNavigate();

    const { id } = useParams()
    // console.log(id);

    const fetchUser = async () => {
        try {
            const response = await fetch(`http://localhost:3001/get/api/users/${id}`, {
                method: "GET",
                headers: {

                }
            })
            const responseData = await response.json();
            //console.log(responseData)

            setUser(responseData?.User)
            //console.log(user)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchUser();
    },)

    const handleUpdate = (userId) => {
        //console.log(userId)
        navigate(`/userUpdate/${userId}`)
    }

    const handleDelet = async (userId) => {
        //console.log(userId)
        try {
            const response = await fetch(`http://localhost:3001/delet/api/users/${userId}`, {
                method: "DELETE",
                headers: {

                }
            })
            if (response.ok) {
                navigate('/')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <div className="card" style={{ width: '18rem' }}>
                <div className="card-body text-center bg-light">
                    <img src={user.avtar} alt='' />
                    <h6>Name : {user.firstName} {user.lastName}</h6>
                    <p>Email :{user.email}</p>
                    <p>Gender : {user.gender}</p>
                    <p>Domain : {user.domain}</p>
                    <p>Available:{user.available} </p>
                    <button className='btn bg-primary' onClick={() => handleUpdate(user._id)}>Update User</button>
                </div>
                <button type="button" className="btn btn-danger" onClick={() => handleDelet(user._id)}>
                    <FontAwesomeIcon icon={faTrash} /> Delete User
                </button>
            </div>
        </div>
    );
}

export default UserDisplay;
