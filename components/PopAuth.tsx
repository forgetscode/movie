import { Popover } from '@headlessui/react'
import { Authentication } from './Auth'

export function PopAuth() {
  return (
    <Popover className="relative">
        <Popover.Button className= "navText !flex group-hover:text-gray-400">Sign In</Popover.Button>
        <Popover.Panel className="absolute z-60 -mt-[112px] -ml-[270px] sm:-ml-[350px] ">
            <Authentication />
        </Popover.Panel>
    </Popover>
  )
}