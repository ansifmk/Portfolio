import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-green-/95 backdrop-blur-md shadow-lg py-3"
          : "bg-g-900 py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-100 bg-clip-text text-transparent">
          Ansif
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-1">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setActiveSection(link.id)}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:text-white ${
                activeSection === link.id
                  ? "text-white"
                  : "text-gray-300"
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-green-700 to-green-100 transition-all duration-300 ${
                  activeSection === link.id ? "w-full" : "w-0"
                }`}
              />
              <span
                className={`absolute inset-0 rounded-lg bg-white/5 transition-opacity duration-300 ${
                  activeSection === link.id ? "opacity-100" : "opacity-0 hover:opacity-100"
                }`}
              />
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          className="hidden sm:block px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          Get in Touch
        </a>
      </div>
    </nav>
  );
};

export default Navbar;