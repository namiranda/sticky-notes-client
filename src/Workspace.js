import React, { useState, useEffect } from 'react';

import socketIoClient from 'socket.io-client';

//TODO: Sacar workspace id hardcodeado
//Solucionar el resto de errores

const socket = socketIoClient('http://localhost:3000', {
  autoConnect: false,
});
const ws_id = '60835b72b6f8c61c5885934a';

const Note = ({ note }) => {
  return (
    <div className="bg-yellow-500 w-48 h-48 m-8 flex items-center justify-center shadow-lg hover:shadow-2xl">
      {console.log('en note')}
      <h2>{note}</h2>
    </div>
  );
};
const TextBox = () => {
  const [value, setValue] = useState('');

  const postNote = (e) => {
    e.preventDefault();

    if (!value) return;

    socket.emit('new note', ws_id, value);

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
  const [notes, setNotes] = useState([]);
  const addNote = (note) => {
    setNotes((oldNotes) => [...oldNotes, note]);
  };

  useEffect(() => {
    socket.on('new note', (note) => {
      addNote(note);
    });
    socket.emit('old notes', ws_id);
    socket.on('old notes', (data) => {
      // expect server to send us the old notes
      setNotes(Array.from(data));
    });

    socket.connect();
  }, []);

  return (
    <div className="bg-gray-100">
      <TextBox />
      <div className="flex flex-row flex-wrap">
        {Array.from(notes)
          .reverse()
          .map((note) => (
            <Note key={note._id} note={note.content} />
          ))}
      </div>
    </div>
  );
};

export default Workspace;
