
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import MedicationIcon from '@mui/icons-material/Medication';

const Header: React.FC = () => {

    return (
        <AppBar position="fixed" id="header">
            <Container>
                <Toolbar disableGutters>
                    <MedicationIcon sx={{ mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                        }}
                    >
                        OpenFDA
                    </Typography>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;