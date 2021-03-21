import React from 'react';
import Signup from './Signup';
import Signin from './Signin';
import Landing from './Landing';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <div>
      <div className="bg-yellow-300 h-14 ">
        <h2 className="text-center text-3xl font-bold mont-alternates">
          topiks
        </h2>
      </div>
      <Landing />
    </div>
  );
};
