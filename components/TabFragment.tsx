import { Fragment } from 'react';
import { Tab } from '@headlessui/react';

interface MyTabFragmentProps {
    title: string;
  }
  
  export const MyTabFragment = ({ title }: MyTabFragmentProps) => {
    return (
      <Tab as={Fragment}>
        {({ selected }) => (
          <button className={selected ? 'menuTabSelected' : 'menuTab'}>
            {title}
          </button>
        )}
      </Tab>
    );
  };