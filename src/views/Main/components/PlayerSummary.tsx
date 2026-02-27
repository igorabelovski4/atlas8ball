import { Avatar, Box, Stack, Text } from '@mantine/core';
import { IconCrown } from '@tabler/icons-react';
import { PlayerSummaryProps } from '../../../types';
import classes from './PlaySummary.module.css';

export default function PlayerSummary({
  name,
  avatar,
  leader,
}: PlayerSummaryProps) {
  return (
    <Stack align="center" gap="xs" pos="relative">
      {leader && (
        <Box pos="absolute" top={-32} className={classes.crownBox}>
          <IconCrown size={32} color="#fab005" className={classes.crown} />
        </Box>
      )}
      <Avatar
        src={avatar}
        alt={name}
        bd={`5px solid ${leader ? '#fab005' : '#0c3256'}`}
        className={classes.avatar}
      />
      <Text
        fz={24}
        fw={600}
        c={leader ? '#fab005' : '#e7f5ff'}
        className={classes.text}
      >
        {name}
      </Text>
    </Stack>
  );
}
