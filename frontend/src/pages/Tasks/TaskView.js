import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function TaskView(props) {
    const { currentUser, show, setShow, task } = props;

    const [taskDetails, setTaskDetails] = useState(null);

    const handleClose = () => {
        setShow(false);
    };

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const token = currentUser.token;
                const response = await axios.get(`http://localhost:3000/categories/${task.category_id}/tasks/${task.id}`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const formattedTaskDetails = {
                    ...response.data,
                    deadline: response.data.deadline
                        ? new Date(response.data.deadline).toISOString().slice(0, 10)
                        : null,
                };
                setTaskDetails(formattedTaskDetails);
            }catch(error) {
                console.error('Error fetching task details', error);
            };
        }
        if(show){
            fetchTaskDetails();
        }
    }, [currentUser.token, task.category_id, task.id, show])
    
    return(
         <Modal show={show} onHide={handleClose} className='task_view'>
            <Modal.Header closeButton>
                {taskDetails && <Modal.Title>{taskDetails.name}</Modal.Title>}
            </Modal.Header>
            <Modal.Body>
                {taskDetails ? (
                    <>
                        <p>Task Name: {taskDetails.name}</p>
                        <p>Task Description: {taskDetails.description}</p>
                        <p>Due Date: {taskDetails.deadline}</p>
                    </>
                ) : (
                    <p>Loading task details...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default TaskView;