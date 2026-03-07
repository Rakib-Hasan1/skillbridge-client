"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Tutor } from "@/types";
import { env } from "../../../env";

export default function TutorSearch({
  setTutors,
}: {
  setTutors: (tutors: Tutor[]) => void;
}) {
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState([0, 100]);

  const handleSearch = async () => {
    const params = new URLSearchParams({
      category,
      rating,
      minPrice: price[0].toString(),
      maxPrice: price[1].toString(),
    });

    const res = await fetch(
      `${env.NEXT_PUBLIC_BASE_URL}/search?${params}`,
    );

    const data = await res.json();
    setTutors(data.data);
  };

  return (
    <section className="bg-gradient-to-b from-primary/10 to-background py-24">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find the Perfect Tutor
        </h1>

        <p className="text-muted-foreground mb-12">
          Browse tutors by subject, rating, and price.
        </p>

        <div className="bg-background shadow-lg rounded-xl border-2 p-6 grid md:grid-cols-4 gap-6">
          {/* Category */}
          <Select onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Math">Math</SelectItem>
              <SelectItem value="Physics">Physics</SelectItem>
              <SelectItem value="Chemistry">Chemistry</SelectItem>
              <SelectItem value="English">English</SelectItem>
            </SelectContent>
          </Select>

          {/* Rating */}
          <Select onValueChange={setRating}>
            <SelectTrigger>
              <SelectValue placeholder="Minimum Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">⭐⭐⭐⭐⭐</SelectItem>
              <SelectItem value="4">⭐⭐⭐⭐+</SelectItem>
              <SelectItem value="3">⭐⭐⭐+</SelectItem>
              <SelectItem value="2">⭐⭐+</SelectItem>
            </SelectContent>
          </Select>

          {/* Price Slider */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Price ৳{price[0]} - ৳{price[1]}
            </p>

            <Slider
              min={0}
              max={200}
              step={5}
              value={price}
              onValueChange={setPrice}
            />
          </div>

          {/* Search Button */}
          <Button onClick={handleSearch} className="w-full">
            <Search className="mr-2 h-4 w-4" />
            Search Tutors
          </Button>
        </div>
      </div>
    </section>
  );
}
