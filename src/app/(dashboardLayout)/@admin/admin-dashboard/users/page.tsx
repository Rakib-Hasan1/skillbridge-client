"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { env } from "../../../../../../env";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STUDENT" | "TUTOR";
  image?: string;
  createdAt: string;
  isBanned?: boolean;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/admin/users`, {
        credentials: "include",
      });

      const data = await res.json();

      setUsers(data.data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">All Users</h1>

      <div className="border rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="flex items-center gap-3">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                      {user.name?.charAt(0)}
                    </div>
                  )}

                  {user.name}
                </TableCell>

                <TableCell>{user.email}</TableCell>

                <TableCell>{user.role}</TableCell>

                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  <Button
                    size="sm"
                    variant={user.isBanned ? "destructive" : "outline"}
                    onClick={async () => {
                      try {
                        const res = await fetch(
                          `${env.NEXT_PUBLIC_BASE_URL}/admin/users/${user.id}/ban`,
                          {
                            method: "PATCH",
                            credentials: "include",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ ban: !user.isBanned }),
                          },
                        );
                        const data = await res.json();

                        if (!res.ok) throw new Error(data.message);

                        toast.success(data.message);
                        // Update state
                        setUsers((prev) =>
                          prev.map((u) =>
                            u.id === user.id
                              ? { ...u, isBanned: !u.isBanned }
                              : u,
                          ),
                        );
                      } catch (err: any) {
                        toast.error(err.message);
                      }
                    }}
                  >
                    {user.isBanned ? "Unban" : "Ban"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
