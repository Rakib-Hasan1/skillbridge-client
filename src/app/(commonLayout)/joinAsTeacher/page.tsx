"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { env } from "../../../../env";


interface Category {
  id: string;
  name: string;
}

export default function JoinAsTeacherPage() {
  const router = useRouter();

  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch categories
  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/category`, {
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) setCategories(data.data || []);
    };

    load();
  }, []);

  // Select categories
  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Submit profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bio || !hourlyRate || selectedCategories.length === 0) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        bio,
        hourlyRate: Number(hourlyRate),
        categoryIds: selectedCategories,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      setLoading(false);
      return;
    }

    toast.success("Profile created successfully!");
    router.push("/tutor-dashboard"); // 🔥 Redirect after upgrade
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Join as a Teacher</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Textarea
              placeholder="Write about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

            <Input
              type="number"
              placeholder="Hourly Rate (৳)"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
            />

            <div>
              <p className="font-semibold mb-3">
                Select Your Teaching Categories
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={`p-3 rounded-lg border cursor-pointer text-center transition
                      ${
                        selectedCategories.includes(category.id)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/60"
                      }
                    `}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full" disabled={loading}>
              {loading ? "Creating Profile..." : "Create Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
