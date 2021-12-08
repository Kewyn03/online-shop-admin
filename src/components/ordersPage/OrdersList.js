import React, { useState } from "react";
import { OrdersContext } from "../../context/OrdersContext";
import database from "../../database";
import Loading from "../Loading"
export const OrdersList = () => {

    const {orders, setOrders} = React.useContext(OrdersContext)
    // const [itemsState,setItemsState] = React.useState([])

    // const [stateChanged, setStateChanged] = useState(false)
    const [loading,setLoading] = React.useState(false)
    const [directionSort, setDirectionSort] = useState(true)
    const [fieldData, setFieldData] = useState('')


    React.useEffect(() => {
        loadItems()

    }, [])

    const loadItems = () => {
        try {
            const data = database.get('/orders')
                .then(res => {
                        console.log(res.data)
                        const current = res.data.map(order => {
                            return {
                                ...order,
                                isChecked: false

                            }
                        })
                        setOrders(Object.values({...current}))
                        console.log(current, 'cur')
                        setLoading(true)
                    }
                )


        } catch (e) {
            console.log(e)
        }

    }


    React.useEffect(() => {
        console.log(orders, 'state useEffect')
        // setStateChanged(false)
    }, [orders])


    const sortData = (field) => {

        const copyData = orders.concat()

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
        setOrders(sortData)
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
        let itemName = e.target.name;
        let checked = e.target.checked;
        let curItem = e.target.value;

        if (itemName === "checkAll") {

            orders.allChecked = checked
            orders.forEach((item) => {
                item.isChecked = checked
                {
                    console.log("here")
                }
            })


            console.log(orders.isChecked, 'isChecked')
            console.log(orders, 'render')


        } else {
            console.log(orders, 'itemState before')
            const arrayNumbers = orders.map(item => item.parentId)
            console.log(arrayNumbers, 'array')
            if (arrayNumbers.some(id => id === curItem)) {
                console.log('nwo nwow nwo')
                // itemsState.allChecked = itemsState.every(item => item.isChecked)
                orders
                    .filter(parent => parent.parentId === curItem)
                    .map(item => {
                        item.isChecked = checked
                    })

                console.log(orders, 'itemsState checkbox')
                console.log("nice")
            }
            if (orders.every(item => item.isChecked)) {
                orders.allChecked = checked
                console.log('every')
            } else {
                orders.allChecked = false
            }


            console.log(curItem, 'curItem')


            console.log(orders.allChecked, 'itemsState allchecked')
        }
        setOrders([...orders])
        // setStateChanged(true)

        console.log(orders, 'updated use')

    }


    return (
        <>
            <table className="table table-hover table-striped">
                <thead>
                <tr>

                    <th scope="col" className='table-header table-checkbox'><input type='checkbox'
                                                                                   onChange={(e) => handleChange(e)}
                                                                                   name="checkAll"

                                                                                   value={orders.map(item => item.parentId)}
                                                                                   checked={orders.allChecked}
                        // checked={itemsState.filter((item) => item.isChecked !== true).length < 1}
                    /></th>
                    <th scope="col" className='table-header' onClick={() => {
                        fieldSortData('parentId')
                    }}>
                        {fieldData === 'parentId' ? <Arrow/> : null}
                        ID
                    </th>
                    <th scope="col" className='table-header' onClick={() => {
                        fieldSortData('title')
                    }}>
                        {fieldData === 'title' ? <Arrow/> : null}
                        Title
                    </th>
                    <th scope="col" className='table-header'>Orders ID</th>
                    <th scope="col" className='table-header'>Orders ParentID</th>
                    <th scope="col" className='table-header' onClick={() => {
                        fieldSortData('price')
                    }}>
                        {fieldData === 'price' ? <Arrow/> : null}
                        Full Price
                    </th>
                </tr>
                </thead>
                <tbody>

                {

                   loading ? orders.map(item => (

                        <tr key={item.parentId}>

                            <td className='table-body '>
                                <input type='checkbox'
                                       checked={item.isChecked}
                                       value={item.items.parentId}
                                       name={item.items.parentId}
                                       onChange={(e) => handleChange(e)}/></td>
                            <td scope="row" className='table-body'>{item.parentId}</td>
                            <td className='table-body'>{item.items.map(tl => tl.title + " ")}</td>
                            <td className='table-body'>{item.items.map(id => id.id + " ")}</td>
                            <td className='table-body'>{item.items.map(parentId => parentId.parentId + " ")}</td>
                            <td className='table-body'>{item.fullPrice} $</td>

                        </tr>

                    )) : <Loading />
                }


                </tbody>
            </table>
        </>


    )
}
