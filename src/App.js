import React from 'react';

const App = () => {
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
        <button className="bg-yellow-400 text-3xl px-2 rounded py-1">Add Note</button>
      </form>
    </div>
  );
};

export default App;