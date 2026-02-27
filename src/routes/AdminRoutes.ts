import { Route } from "@/types";

export const AdminRoutes:Route[] = [
  {
    title: "Welcome to Admin Dashboard",
    items: [
      {
        title: "Users",
        url: "/admin-dashboard/users",
      },
      {
        title: "Ban User",
        url: "/admin-dashboard/ban-user",
      },
      {
        title: "Bookings",
        url: "/admin-dashboard/bookings",
      },
      {
        title: "Manage Categories",
        url: "/admin-dashboard/manage-categories",
      },
    ],
  },
];
