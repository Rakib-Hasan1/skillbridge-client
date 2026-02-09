"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-14 md:grid-cols-2">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl xl:text-6xl">
              Learn Tech
              <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Connect
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-300">
              SkillBridge helps students and professionals learn modern tech
              skills by connecting them with expert teachers and real-world
              guidance.
            </p>

            {/* SEARCH CATEGORY */}
            <div className="mt-8 flex max-w-md items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-2 backdrop-blur">
              <Search className="ml-2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search by skill or category"
                className="border-none bg-transparent text-slate-200 placeholder:text-slate-500 focus-visible:ring-0"
              />
              <Button className="rounded-xl bg-indigo-500 hover:bg-indigo-600">
                Search
              </Button>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <Button
                size="lg"
                className="rounded-2xl bg-cyan-500 text-slate-950 hover:bg-cyan-400"
              >
                JOIN AS TEACHER
              </Button>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-indigo-500/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
              <Image
                src="https://i.ibb.co.com/xnCnDM8/skillbridge-banner.jpg"
                alt="Online tech learning and teaching"
                width={700}
                height={500}
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
