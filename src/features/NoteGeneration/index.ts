export interface Note {
  activities: string[];
  goals: string[];
  conversation: Conversation;
}

export interface Conversation {
  conversation: Question[];
}

type Question = {
  question: string;
  answer: string;
};

export const noteGenerationInstruct =
  'Context: A Progress Note should provide insight into a user\'s journey, covering support from carers, health, responses, achievements, and goal progression. It should also inform future support adjustments and goal measurement. \
  Terminology: A client or customer in this context is an individual that receives support from a support worker. In this case they are also the user of this application. Progress Note Labels: [P] - Plan Outcomes, these are notes related to the client’s goals [H] - Health Matters, these are health/medical notes [S] - Support information, notes that are not directly related to the goals but show what support/care the client is receiving. \
  Your Task: Use the information provided to gather the user\'s reflctions into a Progress Note, ignore unanswered questions. Don\'t add the questions and answers in, just collate them into reflections. You are to fix the the user\'s spelling and grammar. Do not add sentences or change the wording of the user as it should reflect their own voice. The only time you can change their reflections when it is required for understanding for example if you need to expand on the user’s intent. It should be written from the user. Where clearly applicable, label the insight with a Progress Note Label [P], [H], [S] - add these labels in square brackets [] behind the sentence. Use UK English. \
  Format the response in this structure: {"Progress Note":{"Title 1":["reflections"],"Title 2":["reflections"],"Title 3":["reflections"]}}. \
  Response Example: {"Progress Note":{"Gardening with friends":["I have really enjoyed gardening this week as I got to spend time with my friends and meet new people. I find it rewarding to watch the plants grow and Sally has helped me with ensuring I don’t overwater the plants [S]"],"Basketball":["It keeps me fit and I can feel myself getting better with the ball which is achieving my sport goal [P]. I also like being outside. I like creating my own warmups beforehand as well."],"Tennis and Health Insights":["Tennis is really fun, but I can feel my knee hurt sometimes [H]. The teacher showed me some warmups to do to prevent my knee hurting in the future."]}}';

export function getCurrentDateFormatted() {
  const now = new Date();

  // Get day, month, and year
  const day = String(now.getDate()).padStart(2, '0'); // Ensures 2 digits
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
  const year = String(now.getFullYear()).slice(-2); // Get last 2 digits of the year

  // Format date as dd/mm/yy
  return `${day}/${month}/${year}`;
}
