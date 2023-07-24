import axios from "axios";
import { useState } from "react";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
            const response = await axios.post('http://localhost:3000/login', formData, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            const data = response.data
            const token = data.token;
            localStorage.setItem('token', token);
            alert("Login Successful")
            setFormData({
                email: '',
                password: '',
            })
        }catch (error){
            console.error('Login Error', error.response.data);
        }
    }

    return (
        <form className="form_body" onSubmit={handleSubmit}>
            <h3>Welcome Back!</h3>
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
                placeholder="Password"
            />
            <button className='form_btn' type='submit'>CONTINUE</button>
        </form>
    )
}
export default LoginForm;