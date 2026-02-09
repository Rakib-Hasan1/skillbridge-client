"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from "lucide-react";

interface TutorProfile {
  id: string;
  bio: string;
  hourlyRate: number;
  subjects: string[];
  rating: number;
  user: {
    name: string;
    email?: string;
    image?: string | null;
  };
}

export default function TutorDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchTutor = async () => {
      try {
        const res = await fetch(`http://localhost:5000/profile/${id}`);
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

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-950 text-slate-400">
        Loading tutor profile...
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-950 text-slate-400">
        Tutor not found
      </div>
    );
  }

  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {/* LEFT: PROFILE CARD */}
          <Card className="md:col-span-1 bg-slate-900 border-slate-800 sticky top-24 h-fit">
            <CardHeader className="flex flex-col items-center text-center gap-4">
              {tutor.user?.image ? (
                <Image
                  src={tutor.user?.image}
                  alt={tutor.user?.name}
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-indigo-500/10 text-3xl font-semibold text-indigo-400">
                  {tutor.user?.name.charAt(0)}
                </div>
              )}

              <div>
                <h1 className="text-xl font-semibold text-white">
                  {tutor.user?.name}
                </h1>
                <div className="mt-1 flex items-center justify-center gap-1 text-yellow-400">
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <span className="text-sm font-medium">
                    {tutor.rating.toFixed(1)} Rating
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Hourly Rate
                </span>
                <span className="font-semibold text-white">
                  ${tutor.hourlyRate}
                </span>
              </div>

              <Button className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-600">
                Book a Session
              </Button>
            </CardContent>
          </Card>

          {/* RIGHT: DETAILS */}
          <div className="md:col-span-2 space-y-10">
            {/* ABOUT */}
            <div>
              <h2 className="mb-3 text-2xl font-semibold text-white">
                About the Tutor
              </h2>
              <p className="text-slate-400 leading-relaxed">{tutor.bio}</p>
            </div>

            {/* SUBJECTS */}
            <div>
              <h2 className="mb-3 text-2xl font-semibold text-white">
                Subjects
              </h2>
              <div className="flex flex-wrap gap-3">
                {tutor.subjects.map((subject) => (
                  <Badge
                    key={subject}
                    variant="secondary"
                    className="rounded-full bg-indigo-500/10 text-indigo-400"
                  >
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>

            {/* AVAILABILITY PLACEHOLDER */}
            <div>
              <h2 className="mb-3 text-2xl font-semibold text-white">
                Availability
              </h2>
              <p className="text-slate-400">
                This tutor’s available time slots will appear here.
              </p>
            </div>

            {/* REVIEWS PLACEHOLDER */}
            <div>
              <h2 className="mb-3 text-2xl font-semibold text-white">
                Reviews
              </h2>
              <p className="text-slate-400">
                Student reviews will be displayed here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
