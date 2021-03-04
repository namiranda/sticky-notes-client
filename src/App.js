import React from 'react';
import Signup from './Signup';
import Signin from './Signin';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <div>
      <h1 className="text-7xl">Landing page</h1>
      <Signin />
    </div>
  );
};
