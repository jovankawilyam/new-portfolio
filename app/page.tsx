import PortfolioScroll from "@/components/PortfolioScroll";
import BentoGrid from "@/components/BentoGrid";
import Testimonial from "@/components/Testimonial";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import AboutReveal from "@/components/AboutReveal";

import GamesGrid from "@/components/GamesGrid";
import Navbar from "@/components/Navbar";
import PhotoboothGrid from "@/components/PhotoboothGrid";

export default function Home() {
  return (
    <main className="bg-neutral-950 min-h-screen">
      <Navbar />
      <PortfolioScroll />
      <div className="relative z-10 -mt-[100svh] bg-neutral-950 md:-mt-[100vh]">
        <AboutReveal />
        <BentoGrid />
        {/* <ShowcaseCarousel />  Disabling carousel for now to focus on vertical flow or if needed enable it */}
        <Testimonial />
        <GamesGrid />
        <PhotoboothGrid />
        <Stats />
        <Footer />
      </div>
    </main>
  );
}
