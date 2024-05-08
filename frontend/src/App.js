import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/note';
import { auth } from './components/firebase';
import GoogleSignIn from './components/GoogleSignIn';
import SignOut from './components/SignOut';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://fs-keeper.onrender.com';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const fetchNotes = async () => {
    try {
      if (user) {
        const idToken = await auth.currentUser.getIdToken();
        const res = await axios.get(`${backendUrl}/notes`, {
          headers: {
            Authorization: `Bearer ${idToken}`
          }
        });
        setNotes(res.data);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [user]);

  const addNote = async (e) => {
    e.preventDefault();
    try {
      const idToken = await auth.currentUser.getIdToken();
      const user = auth.currentUser;
      const userId = user ? user.uid : null;
      const res = await axios.post(
        `${backendUrl}/notes`,
        { title, content, userId },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      setNotes([...notes, res.data]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const idToken = await auth.currentUser.getIdToken();
      await axios.delete(`${backendUrl}/notes/${id}`, {
        headers: { Authorization: `Bearer ${idToken}` }
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const updateNote = async (id, updatedTitle, updatedContent) => {
    try {
      const idToken = await auth.currentUser.getIdToken();
      const res = await axios.patch(
        `${backendUrl}/notes/${id}`,
        { title: updatedTitle, content: updatedContent },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      setNotes(
        notes.map((note) => (note._id === id ? res.data : note))
      );
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <div>
      <h1 className="bg-yellow-400 w-full text-2xl font-medium py-4 text-center">Notes Keeper</h1>
      {user ? (
        <div>
          <SignOut />
          <form onSubmit={addNote} className="py-4 shadow-xl rounded-lg px-8 w-1/3 mx-auto mt-10">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block shadow w-full mx-auto px-4 py-2 rounded-lg mb-4"
              type="text"
              placeholder="Note Title"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="block shadow w-full mx-auto px-4 py-4 rounded-lg mb-4"
              type="text"
              placeholder="Note Content"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-2xl px-2 rounded py-1 w-full"
            >
              Add Note
            </button>
          </form>
          {notes && notes.length > 0 && (
            <div className="grid grid-cols-4 gap-4 py-2 justify-center px-6 mt-6">
              {notes.map((note) => (
                <Note
                  key={note._id}
                  id={note._id}
                  title={note.title}
                  content={note.content}
                  delete={() => deleteNote(note._id)}
                  updateNote={updateNote}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <GoogleSignIn />
      )}
    </div>
  );
};

export default App;

