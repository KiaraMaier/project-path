export function extractQuestions() {}

export function parseJSON(text: string): string[] {
  try {
    const jsonObject = JSON.parse(text);
    return Object.values(jsonObject);
  } catch {
    return [];
  }
}
