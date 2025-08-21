// import Image from "next/image";
import Hero from "@/components/Hero";
import HowTo from "@/components/HowTo";
import Problem from "@/components/Problem";
import Feature from "@/components/Feature";
import Step from "@/components/Step";
import FAQ from "@/components/Faq";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="">
      {/* <Navbar /> */}
      <Hero />
      <Problem />
      <Feature />
      <Step />
      <FAQ />
      <Testimonials />
      <Footer />
    </div>
  );
}
