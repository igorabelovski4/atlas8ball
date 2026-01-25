import { Group, Stack, Text, Slider, Box } from '@mantine/core';

import { PickerProps } from '../../../types';

export default function Picker({
  label,
  icon: Icon,
  value,
  onSetValue,
}: PickerProps) {
  return (
    <Stack gap="sm">
      <Group gap="xs">
        {Icon ? <Icon size={20} /> : null}
        <Text>{label}</Text>
      </Group>
      <Group justify="space-between" align="center">
        <Slider
          value={value}
          min={0}
          max={7}
          step={1}
          onChange={onSetValue}
          style={{ width: '90%' }}
          label={null}
        />
        <Box>
          <Text>{value}</Text>
        </Box>
      </Group>
    </Stack>
  );
}
