import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);

    const handleNavbarToggle = () => {
        setNavbarOpen(!navbarOpen);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded={navbarOpen ? 'true' : 'false'} aria-label="Toggle navigation" onClick={handleNavbarToggle}  >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${navbarOpen ? 'show' : ''}`} id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to='/newUser' className='nav-link' style={{ color: 'white' }} onClick={handleNavbarToggle}>
                                    Add New User
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/teamDetail' className='nav-link' style={{ color: 'white' }} onClick={handleNavbarToggle}>
                                    Teams
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
