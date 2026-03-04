"use client";

import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star, Clock, Mail, Loader2 } from "lucide-react";
import { env } from "../../../../../env";
import { TutorProfile } from "@/types";
import { toast } from "sonner";

interface Slot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

export default function TutorDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  const params = useParams();
  const tutorId = params.id as string;

  // 🔥 Fetch Tutor Profile
  useEffect(() => {
    if (!id) return;

    const fetchTutor = async () => {
      try {
        const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/profile/${id}`);
        const data = await res.json();
        setTutor(data.data);
      } catch (error) {
        console.error("Failed to fetch tutor", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutor();
  }, [id]);

  // 🔥 Fetch Slots
  const fetchSlots = async () => {
    try {
      const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/availability/${id}`);
      const data = await res.json();
      setSlots(data.data ?? data);
    } catch (error) {
      console.error("Failed to fetch slots", error);
    }
  };

  // 🔥 Handle Booking
  const handleBooking = async () => {
    if (!selectedSlot) return;

    setBookingLoading(true);

    try {
      const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ slotId: selectedSlot, tutorId }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Booking Successful 🎉");

      setSelectedSlot(null);
      fetchSlots(); // refresh availability
    } catch (error) {
      console.error(error);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
        Loading tutor profile...
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
        Tutor not found
      </div>
    );
  }

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {/* SIDEBAR */}
          <Card className="md:col-span-1 sticky top-24 h-fit border shadow-sm">
            <CardHeader className="flex flex-col items-center text-center gap-4">
              {tutor.user?.image ? (
                <Image
                  src={tutor.user.image}
                  alt={tutor.user.name}
                  width={120}
                  height={120}
                  className="rounded-full object-cover border"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 text-3xl font-semibold text-primary">
                  {tutor.user?.name.charAt(0)}
                </div>
              )}

              <div>
                <h1 className="text-xl font-semibold">{tutor.user.name}</h1>
                <div className="mt-1 flex items-center justify-center gap-1 text-yellow-500">
                  <Star className="h-4 w-4 fill-yellow-500" />
                  <span className="text-sm font-medium">
                    {tutor.rating?.toFixed(1) || "0.0"} Rating
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Hourly Rate
                </span>
                <span className="font-semibold text-foreground">
                  ৳ {tutor.hourlyRate}
                </span>
              </div>

              {tutor.user.email && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {tutor.user.email}
                </div>
              )}

              {/* 🔥 BOOK MODAL */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="w-full rounded-xl mt-4"
                    onClick={fetchSlots}
                  >
                    Book a Session
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Select Available Slot</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-3 mt-4">
                    {slots.length === 0 ? (
                      <p className="text-muted-foreground">
                        No available slots
                      </p>
                    ) : (
                      slots.map((slot) => (
                        <div
                          key={slot.id}
                          onClick={() => setSelectedSlot(slot.id)}
                          className={`cursor-pointer rounded-lg border p-3 transition ${
                            selectedSlot === slot.id
                              ? "border-primary bg-muted"
                              : "hover:border-primary/50"
                          }`}
                        >
                          <p className="font-medium">{slot.day}</p>
                          <p className="text-sm text-muted-foreground">
                            {slot.startTime} - {slot.endTime}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  <Button
                    className="w-full mt-4"
                    disabled={!selectedSlot || bookingLoading}
                    onClick={handleBooking}
                  >
                    {bookingLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Confirm Booking
                  </Button>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* MAIN CONTENT unchanged */}
          <div className="md:col-span-2 space-y-12">
            <div>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                About the Tutor
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {tutor.bio}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <h2 className="text-2xl font-semibold tracking-tight">
                Category
              </h2>
              {tutor.categories?.length ? (
                tutor.categories.map((category) => (
                  <Badge
                    key={category.id}
                    className="bg-primary/10 text-primary rounded-full px-4"
                  >
                    {category.name}
                  </Badge>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">
                  No categories available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
