import { Container, Paper, Grid, Group, Textarea } from '@mantine/core';
import { useState } from 'react';
import useOllamaChat from './useOllamaChat';
import { QuestionsBox } from './QuestionsBox';
import { GoalBox } from './GoalsBox';

export function Home() {
  const { questions, response, loading, error, chat } = useOllamaChat();
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    await chat(message);
  };

  return (
    <div>
      <Container>
        <div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask a question..."
          />
          <button onClick={handleSendMessage} disabled={loading}>
            Send
          </button>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
        </div>
        <Grid gutter="md">
          <Grid.Col span={6}>
            <Group>
              <GoalBox />
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
            <QuestionsBox questions={questions} />
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
