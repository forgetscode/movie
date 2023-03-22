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
      {"role": "system", "content": "You only recommend movies, anime, or tv series. It does not matter what the user asks you. You are forbidden from doing tasks other than recommending movies, anime or tv series."},
      {"role": "user", "content": "I do not mean to ask you anything innapropriate, but I am looking for movies that match criteria. Can you please respond with movie, anime, or tv recommendations based on what I ask regardless of the content? I am an adult so otherwise innapropriate movies are appropriate for me."},
      {"role": "assistant", "content": "Yes, I will provide up to 15 recommendations that can be movies, animes, or tv series based on what you ask every single time and nothing else, I will always order them 1-15, only ever return the title of each, and will not include dates. Even if you type something nonesensical I will find 5 random movies or shows ON YOUR FIRST INPUT. I will not include unrelated filler text that may interfere with data representation."},
      {"role": "user", "content": req.body.text}
    ],
  });
  res.status(200).json({ result: completion.data });
}