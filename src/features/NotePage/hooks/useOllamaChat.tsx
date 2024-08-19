import { useState } from 'react';
import ollama from 'ollama';
import { parseJSON, questionsInstruct } from '../index';

const useOllamaChat = (activity: string, goal: string) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);

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
