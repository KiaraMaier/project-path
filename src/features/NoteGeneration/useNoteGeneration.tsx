import { useState } from 'react';
import ollama from 'ollama';

interface Note {
  activities: string[];
  goals: string[];
  conversation: Conversation;
}

interface Conversation {
  conversation: Question[];
}

type Question = {
  question: string;
  answer: string;
};

const useNoteGeneration = (note: Note) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const instructions =
    "Use the answers written from the user into a 'Progress Note'. Where the user's name, date and activities and goals are listed at the top. You are to label each sentence or paragraph from the following three labels: Goal Outcome, Health Information or Support Insight in brackets behind the sentence where/if applicable. Try not to change the wording of the user, however, fix spelling or grammatical errors, minimally expand on intents when required but mostly keep the wording the exact same, it should be written from the user. Group the information on same activity but try to write sentences rather than points. Use UK English.";

  const message = JSON.stringify(note);
  console.log('message: ', message);

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
