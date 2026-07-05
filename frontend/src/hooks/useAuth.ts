"use client";

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

/**
 * @interface AuthState
 * @description Defines the shape of the authentication state.
 */
interface AuthState {
  isLoggedIn: boolean;
  logout: () => void;
  userEmail: string | null;
  userName: string | null;
  isPro: boolean;
  credits: number;
  refreshUser: () => Promise<void>;
}

/**
 * useAuth Custom Hook
 * @description A hook to manage and check the user's authentication status
 * by looking for an auth token in localStorage.
 * @returns {AuthState} An object containing the login status and a logout function.
 */
export const useAuth = (): AuthState => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [credits, setCredits] = useState(5);

  const fetchUser = async () => {
    try {
      const { getMeApi } = await import('../utils/api');
      const data = await getMeApi();
      if (data.credits !== undefined) setCredits(data.credits);
      if (data.isPro !== undefined) setIsPro(data.isPro);
    } catch (err) {
      console.error('Failed to refresh user data', err);
    }
  };

  useEffect(() => {
    // Check for the token when the component mounts
    const token = Cookies.get('authToken');
    const email = Cookies.get('userEmail');
    const name = Cookies.get('userName');
    
    setIsLoggedIn(!!token);
    
    if (email) {
      setUserEmail(email);
    }
    if (name) {
      setUserName(name);
    } else if (email) {
      // Fallback
      const derivedName = email.split('@')[0];
      setUserName(derivedName.charAt(0).toUpperCase() + derivedName.slice(1));
    }

    if (token) {
      fetchUser();
    }
  }, []);

  const logout = () => {
    // Remove the token from storage
    Cookies.remove('authToken');
    Cookies.remove('userEmail');
    Cookies.remove('userName');
    // Update the state
    setIsLoggedIn(false);
    setUserEmail(null);
    setUserName(null);
    setIsPro(false);
    setCredits(5);
    // Redirect to the login page
    window.location.href = '/login';
  };

  return { isLoggedIn, logout, userEmail, userName, isPro, credits, refreshUser: fetchUser };
};



// "use client";

// import { useState, useEffect } from 'react';

// /**
//  * @interface AuthState
//  * @description Defines the shape of the authentication state.
//  */
// interface AuthState {
//   isLoggedIn: boolean;
//   logout: () => void;
// }

// /**
//  * useAuth Custom Hook
//  * @description A hook to manage and check the user's authentication status
//  * by looking for an auth token in localStorage.
//  * @returns {AuthState} An object containing the login status and a logout function.
//  */
// export const useAuth = (): AuthState => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Check for the token when the component mounts
//     const token = localStorage.getItem('authToken');
//     setIsLoggedIn(!!token); // !! converts the string (or null) to a boolean
//   }, []);

//   const logout = () => {
//     // Remove the token from storage
//     localStorage.removeItem('authToken');
//     // Update the state
//     setIsLoggedIn(false);
//     // Redirect to the login page
//     window.location.href = '/login';
//   };

//   return { isLoggedIn, logout };
// };
