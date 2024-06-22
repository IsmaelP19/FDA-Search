import React from 'react';
import { Box, Typography } from '@mui/material';
import DrugInfoChip from './DrugInfoChip';

export type ActiveIngredient = {
    name: string;
    strength: string;
}

export type Product = {
    product_number: string;
    brand_name: string;
    dosage_form: string;
    route: string;
    marketing_status: string;
    active_ingredients: ActiveIngredient[];
}

type DrugProductProps = {
    product: Product;
};

const DrugProduct: React.FC<DrugProductProps> = ({ product }) => {
    return (
        <>
            <Typography variant='h6' sx={{ fontWeight: 'bold', }}>Product # {product?.product_number}</Typography>
            {product?.brand_name && (
                <Box className='drug-secondary-item'>
                    <Typography variant='h6'>Brand name:</Typography>
                    {product?.brand_name}
                </Box>
            )}
            <DrugInfoChip label='Dosage form' value={product?.dosage_form} variant='outlined' />
            <DrugInfoChip label='Route' value={product?.route} variant='outlined' />
            <DrugInfoChip label='Marketing status' value={product?.marketing_status} />
            {product?.active_ingredients && (
                <Box>
                    <Typography variant='h6'>Active ingredients:</Typography>
                    {product?.active_ingredients.map((ingredient, index) => (
                        <Typography key={index} variant='body1'>* {ingredient.name} - {ingredient.strength}</Typography>
                    ))}
                </Box>
            )}


        </>
    )
}

export default DrugProduct