import {
  Text,
  Paper,
  TextInput,
  Center,
  Button,
  Container,
  Group,
} from '@mantine/core';
import undraw_moments from '../assets/undraw_moments.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function ActivitiesBox() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<string[]>(['', '', '']);

  const handleInput = (index: number, event: any) => {
    const newActivities = [...activities];
    newActivities[index] = event.currentTarget.value;
    setActivities(newActivities);
  };

  const handleSubmit = () => {
    console.log('Activities:', activities);
    navigate('/newnote', { state: { activities } });
  };

  return (
    <Center>
      <Paper
        shadow="xs"
        p="xl"
        style={{ maxWidth: '100%', width: '50%', height: '30rem' }}
      >
        <Center>
          <img src={undraw_moments} alt="moments" style={{ maxWidth: '25%' }} />
        </Center>
        <Text mt="xl">What acitvities did you get up to this week?</Text>
        <Container mt="lg" mx={0} px={0} size="50%">
          {activities.map((_, index) => (
            <TextInput
              key={index}
              mt={index > 0 ? 'sm' : 0}
              leftSection={index + 1}
              onChange={(event) => handleInput(index, event)}
            />
          ))}
        </Container>
        <Text mt="lg">
          Example: Dancing, Gardening with friends, Cooking pasta
        </Text>
        <Group justify="flex-end" mt="lg">
          <Button onClick={handleSubmit}>Get started</Button>
        </Group>
      </Paper>
    </Center>
  );
}
