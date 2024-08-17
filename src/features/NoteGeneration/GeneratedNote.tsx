import { Center, Loader, Paper, Text } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import useNoteGeneration from './useNoteGeneration';
import { useEffect } from 'react';

interface Note {
  activities: string[];
  goals: string[];
  conversation: Conversation;
}

interface Conversation {
  conversation: Question[];
}

type Question = {
  question: string;
  answer: string;
};

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

  useEffect(() => {
    chat();
  }, [updatedConversation]);

  return (
    <Center>
      <Paper
        shadow="xs"
        p="sm"
        mt="md"
        style={{ maxWidth: '100%', width: '50%', minHeight: '30rem' }}
      >
        <Text>Generated Note</Text>
        <Text>Name: John Doe</Text>
        <Text>Date: </Text>
        {loading ? <Loader /> : <Text>{response}</Text>}
      </Paper>
    </Center>
  );
}
