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
  'Use the answers written from the user into a “Progress Note”.  Correct spelling and grammar. Try not to change the wording of the user it should reflect their voice unless it is required for understanding, for example if you need to expand on the user’s intent. It should be written from the user. If and where applicable you are to label each sentence or paragraph from the following three labels: Goal Outcome, Health Information or Support Insight - add these labels in square brackets [] behind the sentence. Use UK English. Format the response like the following example: {"Progress Note":{"Gardening":["reflections"],"Basketball":["reflections"],"Tennis and Fitness":["reflections"]}}';

export function getCurrentDateFormatted() {
  const now = new Date();

  // Get day, month, and year
  const day = String(now.getDate()).padStart(2, '0'); // Ensures 2 digits
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
  const year = String(now.getFullYear()).slice(-2); // Get last 2 digits of the year

  // Format date as dd/mm/yy
  return `${day}/${month}/${year}`;
}
