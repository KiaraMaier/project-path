import { Container, Paper, Grid, Group } from '@mantine/core';
import { QuestionsBox } from './QuestionsBox';
import { GoalsBox } from './GoalsBox';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserGoals, emptyGoals } from '..';

interface Conversation {
  conversation: Question[];
}

type Question = {
  question: string;
  answer: string;
};

export function NewNotePage() {
  const location = useLocation();
  const activities: string[] = location.state?.activities;
  const [conversation, setConversation] = useState<Conversation>({
    conversation: [],
  });

  const handleNoteChange = (updatedConversation: Conversation) => {
    setConversation(updatedConversation);
  };

  const [goals, setGoals] = useState<UserGoals>(emptyGoals);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const currentUser = JSON.parse(savedUser);
      setGoals(currentUser.goals || emptyGoals);
    }
  }, []);

  return (
    <div>
      <Container>
        <Grid gutter="md">
          <Grid.Col span={6}>
            <Group>
              <GoalsBox goals={goals} />
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
              goals={goals}
              onNoteChange={handleNoteChange}
            />
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
