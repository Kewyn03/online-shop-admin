import React, { createContext } from "react";
import database from "../database";

export const ItemContext = createContext()

const ItemContextProvider = (props) => {

    const [items, setItems] = React.useState([])

    React.useEffect(() => {
        getList()

    }, [])

    const getList = async () => {
        const ourItems = await database.get('/items')
        setItems(ourItems.data)
    }


    const addItem = (id, parentId, title, description, imageURL, price) => {
        if (items.find(item => item.parentId === parentId)) {
            alert('This id is registered yet')
        } else {

            database.post('/items', {id, parentId, title, description, imageURL, price}).then(res => {
                    setItems([...items, res.data])
                }
            )
                .catch(error => {
                    console.log(error)
                })


        }

    }

    const deleteItem = () => {


        let filtered = items.filter(item => item.isChecked === true)


        if (filtered.length > 0) {
            let counter = filtered.length
            filtered.forEach(item => {

                database.delete(`/items/${item.id}`).then(res => {
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


    const updateItem = (id, parentId, title, description, imageURL, price) => {

        let urlId = items
            .filter(item => item.parentId === parentId)

        items.forEach(function (item, i) {
            if (parentId === item.parentId) {
                items[i] = {id, parentId, title, description, imageURL, price}
            }
        })

        database.put(`/items/${urlId[0].id}`, {id, parentId, title, description, imageURL, price}).then(res => {
            setItems([...items.filter(item => item.parentId !== parentId), res.data])
        })
            .catch(error => {
                console.log(error)
            })


    }

    return (
        <ItemContext.Provider value={{items, addItem, deleteItem, updateItem, setItems}}>
            {props.children}

        </ItemContext.Provider>
    )
}

export default ItemContextProvider