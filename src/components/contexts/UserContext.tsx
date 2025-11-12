"use client";

import React, { useEffect, useState, createContext, useContext } from "react";
import { getProfile } from "@/lib/actions";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const UserContext = createContext<any>(null);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<any>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 1. Check for stored ID
        const storedId = sessionStorage.getItem("userId");

        // 2. Choose the best ID source
        const idToUse = storedId || session?.userId;

        if (!idToUse) return; // Nothing to fetch yet

        // 3. Fetch user profile
        const data = await getProfile(`/users/${idToUse}`);

        if (!data) throw new Error("No user data returned");
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        toast.error("Failed to fetch user data.");
      }
    };

    // Only run when we have a valid session or status is known
    if (status === "authenticated" || sessionStorage.getItem("userId")) {
      fetchUser();
    }
  }, [session, status]); // re-run when session becomes available

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

