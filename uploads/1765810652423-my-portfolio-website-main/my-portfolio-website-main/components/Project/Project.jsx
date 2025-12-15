import Heading from "../Heading";
import SubHeading from "../SubHeading";
import joblistingImage from "@/images/ProjectImages/JobListing.png";
import nforceImage from "@/images/ProjectImages/Nforce.png";
import documentationGenerator from "@/images/ProjectImages/Documentation.jpg"
import ProjectCard from "./ProjectCard";

export default function Project() {
  const projects = [
    {
      name: "Job Listing Platform",
      description:
        "A simple job listing platform where users can explore vacancies, filter roles, and apply directly, making the job search process easier and more efficient.",
      tags: [
        {
          name: "react",
          color: "text-blue-400",
        },
        {
          name: "nodejs",
          color: "text-green-400",
        },
        {
          name: "sql",
          color: "text-pink-400",
        },
      ],
      image: joblistingImage,
      source_code_link: "https://github.com/SuneraR/Job-listing-website.git",
    },
    {
      name: "Nforce Club Website",
      description:
        "A responsive website for Nforce Club, showcasing events, member profiles, and club activities with an engaging design and user-friendly navigation.",
      tags: [
        {
          name: "react",
          color: "text-blue-400",
        },
        {
          name: "nodejs",
          color: "text-green-400",
        },
        {
          name: "mongodb",
          color: "text-green-300",
        },
      ],
      image: nforceImage,
      source_code_link: "https://github.com/SuneraR/nforce-website.git"
    },
     {
      name: "AI Powered Documentation Generator",
      description:
        "AI-powered documentation generator that analyzes GitHub repositories and automatically produces clean, professional README and project documentation using local LLMs.",
      tags: [
        {
          name: "nextJS",
          color: "text-white",
        },
        {
          name: "nodejs",
          color: "text-green-400",
        },
        {
          name: "Ollama API",
          color: "text-[#FFFAFA]",
        },
        {
          name:"DeepSeek Coder",
          color: "text-[#536af5]"
        }
      ],
      image: documentationGenerator,
      source_code_link: "https://github.com/SuneraR/Documentation-Generator-Backend.git"
    }
  ];
  return (
    <section id="projects" className="py-10">
      <div className="flex flex-col gap-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2.5">
          <Heading text="Projects" />
          <SubHeading
            text={"A few of my favorite projects I've designed and developed."}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} index={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
