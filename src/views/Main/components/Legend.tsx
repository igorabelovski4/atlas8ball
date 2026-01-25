import { Card, Text } from '@mantine/core';
import { LegendProps } from '../../../types';
import classes from './Legend.module.css';

export default function Legend({ children }: LegendProps) {
  return (
    <Card
      py="4"
      ta="center"
      mb="lg"
      c="#557089"
      bg="#06192b"
      className={classes.box}
    >
      <Text tt="uppercase" fz={14} fw={500} className={classes.text}>
        {children}
      </Text>
    </Card>
  );
}
