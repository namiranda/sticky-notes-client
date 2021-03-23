//import React from 'react';
import { useState } from 'react';
import useRequest from './hooks/use-request';
import { useHistory, Link } from 'react-router-dom';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  let history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: 'http://localhost:3000/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => history.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <div className="relative">
      <div className=" bg-yellow-300 h-64 py-14">
        <Link to="/">
          <h2 className="text-center text-3xl font-bold mont-alternates ">
            topiks
          </h2>
        </Link>
        <p className="py-4 text-center text-xl font-bold">
          Create your first sticky note board
        </p>
      </div>
      <div className="absolute top-36 flex justify-center w-full">
        <div className=" bg-white w-4/5 lg:w-1/2 p-6 space-y-6 justify-items-center rounded-lg shadow-lg">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <Link to="/signin">
              <h2 className="text-gray-600">
                or <span className="uppercase">sign in</span>
              </h2>
            </Link>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-600	">Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600	">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="border border-gray-300"
              />
            </div>
            {errors}
            <button className="uppercase border-2 border-black p-1 mt-2 mb-8 font-bold hover:bg-yellow-300">
              Sign Up &gt;
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
