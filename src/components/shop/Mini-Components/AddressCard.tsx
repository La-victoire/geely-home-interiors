"use client"
import { useUsers } from '@/components/contexts/UserContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { editProfile } from '@/lib/actions'
import { User } from '@/lib/types'
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'

const AddressCard = () => {

  const { users, setUsers } = useUsers() as {
    users: User,
    setUsers: React.Dispatch<React.SetStateAction<User>>
  };

  const [isEditing, setIsEditing] = useState(false);
  const {status} = useSession();
  const authUser = sessionStorage.getItem("userId");

  // ------------------------------------------
  // Guarantee at least one address object exists
  // ------------------------------------------
  useEffect(() => {
    if (!users?.addresses || users?.addresses.length === 0) {
      setUsers({
        ...users,
        addresses: [{
          id: "",
          street: "",
          state: "",
          city: "",
          postalCode: "",
          country: ""
        }]
      });
    }
  }, [users, setUsers]);

  const handleAddress = (index: number, key: string, value: string) => {
    setIsEditing(true);

    const updated = [...users?.addresses];
    updated[index] = { ...updated[index], [key]: value };

    setUsers({ ...users, addresses: updated });
  };

  const handleProfile = async () => {
    try {
      if (status !== "authenticated" || !authUser) {
          console.log(users.addresses[0])
          toast.success("User Address Updated Successfully")
          return;
      }
      const data: User = await editProfile(`users/${users._id}`, {
        addresses: users.addresses
      });

      if (!data.error) toast.success("Address Updated Successfully");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Problem saving Address!");
      setIsEditing(true);
    }
  };

  const addr = users?.addresses?.[0] ?? {};

  return (
    <Card className="w-full rounded-md px-7">
      <CardHeader className="headFont not-sm:text-xl text-3xl flex">
        Shipping Address
      </CardHeader>

      <CardContent className="flex flex-col gap-5 p-5">
        <div className="grid gap-3">
          <Label htmlFor="street">Street*</Label>
          <Input
            id="street"
            name="street"
            value={addr.street}
            onChange={(e) => handleAddress(0, "street", e.target.value)}
            placeholder="123 Oak street"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="grid gap-3">
            <Label htmlFor="state">State*</Label>
            <Input
              id="state"
              name="state"
              value={addr.state}
              onChange={(e) => handleAddress(0, "state", e.target.value)}
              placeholder="Lagos"
              required
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="city">City*</Label>
            <Input
              id="city"
              name="city"
              value={addr.city}
              onChange={(e) => handleAddress(0, "city", e.target.value)}
              placeholder="Ikeja"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="grid gap-3">
            <Label htmlFor="postalCode">Postal Code*</Label>
            <Input
              id="postalCode"
              name="postalCode"
              value={addr.postalCode}
              onChange={(e) => handleAddress(0, "postalCode", e.target.value)}
              placeholder="10001"
              required
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="country">Country*</Label>
            <Input
              id="country"
              name="country"
              value={addr.country}
              onChange={(e) => handleAddress(0, "country", e.target.value)}
              placeholder="Nigeria"
              required
            />
          </div>
        </div>
          <p className='text-xs'>Please ensure your address information is accurate in order to avoid mixups and Loss of property</p>
      </CardContent>

      {isEditing && (
        <CardFooter className="flex justify-end p-5">
          <Button onClick={handleProfile}>Save Address</Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AddressCard;

