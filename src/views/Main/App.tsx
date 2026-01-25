import { useState, useEffect } from 'react';
import { supabaseClient } from '../../supabase/supabaseClient';

import { Container, Group, Stack, Title } from '@mantine/core';
import { NewGameModal, Stats, Trigger } from './components';
import { Game } from '../../types';
import classes from './App.module.css';

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Ukupan broj odigranih partija
  const totalGames = games?.length;

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
        <Stats games={games} totalGames={totalGames} />
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
