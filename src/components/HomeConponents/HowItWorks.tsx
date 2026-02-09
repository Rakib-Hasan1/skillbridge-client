"use client";

import Image from "next/image";
import image1 from "../../../public/illustrations/discover.svg";
import image2 from "../../../public/illustrations/grow.svg";
import image3 from "../../../public/illustrations/tutor.svg";

export default function HowItWorks() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <h2 className="mb-24 text-center text-4xl font-bold text-slate-900">
          How it Works
        </h2>

        <div className="space-y-32">
          {/* STEP 1 */}
          <div className="grid grid-cols-12 items-center">
            {/* Character (col 4 → 12) */}
            <div className="col-span-12 md:col-start-4 md:col-end-13 flex justify-center">
              <Image
                src={image1}
                alt="Discover classes"
                width={320}
                height={220}
              />
            </div>

            {/* Text (col 7 → 12) */}
            <div className="col-span-12 md:col-start-7 md:col-end-13">
              <h3 className="text-2xl font-semibold text-slate-900">
                Discover Classes
              </h3>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Browse classes and experts near you. Find the right skills,
                topics, and learning paths that match your goals.
              </p>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="grid grid-cols-12 items-center">
            {/* Character (col 1 → 6) */}
            <div className="col-span-12 md:col-start-1 md:col-end-7 flex justify-center">
              <Image
                src={image2}
                alt="Connect with instructors"
                width={320}
                height={220}
              />
            </div>

            {/* Text (col 4 → 10) */}
            <div className="col-span-12 md:col-start-4 md:col-end-10">
              <h3 className="text-2xl font-semibold text-slate-900">
                Connect with Instructors
              </h3>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Communicate directly with experienced instructors and mentors
                who guide you through real-world learning.
              </p>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="grid grid-cols-12 items-center">
            {/* Character (col 4 → 12) */}
            <div className="col-span-12 md:col-start-4 md:col-end-13 flex justify-center">
              <Image
                src={image3}
                alt="Learn and grow"
                width={320}
                height={220}
              />
            </div>

            {/* Text (col 7 → 12) */}
            <div className="col-span-12 md:col-start-7 md:col-end-13">
              <h3 className="text-2xl font-semibold text-slate-900">
                Learn & Grow
              </h3>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Build skills through hands-on practice, projects, and
                mentorship—grow confidently in tech.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
