import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import socketIoClient from 'socket.io-client';

const socket = socketIoClient('https://topiksapi.herokuapp.com/', {
  autoConnect: false,
});

const Note = ({ note }) => {
  return (
    <div className="bg-yellow-500 transform skew-x-1 hover:skew-x-2 w-48 h-48 m-8 flex items-center justify-center shadow-lg hover:shadow-2xl">
      <p>{note.content}</p>
    </div>
  );
};

const TextBox = (ws_id) => {
  const [value, setValue] = useState('');

  const postNote = (e) => {
    e.preventDefault();

    if (!value) return;
    socket.emit('new note', ws_id.ws_id, value);

    setValue('');
  };
  return (
    <div className="w-48 h-48 m-8 bg-green-300 flex items-center">
      <form onSubmit={postNote}>
        <input
          type="text"
          className="input bg-green-300 w-44 text-center "
          placeholder="Your notes..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </div>
  );
};

const Workspace = () => {
  let { ws_id } = useParams(); //Workspace id
  const [notes, setNotes] = useState([]);
  const addNote = (note) => {
    setNotes((oldNotes) => [...oldNotes, note]);
  };

  useEffect(() => {
    // clean up controller
    let isSubscribed = true;
    socket.on('new note', (note) => {
      addNote(note);
    });
    socket.emit('old notes', ws_id);
    socket.on('old notes', (data) => {
      // expect server to send us the old notes
      setNotes(Array.from(data));
    });

    socket.connect();
    // cancel subscription to useEffect
    return () => (isSubscribed = false);
  }, []);

  return (
    <div className="bg-gray-100">
      <TextBox ws_id={ws_id} />
      <div className="flex flex-row flex-wrap">
        {Array.from(notes)
          .reverse()
          .map((note) => (
            <Note key={note._id} note={note} />
          ))}
      </div>
    </div>
  );
};

export default Workspace;
