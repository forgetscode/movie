import { Fragment } from 'react'
import { Tab } from '@headlessui/react'
import { MyTabFragment } from './TabFragment'

export const MyTabs = () =>{
  return (
    <Tab.Group>
      <Tab.List className="space-x-1 p-1 bg-gray-200 text-lg font-bold text-white rounde-lg h-24 flex flex-row">
        <MyTabFragment title='My List'></MyTabFragment>
        <MyTabFragment title='My Group'></MyTabFragment>
        <MyTabFragment title='Movies'></MyTabFragment>
        <MyTabFragment title='Reccomendations'></MyTabFragment>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel className="text-xl font-black pt-16">Content 1</Tab.Panel>
        <Tab.Panel className="text-xl font-black pt-16">Content 2</Tab.Panel>
        <Tab.Panel className="text-xl font-black pt-16">Content 3</Tab.Panel>
        <Tab.Panel className="text-xl font-black pt-16">Content 4</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
