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
    search: string;
    results: Result[];
    page: number;
    totalPages: number;
}

const CustomList: React.FC<ListProps> = ({ search, results, page, totalPages }) => {

    const navigator = useNavigate()


    const handleClick = (result: Result): void => {
        navigator(`/drugs/${result.application_number}`, { state: { search, results, page, totalPages } })
    }

    return (
        results?.length > 0 ? (
            <List sx={{ width: '80vw', maxWidth: '1280px', margin: '0 auto' }}>
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