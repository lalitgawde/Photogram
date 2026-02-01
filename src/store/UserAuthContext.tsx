/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, type User} from "firebase/auth";
import { auth } from '@/firebaseConfig';

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (email: string, password: string) => void;
  signinWithGoogle: () => void;
}

const UserAuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: (email, password) => {},
  logout: () => {},
  signup: (email, password) => {},
  signinWithGoogle: () => {},
});

type UserAuthContextProviderType = {
  children: React.ReactNode
}

export const UserAuthContextProvider = ({ children }: UserAuthContextProviderType) => {
  const [isAuthenticated,setIsAuthenticated] = React.useState<boolean>(false);
  const [user,setUser] = React.useState<User | null>(null);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth,email,password);
  };

  const logout = () => {
    signOut(auth);
  };

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth,email,password);
  };

  const signinWithGoogle = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
      if (user) {
        console.log("The logged in user state is : ", user);
        setUser(user);
        setIsAuthenticated(true)
      }else{
        setUser(null);
        setIsAuthenticated(false)
      }
    })

    return () => {
      unsubscribe();
    }
  },[])

  const userCtx : AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    signup,
    signinWithGoogle
  };

  return (
    <UserAuthContext.Provider value={userCtx}>
      {children}
    </UserAuthContext.Provider>
  )
}

export default UserAuthContext
