import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body1" align="center">
                    {'© '}
                    {new Date().getFullYear()}
                    {' Ismael Pérez Ortiz. All rights reserved.'}
                </Typography>
                <Box mt={2} display="flex" justifyContent="center">
                    <Link className='link' href="https://github.com/IsmaelP19" color="inherit" sx={{ mx: 1 }}>
                        GitHub
                    </Link>
                    <Link className='link' href="https://www.linkedin.com/in/ismaelperezortiz/" color="inherit" sx={{ mx: 1 }}>
                        LinkedIn
                    </Link>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;
