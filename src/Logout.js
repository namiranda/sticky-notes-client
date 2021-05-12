import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useRequest from './hooks/use-request';

const Logout = () => {
  let history = useHistory();
  const { doRequest } = useRequest({
    url: 'http://localhost:3000/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => history.push('/'),
  });
  console.log('loggin out....');
  useEffect(() => {
    doRequest();
  });

  return <div>Signing you out...</div>;
};

export default Logout;
