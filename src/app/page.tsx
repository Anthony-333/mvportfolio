import { Clock } from "@/components/clock";
import { Hero } from "@/components/hero";
import { ProfileCard } from "@/components/profile-card";
import { About, Contact, Experience, Services, Skills, Work } from "@/components/sections";
import { SideNav } from "@/components/side-nav";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 overflow-x-clip p-4 pb-28 lg:flex-row lg:gap-16 lg:pb-4">
      <ProfileCard />

      <main className="relative min-w-0 flex-1 lg:pr-24">
        <div className="absolute right-0 top-4 lg:right-2">
          <Clock />
        </div>
        <div className="max-w-3xl">
          <Hero />
          <Services />
          <About />
          <Experience />
          <Work />
          <Skills />
          <Contact />
        </div>
      </main>

      <SideNav />
    </div>
  );
}
