import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);


    // Sign Up User
    const signup = async (user) => {
        console.log(user);
    }

    // Sign In User
    const signin = async ({ email: identifier, password }) => {
        console.log({ identifier, password });
    }

    // sign out User
    const signout = async () => {
        console.log("Sign out");
    }

    // Check if User is signed in
    const checkUserSignedIn = async () => {
        console.log("Check")
    }


    return (
        <AuthContext.Provider value={{ user, error, signup, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )
};


export default AuthContext;