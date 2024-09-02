// export const questionsInstruct =
//   'You are to generate 3 simple, reflective questions. Use the activity and the goal to guide you in the questions you ask. Ask open ended questions but ensure it is only asking one question per sentence. The user has an intellectual disability, this means you should use short and clear sentences under 10 words. Use simple words. Use UK English. Respond strictly and ONLY in this JSON format as the response is to be used in an application: {"Q1": "", "Q2": "", "Q3": ""}';

export const questionsInstruct =
  'Provided Context: The answers provided from the user will be used to create a document called a Progress Note. Progress Notes should aim to show insight in: - Supports / prompts / coaching provided by staff - Changes in supports - any changes in customer supports - Health tracking - any health matters, including action/s taken, to address concerns - Responses - how the person responded when engaging in supports - Achievements - what parts of task/goal were achieved? - Supports you might provide differently next time, why, and any next steps - Goal / Outcome Progression - recording specific information related to a customer\'s goals, progress made / not made towards a goal, and the measure used to determine this. Your Task: Generate 3 simple, reflective questions that allow the user to provide insight into their care and progress. Use the activity and choose the most applicable goal from the 3 goals provided to guide you in the questions you ask. Ask open-ended questions but ensure it is only asking one question per sentence. Use short and clear sentences UNDER 10 words. Use very simple language and conversational sentences. Use UK English. Response Format: Respond strictly and ONLY in this JSON format as the response is to be used in an application, {"Q1": "", "Q2": "", "Q3": ""} Response Example: {"Q1": "What is something new you learnt while cooking this week?", "Q2": "What was the best part about your cooking class?", "Q3": "How did you feel after you finished cooking your food?"}';

export const emptyGoals = {
  goal1: '',
  goal2: '',
  goal3: '',
};

export interface UserGoals {
  goal1: string;
  goal2: string;
  goal3: string;
}

export function parseJSON(text: string): string[] {
  try {
    // const extracted = extractJsonString(text);
    const jsonObject = JSON.parse(text);
    return Object.values(jsonObject);
  } catch {
    return ['error'];
  }
}

export function addToList(
  questions: string[],
  answers: string[],
  conversationList: [string, string][][]
): [string, string][][] {
  const qaPairs: [string, string][] = questions.map((question, index) => [
    question,
    answers[index],
  ]);
  conversationList.push(qaPairs);
  return conversationList;
}
