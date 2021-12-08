import React, { useState } from "react";
import { UsersContext } from "../../context/UsersContext";
import database from "../../database";
import Loading from "../Loading"

export const UsersList = () => {

    const { users, setUsers} = React.useContext(UsersContext)
    // const [itemsState,setItemsState] = React.useState([])

    // const [stateChanged, setStateChanged] = useState(false)

    const [directionSort, setDirectionSort] = useState(true)
    const [fieldData, setFieldData] = useState('')
    const [loading,setLoading] = React.useState(false)

    React.useEffect(() => {

        loadItems()


    }, [])

    const loadItems = () => {

        try {

            const data = database.get('/users')
                .then(res => {
                        console.log(res.data)
                        const current = res.data.map(user => {
                            return {
                                ...user,
                                isChecked: false

                            }
                        })

                        setUsers(Object.values({...current}))
                        console.log(current, 'cur')
                        setLoading(true)
                    }

                )


        } catch (e) {
            console.log(e)
        }

    }


    React.useEffect(() => {
        console.log(users, 'state useEffect')
        // setStateChanged(false)
    }, [users])


    const sortData = (field) => {

        const copyData = users.concat()

        let sortData;

        if (directionSort) {
            sortData = copyData.sort(
                (a, b) => {
                    return a[field] > b[field] ? 1 : -1
                })
        }
        sortData = copyData.reverse((a, b) => {
            return a[field] > b[field] ? 1 : -1
        })
        setUsers(sortData)
        setDirectionSort(!directionSort)
    }

    const Arrow = () => {
        return (
            directionSort ? <i className="bi bi-sort-down"/> :
                <i className="bi bi-sort-up"/>
        )
    }

    const fieldSortData = (field) => {
        sortData(field)
        setFieldData(field)
    }


    const handleChange = (e) => {
        let userName = e.target.name;
        let checked = e.target.checked;
        let curItem = e.target.value;

        if (userName === "checkAll") {

            users.allChecked = checked
            users.forEach((item) => {
                item.isChecked = checked
                {
                    console.log("here")
                }
            })


            console.log(users.isChecked, 'isChecked')
            console.log(users, 'render')


        } else {
            const arrayNumbers = users.map(item => item.parentId)
            console.log(arrayNumbers, 'array')
            if (arrayNumbers.some(id => id === curItem)) {
                console.log('nwo nwow nwo')
                // itemsState.allChecked = itemsState.every(item => item.isChecked)
                users
                    .filter(parent => parent.parentId === curItem)
                    .map(item => {
                        item.isChecked = checked
                    })

                console.log(users, 'itemsState checkbox')
                console.log("nice")
            }

            if (users.every(item => item.isChecked)) {
                users.allChecked = checked
                console.log(users,'every')
            } else {
                users.allChecked = false
            }


            console.log(curItem, 'curItem')



        }
        setUsers([...users])


        console.log(users, 'updated use')

    }


    return (
        <>
            <table className="table table-hover table-striped">
                <thead>
                <tr>

                    <th scope="col" className='table-header table-checkbox'><input type='checkbox'
                                                                                   onChange={(e) => handleChange(e)}
                                                                                   name="checkAll"

                                                                                   value={users.map(item => item.parentId)}
                                                                                   checked={users.allChecked}
                        // checked={itemsState.filter((item) => item.isChecked !== true).length < 1}
                    /></th>
                    <th scope="col" className='table-header' onClick={() => {
                        fieldSortData('parentId')
                    }}>
                        {fieldData === 'parentId' ? <Arrow/> : null}
                        ID
                    </th>
                    <th scope="col" className='table-header' onClick={() => {
                        fieldSortData('role')
                    }}>
                        {fieldData === 'role' ? <Arrow/> : null}
                        Role
                    </th>
                    <th scope="col" className='table-header'>Login</th>
                    <th scope="col" className='table-header'>Password</th>
                    <th scope="col" className='table-header' onClick={() => {
                        fieldSortData('email')
                    }}>
                        {fieldData === 'email' ? <Arrow/> : null}
                        Email
                    </th>
                </tr>
                </thead>
                <tbody>

                {loading ?

                    users.map(item => (

                        <tr key={item.parentId}>

                            <td className='table-body '>
                                <input type='checkbox'
                                       checked={item.isChecked}
                                       value={item.parentId}
                                       name={item.parentId}
                                       onChange={(e) => handleChange(e)}/></td>
                            <td scope="row" className='table-body'>{item.parentId}</td>
                            <td className='table-body'>{item.role}</td>
                            <td className='table-body'>{item.login}</td>
                            <td className='table-body'>{item.password}</td>
                            <td className='table-body'>{item.email}</td>

                        </tr>

                    ))
                 : <Loading/>}


                </tbody>
            </table>
        </>


    )
}
