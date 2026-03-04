"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Clock } from "lucide-react";
import { env } from "../../../../../../env";

export default function BookedSessionsClient({ bookings }: any) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleReviewSubmit = async () => {
    await fetch(`${env.NEXT_PUBLIC_BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        bookingId: selectedBooking,
        rating,
        comment,
      }),
    });

    setOpen(false);
    setComment("");
    router.refresh();
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">My Booked Sessions</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking: any) => (
          <Card key={booking.id} className="hover:shadow-xl transition">
            <CardHeader>
              <CardTitle>
                {booking.tutorProfile?.user?.name || "Tutor"}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {booking.tutorProfile?.bio}
              </p>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                {booking.slot?.day}
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                {booking.slot?.startTime} - {booking.slot?.endTime}
              </div>

              {booking.tutorProfile?.hourlyRate && (
                <div className="font-semibold">
                  ৳ {booking.tutorProfile.hourlyRate}/hour
                </div>
              )}

              <Badge variant="secondary">{booking.status}</Badge>

              {/* Review Button */}
              {!booking.review ? (
                <Button
                  onClick={() => {
                    setSelectedBooking(booking.id);
                    setOpen(true);
                  }}
                  className="w-full"
                >
                  Leave Review
                </Button>
              ) : (
                <Badge>Reviewed</Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Review Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave Review</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border p-2 w-full rounded"
            />

            <textarea
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border p-2 w-full rounded"
            />

            <Button onClick={handleReviewSubmit} className="w-full">
              Submit Review
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
