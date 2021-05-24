import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import TimeAgo from 'timeago-react';

import socketIoClient from 'socket.io-client';

const socket = socketIoClient('https://topiksapi.herokuapp.com/', {
  autoConnect: false,
});

const Note = ({ note, ws_id }) => {
  const deleteNote = (e) => {
    e.preventDefault();

    socket.emit('delete note', ws_id, note._id);
  };

  return (
    <div className="relative bg-yellow-500 transform rotate-2 hover:rotate-1 w-48 h-48 m-8 flex items-center justify-center shadow-lg hover:shadow-2xl">
      <div className="absolute top-1 right-1">
        <form onSubmit={deleteNote}>
          <button className="h-4 w-4 font-bold text-xs bg-black text-white rounded-full hover:bg-red-600 ">
            x
          </button>
        </form>
      </div>
      <div className="px-4">
        <p>{note.content}</p>
      </div>
      <div className="absolute bottom-1 text-xs">
        <TimeAgo datetime={note.date} locale="en_US" />
      </div>
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
  const deleteNote = (note_id) => {
    setNotes((oldNotes) =>
      [...oldNotes].filter((oldNote) => oldNote._id !== note_id)
    );
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
    socket.on('delete note', (note_id) => {
      deleteNote(note_id);
    });
    socket.connect();
    // cancel subscription to useEffect
    return () => (isSubscribed = false);
  }, []);

  return (
    <div>
      <NavBar />
      <TextBox ws_id={ws_id} />
      <div className="flex flex-row flex-wrap">
        {Array.from(notes)
          .reverse()
          .map((note) => (
            <Note key={note._id} note={note} ws_id={ws_id} />
          ))}
      </div>
    </div>
  );
};

export default Workspace;
