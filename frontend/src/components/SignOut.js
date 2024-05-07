import React from 'react';
import { auth } from './firebase';

const SignOut = () => {
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 text-white py-2 px-4 rounded mt-4"
    >
      Sign out
    </button>
  );
};

export default SignOut;
