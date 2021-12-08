import React, { createContext } from "react";
import database from "../database";

export const UsersContext = createContext()

const UsersContextProvider = (props) => {

    const [users, setUsers] = React.useState([])


    React.useEffect(() => {

        getList()

    }, [])

    const getList = async () => {
        const ourUsers = await database.get('/users')

        setUsers(ourUsers.data)

    }


    const addUsers = (id, parentId, role, login, password, email) => {
        if (users.find(order => order.parentId === parentId)) {
            alert('This id is registered yet')
        } else {

            database.post('/users', {id, parentId, role, login, password, email}).then(res => {
                    setUsers([...users, res.data])
                }
            )
                .catch(error => {
                    console.log(error)
                })


        }

    }

    const deleteUsers = () => {


        let filtered = users.filter(order => order.isChecked === true)


        if (filtered.length > 0) {
            let counter = filtered.length
            filtered.forEach(item => {

                database.delete(`/users/${users.id}`).then(res => {
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


    const updateUsers = (id, parentId, role, login, password, email) => {

        let urlId = users
            .filter(item => item.parentId === parentId)

        users.forEach(function (item, i) {
            if (parentId === item.parentId) {
                users[i] = {id, parentId, role,  login,  password, email}
            }
        })

        database.put(`/orders/${urlId[0].id}`, {id, parentId, role,  login,  password, email}).then(res => {
            setUsers([...users.filter(item => item.parentId !== parentId), res.data])
        })
            .catch(error => {
                console.log(error)
            })


    }

    return (
        <UsersContext.Provider value={{users, addUsers, deleteUsers, updateUsers, setUsers}}>
            {props.children}

        </UsersContext.Provider>
    )
}

export default UsersContextProvider