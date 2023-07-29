import { useState } from 'react';
import './auth.css'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Loader from '../../components/Loader/Loader';

function Auth(props) {
    const { setCurrentUser, apiBaseUrl, Toast } = props;

    const [isLoginForm, setIsLoginForm] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <>
        {loading && <Loader />}
        <main className="auth">
            <div className="container auth_container">
                <div className="form_container">
                    <div className="switch_grp">
                        <button 
                            className={`switch_btn ${!isLoginForm ? 'active' : ''}`} 
                            onClick={() => setIsLoginForm(false)}
                        >
                            Sign Up
                        </button>
                        <button 
                            className={`switch_btn ${isLoginForm ? 'active' : ''}`} 
                            onClick={() => setIsLoginForm(true)}
                        >
                            Log in
                        </button>
                    </div>
                    {isLoginForm 
                        ? <LoginForm 
                            setCurrentUser={setCurrentUser} 
                            apiBaseUrl={apiBaseUrl} 
                            Toast={Toast} 
                            setLoading={setLoading} /> 
                        : <SignupForm 
                            apiBaseUrl={apiBaseUrl} 
                            Toast={Toast} 
                            setLoading={setLoading} />
                    }
                </div>
            </div>
        </main>
        </>
    );
}
export default Auth;