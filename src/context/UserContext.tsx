
// https://fine-care.vercel.app/?username=9497554401


// import React, { createContext, useContext, useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// type UserContextType = {
//   username: string;
//   setUsername: (value: string) => void;
//   ready: boolean;
// };

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   const location = useLocation();
//   const [username, setUsernameState] = useState<string>("");
//   const [ready, setReady] = useState(false);

//   //  Extract username from URL or localStorage
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const urlUsername = params.get("username");
//     const storedUsername = localStorage.getItem("username");

//     if (urlUsername) {
//       localStorage.setItem("username", urlUsername);
//       setUsernameState(urlUsername);
//     } else if (storedUsername) {
//       setUsernameState(storedUsername);
//     } else {
//       setUsernameState(""); // default (no user)
//     }

//     setReady(true);
//   }, [location.search]);

//   const setUsername = (value: string) => {
//     localStorage.setItem("username", value);
//     setUsernameState(value);
//   };

//   return (
//     <UserContext.Provider value={{ username, setUsername , ready}}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser must be used within UserProvider");
//   }
//   return context;
// };





// import { createContext, useContext, useEffect, useState } from "react";

// type UserContextType = {
//   username: string | null;
//   isAuthenticated: boolean;
// };

// const UserContext = createContext<UserContextType | null>(null);

// export const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   const [username, setUsername] = useState<string | null>(null);

//   useEffect(() => {
//     //  read from URL
//     const params = new URLSearchParams(window.location.search);
//     const userFromUrl = params.get("username");

//     if (userFromUrl) {
//       setUsername(userFromUrl);
//       localStorage.setItem("username", userFromUrl);

//       // remove query param from URL (clean URL)
//       window.history.replaceState({}, "", window.location.pathname);
//     } 
//     // else {
//     //   //  fallback to localStorage
//     //   const storedUser = localStorage.getItem("username");
//     //   if (storedUser) {
//     //     setUsername(storedUser);
//     //   }
//     // }
//   }, []);

//   return (
//     <UserContext.Provider
//       value={{
//         username,
//         isAuthenticated: Boolean(username),
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUser must be used inside UserProvider");
//   }
//   return context;
// };





// wrap app inside <UserProvider>

//src/routes/ProtectedRoute.tsx

// import { Navigate } from "react-router-dom";
// import { useUser } from "@/context/UserContext";

// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const { isAuthenticated } = useUser();

//   if (!isAuthenticated) {
//     return <Navigate to="*" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;


// <Route path="/" element={ <ProtectedRoute>  <Index /> </ProtectedRoute> } />   apply for all except page not found

// to use this const { username } = useUser(); in any component



// username with expiry 

