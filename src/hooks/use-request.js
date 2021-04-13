import axios from 'axios';
import { useState } from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body, {
        withCredentials: true,
      });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      setErrors(
        <div className="">
          <h4>Ooops....</h4>
          <ul className="my-0">
            {err.response.data.errors.map((err) => (
              <li className="text-red-500" key={err.message}>
                {err.message}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
/* 


await axios
  .post(apiURL + apiVersion + "/access/login", { email, password }, config)
  .then((response) => {

      sessionStorage.setItem(
          "somedata" + storageCode,
          JSON.stringify(response.data.subBody)
      );

      dispatch({
          type: THERAPIST_LOGIN_SUCCESS,
          payload: response.data.subBody
      });
  }) */
