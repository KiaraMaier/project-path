import { Container, Paper, Grid, Group, Textarea } from '@mantine/core';
import { useEffect, useState } from 'react';
import useOllamaChat from '../hooks/useOllamaChat';
import { QuestionsBox } from './QuestionsBox';
import { GoalsBox } from './GoalsBox';

export function NewNote() {
  const { questions, response, loading, error, chat } = useOllamaChat();

  useEffect(() => {
    chat();
  }, []);

  return (
    <div>
      <Container>
        <Grid gutter="md">
          <Grid.Col span={6}>
            <Group>
              <GoalsBox />
            </Group>

            <Paper
              shadow="xs"
              p="sm"
              mt="md"
              style={{ maxWidth: '100%', width: '100%', height: '20rem' }}
            >
              <Textarea variant="unstyled" placeholder="Write here" />
            </Paper>
          </Grid.Col>
          <Grid.Col span={6}>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <QuestionsBox questions={questions} response={response} />
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
