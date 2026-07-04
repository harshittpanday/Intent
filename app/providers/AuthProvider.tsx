"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/app/lib/firebase";

import { doc, getDoc } from "firebase/firestore";

type Profile = {
  uid: string;
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  email: string;
};

type AuthContextType = {
  firebaseUser: User | null;
  profile: Profile | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  profile: null,
  loading: true,
});

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [firebaseUser, setFirebaseUser] =
    useState<User | null>(null);

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        setFirebaseUser(user);

        if (!user) {
          setProfile(null);
          setLoading(false);
          return;
        }

        try {
          const snap = await getDoc(
            doc(db, "users", user.uid)
          );

          if (snap.exists()) {
            setProfile(snap.data() as Profile);
          } else {
            setProfile(null);
          }
        } catch (error) {
          console.error("AuthProvider Error:", error);
          setProfile(null);
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        profile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);