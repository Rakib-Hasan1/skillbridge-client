"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-background" />

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -z-10 h-112.5 w-112.5 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px] dark:bg-blue-500/10" />

      <div className="container mx-auto px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* LEFT */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Learn Smarter with{" "}
              <span className="bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                SkillBridge
              </span>
            </h1>

            <p className="max-w-xl text-lg text-muted-foreground">
              Connect with expert tutors, master new skills, and accelerate your
              learning journey. SkillBridge helps students find the right
              mentors to grow faster.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/tutors">
                <Button size="lg">Find a Tutor</Button>
              </Link>

              <Link href="/joinAsTeacher">
                <Button size="lg" variant="outline">
                  Become a Tutor
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground">
              Trusted by thousands of students worldwide.
            </p>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border bg-card shadow-xl">
              <Image
                src="https://i.ibb.co.com/xnCnDM8/skillbridge-banner.jpg"
                alt="Students learning"
                width={700}
                height={500}
                className="object-contain w-full h-full"
              />
            </div>

            {/* Floating rating card */}
            <div className="absolute -bottom-6 -left-6 rounded-xl border bg-card p-4 shadow-lg backdrop-blur">
              <p className="text-sm font-semibold">⭐ 4.9 Tutor Rating</p>
              <p className="text-xs text-muted-foreground">
                From 10k+ students
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
