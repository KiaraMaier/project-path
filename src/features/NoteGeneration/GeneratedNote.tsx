import { Center, Group, Loader, Paper, Text } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import useNoteGeneration from './hooks/useNoteGeneration';
import { useEffect } from 'react';
import { Conversation, Note, getCurrentDateFormatted } from '.';

export function GeneratedNote() {
  const location = useLocation();
  const updatedConversation: Conversation = location.state?.updatedConversation;
  const activities: string[] = location.state?.activities;
  const goals: string[] = location.state?.goals;
  const populatedNote: Note = {
    activities: activities,
    goals: goals,
    conversation: updatedConversation,
  };

  const { response, loading, error, chat } = useNoteGeneration(populatedNote);

  console.log(response);

  let responseJson = {
    'Progress Note': {
      activity1: ['reflections'],
      activity2: ['reflcetions'],
      activity3: ['reflcetions'],
    },
  };
  if (response) {
    try {
      responseJson = JSON.parse(response);
    } catch (e) {
      console.error('Error parsing JSON:', e);
    }
  }

  useEffect(() => {
    chat();
  }, [updatedConversation]);

  return (
    <Center>
      <Paper
        shadow="xs"
        p="xl"
        mt="md"
        style={{ maxWidth: '100%', width: '70%', minHeight: '30rem' }}
      >
        <Group justify="space-between">
          <Text size="xl">Progress Note</Text>
          <Text size="xl">{getCurrentDateFormatted()}</Text>
        </Group>
        <Text>Name: John Doe</Text>
        {/* {loading ? <Loader /> : <Text>{response}</Text>}
         */}
        {loading ? (
          <Loader />
        ) : (
          <div>
            {Object.keys(responseJson['Progress Note'] || {}).map(
              (activity, index) => (
                <Text mt="md" key={index}>
                  <strong>{activity}</strong>:{' '}
                  {responseJson['Progress Note'][activity].join(', ')}
                </Text>
              )
            )}
          </div>
        )}
      </Paper>
    </Center>
  );
}
