import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Note from './components/note';
import { auth } from './components/firebase';
import GoogleSignIn from './components/GoogleSignIn';
import SignOut from './components/SignOut';



const App = () => {
  // const [notes, setNotes] = useState();
  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);


  // useEffect(() => {
  //   axios
  //   .get('http://localhost:5001/notes')
  //   .then((res) => {
  //     console.log(res); 
  //     setNotes(res.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // });
  useEffect(() => {
    // Fetch notes when user is authenticated
    if (user) {
      axios
        .get('http://localhost:5001/notes')
        .then((res) => {
          console.log(res);
          setNotes(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  const addNote = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5001/notes', { title, content }).then(res => {
      console.log(res.data);
      setNotes([...notes, res.data]);
      setTitle(''); // Clear input fields after successful submission
      setContent(''); // Clear input fields after successful submission
    }).catch(err => console.log(err));
  };

  const deleteNote = (id) => {
    axios.delete(`http://localhost:5001/notes/${id}`).then((res) => {
      console.log(res.data);
      setNotes(notes.filter((note) => note._id !== id));
    });
  };

  const updateNote = (id, updatedTitle, updatedContent) => {
    axios.patch(`http://localhost:5001/notes/${id}`, {
      title: updatedTitle,
      content: updatedContent
    })
    .then( (res) => {
      console.log(res.data);
      const updatedNotes = notes.map((note) => note._id === id 
      ? { ...note, title: updatedTitle, content: updatedContent }
    : note
  );
  setNotes(updatedNotes);
  }).catch((err) => console.log(err));
  };

  return (
    <div>
      <h1 className="bg-yellow-400 w-screen text-xl font-medium py-4 mx-auto text-center">Notes Keeper</h1>
      {user ? (
        <div>
          <SignOut />
          <form onSubmit={addNote} className="py-2 shadow-xl rounded-lg px-5 w-1/3 mx-auto text-left mt-10">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block shadow w-full mx-auto px-2 py-2 rounded-lg"
              type="text"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="block shadow w-full mx-auto my-2 px-2 py-4 rounded-lg"
              type="text"
            />
            <button type="submit" className="bg-yellow-400 text-2xl px-2 rounded py-1">
              Add Note
            </button>
          </form>
          {notes && notes.length > 0 && (
            <div className="grid grid-cols-4 gap-4 py-2">
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

  // return(
  //   <div>
  //     <h1 className="bg-yellow-400 w-screen text-xl font-medium py-4 mx-auto text-center">
  //       Notes Keeper
  //     </h1>
  //     <form 
  //     onSubmit={addNote}
  //     className="py-2 shadow-xl rounded-lg px-5 w-1/3 mx-auto text-left mt-10">
  //       <input 
  //       value={title}
  //       onChange={(e) => setTitle(e.target.value)}
  //       className= "block shadow w-full mx-auto px-2 py-2 rounded-lg"
  //       type="text" 
  //       />
  //       <textarea 
  //       value={content}
  //       onChange={(e) => setContent(e.target.value)}
  //       className="block shadow w-full mx-auto my-2 px-2 py-4 rounded-lg"
  //       type="text" 
  //       />
  //       <button
  //       type='submit'
  //       className="bg-yellow-400 text-2xl px-2 rounded py-1">
  //         Add Note
  //         </button>
  //     </form>
  //     <div className="grid grid-cols-4 gap-4 py-2">
  //     {
  //       notes && notes.map(note => (
  //         <Note 
  //         key={note._id}
  //         id={note._id} 
  //         title={note.title} 
  //         content={note.content} 
  //         delete = {() => deleteNote(note._id)} 
  //         updateNote={updateNote} 
  //         />
  //       ))
  //     }
  //     </div>
  //   </div>
  // );
  
};

export default App;