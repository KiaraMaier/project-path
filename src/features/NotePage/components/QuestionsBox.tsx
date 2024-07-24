import {
  Text,
  Paper,
  Button,
  Textarea,
  Loader,
  Overlay,
  Container,
  LoadingOverlay,
  Box,
  Center,
  Stack,
  SimpleGrid,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { addToList } from '../index';
import useOllamaChat from '../hooks/useOllamaChat';

export function QuestionsBox() {
  const { questions, response, loading, error, chat } = useOllamaChat();
  const [conversationList, setConversationList] = useState<
    [string, string][][]
  >([[]]);
  const [answers, setAnswers] = useState(['', '', '']);
  const [clickCount, setClickCount] = useState(0);
  const [genNote, setGenNote] = useState(false);

  useEffect(() => {
    chat();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const updatedList = addToList(questions, answers, conversationList);
    setConversationList(updatedList);
    setAnswers(['', '', '']);
    chat();
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === 2) {
        setGenNote(true);
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
      {loading || genNote ? (
        <>
          {loading ? (
            <Center h={500}>
              <Loader size="lg" />
              <Text ml="md">Loading your questions</Text>
            </Center>
          ) : (
            <Center h={500}>
              <Loader size="lg" />
              <Text ml="md">Generating Note</Text>
            </Center>
          )}
        </>
      ) : (
        <>
          <div>
            <Text>Q1: {questions[0]}</Text>
            <Textarea
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
            <Button mt="xl" onClick={handleSubmit}>
              New Questions
            </Button>
          </div>
          {/* <div>
            {conversationList.map((conversation, index) => (
              <div key={index}>
                {conversation.map(([question, answer], i) => (
                  <div key={i}>
                    <p>
                      <strong>{question}</strong>: {answer}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div> */}
        </>
      )}
    </Paper>
  );
}
