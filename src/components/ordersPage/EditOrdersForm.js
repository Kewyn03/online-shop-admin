
import { useContext, useState } from "react";
import { Form,Button } from "react-bootstrap";
import './styles.scss'
import { OrdersContext } from "../../context/OrdersContext";
export const EditOrdersForm = () => {

    const {updateOrders} = useContext(OrdersContext)

    const [newItem,setNewItem] = useState({
        id:"",parentId:"",title:"",description:"",imageURL:"",price:"",
    })

    const onInputChange =(e) => {
        setNewItem({...newItem,[e.target.name]:e.target.value})
    }

    const {id,parentId,role,description,imageURL,price} = newItem

    const handleSubmit = (e) => {
        e.preventDefault();
        updateOrders(id,parentId,role,description,imageURL,Number(price))
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    className='form-control'
                    type='text'
                    placeholder='id'
                    name='parentId'
                    value={parentId}
                    onChange={(e) => onInputChange(e)}
                    required/>
            </Form.Group>
            <Form.Group>
                <Form.Control
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
                Edit Item
            </Button>
        </Form>
    )
}