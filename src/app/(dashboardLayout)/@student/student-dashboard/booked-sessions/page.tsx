import { env } from "../../../../../../env";
import BookedSessionsClient from "./BookedSessionsClient";


export default async function BookedSessionsPage() {
  const res = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/bookings/my`, {
    cache: "no-store",
  });

  const data = await res.json();
  const bookings = data.data;

  return <BookedSessionsClient bookings={bookings} />;
}
