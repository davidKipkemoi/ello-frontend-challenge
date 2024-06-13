import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Link } from '@mui/material';
import logo from '../assets/ello-logo-turquoise.png'; // Assuming you have a logo with a transparent background

const Header = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Box
    >
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Link href="/" underline="none">
              <img src={logo} alt="Ello Logo" style={{ height: '100px' }} />
            </Link>
          </Box>
          <Button
            variant="outlined"
            onClick={handleClick}
            sx={{
              ml: 2,
              borderRadius: '20px', // Rounded corners
              borderColor: isClicked ? 'green' : '#5ACCCC', // Change border color on click
              color: '#5ACCCC', // Custom text color
              '&:hover': {
                borderColor: '#5ACCCC', // Custom hover border color
                backgroundColor: 'rgba(90, 204, 204, 0.1)', // Custom hover background color
              },
              '&:focus': {
                borderColor: '#5ACCCC', // Custom focus border color
              },
              '&:active': {
                borderColor: isClicked ? '#5ACCCC' : '#CFFAFA', // Custom active border color
              },
            }}
          >
            Teacher
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
