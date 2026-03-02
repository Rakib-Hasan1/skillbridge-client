export interface TutorProfile {
  id: string;
  bio: string;
  hourlyRate: number;
  rating: number;
  categories: {
    id: string;
    name: string;
  }[];
  user: {
    name: string;
    email?: string;
    image?: string | null;
  };
}
