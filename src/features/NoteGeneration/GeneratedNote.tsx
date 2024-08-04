import { Paper, Text } from '@mantine/core';
import { useLocation } from 'react-router-dom';

export function GeneratedNote() {
  const location = useLocation();
  const populatedNote: [string, string][][] = location.state?.updatedList;

  function listToString(conversationList: [string, string][][]): string {
    return conversationList
      .map((conversation) =>
        conversation
          .map(([question, answer]) => `${question}: \n${answer}`)
          .join('\n\n')
      )
      .join('\n');
  }

  return (
    <div>
      <Paper>
        <Text>Generated Note</Text>
        {listToString(populatedNote)}
      </Paper>
    </div>
  );
}
