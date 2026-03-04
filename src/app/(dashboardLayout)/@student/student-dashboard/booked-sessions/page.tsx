
import { env } from "../../../../../../env";

export default async function BookedSessions() {
  const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/bookings/my`);

  const data = await res.json();
  console.log(data.data);
  return <div>This is my Booked Sessions Page</div>;
}
