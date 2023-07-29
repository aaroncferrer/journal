import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
    const { setCurrentUser, apiBaseUrl, Toast, setLoading } = props;

    const navigate = useNavigate();

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
        setLoading(true);
        e.preventDefault();
        try{
            const response = await axios.post(`${apiBaseUrl}/login`, formData, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            const data = response.data;
            setCurrentUser({...data.user, token: data.token})

            Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
            })
            setLoading(false);
            setFormData({
                email: '',
                password: '',
            })
            navigate('/categories');
        }catch (error){
            setLoading(false);
            Toast.fire({
                icon: 'error',
                title: `Login Error: ${error.response.data.error}`
            })
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