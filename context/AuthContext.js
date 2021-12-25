import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "../config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const router = useRouter();

    useEffect(() => checkUserSignedIn(), []);


    // Sign Up User
    const register = async (user) => {
        const res = await fetch(`${NEXT_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })

        const data = await res.json()

        if (res.ok) {
            setUser(data.user)
            router.push('/account/dashboard')
        } else {
            setError(data.message)
            setError(null)
        }
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
            router.push("/account/dashboard");
        } else {
            setError(data.message);
            setError(null);
        }
    }

    // sign out User
    const signout = async () => {
        const res = await fetch(`${NEXT_URL}/api/signout`, {
            method: "POST"
        });

        if (res.ok) {
            setUser(null);
            router.push("/");
        }
    }

    // Check if User is signed in
    const checkUserSignedIn = async () => {
        const res = await fetch(`${NEXT_URL}/api/user`);
        const data = await res.json();

        if (res.ok) {
            setUser(data.user);
        } else {
            setUser(null);
        }
    }


    return (
        <AuthContext.Provider value={{ user, error, register, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )
};


export default AuthContext;