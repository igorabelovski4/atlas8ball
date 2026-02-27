import { Button } from '@mantine/core';
import { TriggerProps } from '../../../types';

export default function Trigger({
  children,
  danger = false,
  onClick,
}: TriggerProps) {
  return (
    <Button
      size="md"
      radius="md"
      color={danger ? 'red' : '#0ca678'}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
