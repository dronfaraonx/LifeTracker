import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Loading: React.FC= () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CircularProgress />
      <Typography variant="h6" marginTop={2}>
        
      </Typography>
    </Box>
  );
};

export default Loading;
