import { useState } from 'react'
import { Listbox } from '@headlessui/react'

const people = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
]

export function GroupListButton() {
  const [selectedPerson, setSelectedPerson] = useState(people[0])

  return (
    <Listbox value={selectedPerson} onChange={setSelectedPerson}>
      <div className="relative">
        <Listbox.Button className="bg-gray-200 text-gray-800 rounded p-2 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
          {selectedPerson.name}
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {people.map((person) => (
            <Listbox.Option
              key={person.id}
              value={person}
              disabled={person.unavailable}
              className={({ active }) =>
                `${active ? 'text-white bg-indigo-600' : 'text-gray-900'}
                cursor-default select-none relative py-2 pl-3 pr-9`
              }
            >
              {person.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}