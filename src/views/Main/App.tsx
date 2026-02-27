import { useState, useEffect, useMemo } from 'react';
import { supabaseClient } from '../../supabase/supabaseClient';

import { Container, Group, Stack, Title } from '@mantine/core';
import { NewGameModal, Stats, Trigger } from './components';
import { Game } from '../../types';
import classes from './App.module.css';

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [filter, setFilter] = useState<'All' | 'Today'>('All');
  const [showModal, setShowModal] = useState(false);

  // Povlačenje svih partija iz baze
  useEffect(() => {
    async function getGames() {
      const { data, error } = await supabaseClient
        .from('pool_games')
        .select('*');

      if (error) {
        console.error('Error fetching games:', error);
        return;
      }

      setGames((data ?? []) as Game[]);
    }
    getGames();
  }, []);

  // Slanje nove partije u bazu
  async function handleNewGame(newGame: Game) {
    try {
      const { data, error } = await supabaseClient
        .from('pool_games')
        .insert([newGame])
        .select();

      if (error) {
        console.error('Error inserting game:', error);
        return;
      }

      setGames((prevGames) => [...prevGames, data[0]]);
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  }

  // Prikaz modala za kreiranje nove partije
  function handleShowModal() {
    setShowModal((prev) => !prev);
  }

  // Odjava iz aplikacije
  function handleLogout() {
    supabaseClient.auth.signOut();
  }

  // Filtitranje partija
  const filteredGames = useMemo(() => {
    if (filter === 'All') return games;

    const now = new Date();

    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0,
    );

    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999,
    );

    return games.filter((game) => {
      const gameDate = new Date(game.created_at);
      return gameDate >= startOfDay && gameDate <= endOfDay;
    });
  }, [games, filter]);

  // Promena vrednosti filtera
  function handleFilterChange(value: 'All' | 'Today') {
    setFilter(value);
  }

  return (
    <Container>
      <Stack py="xl" className={classes.box}>
        <Group justify="space-between" align="center">
          <Title order={1} c="#e7f5ff" className={classes.title}>
            8-Ball Tracker
          </Title>
          <Group gap="xs">
            <Trigger onClick={handleShowModal}>New game</Trigger>
            <Trigger onClick={handleLogout} danger>
              Logout
            </Trigger>
          </Group>
        </Group>
        <Stats
          games={filteredGames}
          totalGames={filteredGames.length}
          filter={filter}
          onFilterChange={handleFilterChange}
        />
        <NewGameModal
          isOpen={showModal}
          onSubmit={handleNewGame}
          onClose={handleShowModal}
        />
      </Stack>
    </Container>
  );
}

export default App;
