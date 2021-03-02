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
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=""
        />
      </div>
      <div className="">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className=""
        />
      </div>
      {errors}
      <button className="">Sign Up</button>
    </form>
  );
};
