import './tasks.css'
import { BiSolidEditAlt } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { BsCheck2All } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import TaskForm from './TaskForm'
import TaskView from './TaskView'

function Tasks({currentUser}) {
    const navigate = useNavigate();
    const { categoryId } = useParams();
    
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [show, setShow] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null);
    const [filter, setFilter] = useState("All");
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        deadline: null,
    })

    const sortTasks = useCallback((tasks) => {
        const filteredTasks = tasks.filter((task) => {
            if (filter === "Due Today") {
                const today = new Date().toISOString().slice(0, 10);
                return task.deadline === today;
            }else if (filter === "Pending") {
                return !task.done;
            }else if (filter === "Done") {
                return task.done;
            }else {
                return tasks;
            }
        });

        return filteredTasks.sort((a, b) => {
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
    }, [filter]);

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
    }, [currentUser.token, categoryId, sortTasks]);

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

    const finishTask = async (task) => {
        try {
            const token = currentUser.token;
            const updatedTask = { ...task, done: !task.done };
            await axios.patch(`http://localhost:3000/categories/${categoryId}/tasks/${task.id}`, 
            {
                task: updatedTask 
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTasks((prevTasks) => 
                prevTasks.map((t) => t.id === task.id ? { ...t, done: !t.done } : t)
            );
        }catch(error) {
            console.error(error.response.data);
        }
    };

    return(
        <main className="tasks">
            {/* MODAL */}
            <TaskForm 
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

            {selectedTask && (
                <TaskView
                    currentUser={currentUser}
                    show={selectedTask !== null}
                    setShow={setSelectedTask}
                    task={selectedTask}
                />
            )}

            <div className="container tasks_container">
                <div className="tasks_list">
                    <h2>MY TASKS</h2>
                    <div className="tasks_header">
                        <button 
                            className='btns btn_primary'
                            onClick={() => setShow(true)}
                        >
                        ADD TASK
                        </button>
                        <div className="filter_container">
                            <span>
                            Filter by:
                            </span>
                            <select
                                className='filter'
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >   
                                <option className='filter_options' value="All">All</option>
                                <option className='filter_options' value="Due Today">Due Today</option>
                                <option className='filter_options' value="Pending">Pending</option>
                                <option className='filter_options' value="Done">Done</option>    
                            </select>
                        </div>
                    </div>
                    {sortTasks(tasks).map((task) => (
                    <div 
                        key={task.id} 
                        className="task"
                        onClick={() => setSelectedTask(task)}
                    >
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
                <button 
                    className='btns btn_secondary'
                    onClick={() =>  navigate('/categories')}
                >BACK
                </button>
            </div>
        </main>
    )
}

export default Tasks;