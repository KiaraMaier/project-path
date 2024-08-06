import { Text, Paper, TextInput, Center, Button } from '@mantine/core';
import undraw_moments from '../assets/undraw_moments.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function ActivitiesBox() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState('');
  const [activitiesList, setActivitiesList] = useState<string[]>([]);

  function extractActivities(activities: string): string[] {
    return activities.split(' ');
  }

  const handleSubmit = () => {
    navigate('/newnote', { state: { activitiesList } });
  };

  const handleInput = (event: any) => {
    setActivities(event.currentTarget.value);
    setActivitiesList(extractActivities(activities));
  };

  return (
    <Center>
      <Paper
        shadow="xs"
        p="xl"
        style={{ maxWidth: '100%', width: '50%', height: '30rem' }}
      >
        <Center>
          <img src={undraw_moments} alt="moments" style={{ maxWidth: '40%' }} />
        </Center>

        <Text mt="xl">What acitvities did you get up to this week?</Text>
        <TextInput onChange={handleInput}></TextInput>
        <Text size="sm"> Example: Dancing, Gardening, Cooking</Text>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleSubmit}>Get started</Button>
        </div>
      </Paper>
    </Center>
  );
}
