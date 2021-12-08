import { ItemContext } from "../../context/ItemContext";
import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import './styles.scss'

export const AddForm = (myButton) => {

    const {addItem} = useContext(ItemContext)
    const [show,setShow] = React.useState(false)
    const [newItem,setNewItem] = useState({
        id:"",parentId:"",title:"",description:"",imageURL:"",price:""
    })

    const onInputChange =(e) => {
        setNewItem({...newItem,[e.target.name]:e.target.value})
    }

    const {id,parentId,role,description,imageURL,price} = newItem

    const handleSubmit = (e) => {
        e.preventDefault();

        addItem(id,parentId,role,description,imageURL,Number(price))
    }



    return (
        <Form onSubmit={handleSubmit}>

            <Form.Group className='form-modal'>
                <Form.Control
                    className='form-control'
                    type='text'
                    placeholder='id'
                    name='parentId'
                    value={parentId}
                    pattern="[0-9]{1,5}"
                    onChange={(e) => onInputChange(e)}
                    required/>
            </Form.Group>
            <Form.Group>
                <Form.Control
                    className='form-control'
                    type='text'
                    placeholder='title'
                    name='title'
                    value={role}
                    onChange={(e) => onInputChange(e)}
                    required/>
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type='text'
                    placeholder='description'
                    name='description'
                    value={description}
                    onChange={(e) => onInputChange(e)}
                    rows={5}/>
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type='text'
                    placeholder='imageURL'
                    name='imageURL'
                    value={imageURL}
                    onChange={(e) => onInputChange(e)}
                    required/>
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type='text'
                    placeholder='price'
                    name='price'
                    value={price}
                    onChange={(e) => onInputChange(e)}
                    required />
            </Form.Group>

            <Button variant="success" type="submit" block>
                Add new Item
            </Button>


        </Form>
    )
}