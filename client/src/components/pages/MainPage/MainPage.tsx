// import React, { useEffect } from 'react';
// import axios from 'axios';
import { Box } from '@mui/material';
import { useUser } from '../../../context/auth';

const MainComponent = () => {
  const { user } = useUser();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center" // Centers the text horizontally
    >
      Ghbsad
    </Box>
  );
};

export default MainComponent;
