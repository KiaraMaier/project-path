import { Container, Paper, Grid, Group, Textarea } from '@mantine/core';
import { QuestionsBox } from './QuestionsBox';
import { GoalsBox } from './GoalsBox';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

interface Conversation {
  conversation: Question[];
}

type Question = {
  question: string;
  answer: string;
};

export function NewNotePage() {
  const location = useLocation();
  const activities: string[] = location.state?.activitiesList;
  // const [note, setNote] = useState('');
  const [conversation, setConversation] = useState<Conversation>({
    conversation: [],
  });

  const handleNoteChange = (updatedConversation: Conversation) => {
    setConversation(updatedConversation);
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
              <div>
                {conversation.conversation.map((item, index) => (
                  <div key={index} style={{ marginBottom: '1em' }}>
                    <p>
                      <strong>Question:</strong> {item.question}
                    </p>
                    <p>
                      <strong>Answer:</strong> {item.answer}
                    </p>
                  </div>
                ))}
              </div>
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
