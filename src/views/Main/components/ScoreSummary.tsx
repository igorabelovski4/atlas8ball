import { Flex, Text } from '@mantine/core';
import { ScoreProps, ScoreSummaryProps } from '../../../types';
import classes from './ScoreSummary.module.css';

function Score({ value, leader }: ScoreProps) {
  return (
    <Text
      fz={44}
      fw={700}
      c={leader ? '#0ca678' : '#e6fcf5'}
      className={classes.text}
    >
      {value}
    </Text>
  );
}

export default function ScoreSummary({ p1Score, p2Score }: ScoreSummaryProps) {
  const p1Leader = p1Score > p2Score;
  const p2Leader = p2Score > p1Score;

  return (
    <Flex align="center" mt="xs" className={classes.box}>
      <Score value={p1Score} leader={p1Leader} />
      <Text mx="lg" fz={32} fw={600} c="#e6fcf5" className={classes.semicolons}>
        :
      </Text>
      <Score value={p2Score} leader={p2Leader} />
    </Flex>
  );
}
