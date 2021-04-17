import React, { useState, useEffect } from 'react';
import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [workspaces, setWorkspaces] = useState({});

  const fetchWorkspaces = async () => {
    let user = await axios.get('http://localhost:3000/api/users/currentuser', {
      withCredentials: true,
    });
    const url =
      'http://localhost:3000/api/workspaces/' + user.data.currentUser.id;
    const response = await axios.get(url);

    setWorkspaces(response.data);
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const renderedWorkspace = Object.values(workspaces).map((workspace) => {
    return (
      <div key={workspace._id}>
        <h2>{workspace.name}</h2>
      </div>
    );
  });
  return <div className="">{renderedWorkspace}</div>;
};
