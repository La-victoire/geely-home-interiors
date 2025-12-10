"use client";

import React, { useEffect, useState, createContext, useContext } from "react";
import { getProfile } from "@/lib/actions";
import { toast } from "sonner";

const UserContext = createContext<any>(null);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<any>(null);
  const [id, setId] = useState<string>("");

  // Load ID from sessionStorage client-side
  useEffect(() => {
    const storedId = sessionStorage.getItem("userId");
    if (storedId) setId(storedId);
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        // 1. Attempt session-based auth first
        const me = await getProfile("/users/me");
        if (me?.user) {
          setUsers(me.user);
          return;
        }
      } catch (_) {
        // ignore, continue to fallback
      }

      try {
        // 2. Fallback: userId stored in sessionStorage
        if (!id) return;
        const user = await getProfile(`/users/${id}`);
        if (user) {
          setUsers(user);
          return;
        }
      } catch (error) {
        toast.info("No User");
        console.error("Failed to fetch user data:", error);
      }
    }
    fetchUser();
  }, [id]);
  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used inside UsersProvider");
  }
  return context;
}
