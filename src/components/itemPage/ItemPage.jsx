import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import Stack from '@mui/material/Stack';

import { ItemList } from "./ItemList";

import './styles.scss'
import { Alert, Modal } from "react-bootstrap";
import { AddForm } from "./AddForm";
import { EditItemForm } from "./EditItemForm"
import { ItemContext } from "../../context/ItemContext";


export default function ItemPage() {

    const [showAlert, setShowAlert] = React.useState(false)
    const [show, setShow] = React.useState(false)
    const [showEdit, setShowEdit] = React.useState(false)
    const [showDelete, setShowDelete] = React.useState(false)

    const {items, setItems} = React.useContext(ItemContext)
    const {updateItem} = React.useContext(ItemContext)
    const {deleteItem} = React.useContext(ItemContext)

    const handleShow = () => setShow(true)
    const handleShowEdit = () => setShowEdit(true)
    const handleShowDelete = () => setShowDelete(true)
    const handleShowAlert = () => {
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        }, 1500)
    }
    const handleClose = () => {
        setShow(false)
        setShowEdit(false)
        setShowDelete(false)
    }


    useEffect(() => {
        handleClose()

        // return () => {
        //     handleShowAlert()
        // }
    }, [items])


    return (
        <main>
            <div className='text-string'>
                <div className='items-title'>Items List</div>
                <div className='buttons'>
                    <Stack direction="row" spacing={1.5}>
                        <Button disabled={!items.find(item => item.isChecked === true)} className='button-styles' onClick={(e) => handleShowDelete(e)}
                                value={items.map(item => item.parentId)} variant="contained" startIcon={<DeleteIcon/>}>
                            Delete
                        </Button>
                        <Button className='button-styles' onClick={(e) => handleShowEdit(e)} variant="contained"
                                data-toggle='modal' startIcon={<CreateIcon/>}>
                            Edit
                        </Button>
                        <Button className='button-styles' onClick={(e) => handleShow(e)} variant="contained" data-toggle='modal'
                                startIcon={<AddIcon/>}>
                            Create
                        </Button>
                    </Stack>
                </div>
            </div>
            <Alert className='alert-notification' show={showAlert} variant="success" onClose={() => setShowAlert(false)}
                   dismissible>Updated!</Alert>

            <ItemList/>

            <Modal className="modal" show={showDelete} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Delete Item(s)
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are u sure to delete this item(s)?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant='secondary'>Close</Button>
                    <Button onClick={() => deleteItem()} variant='contained'>Delete</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEdit} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit Item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditItemForm/>
                </Modal.Body>

            </Modal>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add Item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <AddForm/>

                </Modal.Body>
            </Modal>


        </main>
    )
}