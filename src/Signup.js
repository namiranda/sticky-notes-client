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
    <div className="grid ">
      <p className="text-center text-xl">Create your first sticky note board</p>
      <div className="w-4/5 p-6 space-y-6 place-self-center justify-items-center rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <form onSubmit={onSubmit}>
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
          <button className="uppercase border-2 border-black p-1 my-2 font-bold hover:bg-yellow-300">
            Sign Up &gt;
          </button>
        </form>
      </div>
    </div>
  );
};
