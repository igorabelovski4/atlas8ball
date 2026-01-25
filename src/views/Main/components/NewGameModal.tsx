import { useState } from 'react';

import { Button, Modal, Stack } from '@mantine/core';
import {
  IconBolt,
  IconCircleHalf2,
  IconTrophy,
  IconXboxX,
} from '@tabler/icons-react';

import { NewGameModalProps } from '../../../types';
import { Decider, Picker, Toggle } from './index';

export default function NewGameModal({
  isOpen,
  onClose,
  onSubmit,
}: NewGameModalProps) {
  const [winner, setWinner] = useState(null);
  const [breaker, setBreaker] = useState(null);
  const [stripesPlayer, setStripesPlayer] = useState(null);
  const [loserBallsRemaining, setLoserBallsRemaining] = useState(0);
  const [blackBallDeciderGame, setBlackBallDeciderGame] = useState(false);
  const [winByBlackFault, setWinByBlackFault] = useState(false);

  const solidsPlayer = stripesPlayer === 'player1' ? 'player2' : 'player1';

  function handleSubmit() {
    // Validacija forme
    if (winner === null || breaker === null || stripesPlayer === null) return;

    // Slanje vrednosti o novoj partiji
    onSubmit({
      created_at: new Date().toISOString(),
      winner: winner,
      breaker: breaker,
      stripesPlayer: stripesPlayer,
      solidsPlayer: solidsPlayer,
      loserBallsRemaining: loserBallsRemaining,
      blackBallDeciderGame: blackBallDeciderGame,
      winByBlackFault: winByBlackFault,
    });

    // Vraćanje na inicijalne vrednosti
    setWinner(null);
    setBreaker(null);
    setStripesPlayer(null);
    setLoserBallsRemaining(0);
    setBlackBallDeciderGame(false);
    setWinByBlackFault(false);

    // Zatvaranje modala
    onClose();
  }

  function handleCloseModal() {
    onClose();

    setWinner(null);
    setBreaker(null);
    setStripesPlayer(null);
    setLoserBallsRemaining(0);
    setBlackBallDeciderGame(false);
    setWinByBlackFault(false);
  }

  return (
    <Modal title="New game" opened={isOpen} onClose={handleCloseModal}>
      <Stack gap="xl">
        <Decider
          label="Game winner"
          icon={IconTrophy}
          value={winner}
          onSetValue={setWinner}
        />
        <Decider
          label="Break shot"
          icon={IconBolt}
          value={breaker}
          onSetValue={setBreaker}
        />
        <Decider
          label="Striped balls"
          icon={IconCircleHalf2}
          value={stripesPlayer}
          onSetValue={setStripesPlayer}
        />
        <Picker
          label="Loser's remaining balls"
          icon={IconXboxX}
          value={loserBallsRemaining}
          onSetValue={setLoserBallsRemaining}
        />
        <Toggle
          label="Win after opponent's black ball foul"
          value={winByBlackFault}
          onSetValue={setWinByBlackFault}
        />
        <Toggle
          label="Win decided on the black ball"
          value={blackBallDeciderGame}
          onSetValue={setBlackBallDeciderGame}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </Stack>
    </Modal>
  );
}
