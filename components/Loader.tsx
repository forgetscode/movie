import React from "react";

export const Loading = () => {
  return(          
    <div className="flex items-center justify-center h-full w-full">
      <div className='flex flex-col space-y-4'>
        <div className="border-t-transparent border-solid animate-spin rounded-full border-sky-600 border-4 h-8 w-8 md:h-12 md:w-12 mx-auto"></div>
        <p className='header xl:text-3xl lg:text-2xl md:text-xl text-lg mx-auto'>Loading...</p>
      </div>
    </div>
  );
};