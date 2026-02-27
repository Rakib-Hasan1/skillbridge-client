"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { env } from "../../../../../../env";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
}

export default function CategoryPage() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/category`, {
        credentials: "include",
      });

      const data = await res.json();
      setCategories(data.data || []);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/category`, {
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          setCategories(data.data || []);
        }
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };

    loadCategories();
  }, []);

  // ✅ Create Category
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);

    const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      setLoading(false);
      return;
    }

    toast.success("Category created!");
    setName("");
    fetchCategories();
    setLoading(false);
  };

  // ✅ Delete Category
  const handleDelete = async (id: string) => {
    const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/category/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    toast.success("Category deleted");
    fetchCategories();
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      {/* Create Section */}
      <Card>
        <CardHeader>
          <CardTitle>Create Category</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Input
              placeholder="Enter category name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Button disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* List Section */}
      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {categories.length === 0 && (
            <p className="text-muted-foreground text-sm">
              No categories found.
            </p>
          )}

          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-muted/40"
            >
              <span className="font-medium">{category.name}</span>

              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(category.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
