import { Text, Paper, Button, Textarea } from '@mantine/core';

export function QuestionsBox(questions) {
  return (
    <Paper
      shadow="xs"
      p="sm"
      style={{
        maxWidth: '100%',
        width: '100%',
        height: '31rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Text>Q1: {questions[0]}</Text>
        <Textarea placeholder="Write here" />
        <Text mt="xl">Q2: {questions[1]}</Text>
        <Textarea placeholder="Write here" />
        <Text mt="xl">Q3: {questions[2]}</Text>
        <Textarea placeholder="Write here" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button mt="xl">New Questions</Button>
      </div>
    </Paper>
  );
}
