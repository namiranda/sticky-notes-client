import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import InviteButton from './InviteButton';
import NavBar from './NavBar';

const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState({});
  let { id } = useParams(); //user id
  const fetchWorkspaces = async () => {
    const url = 'http://localhost:3000/api/workspaces/' + id;
    const response = await axios.get(url);

    setWorkspaces(response.data);
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const onSubmit = async (event, ws_id) => {
    event.preventDefault();

    await axios.delete(`http://localhost:3000/api/workspaces/${id}/${ws_id}`);

    window.location.reload();
  };

  const renderedWorkspace = Object.values(workspaces).map((workspace) => {
    return (
      <div
        className="border border-black m-4 flex justify-between transform hover:shadow-md hover:-translate-x-1 hover:-translate-y-1"
        key={workspace._id}
      >
        <div className="p-3">
          <Link to={'/' + id + '/workspaces/' + workspace._id}>
            <h2 className="font-bold text-2xl">{workspace.name}</h2>
          </Link>
          <h3 className="italic">
            Created <span></span> ago
          </h3>
          <h3 className="italic">
            Modified <span></span> ago
          </h3>
        </div>
        <div className="flex flex-col p-3 justify-center space-y-2">
          <InviteButton id={id} workspace={workspace} />

          <form onSubmit={(event) => onSubmit(event, workspace._id)}>
            <button className="uppercase font-bold text-base">[Delete]</button>
          </form>
        </div>
      </div>
    );
  });
  return (
    <div className="">
      <NavBar />
      <div className="flex justify-between m-4">
        <div>
          <h1 className="text-6xl text-indigo-900">Boards</h1>
          <h2 className="text-gray-700">Welcome to your dashboard</h2>
        </div>
        <div>
          <Link to="/newboard">
            <button className="uppercase border-2 border-black p-1 mt-2 mb-8 font-bold hover:bg-yellow-300">
              create &gt;
            </button>
          </Link>
        </div>
      </div>
      <div>{renderedWorkspace}</div>
    </div>
  );
};
export default Dashboard;
