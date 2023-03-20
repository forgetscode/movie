import { useState } from 'react';
import { Group } from '../../typings';
import createGroupByUser from '../../utils/mutations/createGroupByUser';
import { createGroupMovieListByGroupId } from '../../utils/mutations/createGroupMovieListByGroupId';
import { notifyFailure, notifySuccess } from '../Toast';

type Props = {
  userId: string;
  groups: Group[];
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateGroupButton: React.FC<Props> = ({ userId, setUpdate  }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateGroup = async () => {
    try {
      const createdGroup = await createGroupByUser(name, description, userId);
      await createGroupMovieListByGroupId(createdGroup.id);
      notifySuccess('Group created.');
      setUpdate((update) => !update); 
    } catch (error) {
      notifyFailure('Creation failed, group name may already exists.');
      console.error(error);
    }
  };

  return (
    <div className="border-b border-gray-300 pb-6">
      <h2 className="text-2xl font-black">Create Group</h2>
      <div className="mt-4 space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          maxLength={40}
          className="bg-transparent w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-white"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="bg-transparent w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-white"
        />
        <button
          onClick={handleCreateGroup}
          className="sm:w-60 px-4 py-2 text-white font-bold bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Create Group
        </button>
      </div>
    </div>
  );
};

export default CreateGroupButton;
