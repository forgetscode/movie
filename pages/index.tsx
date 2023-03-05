import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState, useCallback, ChangeEvent, Fragment } from 'react'
import { MyTabs } from '../components/Tab'

type MovieRecommendation = {
  result: {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
      message: {
        role: string;
        content: string;
      };
      finish_reason: string;
      index: number;
    }[];
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  };
};

const Home: NextPage = () => {
  const [value, setValue] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [completion, setCompletion] = useState<string | string[]>('');
  const [completionLinks, setCompletionLinks] = useState<string | string[]>('');

  function createMovieSearchLinks(movieTitles: string[]): string[] {
    return movieTitles.map(title => `https://www6.f2movies.to/search/${title.replace(/\s+/g, '-')}`);
  }
  
  function parseCompletion(completion: string): string[] {
    const regex = /\d+\. (.+)/g;
    const matches = completion.matchAll(regex);
    const results: string[] = [];
    for (const match of matches) {
      results.push(match[1]);
    }
    return results;
  }
  
  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    }, []);
  
  const handleButtonClick = useCallback(
    async () => {
      setPrompt(value);
      setCompletion('Loading...');
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: value }),
      });
      const data: MovieRecommendation = await response.json();
      setValue('');
      const content = data.result.choices[0].message.content;
      const movies = parseCompletion(content);
      if (movies.length === 1) {
        setCompletion(movies[0]);
      } else {
        setCompletion(movies);
      }
      if (movies.length === 1) {
        setCompletion(movies[0]);
      } else {
        setCompletionLinks(createMovieSearchLinks(movies));
      }
    }, [value]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <p className='pb-24 text-3xl font-black'>
          Movie Night
        </p>
        <MyTabs/>
        <div className="flex flex-col items-center justify-center gap-6 p-8">
          <input className="w-full max-w-md px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" value={value} onChange={handleInput} />
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={handleButtonClick}>Submit</button>
          <p className="text-center text-lg font-bold">{prompt}</p>
          <ul className="list-disc pl-4">
            {Array.isArray(completion) ? (
              <ul className="list-decimal pl-8 mt-4">
                {completion.map((movie, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <span className="text-2xl font-bold">{index + 1}.</span>
                    <span className="ml-4 text-lg font-semibold">{movie}</span>
                    {completionLinks[index] && (
                      <button className="ml-4 px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600" onClick={() => window.open(completionLinks[index], '_blank')}>
                        Watch
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-2xl">{completion}</p>
            )}
          </ul>
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className='text-3xl font-black'>Hey Dawg hey whats up.</p>
        </a>
      </footer>
    </div>
  )
}

export default Home
