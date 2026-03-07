"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { env } from "../../../../../../env";

interface Booking {
  id: string;
  status: string;
  createdAt: string;
  student: { id: string; name: string; email: string };
  tutorProfile: {
    id: string;
    bio: string;
    hourlyRate: number;
    user: { name: string; email: string };
  };
  slot: { day: string; startTime: string; endTime: string };
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/admin/bookings`, {
        credentials: "include",
      });
      const data = await res.json();
      setBookings(data.data);
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">All Bookings</h1>

      <div className="border rounded-xl overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Tutor</TableHead>
              <TableHead>Slot</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Booked At</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.student.name}</TableCell>
                <TableCell>{booking.tutorProfile.user.name}</TableCell>
                <TableCell>
                  {booking.slot.day} {booking.slot.startTime} -{" "}
                  {booking.slot.endTime}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{booking.status}</Badge>
                </TableCell>
                <TableCell>
                  {new Date(booking.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
