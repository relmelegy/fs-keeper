// frontend/src/components/GoogleSignIn.js
import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const GoogleSignInButton = () => {
  const [error, setError] = useState(null);

  const handleSignInWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Sign-in successful', result.user);
        setError(null);
      })
      .catch((error) => {
        console.error('Sign-in error', error);
        setError('Sign-in failed. Please try again.');
      });
  };

  return (
    <div>
      <button onClick={handleSignInWithGoogle} className="bg-blue-500 text-white py-2 px-4 rounded">
        Sign in with Google
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default GoogleSignInButton;
