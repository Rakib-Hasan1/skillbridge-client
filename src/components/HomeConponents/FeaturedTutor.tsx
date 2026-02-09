"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TutorProfile {
  id: string;
  bio: string;
  hourlyRate: number;
  subjects: string[];
  rating: number;
  user: {
    name: string;
    image?: string | null;
  };
}

export default function FeaturedTutors() {
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await fetch("http://localhost:5000/profile");
        const data = await res.json();
        setTutors(data.data);
      } catch (error) {
        console.error("Failed to fetch tutors", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  console.log(tutors);

  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Featured Tutors
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-slate-400">
            Learn from experienced instructors selected from our growing
            teaching community.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="bg-slate-900 border-slate-800">
                  <CardContent className="p-6 space-y-4 animate-pulse">
                    <div className="h-12 w-12 rounded-full bg-slate-800" />
                    <div className="h-4 w-3/4 bg-slate-800 rounded" />
                    <div className="h-3 w-1/2 bg-slate-800 rounded" />
                  </CardContent>
                </Card>
              ))
            : tutors.map((tutor) => (
                <Card
                  key={tutor.id}
                  className="bg-slate-900 border-slate-800 hover:border-indigo-500/40 transition"
                >
                  <CardContent className="p-6">
                    {/* Tutor Info */}
                    <div className="flex items-center gap-3">
                      {tutor.user?.image ? (
                        <img
                          src={tutor.user.image}
                          alt={tutor.user.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">
                          {tutor.user?.name.charAt(0)}
                        </div>
                      )}

                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {tutor.user?.name}
                        </h3>
                        <p className="text-sm text-slate-400">
                          ${tutor.hourlyRate} / hour
                        </p>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="mt-4 text-sm text-slate-400 line-clamp-3">
                      {tutor.bio}
                    </p>

                    {/* Subjects */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {tutor.subjects.slice(0, 4).map((subject) => (
                        <span
                          key={subject}
                          className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-400"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="h-4 w-4 fill-yellow-400" />
                        <span className="text-sm font-medium">
                          {tutor.rating.toFixed(1)}
                        </span>
                      </div>
                      <Link
                        href={`/tutors/${tutor.id}`}
                        className="text-sm font-medium text-indigo-400 hover:underline"
                      >
                        View Profile
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link href="/tutors">
            <Button
              size="lg"
              className="rounded-2xl bg-indigo-500 hover:bg-indigo-600"
            >
              Explore Our Tutors
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
