import { Container, Paper, Grid, Group, Textarea } from '@mantine/core';
import { QuestionsBox } from './QuestionsBox';
import { GoalsBox } from './GoalsBox';
import { useLocation } from 'react-router-dom';

export function NewNotePage() {
  const location = useLocation();
  const activities = location.state?.activities;

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
            <QuestionsBox activities={activities} />
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
