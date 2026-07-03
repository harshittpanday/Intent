"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/app/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

export default function SignupPage() {
  const router = useRouter();

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState("");

  // Live username check
  useEffect(() => {
    if (username.length < 3) {
      setUsernameStatus("");
      return;
    }

    const timer = setTimeout(async () => {
      setCheckingUsername(true);

      try {
        const q = query(
          collection(db, "users"),
          where("username", "==", username.toLowerCase())
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setUsernameStatus("available");
        } else {
          setUsernameStatus("taken");
        }
      } catch (error) {
        console.error(error);
      }

      setCheckingUsername(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [username]);

  const handleSignup = async () => {

  const handleSignup = async () => {
  if (!displayName || !username || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  // 👇 Add this here
  const reservedUsernames = [
    "admin",
    "login",
    "signup",
    "settings",
    "api",
    "search",
    "about",
    "privacy",
    "terms",
  ];

  if (reservedUsernames.includes(username.toLowerCase())) {
    alert("This username is reserved.");
    return;
  }

  // Existing username check
  if (usernameStatus === "taken") {
    alert("Username is already taken.");
    return;
  }

  // Continue with Firestore query and account creation...
};

    if (
      !displayName ||
      !username ||
      !email ||
      !password
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (usernameStatus === "taken") {
      alert("Username is already taken.");
      return;
    }

    try {
      // Double-check username before creating account
      const usernameQuery = query(
        collection(db, "users"),
        where("username", "==", username.toLowerCase())
      );

      const usernameSnapshot = await getDocs(usernameQuery);

      if (!usernameSnapshot.empty) {
        alert("Username is already taken.");
        return;
      }

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      displayName,
      username: username.toLowerCase(),
      email,
      bio: "",
      avatar: "",
      createdAt: serverTimestamp(),
     });

console.log("✅ Signup complete");

router.replace(`/@${username.toLowerCase()}`);
// or use router.replace("/") if you haven't built profiles yet

return;



      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-2">
          Create your account
        </h1>

        <p className="text-slate-400 mb-8">
          Join INTENT and start exploring topics.
        </p>

        <input
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 text-white mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase())}
          className="w-full p-3 rounded-lg bg-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="mt-2 mb-4 h-5">
          {checkingUsername && (
            <p className="text-yellow-400 text-sm">
              Checking username...
            </p>
          )}

          {!checkingUsername &&
            usernameStatus === "available" && (
              <p className="text-green-400 text-sm">
                ✅ Username available
              </p>
            )}

          {!checkingUsername &&
            usernameStatus === "taken" && (
              <p className="text-red-400 text-sm">
                ❌ Username already taken
              </p>
            )}
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 text-white mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 text-white mb-6 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold text-white"
        >
          Sign Up
        </button>
      </div>
    </main>
  );
}
