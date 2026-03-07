"use client";

import { useEffect, useState } from "react";
import { env } from "../../../../../../env";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ViewSession() {
  const [sessions, setSessions] = useState([]);
  console.log(sessions);

  useEffect(() => {
    const fetchSessions = async () => {
      const res = await fetch(
        `${env.NEXT_PUBLIC_BASE_URL}/availability/sessions`,
        {
          credentials: "include",
        },
      );

      const data = await res.json();
      setSessions(data.data);
    };

    fetchSessions();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Teaching Sessions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {sessions.map((session: any) => (
          <div
            key={session.id}
            className="flex justify-between border rounded-lg p-4"
          >
            <div>
              <p className="font-medium">{session.student.name}</p>

              <p className="text-sm text-muted-foreground">
                {session.slot.day} • {session.slot.startTime}
              </p>
            </div>

            <Badge>{session.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
