import Achievements from "@/components/Achievements";
import Navbar from "@/components/Navbar";

export default function AchievementsPage() {
  return (
    <main className="bg-neutral-950 min-h-screen">
      <Navbar />
      {/* Achievements component will take up the full screen and handle its own scrolling */}
      <Achievements />
    </main>
  );
}
