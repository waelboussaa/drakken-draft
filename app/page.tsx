import { Hero } from "@/components/sections/Hero";
import { Proof } from "@/components/sections/Proof";
import { Services } from "@/components/sections/Services";
import { Featured } from "@/components/sections/Featured";
import { Process } from "@/components/sections/Process";
import { WhereWeWork } from "@/components/sections/WhereWeWork";
import { Credentials } from "@/components/sections/Credentials";
import { Testimonials } from "@/components/sections/Testimonials";
import { News } from "@/components/sections/News";
import { Cta } from "@/components/sections/Cta";

// Section order follows the brief (section 4).
export default function Home() {
  return (
    <>
      <Hero />
      <Proof />
      <Services />
      <Featured />
      <Process />
      <WhereWeWork />
      <Credentials />
      <Testimonials />
      <News />
      <Cta />
    </>
  );
}
