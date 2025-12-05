"use client";

import React, { useEffect, useState, createContext, useContext } from "react";
import { getProfile } from "@/lib/actions";
import { toast } from "sonner";

const UserContext = createContext<any>(null);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<any>(null);
  const [id, setId] = useState<string>("");   // never read window here

  // Load ID from sessionStorage on the client ONLY
  useEffect(() => {
    const storedId = sessionStorage.getItem("userId");
    if (storedId) setId(storedId);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!id) return; // still no id, skip

        const data = await getProfile(`/users/${id}`);

        if (!data) {
          console.log("No user data returned");
          return;
        }

        setUsers(data);
      } catch (error: any) {
        toast.error("Failed to fetch user data.");
        console.error("Failed to fetch user data:", error);
      }
    };

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

