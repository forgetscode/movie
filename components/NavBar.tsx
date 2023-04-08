import { useSession } from "@supabase/auth-helpers-react";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { supabase } from "../utils/supabase";
import { PopAuth } from "./PopAuth";
import { HomeIcon, UserIcon, UsersIcon, NewspaperIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useUser } from "../context/useUser";
import { notifyFailure } from '../components/Toast';

type NavBarProps = {
  children: ReactNode;
};

function NavBar({ children }: NavBarProps) {
  const session = useSession();
  const { user, setUser } = useUser();
  const userName = useMemo(() => user?.name, [user]);
  

  const [isScrolled, setIsScrolled] = useState(false)

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut()
  }
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
          setIsScrolled(true)
      } else {
          setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
        window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  
  return (
    <div className="flex flex-col space-y-24">
      <div className={`${isScrolled && 'bg-black bg-opacity-50'} mb-8 h-16 w-full fixed p-2 px-8 z-50 flex items-center`}>
        <ul className="flex flex-row text-white space-x-2 text-2xl w-full justify-between">
        <ul className="flex flex-row space-x-6">
        <Link href="/">
          <div className="flex flex-row space-x-1 group">
            <HomeIcon className="h-8 w-8 group-hover:text-gray-400"/>
            <p className="navText group-hover:text-gray-400">Home</p>
          </div>
        </Link>
        <Link href="/mylist">
        <div className="flex flex-row space-x-1 group">
          <NewspaperIcon className="h-8 w-8 group-hover:text-gray-400"/>
          <p className="navText group-hover:text-gray-400">My List</p>
        </div>
        </Link>
        {!session && notifyFailure("Must be logged in")}
        <Link href="/group">
          <div className="flex flex-row space-x-1 group">
            <UsersIcon className="h-8 w-8 group-hover:text-gray-400"/>
            <p className="navText group-hover:text-gray-400">My Group</p>
          </div>
        </Link>
        {!session && notifyFailure("Must be logged in")}
        </ul>
          {session ? (
              <div className="flex flex-row space-x-1 group">
                <p className="text-gray-400 text-2xl lg:flex hidden ">{userName}</p>
                <UserIcon className="h-8 w-8 !flex group-hover:text-gray-400"/>
                <button className="navText !flex group-hover:text-gray-400" onClick={handleSignOut}>Sign Out</button>
              </div>
            ) : (
              <div className="flex flex-row space-x-1 group">
                  <UserIcon className="h-8 w-8 flex group-hover:text-gray-400"/>
                  <PopAuth />
              </div>
            )}
        </ul>
      </div>
      {children}
    </div>
  );
}

export default NavBar;

