import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getDrug } from '../services/drugs';
import { CircularProgress, Paper, Box, Typography, Divider, Button } from '@mui/material';
import DrugInfoItem from './DrugInfoItem';
import DrugInfoChip from './DrugInfoChip';
import DrugProduct, { Product } from './DrugProduct';

type Drug = {
    application_number: string;
    openfda: {
        brand_name: string | null;
        generic_name: string | null;
        manufacturer_name: string | null;
        substance_name: string | null;
        product_type: string | null;
        route: string | null;
    };
    products: Product[];

}

const DrugDetail: React.FC = () => {
    const { state } = useLocation()
    const navigator = useNavigate()
    const [drug, setDrug] = useState<Drug | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const { id } = useParams<string>()


    useEffect(() => {
        async function fetchData() {
            if (id) {
                setLoading(true)
                const drug = await getDrug(id)
                console.log(drug)
                if (drug) {
                    setDrug(drug)
                }
                setLoading(false)
            }
        }
        fetchData();
    }, [id])

    const handleNavigate = () => {
        navigator('/', { state: { search: state.search, results: state.results, page: state.page, totalPages: state.totalPages } })
    }

    return (
        <>
            <Box className='container-col'>
                <Typography variant='h4' >Drug Details</Typography>
                {!loading && (

                    <Paper elevation={3}>
                        <Box className='drug-main'>
                            <DrugInfoItem label='Brand name' value={drug?.openfda?.brand_name} />
                            <DrugInfoItem label='Generic name' value={drug?.openfda?.generic_name} />
                            <DrugInfoItem label='Manufacturer name' value={drug?.openfda?.manufacturer_name} />
                            <DrugInfoItem label='Substance name' value={drug?.openfda?.substance_name} />
                        </Box>
                        <Divider />
                        <Box className='drug-secondary'>
                            <DrugInfoChip label='Application number' value={drug?.application_number} />
                            <DrugInfoChip label='Product type' value={drug?.openfda?.product_type} variant='outlined' />
                            <DrugInfoChip label='Route' value={drug?.openfda?.route} variant='outlined' />
                        </Box>
                        <Divider />
                        {drug?.products && drug?.products.length > 0 && (
                            <Box className='drug-products-container'>
                                <Typography variant='h5'>Products</Typography>
                                <Box className='drug-products'>
                                    {drug?.products.sort((a, b) => Number(a.product_number) - Number(b.product_number)).map((product, index) => (
                                        <Box className='drug-main-item gap-1 shadow' key={index}>
                                            <DrugProduct product={product} />
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </Paper>
                )}
                <Button variant='contained' sx={{ width: '150px' }} onClick={handleNavigate}>Go back</Button>
            </Box >
            {loading && <CircularProgress className='loader' />
            }
        </>
    )
}

export default DrugDetail