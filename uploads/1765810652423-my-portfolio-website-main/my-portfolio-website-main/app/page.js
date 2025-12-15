import AboutMe from "@/components/About/AboutMe";
import Contact from "@/components/Contact/Contact";
import Divider from "@/components/Divider";
import Hero from "@/components/Hero";
import Project from "@/components/Project/Project";
import Skill from "@/components/Skill-Section/Skill";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
      <Hero />
      <Skill />
      <Divider />
      <Project />
      <Divider />
      <AboutMe />
      <Divider />
      <Contact />
      <Footer />
    </>
  );
}
