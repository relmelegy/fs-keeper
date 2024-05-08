import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const GoogleSignInButton = () => {
  const handleSignInWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Sign-in successful', result.user);
      })
      .catch((error) => {
        console.error('Sign-in error', error);
      });
  };

  return (
    <div className="absolute top-4 right-8">
      <button
        onClick={handleSignInWithGoogle}
        className="bg-blue-600 text-xl text-white px-4 py-2 rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleSignInButton;