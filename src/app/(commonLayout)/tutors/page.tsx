import Image from "next/image";
import Link from "next/link";
import { env } from "../../../../env";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TutorProfile } from "@/types";

export default async function TutorsPage() {
  const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/profile`, {
    cache: "no-store",
  });

  const result = await res.json();
  const tutors = result.data;
  console.log(tutors);

  return (
    <section className="container mx-auto px-6 py-14">
      {/* Header */}
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Discover Expert Tutors
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find the perfect tutor to help you succeed. Learn from experienced
          professionals across different subjects.
        </p>
      </div>

      {/* Empty State */}
      {tutors?.length === 0 && (
        <p className="text-center text-muted-foreground">
          No tutors available at the moment.
        </p>
      )}

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tutors?.map((tutor: TutorProfile) => (
          <Card
            key={tutor.id}
            className="group relative overflow-hidden border hover:shadow-xl transition duration-300"
          >
            <CardContent className="pt-8 flex flex-col items-center text-center space-y-4">
              {/* Avatar */}
              <Image
                src={tutor.user.image || "/default-avatar.png"}
                alt={tutor.user.name}
                width={100}
                height={100}
                className="rounded-full object-cover border shadow-sm"
              />

              {/* Info */}
              <div>
                <h3 className="text-lg font-semibold">{tutor.user.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {tutor.user.email}
                </p>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap justify-center gap-2">
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

              {/* Bio */}
              <p className="text-sm text-muted-foreground line-clamp-3 px-4">
                {tutor.bio}
              </p>

              {/* Rate */}
              <div className="text-lg font-semibold">
                ৳ {tutor.hourlyRate}
                <span className="text-sm font-normal text-muted-foreground">
                  {" "}
                  / hour
                </span>
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-0">
              <Link href={`/tutors/${tutor.id}`} className="w-full">
                <Button className="w-full cursor-pointer">View Profile</Button>
              </Link>
            </CardFooter>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none" />
          </Card>
        ))}
      </div>
    </section>
  );
}
