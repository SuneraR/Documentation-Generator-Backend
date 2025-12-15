import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: "Sunera's Portfolio",
  description: "A showcase of my skills and projects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-800">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
