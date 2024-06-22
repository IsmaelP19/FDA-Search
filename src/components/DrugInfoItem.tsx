
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

type DrugInfoItemProps = {
    label: string;
    value: string | null | undefined;
    mode?: Variant | null;
}

const DrugInfoItem: React.FC<DrugInfoItemProps> = ({ label, value, mode = 'h6' }) => {

    return (
        <Box className='drug-main-item' >
            <Typography variant={mode as Variant}>{label}:</Typography>
            {value || 'No data available'}
        </Box >

    )
}

export default DrugInfoItem