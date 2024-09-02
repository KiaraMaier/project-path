import { Text, Paper } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import classes from '../styles/GoalsBox.module.css';
import { useEffect, useState } from 'react';

const emptyGoals = {
  goal1: '',
  goal2: '',
  goal3: '',
};

interface UserGoals {
  goal1: string;
  goal2: string;
  goal3: string;
}

export function GoalsBox() {
  const [goals, setGoals] = useState<UserGoals>(emptyGoals);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const currentUser = JSON.parse(savedUser);
      setGoals(currentUser.goals || emptyGoals);
    }
  }, []);

  return (
    <Paper
      shadow="xs"
      p="md"
      style={{
        maxWidth: '100%',
        width: '100%',
        height: '10rem',
        backgroundColor: '#f0f0f0',
      }}
    >
      <Carousel slideSize="100%" withIndicators classNames={classes}>
        {Object.entries(goals).map(([key, value]) => (
          <Carousel.Slide p="md" key={key}>
            <Text>
              {key}: {value}
            </Text>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Paper>
  );
}
