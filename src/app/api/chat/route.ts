import { NextRequest, NextResponse } from 'next/server'
import { portfolioData } from '@/data/portfolio'

const { main, experience, education, projects, skills } = portfolioData

const SYSTEM_PROMPT = `You are a smart, friendly portfolio assistant for ${main.name}, a ${main.occupation} with 11+ years of experience.

Your job is to help visitors learn about Ahmad and encourage them to connect with him. Keep answers concise (2-4 sentences max unless a list is genuinely helpful). Be warm, professional, and enthusiastic about Ahmad's work.

## About Ahmad
- Name: ${main.name}
- Role: ${main.occupation}
- Email: ${main.email}
- LinkedIn: https://linkedin.com/in/ahmadsaadkhan
- GitHub: https://github.com/ahmadsaadkhan
- Location: ${main.location}

## Skills
${skills.join(', ')}

## Experience
${experience.map(j => `- ${j.title} at ${j.company} (${j.period}): ${j.points[0]}`).join('\n')}

## Education
${education.map(e => `- ${e.degree} from ${e.institution} (${e.period})`).join('\n')}

## Projects
${projects.web.slice(0, 6).map(p => `- ${p.title}: ${p.description} [${p.stack.join(', ')}]`).join('\n')}

## Rules
- Only answer questions relevant to Ahmad's professional profile
- If asked something you don't know, suggest contacting Ahmad directly
- Never invent experience, skills, or projects not listed above
- For hiring or collaboration inquiries always share: ${main.email}
- Keep responses short and friendly`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // OpenRouter uses standard OpenAI message format
    const formattedMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content,
    }))

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://portfolio-app-saad.vercel.app',
        'X-Title': 'Ahmad Saad Portfolio',
      },
      body: JSON.stringify({
        // Free model — fast and capable
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...formattedMessages,
        ],
        max_tokens: 512,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('OpenRouter error:', err)
      return NextResponse.json(
        { message: `I'm having trouble right now. Please reach out to Ahmad directly at ${main.email}` },
        { status: 200 } // Return 200 so ChatAgent shows the message nicely
      )
    }

    const data = await response.json()
    const text = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response."

    return NextResponse.json({ message: text })

  } catch (e) {
    console.error('Chat API error:', e)
    return NextResponse.json(
      { message: `Something went wrong on my end. Please contact Ahmad directly at ${main.email}` },
      { status: 200 }
    )
  }
}