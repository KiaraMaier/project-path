import { useState } from 'react';
import ollama from 'ollama';
import { parseJSON, questionsInstruct } from '../index';
import { UserGoals } from '../index';

const useOllamaChat = (activity: string, goals: UserGoals) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);

  const messageObject = {
    Goal: goals,
    Activity: activity,
  };

  const message = JSON.stringify(messageObject);

  const chat = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await ollama.chat({
        model: 'llama3',
        format: 'json',
        messages: [
          {
            role: 'system',
            content: questionsInstruct,
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
