import { ItemContext } from "../../context/ItemContext";
import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import './styles.scss'
import { UsersContext } from "../../context/UsersContext";


export const AddUsersForm = (myButton) => {

    const {addUsers} = useContext(UsersContext)
    const [show,setShow] = React.useState(false)
    const [newItem,setNewItem] = useState({
        id:"",parentId:"",role:"",login:"",password:"",email:""
    })

    const onInputChange =(e) => {
        setNewItem({...newItem,[e.target.name]:e.target.value})
    }

    const {id,parentId,role,login,password,email} = newItem

    const handleSubmit = (e) => {
        e.preventDefault();

        addUsers(id,parentId,role,login,password,email)
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
                    placeholder='role'
                    name='role'
                    value={role}
                    onChange={(e) => onInputChange(e)}
                    required/>
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type='text'
                    placeholder='login'
                    name='login'
                    value={login}
                    onChange={(e) => onInputChange(e)}
                    rows={5}/>
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type='text'
                    placeholder='password'
                    name='password'
                    value={password}

                    onChange={(e) => onInputChange(e)}
                    required/>
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type='text'
                    placeholder='email'
                    name='email'
                    value={email}
                    onChange={(e) => onInputChange(e)}
                    required />
            </Form.Group>

            <Button variant="success" type="submit" block>
                Add new Order
            </Button>


        </Form>
    )
}