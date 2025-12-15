import Heading from "../Heading";
import AboutCard from "./AboutCard";
import MyImageCom from "./Image";

export default function AboutMe() {
  return (
    <section id="about" className="py-10">
      <div className="flex flex-col gap-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Heading text={"About Me"} />
        <div className="flex flex-wrap gap-4 justify-evenly items-center">
          <MyImageCom />
          <AboutCard />
        </div>
      </div>
    </section>
  );
}
