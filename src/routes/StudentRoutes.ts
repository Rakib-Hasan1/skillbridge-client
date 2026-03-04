import { Route } from "@/types";

export const StudentRoutes:Route[] = [
  {
    title: "Welcome to Student Dashboard",
    items: [
      {
        title: "Booked Sessions",
        url: "/student-dashboard/booked-sessions",
      },
      {
        title: "Profile",
        url: "/student-dashboard/profile",
      },
    ],
  },
];