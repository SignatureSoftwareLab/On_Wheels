import achiever1 from "@/assets/achiever-1.jpg";
import achiever2 from "@/assets/achiever-2.jpg";
import achiever3 from "@/assets/achiever-3.jpg";
import achiever4 from "@/assets/achiever-4.jpg";
import achiever5 from "@/assets/achiever-5.jpg";
import achiever6 from "@/assets/achiever-6.jpg";

export interface Achiever {
  id: string;
  name: string;
  rank: string;
  city: string;
  achievement: string;
  image: string;
}

export const achievers: Achiever[] = [
  {
    id: "ach-001",
    name: "Rajesh Kumar Sharma",
    rank: "Diamond Director",
    city: "Mumbai, Maharashtra",
    achievement: "Top Recruiter of the Year",
    image: achiever1,
  },
  {
    id: "ach-002",
    name: "Priya Nair",
    rank: "Platinum Leader",
    city: "Bengaluru, Karnataka",
    achievement: "Excellence in Team Building",
    image: achiever2,
  },
  {
    id: "ach-003",
    name: "Suresh Patel",
    rank: "Gold Executive",
    city: "Ahmedabad, Gujarat",
    achievement: "Highest Sales Achiever",
    image: achiever3,
  },
  {
    id: "ach-004",
    name: "Lakshmi Devi",
    rank: "Silver Ambassador",
    city: "Chennai, Tamil Nadu",
    achievement: "Rising Star Award",
    image: achiever4,
  },
  {
    id: "ach-005",
    name: "Vikram Singh",
    rank: "Crown Director",
    city: "Delhi NCR",
    achievement: "Legacy Builder Award",
    image: achiever5,
  },
  {
    id: "ach-006",
    name: "Anita Reddy",
    rank: "Emerald Leader",
    city: "Hyderabad, Telangana",
    achievement: "Consistent Performer",
    image: achiever6,
  },
];
