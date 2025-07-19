// app/api/ask/route.ts
export async function POST(req) {
    const { messages, jobDescription } = await req.json();
  
    // If jobDescription is provided, generate interview questions
    if (jobDescription) {
      return generateInterviewQuestions(jobDescription);
    }
  
    // Otherwise, handle normal chat messages
    const url = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.AZURE_OPENAI_API_KEY,
        },
        body: JSON.stringify({
          messages,
          temperature: 0.7,
          top_p: 0.95,
        }),
      });
  
      const data = await response.json();
      return Response.json({ result: data.choices[0]?.message?.content ?? "No response." });
  
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
  }
  
  async function generateInterviewQuestions(jobDescription) {
    const url = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`;
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.AZURE_OPENAI_API_KEY,
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are an AI assistant that helps recruiters by generating relevant interview questions based on job descriptions. Generate exactly 5 interview questions in a numbered list format. Return only the questions without any additional text."
            },
            {
              role: "user",
              content: `Generate 5 interview questions for this job description: ${jobDescription}`
            }
          ],
          temperature: 0.5,
          top_p: 0.9,
        }),
      });
  
      const data = await response.json();
      const questions = data.choices[0]?.message?.content || "";
      
      // Parse the numbered list into an array
      const questionList = questions
        .split('\n')
        .filter(q => q.trim().match(/^\d+\./))
        .map(q => q.replace(/^\d+\.\s*/, '').trim());
      
      return Response.json({ questions: questionList });
  
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
  }