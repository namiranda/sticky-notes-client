import React, { useState, useEffect } from 'react';

import socketIoClient from 'socket.io-client';

const socket = socketIoClient('http://localhost:3000', { autoConnect: false });

const Note = ({ note }) => {
  return (
    <div className="note">
      <span> {new Date(note.date).toLocaleDateString()} </span>
      <span> {note.content} </span>
    </div>
  );
};

const TextBox = () => {
  const [value, setValue] = useState('');

  const postNote = (e) => {
    e.preventDefault();

    if (!value) return;

    socket.emit('message', value);

    setValue('');
  };

  return (
    <form onSubmit={postNote}>
      <input
        type="text"
        className="input"
        placeholder="Your notes"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};

const Workspace = () => {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => {
    setNotes((oldNotes) => [
      ...oldNotes,
      ...(Array.isArray(note) ? note.reverse() : [note]),
    ]);
  };

  useEffect(() => {
    socket.on('latest', (data) => {
      // expect server to send us the latest messages
      addNote(data);
    });
    socket.on('message', (msg) => {
      addNote(msg);
    });

    socket.connect();
  }, []);

  return (
    <div>
      <div>
        {notes.map((note) => (
          <Note msg={note} />
        ))}
      </div>
      <TextBox />
    </div>
  );
};

export default Workspace;
