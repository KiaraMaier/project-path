import { Text, Paper } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import classes from '../styles/GoalsBox.module.css';
import { UserGoals } from '..';

export function GoalsBox({ goals }: { goals: UserGoals }) {
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
