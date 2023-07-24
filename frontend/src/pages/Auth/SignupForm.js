import axios from "axios";
import { useState } from "react";

const SignupForm = () => {
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
            const data =  response.data;
            alert(`${data.first_name} has been successfully registered!`)
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                password_confirmation: ''
            })
        }catch(error){
            console.error('Signup Error', error.response.data)
        }
    }

    return (
        <form className="form_body" onSubmit={handleSubmit}>
            <h3>Sign Up for Free</h3>
            <div className="name_input">
                <input
                    className='form_input'
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    placeholder="First Name"
                />
                <input
                    className='form_input'
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    placeholder="Last Name"
                />
            </div>
            <input
                className='form_input' 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email Address"
            />
            <input
                className='form_input' 
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Set A Password"
            />
            <input
                className='form_input' 
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
                placeholder="Confirm Password"
            />
            <button className='form_btn' type='submit'>GET STARTED</button>
        </form>
    )
}
export default SignupForm;