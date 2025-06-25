import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { resume, jobDesc, tone } = await req.json()

  const prompt = `
Write a concise, ${tone} cover letter for the job below using the resume info.

Only include contact details (name, email, phone, address) if they clearly appear in the resume.

Start directly with "Dear..." if no contact info is found.

Resume:
${resume}

Job:
${jobDesc}
`

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192', // or llama3-70b-8192
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    }),
  })


  const data = await response.json()
  const coverLetter = data.choices[0].message.content

  return NextResponse.json({ coverLetter })
}
