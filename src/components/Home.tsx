import React, { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/App.css'
import { getDrugs } from '../services/drugs'
import SearchContainer from './SearchContainer';
import CustomList, { Result } from './CustomList';
import { Pagination, CircularProgress } from '@mui/material'


const Home: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const [options, setOptions] = useState<string[]>([])
  const [results, setResults] = useState<Result[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const location = useLocation()

  const clearResults = useCallback(() => {
    setResults([])
    setSearch('')
    setOptions([])
    setTotalPages(0)
    window.history.replaceState({}, '', location.pathname)
  }, [location.pathname]) // Add an empty array as the second argument

  useEffect(() => {
    if (location.state && location.state.results) {
      setSearch(location.state.search || "");
      setResults(location.state.results || []);
      setPage(location.state.page || 1);
      setTotalPages(location.state.totalPages || 1);
    } else {
      clearResults()

    }
  }, [clearResults, location.state])


  const fetchDrugs = async (search: string, page: number = 1) => {
    // if search is empty, return
    if (search.trim() === '') {
      setResults([])
      return
    }
    setLoading(true)
    const response = await getDrugs(search, page)
    setResults(response.results.filter((result: { openfda: { generic_name: string } }) => result.openfda?.generic_name !== undefined))
    setPage(page)
    setTotalPages(Math.ceil(response.meta.results.total / response.meta.results.limit))
    setLoading(false)
  }

  const handlePageChange = async (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    await fetchDrugs(search, value)
  }



  return (
    <>
      <SearchContainer options={options} setOptions={setOptions} results={results} clearResults={clearResults} search={search} setSearch={setSearch} fetchDrugs={fetchDrugs} />

      {loading ? <CircularProgress className='loader' /> :
        <>
          <CustomList results={results} search={search} page={page} totalPages={totalPages} />

          {totalPages >= 1 && (
            <Pagination className='paginator' count={totalPages} page={page} onChange={handlePageChange} />
          )}
        </>

      }
    </>
  )
}

export default Home