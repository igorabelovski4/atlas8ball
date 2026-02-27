import { SegmentedControl } from '@mantine/core';

import classes from './Filter.module.css';
import { FilterProps } from '../../../types';

export default function Filter({
  filter,
  onFilterChange,
}: FilterProps): React.ReactElement {
  return (
    <SegmentedControl
      data={['All', 'Today']}
      color="#0ca678"
      transitionDuration={300}
      transitionTimingFunction="linear"
      className={classes.box}
      value={filter}
      size="md"
      radius="md"
      onChange={(value) => onFilterChange(value)}
    />
  );
}
