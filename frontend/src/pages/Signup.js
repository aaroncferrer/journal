import { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/signup', 
                {
                    user: formData
                }, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            console.log('Signup Successful', response.data);
        }catch(error){
            console.error('Signup Error', error.response.data)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name:</label>
                <input 
                    type='text'
                    name='first_name'
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input 
                    type='text'
                    name='last_name'
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input 
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input 
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input 
                    type='password'
                    name='password_confirmation'
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type='submit'>Sign Up</button>
        </form>
    )
}

export default SignUp;