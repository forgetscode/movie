import React, { ReactNode, useEffect, useState } from "react";

type NavBarProps = {
  children: ReactNode;
};

function NavBar({ children }: NavBarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  
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
      <div className={`${isScrolled && 'bg-black'} mb-8 h-16 w-full fixed p-2 px-8 z-50`}>
        <ul className="flex flex-row text-white space-x-2 text-2xl w-full justify-between cursor-pointer">
          <ul className="flex flex-row space-x-4">
            <p>Home</p>
            <p>My List</p>
            <p>My Group</p>
          </ul>
          <p className="flex pointer-cursor">Sign Up</p>
        </ul>
      </div>
      {children}
    </div>
  );
}

export default NavBar;

