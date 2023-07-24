import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Categories(props) {
    const navigate = useNavigate();

    const { currentUser, setCurrentUser } = props;

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = currentUser.token; 
                const response = await axios.get('http://localhost:3000/categories', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setCategories(response.data);
                console.log(response.data);
            }catch(error) {
                console.error('Error fetching categories', error);
            }
        }
        fetchCategories();
    }, [currentUser.token]);

    const handleLogout = () => {
        setCurrentUser(null);
        navigate('/');
    }

    return(
        <>
            <h1>Categories</h1>
            {categories.map((category) => (
                <p>{category.name}</p>
            ))}
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Categories;