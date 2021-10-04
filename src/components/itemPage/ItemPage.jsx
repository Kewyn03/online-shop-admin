import React from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import Stack from '@mui/material/Stack';
import { DataGrid } from "@mui/x-data-grid";

import './styles.scss'



export default function ItemPage() {
    return (
        <main>
            <div className='text-string'>
                <div className='items-title'>Items List</div>
                <div className='buttons'>
                    <Stack direction="row" spacing={1.5}>
                    <Button  variant="contained" startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                    <Button  variant="contained"  startIcon={<CreateIcon />}>
                        Edit
                    </Button>
                    <Button  variant="contained" startIcon={<AddIcon />}>
                        Create
                    </Button>
                    </Stack>
                </div>
            </div>

        </main>
    )
}