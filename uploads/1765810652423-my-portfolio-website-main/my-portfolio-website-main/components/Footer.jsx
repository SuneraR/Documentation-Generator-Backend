import GitHub from "@/images/Logos/github.png";
import Linkedin from "@/images/Logos/linkedin.png";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 mt-16 bg-gray-900/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Copyright */}
          <p className="text-xs sm:text-sm text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} Sunera.dev — Built with{" "}
            <span className="text-red-400">♥</span> by Sunera Ruwanara
          </p>

          {/* Navigation Links */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <a
              href="#projects"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Skills
            </a>
            <a
              href="#contact"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Contact
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="flex flex-col gap-2 justify-center items-center">
              <Image
                src={GitHub}
                alt="GitHub Logo"
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
              <a
                href="https://github.com/SuneraR"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm font-medium"
              >
                GitHub
              </a>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <Image
                src={Linkedin}
                alt="LinkedIn Logo"
                className="w-4 h-4 sm:w-5 sm:h-5"
              />

              <a
                href="https://www.linkedin.com/in/sunera-ruwanara-b7b940252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm font-medium"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="mt-6 sm:mt-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
    </footer>
  );
}
