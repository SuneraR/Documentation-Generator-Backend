import react from "@/images/Logos/React.png";
import nextjs from "@/images/Logos/nextjs.png";
import nodejs from "@/images/Logos/nodejs.png";
import flutter from "@/images/Logos/flutter.png";
import mongodb from "@/images/Logos/mongodb.png";
import mysql from "@/images/Logos/mysql.png";
import SkillCard from "./SkillCard";
import Heading from "../Heading";

export default function Skill() {
  const skills = [
    { name: "React", logo: react },
    { name: "Next.js", logo: nextjs },
    { name: "Node.js", logo: nodejs },
    {name:"Flutter", logo: flutter},
    { name: "MongoDB", logo: mongodb },
    { name: "MySQL", logo: mysql },
  ];
  return (
    <section id="skills" className="py-10">
      <div className="flex flex-col gap-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Heading text="Technical Skills" />
        <div className="flex flex-wrap justify-around items-center gap-4">
          {skills.map((skill, index) => {
            return (
              <SkillCard
                key={skill.name}
                name={skill.name}
                image={skill.logo}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
