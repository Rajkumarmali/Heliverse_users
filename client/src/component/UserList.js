import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const UserList = ({ onSelectUsers }) => {
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedDomains, setSelectedDomains] = useState(new Set());


    const navigate = useNavigate()

    const [selectedFilters, setSelectedFilters] = useState({
        domain: '',
        gender: '',
        availability: '',
    });

    const [selectedUsers, setSelectedUsers] = useState([]);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:3001/get/api/users?page=${page}&limit=20`, {
                method: 'GET',
                headers: {},
            });
            const responseData = await response.json();
            setUsers(responseData?.Users);
        } catch (err) {
            console.log('Error in fetching users');
        }
    };

    useEffect(() => {
        fetchUserData();
    });

    const handlePrevPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value,
        }));
    };

    const filterUser = users.filter((user) => {
        return (
            (selectedFilters.domain === '' || user.domain === selectedFilters.domain) &&
            (selectedFilters.gender === '' || user.gender === selectedFilters.gender) &&
            (selectedFilters.availability === '' || user.available === selectedFilters.availability)
        );
    });

    const searchUser = filterUser.filter((user) =>
        user.firstName.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelectUser = (user) => {
        if (!selectedUsers.find((selectedUser) => selectedUser._id === user._id)) {
            if (!selectedDomains.has(user.domain)) {
                setSelectedDomains((prevSelectedDomains) => new Set([...prevSelectedDomains, user.domain]));
                setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
            } else {
                alert(`User with domain ${user.domain} is already selected.`);
            }
        }
    };

    const handleCreateTeam = () => {
        onSelectUsers(selectedUsers);
        navigate('/createTeam', { state: { selectedUsers } })
    };


    return (
        <div className=''>
            <Navbar />
            <div className='d-flex justify-content-center mt-5' role='search'>
                <input className='form-control me-4' type='search' placeholder='Search' aria-label='Search' value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: '64%' }} />
            </div>

            <div className='container mt-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-4'>
                        <label>Domain</label>
                        <select
                            className=''
                            style={{ width: '24%' }}
                            value={selectedFilters.domain}
                            onChange={(e) => handleFilterChange('domain', e.target.value)}  >
                            <option value=''>All</option>
                            <option value='Sales'>Sales</option>
                            <option value='Finance'>Finance</option>
                            <option value='Marketing'>Marketing</option>
                            <option value='IT'>IT</option>
                            <option value='Management'>Management</option>
                            <option value='UI Designing'>UI Designing</option>
                            <option value='Business Development'>Business Development</option>
                        </select>
                    </div>
                    <div className='col-md-4'>
                        <label>Gender</label>
                        <select className='' style={{ width: ' 24%' }} value={selectedFilters.gender} onChange={(e) => handleFilterChange('gender', e.target.value)}  >
                            <option value=''>All</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='Agender'>Agender</option>
                        </select>
                    </div>
                    <div className='col-md-4'>
                        <label>Availability</label>
                        <select className='' style={{ width: ' 24%' }} value={selectedFilters.availability} onChange={(e) => handleFilterChange('availability', e.target.value)}    >
                            <option value=''>All</option>
                            <option value='true'>Available</option>
                            <option value='false'>Not Available</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='container'>
                <div className='row justify-content-center'>
                    {searchUser.map((user) => (
                        <div key={user.id} className='card col-12 col-md-6 col-lg-3 bg-light' style={{ width: '18rem', margin: '1rem' }}>
                            <Link to={`/user/${user._id}`} className='user-link text-decoration-none text-dark'>
                                <div className='card-body'>
                                    <img src={user.avtar} alt={`Avatar of ${user.firstName}`} />
                                    <h6> Name : {user.firstName} {user.lastName} </h6>
                                    <p>Domain : {user.domain}</p>
                                </div>
                            </Link>
                            <button className='btn btn-primary' onClick={() => handleSelectUser(user)}>Select User</button>
                        </div>
                    ))}
                </div>
                <div className='d-flex justify-content-center mt-4'>
                    <button className='btn btn-primary' onClick={handlePrevPage}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <span>Page {page}</span>
                    <button className='btn btn-primary' onClick={handleNextPage}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
            </div>

            <div className='d-flex justify-content-center mt-4'>
                <button className='btn btn-primary' onClick={handleCreateTeam}>Create Team</button>
            </div>
        </div>
    );
};

export default UserList;
