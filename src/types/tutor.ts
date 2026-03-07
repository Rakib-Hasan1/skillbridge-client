export interface Tutor {
  id: string;
  hourlyRate: number;
  rating: number;
  user: {
    name: string;
    image?: string;
  };
}
