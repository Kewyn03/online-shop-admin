import React, { createContext } from "react";
import database from "../database";

export const OrdersContext = createContext()

const OrdersContextProvider = (props) => {

    const [orders, setOrders] = React.useState([])

    React.useEffect(() => {
        getList()

    }, [])

    const getList = async () => {
        const ourOrders = await database.get('/orders')
        setOrders(ourOrders.data)
    }


    const addOrders = (id, parentId, title, description, imageURL, price) => {
        if (orders.find(order => order.parentId === parentId)) {
            alert('This id is registered yet')
        } else {

            database.post('/orders', {id, parentId, title, description, imageURL, price}).then(res => {
                    setOrders([...orders, res.data])
                }
            )
                .catch(error => {
                    console.log(error)
                })


        }

    }

    const deleteOrders = () => {


        let filtered = orders.filter(order => order.isChecked === true)


        if (filtered.length > 0) {
            let counter = filtered.length
            filtered.forEach(item => {

                database.delete(`/orders/${orders.id}`).then(res => {
                    counter--
                    if (counter === 0) {
                        getList()
                    }
                })
                    .catch(error => {
                        counter--
                        getList()
                    })


            })


        }


    }


    const updateOrders = (id, parentId, title, description, imageURL, price) => {

        let urlId = orders
            .filter(item => item.parentId === parentId)

        orders.forEach(function (item, i) {
            if (parentId === item.parentId) {
                orders[i] = {id, parentId, title, description, imageURL, price}
            }
        })

        database.put(`/orders/${urlId[0].id}`, {id, parentId, title, description, imageURL, price}).then(res => {
            setOrders([...orders.filter(item => item.parentId !== parentId), res.data])
        })
            .catch(error => {
                console.log(error)
            })


    }

    return (
        <OrdersContext.Provider value={{orders, addOrders, deleteOrders, updateOrders, setOrders}}>
            {props.children}

        </OrdersContext.Provider>
    )
}

export default OrdersContextProvider