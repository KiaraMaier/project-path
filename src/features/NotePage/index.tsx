function extractJsonString(text: string) {
  // Regular expression to match the JSON part of the string
  const jsonMatch = text.match(/\{.*\}/);
  return jsonMatch;
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
