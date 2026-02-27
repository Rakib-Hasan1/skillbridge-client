// app/dashboard/page.tsx

import { redirect } from "next/navigation";
import { userService } from "@/services/UserService";
import { Roles } from "@/constants/roles";

export default async function DashboardPage() {
  const { data } = await userService.getSession();
  const user = data?.user;

  if (!user) {
    redirect("/login");
  }

  if (user.role === Roles.admin) {
    redirect("/admin-dashboard");
  }

  if (user.role === Roles.tutor) {
    redirect("/tutor-dashboard");
  }

  if (user.role === Roles.student) {
    redirect("/student-dashboard");
  }

  redirect("/unauthorized");
}