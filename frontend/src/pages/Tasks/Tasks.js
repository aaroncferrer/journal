import './tasks.css'
import { BiSolidEditAlt } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { BsCheck2All } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import TaskModal from './TaskModal'

function Tasks({currentUser}) {
    const { categoryId } = useParams();
    
    const [tasks, setTasks] = useState([]);
    const [show, setShow] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        deadline: null,
    })

    const sortTasks = (tasks) => {
        return tasks.sort((a, b) => {
            if (a.deadline && b.deadline) {
            return new Date(a.deadline) - new Date(b.deadline);
            }else if(a.deadline) {
            return -1; // a has deadline, b does not
            }else if(b.deadline) {
            return 1; // b has deadline, a does not
            }else {
            return a.id - b.id; // neither has a deadline, sort by ID
            }
        });
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = currentUser.token
                const response = await axios.get(`http://localhost:3000/categories/${categoryId}/tasks`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const formattedTasks = response.data.map((task) => ({
                    ...task,
                    deadline: task.deadline
                        ? new Date(task.deadline).toISOString().slice(0, 10)
                        : null,
                }));
                setTasks(sortTasks(formattedTasks));
                console.log(formattedTasks);
            }catch(error) {
                console.error('Error fetching tasks', error);
            }
        }
        fetchTasks();
    }, [currentUser.token, categoryId]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    };

    const addTask = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.description) {
            alert("Name & Description is required.");
            return;
        }

        if (formData.deadline) {
            const selectedDate = new Date(formData.deadline);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                alert("Deadline cannot be in the past.");
                return;
            }
        }

        try{    
            const token = currentUser.token;
            const response = await axios.post(`http://localhost:3000/categories/${categoryId}/tasks`, 
            {
                task: formData
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const formattedTask = {
                ...response.data,
                deadline: response.data.deadline
                    ? new Date(response.data.deadline).toISOString().slice(0, 10)
                    : null,
            };
            setTasks((prevTasks) => [...prevTasks, formattedTask]);
            console.log(formattedTask);
            setFormData({
                name: '',
                description: '',
                deadline: null
            })
            setShow(false);
        }catch(error){
            alert(`Error: ${error.response.data.error}`);
        }
    }

    const handleEditTask = (task) => {
        setIsEditing(true);
        setEditTaskId(task.id);
        setFormData({
            name: task.name,
            description: task.description,
            deadline: task.deadline
        })
        setShow(true);
    };

    const editTask = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.description) {
            alert("Name & Description is required.");
            return;
        }

        if (formData.deadline) {
            const selectedDate = new Date(formData.deadline);
            const today = new Date();
            today.setHours(0, 0, 0, 0); 

            if (selectedDate < today) {
                alert("Deadline cannot be in the past.");
                return;
            }
        }

        try{
            const token = currentUser.token;
            await axios.patch(`http://localhost:3000/categories/${categoryId}/tasks/${editTaskId}`,
            {
                task: formData,
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === editTaskId ? { ...task, ...formData } : task
                )
            );
            setFormData({
                name: "",
                description: "",
                deadline: null
            });
            setShow(false);
            setIsEditing(false);
        }catch (error){
            alert(`Error: ${error.response.data.errors[0]}`);
        }
    }

    const deleteTask = async (taskId) => {
        try{
            const token = currentUser.token;
            await axios.delete(`http://localhost:3000/categories/${categoryId}/tasks/${taskId}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
            console.log("Successfully Deleted!");
        }catch(error){
            console.error(error.response.data);
        }
    }

    const finishTask = (task) => {
        const updatedTasks = tasks.map((t) =>
            t.id === task.id ? { ...t, done: !t.done } : t
        );
        setTasks(updatedTasks);
    };

    return(
        <main className="tasks">
            {/* MODAL */}
            <TaskModal 
                show={show}
                setShow={setShow}
                formData={formData}
                setFormData={setFormData} 
                handleChange={handleChange}
                addTask={addTask}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                editTask={editTask}
            />

            <div className="container tasks_container">
                <div className="tasks_list">
                    <h2>My Tasks</h2>
                    <div className="tasks_header">
                        <button 
                            className='btns btn_secondary'
                            onClick={() => setShow(true)}
                        >
                        Add Task
                        </button>
                        <span>Add dropdown filter here</span>
                    </div>
                    {sortTasks(tasks).map((task) => (
                    <div key={task.id} className="task">
                        <div className={`task_content ${task.done ? "done" : ""}`}>
                            <p className='task_name'>{task.name}</p>
                            <p className='task_due'>DUE DATE: {task.deadline}</p>
                        </div>
                        <div className="task_actions">
                            <BsCheck2All 
                                className="task_icons task_done"
                                onClick={() => finishTask(task)} 
                            />
                            <BiSolidEditAlt 
                                className="task_icons task_edit"
                                onClick={() => handleEditTask(task)} 
                            />
                            <AiFillDelete 
                                className="task_icons task_delete" 
                                onClick={() => deleteTask(task.id)}
                            />
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Tasks;