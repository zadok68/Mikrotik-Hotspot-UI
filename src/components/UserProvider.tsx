"use client";

import { createContext, useContext, useState, useEffect, ComponentProps } from 'react';
import { useRouter } from 'next/navigation'

interface UserCtx {
    user: User
    setUser: (user: User) => void
}

const UserContext = createContext<UserCtx>({} as any);

export default function UserProvider(props: any) {
    const router = useRouter()
    const [user, setUser] = useState<User>({
        username: 'johndoe',
        phoneNumber: '+254 724 870 978',
        macAddress: '00:1A:2B:3C:4D:5E',
        accountBalance: 5000 // assuming balance in some currency units
    })

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            router.replace("/login")
        }
    }, [user, router]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);