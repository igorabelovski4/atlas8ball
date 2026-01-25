import { Flex } from '@mantine/core';
import { PlayerSummary, ScoreSummary } from './index';
import { AppConstants } from '../../../constants';
import { MatchSummaryProps } from '../../../types';
import classes from './MatchSummary.module.css';

const { player1, player2 } = AppConstants;

export default function MatchSummary({ p1Wins, p2Wins }: MatchSummaryProps) {
  const p1Winning = p1Wins > p2Wins;
  const p2Winning = p2Wins > p1Wins;

  return (
    <Flex
      justify="space-between"
      align="flex-start"
      mb="xl"
      className={classes.box}
    >
      <PlayerSummary name={player1} avatar="player1.png" leader={p1Winning} />
      <ScoreSummary p1Score={p1Wins} p2Score={p2Wins} />
      <PlayerSummary name={player2} avatar="player2.png" leader={p2Winning} />
    </Flex>
  );
}
