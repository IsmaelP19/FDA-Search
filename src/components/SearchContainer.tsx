import React, { useState } from 'react'
import { TextField, Button, Autocomplete } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { partialSearch } from '../services/drugs';
import { Result } from './CustomList';


type SearchContainerProps = {
    results: Result[];
    setResults: React.Dispatch<React.SetStateAction<Result[]>>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    fetchDrugs: (search: string, page?: number) => Promise<void>;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
};

const SearchContainer: React.FC<SearchContainerProps> = ({ results, setResults, search, setSearch, fetchDrugs, setTotalPages }) => {
    const [options, setOptions] = useState<string[]>([])

    const handleChange = async (_event: React.SyntheticEvent<Element>, value: string) => {
        setSearch(value)
        if (value === '') {
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

    const clearResults = () => {
        setResults([])
        setSearch('')
        setOptions([])
        setTotalPages(0)
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