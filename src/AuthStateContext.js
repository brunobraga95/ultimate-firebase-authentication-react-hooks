import React, { createContext, useContext, useState, useEffect } from "react";
import { UNAUTHENTICATED } from "./firebase";

const AuthStateContext = createContext({
  state: UNAUTHENTICATED,
  user: {}
});

export default function AuthStateProvider({ children, Firebase }) {
  const [authState, setAuthState] = useState({
    status: UNAUTHENTICATED,
    user: undefined
  });

  const signOut = () => Firebase.signOut(setAuthState);
  const signUpWithEmailAndPassword = (
    email,
    password,
    name,
    callback,
    onError
  ) => {
    const expandedOnError = error => {
      // If there is an error with the login we will rollback to the last auth state.
      setAuthState(authState);
      onError && onError(error);
    };
    Firebase.signUpWithEmailAndPassword(
      email,
      password,
      name,
      setAuthState,
      callback,
      expandedOnError
    );
  };

  const signInWithEmailAndPassword = (email, password, callback, onError) => {
    const expandedOnError = error => {
      // If there is an error with the login we will rollback to the last auth state.
      setAuthState(authState);
      onError && onError(error);
    };
    Firebase.signInWithEmailAndPassword(
      email,
      password,
      setAuthState,
      callback,
      expandedOnError
    );
  };
  const signInWithFacebook = (callback, onError) =>
    Firebase.signInWithFacebook(setAuthState, callback, onError);
  const signInWithGoogle = callback =>
    Firebase.signInWithGoogle(setAuthState, callback);
  const updateEmailAddress = (email, callback) =>
    Firebase.updateEmailAddress(email, callback);
  const sendPasswordResetEmail = (email, callback, onError) =>
    Firebase.sendPasswordResetEmail(email, callback, onError);
  const sendEmailVerification = (callback, onError) =>
    Firebase.sendEmailVerification(callback, onError);
  const getHasuraClaims = async callback => Firebase.getHasuraClaims(callback);
  const userHasOnlyEmailProvider = () => Firebase.userHasOnlyEmailProvider();
  useEffect(() => {
    let unsubscribe = Firebase.authState(setAuthState);
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  return (
    <AuthStateContext.Provider
      value={{
        authState,
        signOut,
        signUpWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithFacebook,
        signInWithGoogle,
        updateEmailAddress,
        sendPasswordResetEmail,
        sendEmailVerification,
        getHasuraClaims,
        userHasOnlyEmailProvider
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
}

export const useAuthStateContext = () => useContext(AuthStateContext);
