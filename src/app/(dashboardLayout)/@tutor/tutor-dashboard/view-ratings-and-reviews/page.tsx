"use client";

import { useEffect, useState } from "react";
import { env } from "../../../../../../env";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function RatingsAndReviews() {
  const [reviews, setReviews] = useState([]);
  console.log(reviews);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/reviews`, {
        credentials: "include",
      });

      const data = await res.json();
      setReviews(data.data);
    };

    fetchReviews();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Reviews</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {reviews.map((review: any) => (
          <div key={review.id} className="border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />

              <span className="font-medium">{review.rating}</span>

              <span className="text-muted-foreground">
                by {review.student.name}
              </span>
            </div>

            <p className="text-sm text-muted-foreground mt-2">
              {review.comment}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
