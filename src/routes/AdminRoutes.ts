import { Route } from "@/types";

export const AdminRoutes:Route[] = [
  {
    title: "Welcome to Admin Dashboard",
    items: [
      {
        title: "Users",
        url: "/users",
      },
      {
        title: "Ban User",
        url: "/ban-user",
      },
      {
        title: "Bookings",
        url: "/bookings",
      },
      {
        title: "Manage Categories",
        url: "/manage-categories",
      },
    ],
  },
];
