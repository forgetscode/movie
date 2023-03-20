import React, { useState, useEffect } from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/solid';
import { useGroups } from '../../context/useGroups';
import { Group } from '../../typings';


type GroupListButtonProps = {
  up?: boolean;
};

export function GroupListButton({ up = false }: GroupListButtonProps) {
  const { groups } = useGroups();
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  useEffect(() => {
    if (groups) {
      setSelectedGroup(groups[0]);
    }
  }, [groups]);

  const handleAddToGroupList = async () => {
    // Replace with your notification success function
    // notifySuccess('Added to group list');
    // Replace with your Supabase RPC request function
    // await submitSupabaseRPCRequest();
  };

  return (
    <div className="flex flex-row space-x-4">
      <Listbox value={selectedGroup} onChange={setSelectedGroup}>
        <div className="relative">
          <div className="flex flex-col w-40">
            <p className="text-white">Add to Group:</p>
            <Listbox.Button className="text-white underline flex flex-row items-center">
              {selectedGroup?.group_name || 'Select a group'}
              <ChevronDownIcon className="w-5 h-5 ml-1" />
            </Listbox.Button>
          </div>
          <Listbox.Options
            className={`absolute z-50 mt-1 w-40 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm origin-top-left left-0 ${
              up ? 'transform -translate-y-full' : ''
            }`}
          >
            {groups?.map((group) => (
              <Listbox.Option
                key={group.group_id}
                value={group}
                className={({ active }) =>
                  `${active ? 'text-white bg-blue-600' : 'text-gray-900'}
                  cursor-default select-none relative py-2 pl-3 pr-9`
                }
              >
                {group.group_name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
      <button
        className="bg-blue-700 hover:bg-blue-800 text-white font-bold sm:py-2 sm:px-4 p-2 rounded"
        onClick={handleAddToGroupList}
        disabled={!selectedGroup}
      >
        <PlusIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
