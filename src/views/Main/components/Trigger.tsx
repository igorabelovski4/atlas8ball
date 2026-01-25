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
      color={danger ? 'red' : 'green'}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
