import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidEditAlt } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import './categories.css'
import CategoryForm from "./CategoryForm";

function Categories(props) {
    const navigate = useNavigate();

    const { currentUser, setCurrentUser } = props;

    const [categories, setCategories] = useState([]);
    const [show, setShow] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    })

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
            }catch(error) {
                console.error('Error fetching categories', error);
            }
        }
        fetchCategories();
    }, [currentUser.token]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    };

    const addCategory = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.description) {
            alert("All fields are required.");
            return;
        }

        try{    
            const token = currentUser.token;
            const response = await axios.post('http://localhost:3000/categories', 
            {
                category: formData
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCategories((prevCategories) => [...prevCategories, response.data]);
            setFormData({
                name: '',
                description: ''
            })
            setShow(false);
        }catch(error){
            alert(`Error: ${error.response.data.errors[0]}`);
        }
    }

    const handleEditCategory = (category) => {
        setIsEditing(true);
        setEditCategoryId(category.id);
        setFormData({
            name: category.name,
            description: category.description
        })
        setShow(true);
    };

    const editCategory = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.description) {
            alert("All fields are required.");
            return;
        }

        try{
            const token = currentUser.token;
            await axios.patch(`http://localhost:3000/categories/${editCategoryId}`,
            {
                category: formData,
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setCategories((prevCategories) =>
                prevCategories.map((category) =>
                    category.id === editCategoryId ? { ...category, ...formData } : category
                )
            );

            setFormData({
                name: "",
                description: "",
            });
            setShow(false);
            setIsEditing(false);
        }catch (error){
            alert(`Error: ${error.response.data.errors[0]}`);
        }
    }

    const deleteCategory = async (categoryId) => {
        try{
            const token = currentUser.token;
            await axios.delete(`http://localhost:3000/categories/${categoryId}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryId))
            console.log("Successfully Deleted!");
        }catch(error){
            console.error(error.response.data);
        }
    }

     const handleLogout = () => {
        setCurrentUser(null);
        navigate('/');
    }

    return(
        <main className="categories">
            {/* MODAL */}
            <CategoryForm 
                show={show}
                setShow={setShow}
                setFormData={setFormData}
                formData={formData}
                handleChange={handleChange}
                addCategory={addCategory}
                editCategory={editCategory}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
            />

            <div className="container categories_container">
                <h1>Welcome back, {currentUser.first_name}!</h1>
                <div className="btn_grp">
                <button 
                    className="btns btn_secondary" 
                    onClick={() => setShow(true)}
                >
                    ADD CATEGORY
                </button>
                <button className="btns btn_primary" onClick={handleLogout}>LOG OUT</button>
                </div>
                <div className="categories_grid">
                    {categories.map((category) => (
                    <div onClick={()=> navigate(`/categories/${category.id}/tasks`)} key={category.id} className="category">
                        <div className="cat_header">
                            <h4 className="cat_name">{category.name}</h4>
                            <div className="cat_icons_container">
                                <BiSolidEditAlt 
                                    className="cat_icons"
                                    onClick={() => handleEditCategory(category)}
                                />
                                <AiFillDelete 
                                    className="cat_icons" 
                                    onClick={() => deleteCategory(category.id)}
                                />
                            </div>
                        </div>
                        <p className="cat_desc">{category.description}</p>
                        <p className="task_count">
                            {category.task_count === 0 ? "NO TASKS" : category.task_count === 1 ? "1 TASK" : `${category.task_count} TASKS`} 
                        </p>
                    </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Categories;