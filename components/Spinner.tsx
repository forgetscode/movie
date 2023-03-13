import React from 'react';

const Spinner = () => {
  return (
    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12.728 6.728a8 8 0 11-2.828-2.828l-1.414 1.414A5 5 0 1017 12.01v-.018l-1.293 1.293z" />
    </svg>
  );
};

export default Spinner;