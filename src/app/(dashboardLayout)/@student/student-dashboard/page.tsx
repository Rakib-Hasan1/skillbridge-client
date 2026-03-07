import { redirect } from "next/navigation";

export default function StudentDashboard() {
  return redirect("/student-dashboard/booked-sessions");
}
