import { Switch } from '@mantine/core';

import { ToggleProps } from '../../../types';

export default function Toggle({ label, value, onSetValue }: ToggleProps) {
  return (
    <Switch
      checked={value}
      onChange={() => onSetValue((prev: boolean) => !prev)}
      label={label}
    />
  );
}
