import { Progress } from '@mantine/core';
import { BarProps } from '../../../types';
import classes from './Bar.module.css';

export default function Bar({ value, isLeader, rotate }: BarProps) {
  return (
    <Progress
      value={value}
      size="xl"
      flex={1}
      bg="#0c3256"
      color={isLeader ? '#0ca678' : '#e6fcf5'}
      style={rotate ? { transform: 'rotate(180deg)' } : undefined}
      className={classes.bar}
    />
  );
}
