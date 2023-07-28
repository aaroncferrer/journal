import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './taskModal.css'

function TaskModal(props) {
    const { show, setShow, formData, setFormData, handleChange, addTask, isEditing, setIsEditing, editTask } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isEditing){
            editTask(e);
        }else {
            addTask(e);
        }
    }

    const handleClose = () => {
        setShow(false);
        setIsEditing(false);
        setFormData({
                name: "",
                description: "",
        });
    }

    return(
        <Modal show={show} onHide={handleClose} className='task_modal'>
            <form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Edit Task' : 'Add Task'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <input
                        className='task_input' 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Task Name"
                    />
                    <input
                        className='task_input' 
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Task Description"
                    />
                    <input
                        className='task_input' 
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        placeholder="Task Deadline"
                    />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button type='submit' variant="primary">
                    {isEditing ? 'Save Changes' : 'Add'}
                </Button>
            </Modal.Footer>
            </form>
        </Modal>
    )
}

export default TaskModal;