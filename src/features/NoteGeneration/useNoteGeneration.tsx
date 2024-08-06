import { useState } from 'react';
import ollama from 'ollama';

const useNoteGeneration = (activities: string[]) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const instructions =
    'You are given this JSON which entails the details of the questions asked by you, and the answers given by the user. These details should be used to write a reflective note and highlight the connection of their progress on their goals that they have and how the activities they are doing are helping them achieve these. Continue to use the voice of the user, in first person. Fix grammar, but for the msot part try to keep the wording as original as possible. Use UK English';

  const noteObject = {
    activities: [],
    goals: {
      goal1: '',
      goal2: '',
      goal3: '',
    },
    conversation: [],
  };

  const message = JSON.stringify(noteObject);

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
    } catch (err) {
      setError('Error occured');
    } finally {
      setLoading(false);
    }
  };
  return { response, loading, error, chat };
};

export default useNoteGeneration;