import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type UserContextType = {
  username: string;
  setUsername: (value: string) => void;
  ready: boolean;
  isExpired: boolean; // Add this to track expiry state
  clearUsername: () => void; // Add this for manual clearing
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// Constants for expiration - CHANGED TO 30 MINUTES
const USERNAME_EXPIRY_MINUTES = 30; // Username expires in 30 minutes
const USERNAME_KEY = "username";
const USERNAME_EXPIRY_KEY = "username_expiry";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [username, setUsernameState] = useState<string>("");
  const [ready, setReady] = useState(false);
  const [isExpired, setIsExpired] = useState(false); // Track expiry state

  // Helper function to set expiry date - CHANGED TO MINUTES
  const setExpiry = () => {
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + USERNAME_EXPIRY_MINUTES);
    return expiryDate.toISOString();
  };

  // Check if username is expired
  const isUsernameExpired = (expiry: string): boolean => {
    try {
      const expiryDate = new Date(expiry);
      const currentDate = new Date();
      return currentDate > expiryDate;
    } catch (error) {
      // If date parsing fails, treat as expired
      return true;
    }
  };

  // Clear username from storage
  const clearUsername = () => {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(USERNAME_EXPIRY_KEY);
    setUsernameState("");
    setIsExpired(true);
  };

  // Extract username from URL or localStorage with expiry check
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlUsername = params.get("username");
    const storedUsername = localStorage.getItem(USERNAME_KEY);
    const storedExpiry = localStorage.getItem(USERNAME_EXPIRY_KEY);

    // Reset expired state initially
    setIsExpired(false);

    // If URL has username, always set it (overwrites old one)
    if (urlUsername) {
      localStorage.setItem(USERNAME_KEY, urlUsername);
      localStorage.setItem(USERNAME_EXPIRY_KEY, setExpiry());
      setUsernameState(urlUsername);
    } 
    // If stored username exists and is not expired
    else if (storedUsername && storedExpiry && !isUsernameExpired(storedExpiry)) {
      setUsernameState(storedUsername);
    }
    // If username is expired or doesn't exist
    else {
      if (storedUsername && storedExpiry && isUsernameExpired(storedExpiry)) {
        // Clear expired username
        clearUsername();
        console.log("Username expired. Please provide a new username.");
      } else {
        setUsernameState(""); // default (no user)
        // If no stored username, set as not expired (fresh state)
        setIsExpired(false);
      }
    }

    setReady(true);
  }, [location.search]);

  const setUsername = (value: string) => {
    localStorage.setItem(USERNAME_KEY, value);
    localStorage.setItem(USERNAME_EXPIRY_KEY, setExpiry());
    setUsernameState(value);
    setIsExpired(false); // Reset expired state when setting new username
  };

  // Optional: Auto-check expiry more frequently (every minute for 30 minute expiry)
  useEffect(() => {
    const interval = setInterval(() => {
      const storedExpiry = localStorage.getItem(USERNAME_EXPIRY_KEY);
      const storedUsername = localStorage.getItem(USERNAME_KEY);
      
      if (storedExpiry && storedUsername && isUsernameExpired(storedExpiry)) {
        clearUsername();
        console.log("Username expired (auto-check).");
      }
    }, 60 * 1000); // Check every 1 minute (reduced from 5 minutes)

    return () => clearInterval(interval);
  }, []);

  // Optional: Add a function to get remaining time
  const getRemainingTime = (): string => {
    const storedExpiry = localStorage.getItem(USERNAME_EXPIRY_KEY);
    if (!storedExpiry) return "No expiry set";
    
    try {
      const expiryDate = new Date(storedExpiry);
      const currentDate = new Date();
      const diffMs = expiryDate.getTime() - currentDate.getTime();
      
      if (diffMs <= 0) return "Expired";
      
      const diffMins = Math.floor(diffMs / 60000);
      const diffSecs = Math.floor((diffMs % 60000) / 1000);
      
      return `${diffMins} minutes ${diffSecs} seconds`;
    } catch (error) {
      return "Invalid expiry";
    }
  };

  return (
    <UserContext.Provider value={{ 
      username, 
      setUsername, 
      ready, 
      isExpired,
      clearUsername // Export clear function
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

// Optional: Export a custom hook to get remaining time
export const useRemainingTime = () => {
  const [remainingTime, setRemainingTime] = useState<string>("");

  useEffect(() => {
    const updateRemainingTime = () => {
      const storedExpiry = localStorage.getItem(USERNAME_EXPIRY_KEY);
      if (!storedExpiry) {
        setRemainingTime("No username");
        return;
      }
      
      try {
        const expiryDate = new Date(storedExpiry);
        const currentDate = new Date();
        const diffMs = expiryDate.getTime() - currentDate.getTime();
        
        if (diffMs <= 0) {
          setRemainingTime("Expired");
          return;
        }
        
        const diffMins = Math.floor(diffMs / 60000);
        const diffSecs = Math.floor((diffMs % 60000) / 1000);
        
        setRemainingTime(`${diffMins}m ${diffSecs}s`);
      } catch (error) {
        setRemainingTime("Error");
      }
    };

    // Initial update
    updateRemainingTime();
    
    // Update every second for real-time countdown
    const interval = setInterval(updateRemainingTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return remainingTime;
};