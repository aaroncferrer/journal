import './auth.css'

function Auth() {
    return(
        <main className="auth">
            <div className="container auth_container">
                <div className="form_container">
                    <div className="switch_grp">
                        <button className='switch_btn signup'>Sign Up</button>
                        <button className='switch_btn login'>Log in</button>
                    </div>
                    <form className="form_body">
                        <h3>Sign Up for Free</h3>
                        <div className="name_input">
                            <input
                                className='form_input'
                                type="text"
                                name="first_name"
                                required
                                placeholder="First Name"
                            />
                            <input
                                className='form_input'
                                type="text"
                                name="last_name"
                                required
                                placeholder="Last Name"
                            />
                        </div>
                        <input
                            className='form_input' 
                            type="email"
                            name="email"
                            required
                            placeholder="Email Address"
                        />
                        <input
                            className='form_input' 
                            type="password"
                            name="password"
                            required
                            placeholder="Set A Password"
                        />
                        <input
                            className='form_input' 
                            type="password"
                            name="password_confirmation"
                            required
                            placeholder="Confirm Password"
                        />
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Auth;