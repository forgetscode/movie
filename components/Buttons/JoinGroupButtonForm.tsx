import { useState } from 'react';
import joinGroupByUser from '../../utils/mutations/joinGroupByUser';
import { notifyFailure, notifySuccess } from '../Toast';

type JoinGroupButtonProps = {
  userId: string;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

const JoinGroupButton: React.FC<JoinGroupButtonProps> = ({ userId, setUpdate }) => {
  const [groupId, setGroupId] = useState<string>('');
  const [isJoining, setIsJoining] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsJoining(true);
    try {
      await joinGroupByUser(userId, groupId);
      notifySuccess('Group joined.');
      setUpdate((update) => !update); 
    } catch (error) {
      console.log(error);
      notifyFailure('Failed to join group.');
    }
    setIsJoining(false);
  };

  return (
    <div className="border-b border-gray-300 pb-6">
      <h2 className="text-2xl font-black">Join Group</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          name="group-id"
          id="group-id"
          value={groupId}
          onChange={(event) => setGroupId(event.target.value)}
          placeholder="Enter the group ID"
          className="bg-transparent w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-white"
        />
        <button
          type="submit"
          className="w-60 px-4 py-2 text-white font-bold bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          disabled={isJoining}
        >
          {isJoining ? (
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12.728 6.728a8 8 0 11-2.828-2.828l-1.414 1.414A5 5 0 1017 12.01v-.018l-1.293 1.293z"
              />
            </svg>
          ) : (
            'Join Group'
          )}
        </button>
      </form>
    </div>
  );
};

export default JoinGroupButton;
