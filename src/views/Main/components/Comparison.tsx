import { Flex, Group, Stack, Text } from '@mantine/core';
import { ComparisonProps } from '../../../types';
import classes from './Comparison.module.css';

import { Bar } from './index';

export default function Comparison({
  p1Value,
  p2Value,
  p1Total,
  p2Total,
  plainValue = false,
  decimal = 0,
  compareValues = false,
  smallerIsBetter = false,
  children,
}: ComparisonProps) {
  function safeDivide(a: number, b: number) {
    if (b === 0) {
      return 0;
    }

    return a / b;
  }

  const p1Perc = parseFloat(
    (safeDivide(p1Value, p1Total) * 100).toFixed(decimal),
  );
  const p2Perc = parseFloat(
    (safeDivide(p2Value, p2Total) * 100).toFixed(decimal),
  );

  const p1Val = parseFloat(p1Value.toFixed(decimal));
  const p2Val = parseFloat(p2Value.toFixed(decimal));

  let p1IsLeader;
  let p2IsLeader;

  if (compareValues) {
    if (smallerIsBetter) {
      p1IsLeader = p1Val < p2Val;
      p2IsLeader = p2Val < p1Val;
    } else {
      p1IsLeader = p1Val > p2Val;
      p2IsLeader = p2Val > p1Val;
    }
  } else {
    if (smallerIsBetter) {
      p1IsLeader = p1Perc < p2Perc;
      p2IsLeader = p2Perc < p1Perc;
    } else {
      p1IsLeader = p1Perc > p2Perc;
      p2IsLeader = p2Perc > p1Perc;
    }
  }

  if (
    (compareValues && p1Val === p2Val) ||
    (!compareValues && p1Perc === p2Perc)
  ) {
    p1IsLeader = false;
    p2IsLeader = false;
  }

  const p1Display = (
    <>
      {p1Val.toFixed(decimal)}
      {!plainValue && (
        <>
          {' '}
          / {p1Total} <small>({p1Perc}%)</small>
        </>
      )}
    </>
  );

  const p2Display = (
    <>
      {p2Val.toFixed(decimal)}
      {!plainValue && (
        <>
          {' '}
          / {p2Total} <small>({p2Perc}%)</small>
        </>
      )}
    </>
  );

  return (
    <Stack mb="50" gap="4" className={classes.box}>
      <Flex align="center" mb="5" className={classes.inner}>
        <Text fw={500} lh={1} c="#e6fcf5" flex={2} className={classes.text}>
          {p1Display}
        </Text>
        <Text
          c="#e6fcf5"
          flex={3}
          ta="center"
          fw={500}
          className={classes.text}
        >
          {children}
        </Text>
        <Text
          fw={500}
          lh={1}
          c="#e6fcf5"
          ta="right"
          flex={2}
          className={classes.text}
        >
          {p2Display}
        </Text>
      </Flex>
      <Group gap={4}>
        <Bar value={+p1Perc} isLeader={p1IsLeader} rotate />
        <Bar value={+p2Perc} isLeader={p2IsLeader} />
      </Group>
    </Stack>
  );
}
