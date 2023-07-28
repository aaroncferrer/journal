import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './categoryModal.css'

function CategoryModal(props) {
    const { show, setShow, formData, setFormData, handleChange, addCategory, isEditing, setIsEditing, editCategory } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isEditing){
            editCategory(e);
        }else {
            addCategory(e);
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
        <Modal show={show} onHide={handleClose} centered className='category_modal'>
            <form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Edit Category' : 'Add Category'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <input
                        className='category_input' 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Category Name"
                    />
                    <input
                        className='category_input' 
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Category Description"
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

export default CategoryModal;