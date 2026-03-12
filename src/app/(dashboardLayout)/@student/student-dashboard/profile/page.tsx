"use client";

import { useEffect, useState } from "react";
import { Mail, User, IdCard } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { env } from "../../../../../../env";

interface UserType {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/user/me`, {
        credentials: "include",
      });

      const result = await res.json();

      setUser(result.data); // IMPORTANT
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="shadow-xl border rounded-2xl">
        <CardHeader className="flex flex-col items-center gap-4">
          
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.image || ""} />
            <AvatarFallback className="text-lg">
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <CardTitle className="text-2xl font-semibold">
            {user.name}
          </CardTitle>

        </CardHeader>

        <CardContent className="space-y-6 mt-4">

          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <User className="w-4 h-4 text-muted-foreground" />
            <span>User Account</span>
          </div>

          <div className="flex items-center gap-3 text-sm break-all">
            <IdCard className="w-4 h-4 text-muted-foreground" />
            <span>{user.id}</span>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}