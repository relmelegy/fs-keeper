import React from 'react';
import { auth } from './firebase';

const SignOut = () => {
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <div className="absolute top-4 right-8">
      <button
        onClick={handleSignOut}
        className="bg-red-600 text-xl text-white px-4 py-2 rounded-lg"
      >
        Sign out
      </button>
    </div>
  );
};

export default SignOut;
