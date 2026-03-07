"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tutor } from "@/types";

export default function TutorGrid({ tutors }: { tutors: Tutor[] }) {
  if (!tutors.length) {
    return (
      <p className="text-center text-muted-foreground py-20">No tutors found</p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
      {tutors.map((tutor) => (
        <Card key={tutor.id} className="hover:shadow-lg transition">
          <CardContent className="p-6 text-center">
            {tutor.user.image ? (
              <Image
                src={tutor.user.image}
                alt={tutor.user.name}
                width={80}
                height={80}
                className="rounded-full mx-auto"
              />
            ) : (
              <div className="h-20 w-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold">
                {tutor.user.name.charAt(0)}
              </div>
            )}

            <h3 className="mt-4 font-semibold text-lg">{tutor.user.name}</h3>

            <div className="flex justify-center items-center gap-1 mt-1 text-yellow-500">
              <Star className="h-4 w-4 fill-yellow-500" />
              {tutor.rating || 0}
            </div>

            <p className="text-muted-foreground mt-2">
              ৳ {tutor.hourlyRate} / hour
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
