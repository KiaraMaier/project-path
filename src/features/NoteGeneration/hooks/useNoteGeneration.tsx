import { useState } from 'react';
import ollama from 'ollama';
import { Note, noteGenerationInstruct } from '..';

const useNoteGeneration = (note: Note) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const message = JSON.stringify(note);
  console.log('message: ', message);

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
            content: noteGenerationInstruct,
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
