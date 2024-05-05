import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Note from './components/note';

const App = () => {
  const [notes, setNotes] = useState();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios
    .get('http://localhost:5001/notes')
    .then((res) => {
      setNotes(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  });

  const deleteNote = (id) => {
    console.log('Delete note function called');
  };

  const updateNote = (id, updatedTitle, updatedContent) => {
    console.log('Update note function called');
  };

  return(
    <div>
      <h1 className="bg-yellow-400 w-screen text-xl font-medium py-4 mx-auto text-center">
        Notes Keeper
      </h1>
      <form className="py-2 shadow-xl rounded-lg px-5 w-1/3 mx-auto text-left mt-10">
        <input 
        className= "block shadow w-full mx-auto px-2 py-2 rounded-lg"
        type="text" 
        />
        <textarea 
        className="block shadow w-full mx-auto my-2 px-2 py-4 rounded-lg"
        type="text" 
        />
        <button className="bg-yellow-400 text-2xl px-2 rounded py-1">
          Add Note
          </button>
      </form>
      <div className="grid grid-cols-4 gap-4 py-2">
      {
        notes && notes.map(note => (
          <Note 
          key={note._id} 
          title={note.title} 
          content={note.content} 
          delete = {() => deleteNote(note._id)} 
          updateNote={updateNote} />
        ))
      }
      </div>
    </div>
  );
};

export default App;