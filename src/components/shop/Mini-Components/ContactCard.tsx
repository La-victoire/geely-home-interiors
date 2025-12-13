"use client";

import { useUsers } from "@/components/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { editProfile } from "@/lib/actions";
import { User } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ContactCard = () => {
  const { users, setUsers } = useUsers() as {
    users: User;
    setUsers: React.Dispatch<React.SetStateAction<User>>;
  };

  const [info, setInfo] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
  });

  const [authUser, setAuthUser] = useState<string | null>(null);

  useEffect(() => {
    const id = sessionStorage.getItem("userId");
    if (id) setAuthUser(id);
  }, []);

  const showButton =
    info.firstname === "" ||
    info.lastname === "" ||
    info.email === "" ||
    info.phone === "" ||
    !users?.firstname ||
    !users?.lastname ||
    !users?.email ||
    !users?.phone;

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    const parts = value.split(" ");
    if (parts.length < 2) return;

    setInfo((prev) => ({
      ...prev,
      firstname: parts.slice(0, -1).join(" "),
      lastname: parts.slice(-1)[0],
    }));
  };

  const onSubmit = async () => {
    try {
      const payload: Partial<User> = {};

      if (info.firstname && info.lastname) {
        payload.firstname = info.firstname;
        payload.lastname = info.lastname;
      }

      if (info.email) payload.email = info.email;
      if (info.phone) payload.phone = info.phone;

      if (Object.keys(payload).length === 0) {
        toast.error("Please fill in at least one field before saving.");
        return;
      }

      if (!authUser) {
        setUsers((prev) => ({ ...prev, ...payload }));
        toast.success("Profile updated successfully");
        return;
      }

      const data: User = await editProfile(
        `users/${users._id}`,
        payload
      );

      if (!data?.error) {
        setUsers((prev) => ({ ...prev, ...payload }));
        setInfo({
          firstname: data.firstname ?? "",
          lastname: data.lastname ?? "",
          email: data.email ?? "",
          phone: data.phone ?? "",
        });
        toast.success("Profile updated successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Problem saving profile");
    }
  };

  return (
    <Card className="w-full rounded-md px-7">
      <CardHeader className="headFont not-sm:text-xl text-3xl">
        Contact Information
      </CardHeader>

      <CardContent className="flex flex-col gap-5 bg-accent-foreground/10 p-5 rounded-lg">
        <p className="-mb-2 text-xs">
          Please space between your first and last name
        </p>

        <div className="flex flex-col gap-2 border-b py-1">
          <p>Name:</p>
          {users?.firstname && users?.lastname ? (
            <p>
              {users.firstname} {users.lastname}
            </p>
          ) : (
            <Input
              placeholder="John Smith"
              type="text"
              onChange={handleNameChange}
            />
          )}
        </div>

        <div className="flex flex-col gap-2 border-b py-1">
          <p>Email:</p>
          {users?.email ? (
            <p>{users.email}</p>
          ) : (
            <Input
              placeholder="johnsmith@example.com"
              name="email"
              type="text"
              onChange={handleFormChange}
            />
          )}
        </div>

        <div className="flex flex-col gap-2 py-1">
          <p>Phone:</p>
          {users?.phone ? (
            <p>{users.phone}</p>
          ) : (
            <Input
              placeholder="+234##########"
              name="phone"
              type="text"
              onChange={handleFormChange}
            />
          )}
        </div>

        {showButton && (
          <Button className="self-end mt-2" onClick={onSubmit}>
            Save Profile
          </Button>
        )}
      </CardContent>

      <CardFooter className="text-xs">
        Please ensure your contact information is accurate for order updates.
      </CardFooter>
    </Card>
  );
};

export default ContactCard;
