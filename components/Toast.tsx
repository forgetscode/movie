import { CheckIcon } from '@heroicons/react/solid'
import toast from 'react-hot-toast';


export const notifySuccess = (message:string) => 
    toast(
        message,
        {
            position:'bottom-left',
            style: {
                fontWeight: '900',
                flex: 1,
                fontSize: '1rem',
                maxWidth: '250px',
                background: '#202225',
                color: 'white',
            },
            icon: <CheckIcon className='text-sky-600 h-9 w-9 '/>
        }
    );

export const notifyFailure = (message:string) => 
    toast(
        message,
        {
            position:'bottom-left',
            style: {
                fontWeight: '900',
                maxWidth: '250px',
                flex: 1,
                fontSize: '1rem',
                background: '#202225',
                color: 'red',
            },
        }
    );