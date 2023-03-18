import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { ChevronDownIcon, PlusIcon} from '@heroicons/react/solid'
import { notifySuccess } from '../Toast'

const people = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
]

export function GroupListButton({ up=false }) {
  const [selectedPerson, setSelectedPerson] = useState(people[0])

  const handleAddToGroupList = async () => {
    notifySuccess("Added to group list");
    //await submitSupabaseRPCRequest(); // replace with your Supabase RPC request
  }

  return (
    <div className='flex flex-row space-x-4'>
      <Listbox value={selectedPerson} onChange={setSelectedPerson}>
        <div className="relative">
          <div className='flex flex-col w-40'>
            <p className='text-white'>Add to Group:</p>
            <Listbox.Button className="text-white underline flex flex-row items-center">
              {selectedPerson.name}
              <ChevronDownIcon className="w-5 h-5 ml-1" />
            </Listbox.Button>
          </div>
          <Listbox.Options className={`absolute z-50 mt-1 w-40 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm origin-top-left left-0 ${up ? 'transform -translate-y-full' : ''}`}>
            {people.map((person) => (
              <Listbox.Option
                key={person.id}
                value={person}
                disabled={person.unavailable}
                className={({ active }) =>
                  `${active ? 'text-white bg-blue-600' : 'text-gray-900'}
                  cursor-default select-none relative py-2 pl-3 pr-9`
                }
              >
                {person.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
      <button
        className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        onClick={handleAddToGroupList}
      >
        <PlusIcon className="w-5 h-5 "/>
      </button>
    </div>
  )
}
