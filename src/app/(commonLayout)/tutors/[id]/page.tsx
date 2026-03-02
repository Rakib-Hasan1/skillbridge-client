"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Mail } from "lucide-react";
import { env } from "../../../../../env";
import { TutorProfile } from "@/types";

export default function TutorDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [loading, setLoading] = useState(true);

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

              <Button className="w-full rounded-xl mt-4">Book a Session</Button>
            </CardContent>
          </Card>

          {/* MAIN CONTENT */}
          <div className="md:col-span-2 space-y-12">
            {/* ABOUT */}
            <div>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                About the Tutor
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {tutor.bio}
              </p>
            </div>

            {/* Category */}
            <div className="flex flex-wrap gap-3">
              <h2 className="text-2xl font-semibold tracking-tight">
                Category{" "}
              </h2>
              {tutor.categories?.length ? (
                tutor.categories.map((category) => (
                  <Badge
                    key={category.id}
                    className="bg-primary/10 text-primary hover:bg-primary/20 transition rounded-full px-4"
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

            {/* AVAILABILITY */}
            <div>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Availability
              </h2>

              <Card className="border-dashed">
                <CardContent className="p-6 text-muted-foreground">
                  Available slots will be displayed here.
                </CardContent>
              </Card>
            </div>

            {/* REVIEWS */}
            <div>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">
                Reviews
              </h2>

              <Card className="border-dashed">
                <CardContent className="p-6 text-muted-foreground">
                  Student reviews will appear here.
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
