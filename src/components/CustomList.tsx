import React from 'react'
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemButton, Divider } from '@mui/material'

export type Result = {
    application_number: string;
    openfda: {
        generic_name: string;
        manufacturer_name: string | null;
    };
};

type ListProps = {
    results: Result[];
}

const CustomList: React.FC<ListProps> = ({ results }) => {

    const navigator = useNavigate()


    const handleClick = (result: Result): void => {
        navigator(`/drugs/${result.application_number}`)
    }

    return (
        results?.length > 0 ? (
            <List sx={{ width: '80vw', margin: '0 auto' }}>
                {results.map((result, index) => (
                    <div key={index}>
                        <ListItemButton sx={{ padding: '0' }} onClick={() => handleClick(result)}>
                            <ListItem >
                                <ListItemText primary={result.openfda?.generic_name || 'No generic name'} secondary={result.openfda?.manufacturer_name || 'No manufacturer name'} />
                            </ListItem>
                        </ListItemButton>
                        <Divider variant="fullWidth" component="li" />
                    </div>
                ))}
            </List>
        ) : (
            <p>No results to show</p>
        )
    )
}

export default CustomList