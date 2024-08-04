import { Container, Paper, Grid, Group, Textarea } from '@mantine/core';
import { QuestionsBox } from './QuestionsBox';
import { GoalsBox } from './GoalsBox';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export function NewNotePage() {
  const location = useLocation();
  const activities: string = location.state?.activities;
  const [note, setNote] = useState('');

  const handleNoteChange = (newData: any) => {
    setNote(newData);
  };

  return (
    <div>
      <Container>
        <Grid gutter="md">
          <Grid.Col span={6}>
            <Group>
              <GoalsBox />
            </Group>
            <Paper shadow="xs" p="sm" mt="md" style={{ minHeight: '20rem' }}>
              <Textarea
                autosize
                variant="unstyled"
                placeholder="Your note will appear here"
                value={note}
              />
            </Paper>
          </Grid.Col>
          <Grid.Col span={6}>
            <QuestionsBox
              activities={activities}
              onNoteChange={handleNoteChange}
            />
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
