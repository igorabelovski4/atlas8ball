import { Card, Group, SimpleGrid, Stack, Text } from '@mantine/core';

import classes from './Decider.module.css';

import { DeciderProps } from '../../../types';

export default function Decider({
  label,
  icon: Icon,
  value,
  onSetValue,
}: DeciderProps) {
  function handleChoose(player: any) {
    if (player === 'player1') onSetValue('player1');
    if (player === 'player2') onSetValue('player2');
  }

  const p1 = 'Igor';
  const p2 = 'Štefan';

  return (
    <Stack gap="sm">
      <Group gap="xs">
        {Icon ? <Icon size={20} /> : null}
        <Text>{label}</Text>
      </Group>
      <SimpleGrid cols={2}>
        <Card
          className={`${classes.card} ${
            value === 'player1' ? classes.active : ''
          }`}
          onClick={() => handleChoose('player1')}
        >
          <Text fw={500} size="sm" lh={1}>
            {p1}
          </Text>
        </Card>
        <Card
          className={`${classes.card} ${
            value === 'player2' ? classes.active : ''
          }`}
          onClick={() => handleChoose('player2')}
        >
          <Text fw={500} size="sm" lh={1}>
            {p2}
          </Text>
        </Card>
      </SimpleGrid>
    </Stack>
  );
}
