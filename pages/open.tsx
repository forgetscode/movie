import React from 'react';
import type { NextPage } from 'next';

const Open: NextPage = () => {
  const [value, setValue] = React.useState<string>('');
  const [prompt, setPrompt] = React.useState<string>('');
  const [completion, setCompletion] = React.useState<string>('');

  const handleInput = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleKeyDown = React.useCallback(async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setPrompt(value);
      setCompletion('Loading...');

      const response = await fetch('/api/hello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: value }),
      });

      const data = await response.json();

      setValue('');
      if (data.result) {
        setCompletion(data.result.choices[0].text);
      }
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="font-bold text-3xl mb-4">OpenAI</div>
      <div className="flex items-center">
        <div className="mr-4">Please type your prompt:</div>
        <input
          className="border border-gray-400 px-2 py-1 rounded"
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="mt-4">
        <div className="font-bold">Prompt:</div>
        <div className="border border-gray-400 px-2 py-1 rounded">{prompt}</div>
      </div>
      <div className="mt-4">
        <div className="font-bold">Completion:</div>
        <div className="border border-gray-400 px-2 py-1 rounded">
          {completion.split('\n').map((item) => (
            <>
              {item}
              <br />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Open;
