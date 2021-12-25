import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "../config/index";

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
        const res = await fetch(`${NEXT_URL}/api/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                identifier,
                password
            })
        })

        const data = await res.json();

        console.log(data);

        if (res.ok) {
            setUser(data.user);
        } else {
            setError(data.message);
            setError(null);
        }
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