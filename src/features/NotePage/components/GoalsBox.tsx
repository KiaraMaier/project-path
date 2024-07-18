import { Text, Paper } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import classes from '../styles/GoalsBox.module.css';

const goals = {
  '1': 'I want to maintain and improve my physical health and well-being, with increased physical exercise.',
  '2': 'I want to develop my social and communication skills to make friends and to participate in community activities, including volunteering or working. ',
  '3': 'I want to improve my daily living skills to live as safely and independently as possible in a house near my parents, now and in the future. ',
};

export function GoalsBox() {
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
