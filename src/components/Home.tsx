import React, { useState } from 'react'
import '../styles/App.css'
import { getDrugs } from '../services/drugs'
import SearchContainer from './SearchContainer';
import CustomList, { Result } from './CustomList';
import { Pagination } from '@mui/material'


const Home: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const [results, setResults] = useState<Result[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)

  const fetchDrugs = async (search: string, page: number = 1) => {
    const response = await getDrugs(search, page)
    setResults(response.results.filter((result: { openfda: { generic_name: string } }) => result.openfda?.generic_name !== undefined))
    setPage(page)
    setTotalPages(Math.ceil(response.meta.results.total / response.meta.results.limit))
  }

  const handlePageChange = async (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    await fetchDrugs(search, value)
  }



  return (
    <>
      <SearchContainer results={results} setResults={setResults} search={search} setSearch={setSearch} fetchDrugs={fetchDrugs} setTotalPages={setTotalPages} />

      <CustomList results={results} />

      {totalPages >= 1 && (
        <Pagination className='paginator' count={totalPages} page={page} onChange={handlePageChange} />
      )}
    </>
  )
}

export default Home