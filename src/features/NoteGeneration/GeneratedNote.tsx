import { Paper, Text } from '@mantine/core';
import { useLocation } from 'react-router-dom';

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

  function conversationToString(conversation: Conversation) {
    return JSON.stringify(conversation);
  }

  return (
    <div>
      <Paper>
        <Text>Generated Note</Text>
        {conversationToString(populatedNote)}
      </Paper>
    </div>
  );
}
