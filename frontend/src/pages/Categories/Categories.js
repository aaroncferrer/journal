import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './categories.css'

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
        <main className="categories">
            <div className="container categories_container">
                <h1>Welcome back, {currentUser.first_name}!</h1>
                {/* {categories.map((category) => (
                    <p>{category.name}</p>
                ))} */}
                <div className="btn_grp">
                <button className="btns btn_secondary">ADD CATEGORY</button>
                <button className="btns btn_primary" onClick={handleLogout}>LOG OUT</button>
                </div>
                <div className="categories_grid">
                    <div className="category">
                        <h4 className="cat_name">Valorant</h4>
                        <p className="cat_desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi quibusdam aspernatur eius veniam voluptas quo libero voluptate quidem molestiae. Sequi quibusdam aspernatur eius veniam voluptas quo libero voluptate quidem molestiae</p>
                        <p className="task_count">2 TASKS</p>
                    </div>
                    <div className="category">
                        <h4 className="cat_name">Valorant</h4>
                        <p className="cat_desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi quibusdam aspernatur eius veniam voluptas quo libero voluptate quidem molestiae.</p>
                        <p className="task_count">2 TASKS</p>
                    </div>
                    <div className="category">
                        <h4 className="cat_name">Valorant</h4>
                        <p className="cat_desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi quibusdam aspernatur eius veniam voluptas quo libero voluptate quidem molestiae.</p>
                        <p className="task_count">2 TASKS</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Categories;