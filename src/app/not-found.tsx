"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, GraduationCap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6">
      <div className="max-w-3xl w-full text-center">
        {/* Logo / Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 text-indigo-400 mb-6"
        >
          <GraduationCap className="w-8 h-8" />
          <span className="text-xl font-semibold tracking-wide">
            SkillBridge
          </span>
        </motion.div>

        {/* 404 */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-8xl md:text-9xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400"
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-slate-300 text-lg md:text-xl"
        >
          Oops! Looks like this page isn’t part of your learning path.
        </motion.p>
        <p className="mt-2 text-slate-400">
          The skill you’re looking for might have moved or no longer exists.
        </p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-indigo-500 px-6 py-3 text-white font-medium shadow-lg shadow-indigo-500/30 hover:bg-indigo-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <Link
            href="/tutors"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 px-6 py-3 text-slate-200 hover:bg-slate-800 transition"
          >
            Explore Tutors
          </Link>
        </motion.div>

        {/* Footer hint */}
        <p className="mt-12 text-sm text-slate-500">
          Build skills. Bridge your future.
        </p>
      </div>
    </div>
  );
}
