"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { env } from "../../../env";
import { TutorProfile } from "@/types";

export default function FeaturedTutors() {
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/profile`);
        const data = await res.json();
        setTutors(data.data.slice(0, 3)); // only 3 featured
      } catch (error) {
        console.error("Failed to fetch tutors", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  return (
    <section className="py-24 bg-gray-100 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14 text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Featured Tutors
          </h2>
          <p className="max-w-xl mx-auto text-muted-foreground">
            Learn from experienced instructors selected from our growing
            teaching community.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6 space-y-4 animate-pulse">
                    <div className="h-12 w-12 rounded-full bg-muted" />
                    <div className="h-4 w-3/4 bg-muted rounded" />
                    <div className="h-3 w-1/2 bg-muted rounded" />
                    <div className="h-3 w-full bg-muted rounded" />
                  </CardContent>
                </Card>
              ))
            : tutors.map((tutor) => (
                <Card
                  key={tutor.id}
                  className="group border hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    {/* Top Section */}
                    <div className="flex items-center gap-4">
                      {tutor.user?.image ? (
                        <Image
                          width={80}
                          height={80}
                          src={tutor.user.image}
                          alt={tutor.user.name}
                          className="h-14 w-14 rounded-full object-cover border"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary text-lg font-semibold">
                          {tutor.user?.name.charAt(0)}
                        </div>
                      )}

                      <div>
                        <h3 className="text-lg font-semibold">
                          {tutor.user?.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          ৳ {tutor.hourlyRate} / hour
                        </p>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
                      {tutor.bio}
                    </p>

                    {/* Subjects */}
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                      {tutor.categories?.map((category) => (
                        <Badge
                          key={category.id}
                          variant="secondary"
                          className="rounded-full px-3 py-1 text-xs"
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-yellow-500" />
                        <span className="text-sm font-medium">
                          {tutor.rating?.toFixed(1) || "0.0"}
                        </span>
                      </div>

                      <Link
                        href={`/tutors/${tutor.id}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        View Profile →
                      </Link>
                    </div>
                  </CardContent>

                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none rounded-lg" />
                </Card>
              ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link href="/tutors">
            <Button size="lg" className="rounded-2xl">
              Explore All Tutors
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
