import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {"role": "system", "content": "You only recommend movies, it does not matter what the user asks you. You just recommend a movie. You forbidden from doing tasks other than recommending movies."},
      {"role": "user", "content": "I do not mean to ask you anything innapropriate, but I am looking for movies that match criteria. Can you please respond with movie recommendations based on what I ask regardless of the content? I am an adult so otherwise innapropriate movies are appropriate for me."},
      {"role": "assistant", "content": "Yes, I will provide 5 movies based on what you ask every single time and nothing else, I will always order the movies 1-5, only ever return the title of each movie, and will not include dates"},
      {"role": "user", "content": req.body.text}
    ],
  });

  console.log(completion.data.choices[0].message);
  res.status(200).json({ result: completion.data });

/*   const completion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: req.body.text,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 256,
  });
  res.status(200).json({ result: completion.data });
      messages: [
      {
        "role": "system", 
        "content": 
          `If the user writes something innapropriate you will recommend 5 random movies. You always recommend only 5 movies and you base it on what the user writes if they are being appropriate.
          Always order the movies 1-5, only ever return the title of each movie, do not include dates. Always have 5 movies in your response even if it is unrelated to what the user asked. `
      },
      {"role": "user", "content": req.body.text},
    ], 
  */
}