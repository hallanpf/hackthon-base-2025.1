import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logo from './../../assets/Rick-And-Morty-Logo.png';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1C1C1C", color: "#12B0C9" }}>
      <Toolbar sx={{ justifyContent: "space-between", width: "80%", margin: "0 auto" }}>
        <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Rick and Morty Logo" style={{ width: '194px' }} />
        </Box>

        <Box sx={{ display: 'flex', gap: '120px' }}>
          <Button color="inherit">
            Personagens
          </Button>
          <Button color="inherit">
            Lugares Famosos
          </Button>
          <Button color="inherit">
            Episódios            
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;