import React from 'react'
import database from "../../database";

export default function UserPage() {

    const [getUsers, setGetUsers] = React.useState([])

    React.useEffect(() => {
        async function fetch() {
            const getItemDB = await database.get('items')
            setGetUsers(getItemDB.data)
        }

        fetch()
    }, [])


    return (
        <div>
            <div>
                123
            </div>
            <div>
                123
            </div>
            123
        </div>
    )


}