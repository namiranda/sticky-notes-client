import { useState } from 'react';
import useRequest from './hooks/use-request';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

export default () => {
  let history = useHistory();
  const [name, setName] = useState('');
  let user = {};
  const currentUser = async () => {
    user = await axios.get('http://localhost:3000/api/users/currentuser', {
      withCredentials: true,
    });
    console.log(user);
  };
  {
    currentUser();
  }
  const { doRequest, errors } = useRequest({
    url: `http://localhost:3000/api/workspace/${user._id}`,
    method: 'post',
    body: {
      name,
    },
    onSuccess: () => history.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };
  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-600">Title</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300"
          />
        </div>
        {errors}
        <button className="uppercase border-2 border-black p-1 mt-2 mb-8 font-bold hover:bg-yellow-300">
          create &gt;
        </button>
      </form>
    </div>
  );
};
