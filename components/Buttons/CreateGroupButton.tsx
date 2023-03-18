import { useState, useEffect } from 'react';
import createGroupByUser from '../../utils/mutations/createGroupByUser';
import { notifySuccess } from '../Toast';

type Group = {
  group_id: string;
  group_name: string;
  group_description: string;
};

type Props = {
  userId: string;
  groups: Group[];
};

const CreateGroupButton: React.FC<Props> = ({ userId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateGroup = async () => {
    try {
      const newGroup = await createGroupByUser(name, description, userId);
      notifySuccess('Group created.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border-b border-gray-300 pb-4">
      <h2 className="text-lg font-semibold">Create Group</h2>
      <div className="mt-4 space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
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
          className="w-60 px-4 py-2 text-white font-bold bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Create Group
        </button>
      </div>
    </div>
  );
};

export default CreateGroupButton;
