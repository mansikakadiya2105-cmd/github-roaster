const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
const API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'

async function callGroq(prompt) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a brutally honest but funny senior developer who roasts GitHub profiles. You are savage but never personally mean. You roast the coding habits not the person. You always respond in valid JSON only. No markdown. No backticks. No explanation. Just raw JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    }),
  })

  if (!response.ok) {
    throw new Error('GROQ_API_ERROR')
  }

  const data = await response.json()
  let content = data.choices[0].message.content
  
  // Clean up any potential markdown if the model ignored system prompt
  content = content.replace(/```json\n?|\n?```/g, '').trim()
  
  return JSON.parse(content)
}

export async function generateRoast(githubData) {
  const languages = githubData.topLanguages.map((l) => l.language).join(', ')
  const mainPrompt = `Roast this GitHub profile and respond with ONLY a raw JSON object, no markdown, no backticks:

Username: ${githubData.username}
Total repositories: ${githubData.totalRepos}
Repositories with no README: ${githubData.reposWithoutReadme}
Total stars received: ${githubData.totalStars}
Most used languages: ${languages}
Last commit was ${githubData.lastCommitDaysAgo} days ago
Longest contribution streak: ${githubData.longestStreak} days
Account age: ${githubData.accountAge} years
Has profile README: ${githubData.hasProfileReadme}
Followers: ${githubData.followers}
Following: ${githubData.following}

Return exactly this JSON structure:
{
  "roast": "brutal funny roast in 3-4 sentences",
  "oneLiner": "single savage one liner under 15 words",
  "advice": [
    "specific actionable advice 1",
    "specific actionable advice 2",
    "specific actionable advice 3"
  ],
  "score": 85,
  "level": "Actual Developer"
}

The "level" field must be one of these based on score:
0-20: Keyboard Decorator
21-40: Bug Manufacturer
41-60: Stack Overflow Engineer
61-80: Actual Developer
81-100: 10x Developer (Self Proclaimed)`

  try {
    return await callGroq(mainPrompt)
  } catch (error) {
    console.error("Groq roast failed:", error)
    throw new Error('AI_ERROR')
  }
}
