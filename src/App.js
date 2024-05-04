import React from 'react';
// import 'index.css';
// import 'tailwindcss/tailwind.css';


const App = () => {
  return(
  <div>
    <h1 className="bg-yellow-400 w-screen text-xl font-medium py-4 mx-auto text-center">
      Notes Keeper
    </h1>
    <form className='py-2 shadow-xl rounded-lg px-5 w-1/3 mx-auto text-left mt-10'>
      <input type="text" />
      <textarea type="text" />
    </form>
  </div>
  );
};

export default App;