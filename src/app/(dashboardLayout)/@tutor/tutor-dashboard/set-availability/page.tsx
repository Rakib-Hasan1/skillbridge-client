"use client";

import { useEffect, useState } from "react";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { env } from "../../../../../../env";

interface Slot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

export default function AvailabilityPage() {
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [fetching, setFetching] = useState(false);

  // 🔥 Fetch Created Slots
  const fetchSlots = async () => {
    try {
      setFetching(true);
      const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/availability/my`, {
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        setSlots(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/availability`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ day, startTime, endTime }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setDay("");
      setStartTime("");
      setEndTime("");

      fetchSlots(); // 🔥 refresh slot list
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
      {/* 🔥 Create Slot Card */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Add Availability Slot</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Day Select */}
            <div className="space-y-2">
              <Label>Day</Label>
              <Select onValueChange={setDay} value={day}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a day" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Time Row */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>End Time</Label>
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Creating Slot..." : "Create Slot"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* 🔥 Slot List Section */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Your Availability Slots</CardTitle>
        </CardHeader>

        <CardContent>
          {fetching ? (
            <p className="text-muted-foreground">Loading slots...</p>
          ) : slots.length === 0 ? (
            <p className="text-muted-foreground">No slots added yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{slot.day}</p>
                    <p className="text-sm text-muted-foreground">
                      {slot.startTime} - {slot.endTime}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
