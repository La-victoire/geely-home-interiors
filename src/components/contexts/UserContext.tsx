"use client";

import React, { useEffect, useState, createContext, useContext } from "react";
import { getProfile } from "@/lib/actions";
import { toast } from "sonner";

const UserContext = createContext<any>(null);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<any>(null);
  const [id, setId] = useState(()=> {
    const storedId = sessionStorage.getItem("userId");
    return storedId ? storedId : ""
  })
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 1. Check for stored ID
        if (id === "") return; // Nothing to fetch yet

        // 2. Fetch user profile
        const data = await getProfile(`/users/${id}`);

        if (!data) console.log("No user data returned");
        setUsers(data);
      } catch (error:any) {
        toast.error("Failed to fetch user data.");
        throw new Error("Failed to fetch user data:", error);
      }
    };

    // Only run when we have a valid session or status is known
    if (sessionStorage.getItem("userId")) {
      fetchUser();
    }
  }, [id]); // re-run when session becomes available

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

