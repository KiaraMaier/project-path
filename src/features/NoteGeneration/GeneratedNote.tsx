import {
  ActionIcon,
  Button,
  Center,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { useLocation } from 'react-router-dom';
import useNoteGeneration from './hooks/useNoteGeneration';
import { useEffect, useState } from 'react';
import { Conversation, Note, getCurrentDateFormatted } from '.';
import { IconDeviceFloppy, IconRotate } from '@tabler/icons-react';

interface Reflections {
  activity1: string[];
  activity2: string[];
  activity3: string[];
}

interface ProgressNote {
  'Progress Note': Reflections;
}

export function GeneratedNote() {
  const location = useLocation();
  const updatedConversation: Conversation = location.state?.updatedConversation;
  const activities: string[] = location.state?.activities;
  const goals: string[] = location.state?.goals;
  const [refresh, setRefresh] = useState(false);

  const populatedNote: Note = {
    activities: activities,
    goals: goals,
    conversation: updatedConversation,
  };

  const { response, loading, error, chat } = useNoteGeneration(populatedNote);

  let responseJson: ProgressNote = {
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
  }, [updatedConversation, refresh]);

  const handleSave = () => {
    const fileData = JSON.stringify(responseJson, null, 2);
    const blob = new Blob([fileData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'responseJson.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRefresh = () => {
    setRefresh(true);
  };

  return (
    <Center>
      <Stack style={{ maxWidth: '100%', width: '70%', minHeight: '30rem' }}>
        <Group>
          <ActionIcon onClick={handleSave}>
            <IconDeviceFloppy />
          </ActionIcon>
          <ActionIcon onClick={handleRefresh}>
            <IconRotate />
          </ActionIcon>
        </Group>

        <Paper shadow="xs" p="xl" mt="md">
          <Group justify="space-between">
            <Text size="xl">Progress Note</Text>
            <Text size="xl">{getCurrentDateFormatted()}</Text>
          </Group>
          {loading ? (
            <Loader />
          ) : (
            <div>
              {Object.keys(responseJson['Progress Note'] || {}).map(
                (activity, index) => (
                  <Text mt="md" key={index}>
                    <strong>{activity}</strong>:
                    {responseJson['Progress Note'][activity].join(', ')}
                  </Text>
                )
              )}
            </div>
          )}
        </Paper>
      </Stack>
    </Center>
  );
}
