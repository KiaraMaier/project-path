import { useState } from 'react';
import ollama from 'ollama';
import { parseJSON } from '../index';

const useOllamaChat = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);

  const instructions =
    'When given a list of activities as well as a goal, you should provide 3 questions for the user to select from. These questions will be used to assist with writing reflective notes so that a user can track their progress that they have set out to achieve over the year. Ask open ended questions rather ones that can be answered with “yes” and “no”. Use UK English. The user has an intellectual disability, use short, simple and clear language, shorter than 15 words.When given a list of activities as well as a goal, you should provide 3 questions for the user to select from. These questions will be used to assist with writing reflective notes so that a user can track their progress that they have set out to achieve over the year. Ask open ended questions rather ones that can be answered with “yes” and “no”. Use UK English. The user has an intellectual disability, use short, simple and clear language, shorter than 15 words. Only Return a JSON String formatted like this, no chit chat: {“Q1”: “”, “Q2”:””…}';

  const chat = async (message: string) => {
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
      setQuestions(parseJSON(response));
    } catch (err) {
      setError('Error occured');
    } finally {
      setLoading(false);
    }
  };
  return { questions, response, loading, error, chat };
};

export default useOllamaChat;
