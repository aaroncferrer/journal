import { useState } from 'react';
import './auth.css'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function Auth() {
    const [isLoginForm, setIsLoginForm] = useState(false);

    return(
        <main className="auth">
            <div className="container auth_container">
                <div className="form_container">
                    <div className="switch_grp">
                        <button 
                            className={`switch_btn ${!isLoginForm ? 'active' : ''}`} 
                            onClick={() => setIsLoginForm(false)}>
                            Sign Up
                        </button>
                        <button 
                            className={`switch_btn ${isLoginForm ? 'active' : ''}`} 
                            onClick={() => setIsLoginForm(true)}>
                            Log in
                            </button>
                    </div>
                    {isLoginForm ? <LoginForm /> : <SignupForm />}
                </div>
            </div>
        </main>
    )
}
export default Auth;