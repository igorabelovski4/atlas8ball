import { Box, Stack } from '@mantine/core';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <Stack bg="#0c3256" h="100%">
      <Box>
        <Outlet />
      </Box>
    </Stack>
  );
};
