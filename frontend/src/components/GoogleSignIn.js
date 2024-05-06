import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const GoogleSignInButton = () => {
  const handleSignInWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Handle successful sign-in
        console.log('Sign-in successful', result.user);
      })
      .catch((error) => {
        // Handle sign-in error
        console.error('Sign-in error', error);
      });
  };

  return (
    <button onClick={handleSignInWithGoogle}>
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
