import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, User, Code, Briefcase, Mail, Menu } from "lucide-react";

const Navbar = () => {
  const navItems = [
    {
      title: "Home",
      icon: <Home className="h-full w-full text-white" />,
      href: "#home",
    },
    {
      title: "About",
      icon: <User className="h-full w-full text-white" />,
      href: "#about",
    },
    {
      title: "Skills",
      icon: <Code className="h-full w-full text-white" />,
      href: "#skills",
    },
    {
      title: "Projects",
      icon: <Briefcase className="h-full w-full text-white" />,
      href: "#projects",
    },
    {
      title: "Contact",
      icon: <Mail className="h-full w-full text-white" />,
      href: "#contact",
    },
  ];

  return (
    <>
      {/* Desktop Floating Dock */}
      <FloatingDockDesktop items={navItems} />
      
      {/* Mobile Floating Dock */}
      <FloatingDockMobile items={navItems} />
    </>
  );
};

const FloatingDockMobile = ({ items }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="fixed top-4 right-4 z-50 block md:hidden">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 hover:bg-green-100 shadow-lg transition-colors"
        >
          <Menu className="h-6 w-6 text-white" />
        </button>
        
        <AnimatePresence>
          {open && (
            <motion.div
              layoutId="nav"
              className="absolute top-full right-0 mt-2 flex flex-col gap-2"
            >
              {items.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                    transition: {
                      delay: idx * 0.05,
                    },
                  }}
                  transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-full bg-green-600 hover:bg-green-700 shadow-lg transition-colors pl-4 pr-5 py-2.5"
                  >
                    <div className="h-5 w-5 flex-shrink-0">{item.icon}</div>
                    <span className="text-sm font-medium text-white whitespace-nowrap">{item.title}</span>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const FloatingDockDesktop = ({ items }) => {
  let mouseX = useMotionValue(Infinity);
  
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex h-16 items-end gap-4 rounded-2xl  backdrop-blur-sm px-4 pb-3 shadow-xl "
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, href }) {
  const ref = useRef(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-cyan-900 hover:bg-green-900 transition-colors"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-700 bg-gray-800 px-2 py-0.5 text-xs whitespace-pre text-white shadow-lg"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}


// import { useState, useEffect } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="bg-gradient-to-r from-black to-green-950 min-h-screen flex flex-col md:flex-row justify-center items-center p-6 pt-24"
    >
      <div className="flex flex-col md:flex-row justify-center items-center max-w-5xl mx-auto gap-8 md:gap-16 w-full">
        
        {/* Image Section */}
        <div className="flex-shrink-0">
          <div className="relative group">
            {/* Animated glow background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
            
            {/* Image container */}
            <img
              src="\WhatsApp Image 2025-10-16 at 12.36.37_543088d1.jpg"
              alt="Ansif"
              className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full object-cover  shadow-2xl hover:shadow-green-500/50 hover:shadow-3xl transition-all duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left flex-1">
          {/* Main heading */}
          <div
            className={`transform transition-all duration-700 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-gray-200">
              Hi, I'm{' '}
              <span className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-cyan-700 to-cyan-900 bg-clip-text text-transparent drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
                Ansif
              </span>
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6 font-light">
              Frontend Developer | React Enthusiast
            </p>

            <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
              I create elegant and efficient web solutions with a focus on user experience and clean code. Passionate about building responsive, modern web applications with the latest technologies.
            </p>
          </div>

          {/* Buttons and Social Links */}
        

          {/* Social Links */}
          <div
            className={`relative z-10 flex gap-4 mt-8 justify-center md:justify-start transform transition-all duration-700 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '500ms', pointerEvents: isVisible ? 'auto' : 'none' }}
          >
            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-900 border-2 border-green-500/30 hover:bg-green-500/20 hover:border-green-500 text-gray-300 hover:text-green-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/30"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-lg bg-green-500 hover:bg-green-600 text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/30"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            {/* Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-900 border-2 border-green-500/30 hover:bg-green-500/20 hover:border-green-500 text-gray-300 hover:text-green-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/30"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};


const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="about"
      className="bg-gradient-to-r from-black to-green-950 min-h-screen flex flex-col md:flex-row justify-center items-center p-6 pt-24 relative overflow-hidden"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div
          className={`backdrop-blur-sm bg-green-950/30 border border-green-100/30 rounded-3xl p-8 md:p-12 shadow-[0_20px_80px_rgba(34,197,94,0.15)] transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Header section */}
          <div className="mb-10 relative">
            {/* Left accent line */}
            <div
              className={`absolute -left-4 md:-left-8 top-0 w-1 bg-gradient-to-b from-green-100 to-green-900 rounded-full transition-all duration-1000 ${
                isVisible ? 'h-full' : 'h-0'
              }`}
            ></div>

            {/* Title */}
            <h2
              className={`text-5xl md:text-7xl font-extrabold text-cyan-800 tracking-wider drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)] mb-3 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              style={{
                WebkitTextStroke: '2px rgba(9, 36, 81, 1)',
                paintOrder: 'stroke fill',
                textShadow: '0 0 30px rgba(2, 36, 80, 0.3), 0 0 60px rgba(189, 189, 189, 0.2)'
              }}
            >
              About Me
            </h2>

            {/* Underline accent */}
            <div
              className={`h-1 w-24 bg-gradient-to-r from-green-400 to-green-900 rounded-full transition-all duration-1000 ${
                isVisible ? 'w-24 opacity-100' : 'w-0 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            ></div>
          </div>

          {/* Content section */}
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            {/* First paragraph */}
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">
              I am a <span className="text-green-400 font-semibold">passionate web developer</span> with a keen interest in building
              responsive and user-friendly web applications. I enjoy solving
              complex problems and continuously learning new technologies to
              improve my skills and stay ahead in this dynamic industry.
            </p>

            {/* Second paragraph */}
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">
              My focus is on <span className="text-green-400 font-semibold">clean code</span>, <span className="text-green-400 font-semibold">performance optimization</span>, and delivering
              seamless user experiences. I thrive in collaborative environments
              where I can contribute and grow as a developer, turning ideas into elegant solutions.
            </p>

            {/* Skills grid */}
            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              {/* Innovation card */}
              <div className="group bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/30 rounded-xl p-6 hover:border-green-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:scale-105 cursor-pointer">
                <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300">💡</div>
                <h3 className="text-green-300 font-bold text-lg mb-2">Innovation</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Creative problem solving and continuous learning</p>
              </div>

              {/* Performance card */}
              <div className="group bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:scale-105 cursor-pointer">
                <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300">⚡</div>
                <h3 className="text-cyan-300 font-bold text-lg mb-2">Performance</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Optimized and efficient solutions</p>
              </div>

              {/* Focus card */}
              <div className="group bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/30 rounded-xl p-6 hover:border-green-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:scale-105 cursor-pointer">
                <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300">🎯</div>
                <h3 className="text-green-300 font-bold text-lg mb-2">Focus</h3>
                <p className="text-gray-400 text-sm leading-relaxed">User-centric design approach</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState({});

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skills = [
    {
      name: "HTML5",
      level: 95,
      color: "from-orange-500 to-red-500",
      glow: "shadow-[0_0_30px_rgba(249,115,22,0.3)]",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"
    },
    {
      name: "CSS3",
      level: 90,
      color: "from-blue-500 to-cyan-500",
      glow: "shadow-[0_0_30px_rgba(6,182,212,0.3)]",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"
    },
    {
      name: "JavaScript",
      level: 88,
      color: "from-yellow-400 to-orange-500",
      glow: "shadow-[0_0_30px_rgba(250,204,21,0.3)]",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
    },
    {
      name: "React",
      level: 85,
      color: "from-cyan-400 to-blue-500",
      glow: "shadow-[0_0_30px_rgba(34,211,238,0.3)]",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
    },
    {
      name: "Tailwind CSS",
      level: 92,
      color: "from-sky-400 to-blue-600",
      glow: "shadow-[0_0_30px_rgba(56,189,248,0.3)]",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
    },
    {
      name: "Git",
      level: 87,
      color: "from-orange-600 to-red-600",
      glow: "shadow-[0_0_30px_rgba(234,88,12,0.3)]",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"
    },
    {
      name: "Figma",
      level: 90,
      color: "from-pink-500 to-purple-600",
      glow: "shadow-[0_0_30px_rgba(217,70,239,0.3)]",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"
    },
    {
      name: "Bootstrap",
      level: 85,
      color: "from-purple-700 to-indigo-700",
      glow: "shadow-[0_0_30px_rgba(111,66,193,0.3)]",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg"
    }
  ];

  useEffect(() => {
    if (isVisible) {
      skills.forEach((skill, index) => {
        setTimeout(() => {
          setAnimatedSkills(prev => ({
            ...prev,
            [skill.name]: true
          }));
        }, index * 100);
      });
    }
  }, [isVisible]);

  return (
    <section
      id="skills"
      className="bg-gradient-to-r from-black to-green-950 min-h-screen flex flex-col md:flex-row justify-center items-center p-6 pt-24 relative overflow-hidden"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl w-full">
        {/* Header section */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-green-400 tracking-wider mb-4 drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]"
            style={{
              WebkitTextStroke: '2px rgba(34, 197, 94, 0.5)',
              paintOrder: 'stroke fill',
              textShadow: '0 0 30px rgba(34, 197, 94, 0.3), 0 0 60px rgba(34, 197, 94, 0.2)'
            }}
          >
            My Skills
          </h2>
          
          <div
            className={`h-1 w-32 bg-gradient-to-r from-green-100 via-green-400 to-green-900 rounded-full mx-auto transform transition-all duration-1000 ${
              isVisible ? 'w-32 opacity-100' : 'w-0 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          ></div>
          
          <p className="text-gray-400 mt-6 text-lg md:text-xl">Technologies I work with</p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`group relative transform transition-all duration-700 ${
                animatedSkills[skill.name]
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Card */}
              <div className="relative bg-gradient-to-br from-green-500/10 to-green-100/5 backdrop-blur-sm border border-green-500/30 hover:border-green-500/60 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:bg-green-500/5 h-full">
                
                {/* Glow effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${skill.glow} blur-xl`}></div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-4 mx-auto filter drop-shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <img 
                      src={skill.logo} 
                      alt={`${skill.name} logo`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  {/* Skill name */}
                  <h3 className="text-lg md:text-xl font-bold text-white mb-4 text-center transform transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-cyan-400 flex-1">
                    {skill.name}
                  </h3>

                  {/* Proficiency info */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Proficiency</span>
                      <span className="text-green-400 font-semibold">{skill.level}%</span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-green-500/20">
                      <div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative transform origin-left transition-all duration-1000 ease-out`}
                        style={{
                          width: animatedSkills[skill.name] ? `${skill.level}%` : '0%',
                          transitionDelay: `${index * 50}ms`
                        }}
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <p className="text-gray-400 text-lg mb-6">Always learning and expanding my toolkit</p>
          <div className="inline-flex items-center gap-2 text-green-400 font-semibold hover:text-cyan-400 transition-colors duration-300 group cursor-pointer">
            <span>Explore my projects</span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </div>
        </div>
      </div>
    </section>
  );
};

import { ArrowRight } from 'lucide-react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState({});
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform Apple Cart",
      description: "Full-stack shopping experience with secure payments and order tracking.",
      image: "\Screenshot 2025-10-16 123836.png",
      link: "https://applecartecom.vercel.app",
      tech: "React • Tailwind • Firebase"
    },
    {
      id: 2,
      title: "Goibibo Website",
      description: "Built a responsive frontend clone of the Goibibo travel website using HTML and CSS. Included key pages like home, hotel booking, flight booking, and login/signup.",
      image: "\Screenshot 2025-06-16 193816.png",
      link: "https://github.com/yourusername/project2",
      tech: "HTML • CSS • JavaScript"
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "This responsive portfolio site showcases my skills, projects, and contact info. Built with modern technologies and best practices.",
      image: "\Screenshot 2025-10-16 124527.png",
      link: "https://github.com/yourusername/project3",
      tech: "React • Tailwind • Framer Motion"
    }
  ];

  return (
    <section id="projects" className="bg-gradient-to-r from-black to-green-950 min-h-screen flex flex-col md:flex-row justify-center items-center p-6 pt-24 relative overflow-hidden">
      <style>{`
        @keyframes imageShine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes titleGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }
          50% { text-shadow: 0 0 40px rgba(34, 197, 94, 0.6); }
        }
        @keyframes buttonHoverGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.4), inset 0 0 20px rgba(34, 197, 94, 0.1); }
          50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.8), inset 0 0 30px rgba(34, 197, 94, 0.2); }
        }
        .image-hover-shine {
          position: relative;
          overflow: hidden;
        }
        .image-hover-shine::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: imageShine 0.6s ease-in-out;
        }
        .title-hover-glow:hover {
          animation: titleGlow 1s ease-in-out;
        }
        .button-hover-glow:hover {
          animation: buttonHoverGlow 1.5s ease-in-out infinite;
        }
      `}</style>

      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Header Section */}
        <div
          className="animate-on-scroll mb-20 transition-all duration-1000"
          id="header"
          style={{
            opacity: isVisible.header ? 1 : 0,
            transform: isVisible.header ? 'translateY(0)' : 'translateY(40px)'
          }}
        >
          <span className="text-green-400 font-semibold text-sm uppercase tracking-wider animate-pulse">Portfolio</span>
          <h2 className="text-5xl md:text-7xl font-extrabold text-green-400 tracking-wider drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)] mb-4 cursor-default hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-300 hover:to-cyan-300 transition-all duration-500"
            style={{
              WebkitTextStroke: '2px rgba(34, 197, 94, 0.5)',
              paintOrder: 'stroke fill',
              textShadow: '0 0 30px rgba(34, 197, 94, 0.3), 0 0 60px rgba(34, 197, 94, 0.2)'
            }}>
            My Projects
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl">
            A collection of projects that showcase creativity and technical excellence
          </p>
        </div>

        {/* Projects Container */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <div
              key={project.id}
              id={`project-${project.id}`}
              className={`animate-on-scroll transition-all duration-1000 flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-8 sm:gap-12 items-center group`}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                opacity: isVisible[`project-${project.id}`] ? 1 : 0,
                transform: isVisible[`project-${project.id}`]
                  ? 'translateX(0)'
                  : index % 2 === 0 ? 'translateX(-60px)' : 'translateX(60px)',
                transitionDelay: '200ms'
              }}
            >
              {/* Image Section */}
              <div className="w-full md:w-1/2">
                <div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl transition-all duration-500 border border-green-500/20 ${
                  hoveredId === project.id 
                    ? 'shadow-green-500/70 border-green-500/60 scale-105 image-hover-shine' 
                    : 'group-hover:shadow-green-500/50 group-hover:border-green-500/60'
                }`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-60 sm:h-80 object-cover transition-transform duration-700 ${
                      hoveredId === project.id ? 'scale-110 rotate-2' : 'group-hover:scale-110 group-hover:rotate-2'
                    }`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
                    hoveredId === project.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}></div>
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 space-y-4 sm:space-y-6">
                <div>
                  {/* Project Badge */}
                  <div className={`inline-block px-3 sm:px-4 py-1 rounded-full text-sm font-medium mb-3 sm:mb-4 transition-all duration-300 ${
                    hoveredId === project.id
                      ? 'bg-green-500/30 border border-green-500/70 text-green-200 scale-110 animate-bounce'
                      : 'bg-green-500/10 border border-green-500/30 text-green-400 animate-bounce'
                  }`}>
                    Project {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold transition-all duration-300 title-hover-glow cursor-default ${
                    hoveredId === project.id
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cyan-300 scale-105'
                      : 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-cyan-400'
                  }`}>
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-base sm:text-lg leading-relaxed transition-all duration-300 ${
                    hoveredId === project.id
                      ? 'text-gray-200 translate-x-1'
                      : 'text-gray-300'
                  }`}>
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {project.tech.split(' • ').map((tech, i) => (
                      <span
                        key={i}
                        className={`px-2 sm:px-3 py-1 rounded-full text-sm font-mono transition-all duration-300 ${
                          hoveredId === project.id
                            ? 'bg-green-500/40 border border-green-500/80 text-green-100 scale-110'
                            : 'bg-green-500/10 border border-green-500/30 text-green-300 hover:border-green-500/60 hover:bg-green-500/20'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 shadow-lg button-hover-glow transform ${
                      hoveredId === project.id
                        ? 'bg-gradient-to-r from-green-400 to-cyan-400 text-black shadow-2xl shadow-green-500/70 scale-110 translate-x-3'
                        : 'bg-gradient-to-r from-green-500 to-cyan-500 text-white hover:shadow-2xl hover:shadow-green-500/50 hover:translate-x-2'
                    } group/btn text-sm sm:text-base`}
                  >
                    View Project
                    <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                      hoveredId === project.id ? 'translate-x-2' : 'group-hover/btn:translate-x-1'
                    }`} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className="animate-on-scroll mt-24 sm:mt-32 text-center transition-all duration-1000"
          id="cta"
          style={{
            opacity: isVisible.cta ? 1 : 0,
            transform: isVisible.cta ? 'scale(1)' : 'scale(0.9)'
          }}
        >
          <div className="inline-block p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-green-800/50 to-cyan-800/30 border border-green-500/30 shadow-2xl hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-500 backdrop-blur-sm">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 animate-pulse">
              Interested in collaborating?
            </h3>
            <p className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg">
              Let's create something amazing together
            </p>
            <a
              href="#contact"
              className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-green-400 to-cyan-400 text-black rounded-full font-bold hover:shadow-2xl hover:shadow-green-500/50 transform hover:scale-110 transition-all duration-300 shadow-lg text-sm sm:text-base"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};


