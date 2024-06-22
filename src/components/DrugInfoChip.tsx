
import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { ChipPropsVariantOverrides } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

type DrugInfoItemProps = {
    label: string;
    value: string | null | undefined;
    mode?: Variant | null;
    variant?: OverridableStringUnion<"outlined" | "filled", ChipPropsVariantOverrides>;
}

const DrugInfoItem: React.FC<DrugInfoItemProps> = ({ label, value, mode = 'h6', variant = 'filled' }) => {

    return (
        <Box className='drug-secondary-item' >
            <Typography variant={mode as Variant}>{label}:</Typography>
            <Chip label={value || 'No data available'} variant={variant} onClick={() => { }}></Chip>
        </Box >

    )
}

export default DrugInfoItem