import { useState } from 'react';
import joinGroupByUser from '../../utils/mutations/joinGroupByUser';
import { notifyFailure, notifySuccess } from '../Toast';

type JoinGroupButtonProps = {
  userId: string;
};

const JoinGroupButton: React.FC<JoinGroupButtonProps> = ({ userId }) => {
  const [groupId, setGroupId] = useState<string>('');
  const [isJoining, setIsJoining] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsJoining(true);
    try {
      await joinGroupByUser(userId, groupId);
      notifySuccess("Group joined.")
    } catch (error) {
      console.log(error)
      notifyFailure("Failed to join group.")
    }
    setIsJoining(false);
  };

  return (
    <div className=' p-8 rounded-xl'>
        <form onSubmit={handleSubmit}>
            <label htmlFor="group-id" className="block text-3xl font-black text-white pb-4">
                Group ID:
            </label>
            <input
            type="text"
            name="group-id"
            id="group-id"
            value={groupId}
            onChange={(event) => setGroupId(event.target.value)}
            className="formInput bg-gray-800 !text-white mt-4"
            />
            <div className="mt-8">
                <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
            </div>
        </form>
    </div>
  );
};

export default JoinGroupButton;
