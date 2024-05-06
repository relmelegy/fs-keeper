import React from 'react';
import { auth } from './firebase';

const SignOut = () => {
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <button onClick={handleSignOut}>Sign out</button>
  );
};

export default SignOut;
