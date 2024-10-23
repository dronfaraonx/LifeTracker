import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Loading: React.FC<{ message?: string }> = ({ message }) => {
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
        {message || 'Loading...'}
      </Typography>
    </Box>
  );
};

export default Loading;
