import PortfolioScroll from "@/components/PortfolioScroll";
import PortfolioGate from "@/components/PortfolioGate";
import BentoGrid from "@/components/BentoGrid";
import Testimonial from "@/components/Testimonial";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import AboutReveal from "@/components/AboutReveal";
import Achievements from "@/components/Achievements";
import GamesGrid from "@/components/GamesGrid";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="bg-neutral-950 min-h-screen">
      <PortfolioGate>
        <Navbar />
        <PortfolioScroll />
        <div className="relative z-10 -mt-[100svh] bg-neutral-950 md:-mt-[100vh]">
          <AboutReveal />
          <BentoGrid />
          {/* <ShowcaseCarousel />  Disabling carousel for now to focus on vertical flow or if needed enable it */}
          <Testimonial />
          <GamesGrid />
          <Achievements />
          <Stats />
          <Footer />
        </div>
      </PortfolioGate>
    </main>
  );
}
