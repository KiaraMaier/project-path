import {
  Text,
  Paper,
  Button,
  Textarea,
  Loader,
  Center,
  Group,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { addToList } from '../index';
import useOllamaChat from '../hooks/useOllamaChat';
import { useNavigate } from 'react-router-dom';

interface QuestionsBoxProps {
  activities: string;
  onNoteChange: (newData: string) => void;
}

export function QuestionsBox({ activities, onNoteChange }: QuestionsBoxProps) {
  const { questions, loading, error, chat } = useOllamaChat(activities);
  const [conversationList, setConversationList] = useState<
    [string, string][][]
  >([[]]);
  const [answers, setAnswers] = useState(['', '', '']);
  const [clickCount, setClickCount] = useState(0);
  const [genNote, setGenNote] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    chat();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  function listToString(conversationList: [string, string][][]): string {
    return conversationList
      .map((conversation) =>
        conversation
          .map(([question, answer]) => `${question}: \n${answer}`)
          .join('\n\n')
      )
      .join('\n');
  }

  const handleSubmit = () => {
    const updatedList = addToList(questions, answers, conversationList);
    onNoteChange(listToString(conversationList));
    setConversationList(updatedList);
    setAnswers(['', '', '']);
    chat();
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === 1) {
        setGenNote(true);
        navigate('/generate', { state: { updatedList } });
      }
      return newCount;
    });
  };

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
      {loading || error ? (
        <>
          {loading ? (
            <Center h={500}>
              <Loader size="lg" />
              <Text ml="md">Loading your questions</Text>
            </Center>
          ) : (
            <Center h={500}>
              <Text ml="md">Error occured</Text>
            </Center>
          )}
        </>
      ) : (
        <>
          <div>
            <Text>Q1: {questions[0]}</Text>
            <Textarea
              // value={inputValue}
              // onChange={handleNoteChange}
              // placeholder="Write here"
              value={answers[0]}
              onChange={(e) => handleInputChange(0, e.target.value)}
              placeholder="Write here"
            />
            <Text mt="xl">Q2: {questions[1]}</Text>
            <Textarea
              value={answers[1]}
              onChange={(e) => handleInputChange(1, e.target.value)}
              placeholder="Write here"
            />
            <Text mt="xl">Q3: {questions[2]}</Text>
            <Textarea
              value={answers[2]}
              onChange={(e) => handleInputChange(2, e.target.value)}
              placeholder="Write here"
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Group>
              <Button mt="xl">New Questions</Button>
              <Button mt="xl" onClick={handleSubmit}>
                Next
              </Button>
            </Group>
          </div>
        </>
      )}
    </Paper>
  );
}
