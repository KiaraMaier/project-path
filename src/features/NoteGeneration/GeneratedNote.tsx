import { Loader, Paper, Text } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import useNoteGeneration from './useNoteGeneration';
import { useEffect } from 'react';

interface Conversation {
  conversation: Question[];
}

type Question = {
  question: string;
  answer: string;
};

export function GeneratedNote() {
  const location = useLocation();
  const populatedNote: Conversation = location.state?.updatedConversation;

  const { response, loading, error, chat } = useNoteGeneration(populatedNote);
  console.log('response: ', response);

  function conversationToString(conversation: Conversation) {
    return JSON.stringify(conversation);
  }

  useEffect(() => {
    chat();
  }, [populatedNote]);

  return (
    <div>
      <Paper>
        <Text>Generated Note</Text>
        {loading ? <Loader /> : response}
      </Paper>
    </div>
  );
}
