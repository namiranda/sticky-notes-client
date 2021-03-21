//import React from 'react';
import { useState } from 'react';
import useRequest from './hooks/use-request';
import { useHistory } from 'react-router-dom';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  let history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: 'http://localhost:3000/api/users/signin',
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
      <div className=" bg-yellow-300 h-44 py-12">
        <h2 className="text-center text-3xl font-bold mont-alternates ">
          topiks
        </h2>
      </div>
      <div className="absolute top-32 flex justify-center w-full">
        <div className=" bg-white w-4/5 lg:w-3/5 p-6 space-y-6 justify-items-center rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold">Sign In</h1>
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
              Sign In &gt;
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
