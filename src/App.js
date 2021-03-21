import React from 'react';
import { Link } from 'react-router-dom';
import Landing from './Landing';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <div>
      <nav className=" bg-yellow-300 h-20 md:flex md:flex-row md:justify-between md:px-6 items-center">
        <h2 className="text-center text-3xl font-bold mont-alternates ">
          topiks
        </h2>
        <Link to="/signin">
          <h2 className="hidden md:inline">Sign In</h2>
        </Link>
      </nav>
      <Landing />
    </div>
  );
};
