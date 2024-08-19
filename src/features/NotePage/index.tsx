export const questionsInstruct =
  'You are to generate 3 simple, reflective questions. Use the activity and the goal to guide you in the questions you ask. Ask open ended questions but ensure it is only asking one question per sentence. The user has an intellectual disability, this means you should use short and clear sentences under 10 words. Use simple words. Use UK English. Respond strictly and ONLY in this JSON format as the response is to be used in an application: {"Q1": "", "Q2": "", "Q3": ""}';

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
