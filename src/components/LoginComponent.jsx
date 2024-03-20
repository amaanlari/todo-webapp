import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'

function LoginComponent() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [userIsAuthenticated, setUserIsAuthenticated] = useState(false)
    const [userIsNotAuthenticated, setUserIsNotAuthenticated] = useState(false)
    const navigate = useNavigate()

    function usernameOnChangeHandler(event) {
        setUsername(event.target.value);
    }

    function passwordOnChangeHandler(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        if (username == 'testuser' && password == 'test123') {
            setUserIsAuthenticated(true);
            setUserIsNotAuthenticated(false);
            navigate(`/welcome/${username}`)
        }
        else {
            console.log("Error");
            setUserIsAuthenticated(false);
            setUserIsNotAuthenticated(true);
            console.log(userIsAuthenticated);
        }
    }

    return (
        <div className='LoginComponent'>
            <h1>To Do Management</h1>
            <div className='LoginForm'>
                <form>
                    <div className='form-title'>
                        Login to To Do
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='username' className='form-label'>Username</label>
                        <input className="form-control" type='text' id='username' value={username} onChange={usernameOnChangeHandler} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' className='form-label'>Password</label>
                        <input className="form-control" type='password' id='password' value={password} onChange={passwordOnChangeHandler} />
                    </div>
                    <div className='text-center'>
                        <button className='mt-3 btn btn-dark w-100' type='button' id='login-button' onClick={handleSubmit}>Login</button>
                    </div>
                </form>
            </div>
            {userIsAuthenticated && <div className='success-message'>Authenticaton Successful!!</div>}
            {userIsNotAuthenticated && <div className='error-message'>Invalid Credentials!!</div>}
        </div >
    )
}

export default LoginComponent;
