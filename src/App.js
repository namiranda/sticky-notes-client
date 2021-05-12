import React from 'react';
import { Link } from 'react-router-dom';
import Landing from './Landing';
import NavBar from './NavBar';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <div>
      <NavBar />
      <Landing />
    </div>
  );
};
