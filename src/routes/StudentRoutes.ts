import { Route } from "@/types";

export const StudentRoutes:Route[] = [
  {
    title: "Welcome to Student Dashboard",
    items: [
      {
        title: "Book Session",
        url: "/student-dashboard/book-session",
      },
      {
        title: "Profile",
        url: "/student-dashboard/profile",
      },
    ],
  },
];