import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';

function HeaderComponent() {
    const authContext = useAuth()
    console.log(authContext)

    return (
        <header className='border-bottom border-dark border-5 mb-5 p-2 bg-dark'>
            <div className='container-lg'>
                <div className='row'>
                    <nav className='navbar navbar-dark navbar-expand-lg bg-dark'>
                        <a className='navbar-brand ms-2 fs-2 fw-bold text-white' href='in28minutes.com'>in28minutes</a>
                        <div className='collapse navbar-collapse'>
                            <ul className='navbar-nav'>
                                <li className='nav-item'><Link className='nav-link' to='/welcome/amaanlari'>Home</Link></li>
                                <li className='nav-item'><Link className='nav-link' to='/todo'>Todos</Link></li>
                            </ul>
                        </div>
                        <ul className='navbar-nav'>
                            <li className='nav-item'><Link className='nav-link' to='/logout'>Logout</Link></li>
                            <li className='nav-item'><Link className='nav-link' to='/login'>Login</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default HeaderComponent
