import React, { useState } from "react";
import { ItemContext } from "../../context/ItemContext";
import database from "../../database";
import Loading from "../Loading";

export const ItemList = () => {

    const {items,setItems} = React.useContext(ItemContext)
    // const [itemsState,setItemsState] = React.useState([])

    // const [stateChanged, setStateChanged] = useState(false)
    const [loading,setLoading] = React.useState(false)
    const [directionSort, setDirectionSort] = useState(true)
    const [fieldData,setFieldData] = useState('')


    React.useEffect(() => {
        loadItems()

    }, [])

    const loadItems = () => {
        try {
            const data = database.get('/items')
                .then(res => {

                        const current = res.data.map(item => {
                            return {
                                ...item,
                                isChecked: false

                            }
                        })
                        setItems(Object.values({...current}))
                        console.log(current, 'cur')
                        setLoading(true)
                    }
                )


        } catch (e) {
            console.log(e)
        }

    }


    React.useEffect(() => {
        console.log(items, 'state useEffect')
        // setStateChanged(false)
    }, [items])



    const sortData = (field) => {

        const copyData = items.concat()

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
        setItems(sortData)
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

            items.allChecked = checked
            items.forEach((item) => {
                item.isChecked = checked
                {
                    console.log("here")
                }
            })


            console.log(items.isChecked, 'isChecked')
            console.log(items, 'render')


        } else {
            console.log(items, 'itemState before')
            const arrayNumbers = items.map(item => item.parentId)
            console.log(arrayNumbers, 'array')
            if (arrayNumbers.some(id => id === curItem)) {
                console.log('nwo nwow nwo')
                // itemsState.allChecked = itemsState.every(item => item.isChecked)
                items
                    .filter(parent => parent.parentId === curItem)
                    .map(item => {
                       item.isChecked = checked
                    })
                console.log(items, 'itemsState checkbox')
                console.log("nice")
            }
            if (items.every(item => item.isChecked)) {
                items.allChecked = checked
                console.log(items,'every')
            } else {
                items.allChecked = false
            }


            console.log(items, 'curItem')


            console.log(items.allChecked, 'itemsState allchecked')
        }

         setItems([...items])
        // setStateChanged(true)



    }




    return (
        <>
            <table className="table table-hover table-striped">
                <thead>
                <tr>
                    {console.log(items,'items')}
                    <th scope="col" className='table-header table-checkbox'><input type='checkbox'
                                           onChange={(e) => handleChange(e)}
                                           name="checkAll"
                                           value={items.map(item => item.parentId)}
                                           checked={items.allChecked}
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
                    <th scope="col" className='table-header'>Description</th>
                    <th scope="col" className='table-header'>ImageUrl</th>
                    <th scope="col" className='table-header' onClick={() => {
                        fieldSortData('price')
                    }}>
                        {fieldData === 'price' ? <Arrow/> : null}
                        Price
                    </th>
                </tr>
                </thead>
                <tbody>

                {

                   loading ? items.map(item => (

                        <tr key={item.parentId}>

                            <td className='table-body '>
                                <input type='checkbox'
                                       checked={item.isChecked}
                                       value={item.parentId}
                                       name={item.parentId}
                                       onChange={(e) => handleChange(e)}/></td>
                            <td scope="row" className='table-body'>{item.parentId}</td>
                            <td className='table-body'>{item.title}</td>
                            <td className='table-body'>{item.description}</td>
                            <td className='table-body'>{item.imageURL}</td>
                            <td className='table-body'>{item.price} $</td>

                        </tr>

                    )) : <Loading/>
                }


                </tbody>
            </table>
        </>


    )
}
