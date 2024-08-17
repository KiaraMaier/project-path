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
import useOllamaChat from '../hooks/useOllamaChat';
import { useNavigate } from 'react-router-dom';

interface QuestionsBoxProps {
  activities: string[];
  onNoteChange: (updatedConversation: Conversation) => void;
}

interface Conversation {
  conversation: Question[];
}

type Question = {
  question: string;
  answer: string;
};

export function QuestionsBox({ activities, onNoteChange }: QuestionsBoxProps) {
  const goals = {
    goal1:
      "I want to maintain and improve my physical health and well-being, with increased physical exercise.'",
    goal2:
      'I want to develop my social and communication skills to make friends and to participate in community activities, including volunteering or working.',
    goal3:
      'I want to improve my daily living skills to live as safely and independently as possible in a house near my parents, now and in the future',
  };
  const [activity, setActivity] = useState(activities[0]);
  const [goal, setGoal] = useState(goals.goal1);
  const { questions, loading, error, chat } = useOllamaChat(activity, goal);
  const [conversation, setConversation] = useState<Conversation>({
    conversation: [],
  });
  const [answers, setAnswers] = useState(['', '', '']);
  const [clickCount, setClickCount] = useState(0);
  const [genNote, setGenNote] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (goal && activity) {
      chat(); // Auto calls chat after goal and activity are updated
    }
  }, [goal, activity]);

  function chooseRound() {
    if (clickCount == 0) {
      setGoal(goals.goal2);
      setActivity(activities[1]);
    } else if (clickCount == 1) {
      setGoal(goals.goal3);
      setActivity(activities[2]);
    }
  }
  const handleInputChange = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  function addToConversation(
    conversation: Conversation,
    newQuestions: string[],
    newAnswers: string[]
  ): Conversation {
    // Map new questions and answers to Question objects
    const newQnAs: Question[] = newQuestions.map((question, index) => ({
      question,
      answer: newAnswers[index] || '',
    }));

    return {
      ...conversation,
      conversation: [...conversation.conversation, ...newQnAs],
    };
  }

  const handleSubmit = () => {
    const updatedConversation = addToConversation(
      conversation,
      questions,
      answers
    );
    onNoteChange(updatedConversation);
    setConversation(updatedConversation);
    setAnswers(['', '', '']);
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === 3) {
        setGenNote(true);
        navigate('/generate', {
          state: { activities, updatedConversation, goals },
        });
      }
      return newCount;
    });
    chooseRound();
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
