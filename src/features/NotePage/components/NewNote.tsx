import { Container, Paper, Grid, Group, Textarea, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import useOllamaChat from '../hooks/useOllamaChat';
import { QuestionsBox } from './QuestionsBox';
import { GoalsBox } from './GoalsBox';

export function NewNote() {
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
            <QuestionsBox />
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
