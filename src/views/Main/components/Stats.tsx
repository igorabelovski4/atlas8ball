import { Card } from '@mantine/core';

import { Legend, MatchSummary, Comparison } from './index';
import { AppConstants } from '../../../constants';
import { Game, StatsProps } from '../../../types';
import classes from './Stats.module.css';

const { player1Id, player2Id } = AppConstants;

export default function Stats({ games, totalGames }: StatsProps) {
  // Ukupan broj pobeda
  const p1Wins = games.filter((game: Game) => game.winner === player1Id).length;
  const p2Wins = games.filter((game: Game) => game.winner === player2Id).length;

  // Najveći broj uzastopnih pobeda
  function getLongestWinStreak(games: Game[], playerId: string): number {
    let longest = 0;
    let current = 0;

    const sortedGames = [...games].sort((a, b) => (a.id ?? 0) - (b.id ?? 0));

    for (const game of sortedGames) {
      if (game.winner === playerId) {
        current += 1;
        longest = Math.max(longest, current);
      } else {
        current = 0;
      }
    }

    return longest;
  }

  const p1LongestWinStreak = getLongestWinStreak(games, player1Id);
  const p2LongestWinStreak = getLongestWinStreak(games, player2Id);

  // Pobede kao razbijač
  const p1BreakerGames = games.filter(
    (game: Game) => game.breaker === player1Id,
  ).length;
  const p1BreakerWins = games.filter(
    (game: Game) => game.winner === player1Id && game.breaker === player1Id,
  ).length;
  const p2BreakerGames = games.filter(
    (game: Game) => game.breaker === player2Id,
  ).length;
  const p2BreakerWins = games.filter(
    (game: Game) => game.winner === player2Id && game.breaker === player2Id,
  ).length;

  // Pobede sa punim kuglama
  const p1SolidsBallsGames = games.filter(
    (game: Game) => game.solidsPlayer === player1Id,
  ).length;
  const p1SolidsBallsWins = games.filter(
    (game: Game) =>
      game.winner === player1Id && game.solidsPlayer === player1Id,
  ).length;
  const p2SolidsBallsGames = games.filter(
    (game: Game) => game.solidsPlayer === player2Id,
  ).length;
  const p2SolidsBallsWins = games.filter(
    (game: Game) =>
      game.winner === player2Id && game.solidsPlayer === player2Id,
  ).length;

  // Pobede sa prugastim kuglama
  const p1StripesBallsGames = games.filter(
    (game: Game) => game.stripesPlayer === player1Id,
  ).length;
  const p1StripesBallsWins = games.filter(
    (game: Game) =>
      game.winner === player1Id && game.stripesPlayer === player1Id,
  ).length;
  const p2StripesBallsGames = games.filter(
    (game: Game) => game.stripesPlayer === player2Id,
  ).length;
  const p2StripesBallsWins = games.filter(
    (game: Game) =>
      game.winner === player2Id && game.stripesPlayer === player2Id,
  ).length;

  // Pobede u borbi za crnu kuglu
  const blackBallGames = games.filter(
    (game: Game) => game.blackBallDeciderGame === true,
  ).length;
  const p1BlackBallGamesWinner = games.filter(
    (game: Game) =>
      game.winner === player1Id && game.blackBallDeciderGame === true,
  ).length;
  const p2BlackBallGamesWinner = games.filter(
    (game: Game) =>
      game.winner === player2Id && game.blackBallDeciderGame === true,
  ).length;

  // Pobede zahvaljujući grešci protivnika
  const p1BlackFaultGamesWinner = games.filter(
    (game: Game) => game.winner === player1Id && game.winByBlackFault,
  ).length;
  const p2BlackFaultGamesWinner = games.filter(
    (game: Game) => game.winner === player2Id && game.winByBlackFault,
  ).length;

  // Čiste pobede
  const p1TotalWins = games.filter(
    (game: Game) => game.winner === player1Id && game.loserBallsRemaining === 7,
  ).length;
  const p2TotalWins = games.filter(
    (game: Game) => game.winner === player2Id && game.loserBallsRemaining === 7,
  ).length;

  // Prosečno ubačenih kugli po partiji
  const totalBallsPerPlayer = totalGames * 7;

  function getPlayerPottedBalls(games: Game[], playerId: string): number {
    let sum = 0;

    for (const game of games) {
      if (game.winner === playerId) {
        sum += 8;
      } else {
        sum += game.loserBallsRemaining ?? 0;
      }
    }

    return sum;
  }

  const p1TotalPottedBalls = getPlayerPottedBalls(games, player1Id);
  const p2TotalPottedBalls = getPlayerPottedBalls(games, player2Id);

  // Prosečno ubačenih kugli u izgubljenoj partiji
  function getPlayerPottedBallsInLostGame(
    games: Game[],
    playerId: string,
  ): number {
    let sum = 0;

    for (const game of games) {
      if (game.winner !== playerId) {
        sum += game.loserBallsRemaining ?? 0;
      }
    }

    return sum;
  }

  const p1TotalLostGames = games.filter(
    (game: Game) => game.winner !== player1Id,
  ).length;
  const p1TotalPottedBallsInLostGame = getPlayerPottedBallsInLostGame(
    games,
    player1Id,
  );

  const p2TotalLostGames = games.filter(
    (game: Game) => game.winner !== player2Id,
  ).length;
  const p2TotalPottedBallsInLostGame = getPlayerPottedBallsInLostGame(
    games,
    player2Id,
  );

  return (
    <Card
      shadow="xl"
      padding="xl"
      pt={40}
      radius="md"
      bg="#071e34ff"
      className={classes.stats}
    >
      <MatchSummary p1Wins={p1Wins} p2Wins={p2Wins} />
      <Legend>Player strength</Legend>
      <Comparison
        p1Value={p1Wins}
        p1Total={totalGames}
        p2Value={p2Wins}
        p2Total={totalGames}
      >
        Total wins
      </Comparison>
      <Comparison
        p1Value={p1TotalWins}
        p1Total={p1Wins}
        p2Value={p2TotalWins}
        p2Total={p2Wins}
      >
        Clean wins
      </Comparison>
      <Comparison
        p1Value={p1LongestWinStreak}
        p1Total={p1LongestWinStreak + p2LongestWinStreak}
        p2Value={p2LongestWinStreak}
        p2Total={p1LongestWinStreak + p2LongestWinStreak}
        plainValue
      >
        Longest win streak
      </Comparison>
      <Legend>Match control</Legend>
      <Comparison
        p1Value={p1BreakerWins}
        p1Total={p1BreakerGames}
        p2Value={p2BreakerWins}
        p2Total={p2BreakerGames}
      >
        Wins as breaker
      </Comparison>
      <Comparison
        p1Value={p1SolidsBallsWins}
        p1Total={p1SolidsBallsGames}
        p2Value={p2SolidsBallsWins}
        p2Total={p2SolidsBallsGames}
      >
        Wins with solids
      </Comparison>
      <Comparison
        p1Value={p1StripesBallsWins}
        p1Total={p1StripesBallsGames}
        p2Value={p2StripesBallsWins}
        p2Total={p2StripesBallsGames}
      >
        Wins with stripes
      </Comparison>
      <Legend>Black ball decider games</Legend>
      <Comparison
        p1Value={p1BlackBallGamesWinner}
        p1Total={blackBallGames}
        p2Value={p2BlackBallGamesWinner}
        p2Total={blackBallGames}
      >
        BB decider wins
      </Comparison>
      <Comparison
        p1Value={p1BlackFaultGamesWinner}
        p1Total={p1Wins}
        p2Value={p2BlackFaultGamesWinner}
        p2Total={p2Wins}
      >
        BB fault wins
      </Comparison>
      <Legend>Efficiency</Legend>
      <Comparison
        p1Value={p1TotalPottedBalls}
        p1Total={totalBallsPerPlayer}
        p2Value={p2TotalPottedBalls}
        p2Total={totalBallsPerPlayer}
        plainValue
      >
        Total balls potted
      </Comparison>
      <Comparison
        p1Value={p1TotalPottedBalls / totalGames}
        p1Total={8}
        p2Value={p2TotalPottedBalls / totalGames}
        p2Total={8}
        compareValues
        decimal={1}
        plainValue
      >
        Avg. balls potted / game
      </Comparison>
      <Comparison
        p1Value={p1TotalPottedBallsInLostGame / p1TotalLostGames}
        p1Total={p1TotalLostGames}
        p2Value={p2TotalPottedBallsInLostGame / p2TotalLostGames}
        p2Total={p2TotalLostGames}
        compareValues
        smallerIsBetter
        decimal={1}
        plainValue
      >
        Avg. balls remaining / lost game
      </Comparison>
    </Card>
  );
}
