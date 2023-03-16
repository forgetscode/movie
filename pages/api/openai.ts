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
}