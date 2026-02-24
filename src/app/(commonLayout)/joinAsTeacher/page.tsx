"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function TeacherProfilePage() {
  const router = useRouter();

  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [subjects, setSubjects] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // important if using cookies auth
          body: JSON.stringify({
            bio,
            hourlyRate: Number(hourlyRate),
            subjects: subjects.split(",").map((s) => s.trim()),
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error("Failed to create profile");
      }

      toast.success("Tutor profile created successfully!");

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full dark:bg-gray-900 max-w-lg shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Tutor Profile
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Bio */}
          <div>
            <label className="block mb-2 font-medium">Bio</label>
            <textarea
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write something about yourself..."
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
            />
          </div>

          {/* Hourly Rate */}
          <div>
            <label className="block mb-2 font-medium">Hourly Rate (৳)</label>
            <input
              required
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              placeholder="Enter hourly rate"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Subjects */}
          <div>
            <label className="block mb-2 font-medium">
              Subjects (comma separated)
            </label>
            <input
              required
              type="text"
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
              placeholder="Math, Physics, English"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition cursor-pointer"
          >
            {loading ? "Creating..." : "Create Tutor Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
