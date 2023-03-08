import { Popover } from '@headlessui/react'
import { Authentication } from './Auth'

export function PopAuth() {
  return (
    <Popover className="relative">
        <Popover.Button className= "navText group-hover:text-gray-400">Sign In</Popover.Button>
        <Popover.Panel className="absolute z-10 -mt-[104px] -ml-[350px] ">
            <Authentication />
        </Popover.Panel>
    </Popover>
  )
}