import emailjs from "@emailjs/browser";
import { Toaster, toast } from "react-hot-toast";

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_gk5b2to", "template_mctveic", form.current, "zZU9D6KlQyEiFl5Es")
      .then(
        () => toast.success("Message sent successfully 🚀"),
        () => toast.error("Failed to send message ❌")
      );

    e.target.reset();
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-gradient-to-r from-black to-green-950 py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden"
    >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes inputFocus {
          0% {
            border-bottom: 2px solid #10b981;
          }
          100% {
            border-bottom: 2px solid #10b981;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
          }
        }
        @keyframes buttonPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.9s ease-out;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out;
        }
        .input-animate:focus {
          animation: inputFocus 0.3s ease-out;
        }
        .btn-pulse:hover {
          animation: buttonPulse 1s infinite;
        }
      `}</style>

      <Toaster position="top-center" />

      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Text */}
          <div className="text-center lg:text-left animate-slide-in-left">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Get In <span className="text-emerald-500">Touch</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              Let's create something amazing together
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="animate-slide-in-right">
            <div className="bg-white rounded-3xl p-5 sm:p-10 lg:p-4 shadow-3xl border-l-8 border-emerald-500 hover:shadow-3xl transition-all duration-300">
              <form ref={form} onSubmit={sendEmail} className="space-y-8">
                
                {/* Name Input */}
                <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                  <label htmlFor="user_name" className="block text-base font-semibold text-gray-800 mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    placeholder=""
                    required
                    className="input-animate w-full rounded-3xl px-0 py-3 bg-transparent shadow appearance-none border-b-2 border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-0 transition-all duration-300 text-base"
                  />
                </div>

                {/* Email Input */}
                <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                  <label htmlFor="user_email" className="block text-base font-semibold text-gray-800 mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    placeholder=""
                    required
                    className="input-animate rounded-3xl w-full px-0 py-3 bg-transparent shadow appearance-none border-b-2 border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-0 transition-all duration-300 text-base"
                  />
                </div>

                {/* Message Textarea */}
                <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                  <label htmlFor="message" className="block text-base font-semibold text-gray-800 mb-3">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder=""
                    required
                    className="input-animate rounded-3xl w-full px-0 py-3 bg-transparent  shadow appearance-none border-b-2 border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-0 resize-none transition-all duration-300 text-base"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center sm:justify-end animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                  <button
                    type="submit"
                    className="btn-pulse bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-10 sm:px-12 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg text-base"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}