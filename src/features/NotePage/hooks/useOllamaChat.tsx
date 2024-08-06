import { useState } from 'react';
import ollama from 'ollama';
import { parseJSON } from '../index';

const useOllamaChat = (activity: string, goal: string) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);

  const instructions =
    'When given a list of activities as well as a goal, you should provide 3 questions for the user to select from. These questions will be used to assist with writing reflective notes so that a user can track their progress over the year. Ask open ended questions rather ones that can be answered with “yes” and “no”. Use UK English. The user has an intellectual disability, use short, simple and clear language, shorter than 15 words. Respond strictly and only in this JSON format as the response is to be used in an application: {"Q1": "", "Q2": "", "Q3": ""}';

  // const goal =
  //   'I want to improve my daily living skills to live as safely and independently as possible in a house near my parents, now and in the future.';

  const messageObject = {
    Goal: goal,
    Activities: activity,
  };

  const message = JSON.stringify(messageObject);

  const chat = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await ollama.chat({
        model: 'llama3',
        messages: [
          {
            role: 'system',
            content: instructions,
          },
          { role: 'user', content: message },
        ],
      });
      setResponse(result.message.content);
      setQuestions(parseJSON(result.message.content));
    } catch (err) {
      setError('Error occured');
    } finally {
      setLoading(false);
    }
  };
  return { questions, response, loading, error, chat };
};

export default useOllamaChat;
