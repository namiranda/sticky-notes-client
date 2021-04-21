import { useState } from 'react';
import useRequest from './hooks/use-request';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

export default () => {
  let history = useHistory();
  const [name, setName] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    let response = await axios.get(
      'http://localhost:3000/api/users/currentuser',
      {
        withCredentials: true,
      }
    );
    const url =
      'http://localhost:3000/api/workspaces/' + response.data.currentUser.id;
    await axios.post(
      url,
      { name },
      {
        withCredentials: true,
      }
    );
    history.push('/dashboard/' + response.data.currentUser.id); //Poner esto en OnSuccess
  };
  return (
    <div>
      <div className=" bg-yellow-300 h-28 py-14">
        <Link to="/">
          <h2 className="text-center text-3xl font-bold mont-alternates ">
            topiks
          </h2>
        </Link>
      </div>
      <div className="m-5 md:ml-20 lg:ml-36 space-y-6 lg:w-1/2">
        <h2 className="text-6xl text-indigo-900">New Board</h2>
        <p className="text-gray-700">
          Select a subject for your new board. You can invite others to join you
          once the board is created.
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex flex-col">
            <span className="inline-flex">
              <label className="text-gray-800 font-bold inline-flex">
                Title
              </label>
            </span>
            <input
              className="inline-flex"
              placeholder=" Our Ideas"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300"
            />
          </div>
          <button className="uppercase border-2 border-black p-1 mt-2 mb-8 font-bold hover:bg-yellow-300">
            create &gt;
          </button>
        </form>
      </div>
    </div>
  );
};
