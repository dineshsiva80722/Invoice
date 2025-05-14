"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  bio: string;
  profileImage?: string | null;
};

type UserContextType = {
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
};

const defaultUser: UserProfile = {
  firstName: 'Bharani',
  lastName: 'Siva',
  email: 'dineshsiva693@example.com',
  phone: '+1234567890',
  company: 'Acme Inc',
  position: 'Software Engineer',
  bio: 'Passionate about building great user experiences.',
  profileImage: 'https://res.cloudinary.com/do7dw5dwq/image/upload/v1746777603/bharani_hrisvu.png'
};

const UserContext = createContext<UserContextType>({
  user: defaultUser,
  updateUser: () => {}
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile>(defaultUser);

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);