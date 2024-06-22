import React from 'react'
import { TextField, Button, Autocomplete } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { partialSearch } from '../services/drugs';
import { Result } from './CustomList';


type SearchContainerProps = {
    options: string[];
    setOptions: React.Dispatch<React.SetStateAction<string[]>>;
    results: Result[];
    clearResults: () => void;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    fetchDrugs: (search: string, page?: number) => Promise<void>;
};

const SearchContainer: React.FC<SearchContainerProps> = ({ options, setOptions, results, clearResults, search, setSearch, fetchDrugs }) => {

    const handleChange = async (_event: React.SyntheticEvent<Element>, value: string) => {
        setSearch(value)
        if (value.trim() === '') {
            setOptions([])
            return
        }
        try {
            const response = await partialSearch(value)
            setOptions(response)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await fetchDrugs(search)
    }

    return (
        <form className='container' onSubmit={handleSearch}>
            <Autocomplete freeSolo
                options={options}
                onInputChange={handleChange}
                value={search}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search drugs..."
                        sx={{ width: '80vw', maxWidth: '1280px' }}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            ...params.InputProps,
                        }}
                    />
                )}
            />

            <Button type='submit' variant="contained" endIcon={<SearchIcon />}>Search</Button>
            {results.length > 0 && (
                <Button variant="outlined" endIcon={<ClearIcon />} onClick={clearResults}>Clear results</Button>
            )}
        </form>
    )
}

export default SearchContainer