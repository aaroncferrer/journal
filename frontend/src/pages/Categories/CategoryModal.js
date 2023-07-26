import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './categoryModal.css'

function CategoryModal(props) {
    const { show, setShow, formData, handleChange, addCategory } = props;

    return(
        <Modal show={show} onHide={() => setShow(false)} centered className='category_modal'>
            <form onSubmit={addCategory}>
            <Modal.Header closeButton>
                <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <input
                        className='form_input' 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Category Name"
                    />
                    <input
                        className='form_input' 
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
                <Button type='submit' variant="primary" onClick={(e) => addCategory(e)}>
                    Add
                </Button>
            </Modal.Footer>
            </form>
        </Modal>
    )
}

export default CategoryModal;