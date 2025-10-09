import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
 <section
  id="home"
  className="bg-gradient-to-r from-black to-white- min-h-screen flex flex-col md:flex-row justify-center items-center p-6 pt-24"
>


      <div className="flex flex-col md:flex-row justify-center items-center max-w-5xl mx-auto gap-16">
        {/* Image */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-20 blur-lg" />
            <img
              src="\WhatsApp Image 2025-10-07 at 17.12.16_f4ef186a.jpg"
              alt="Ansif"
              className="relative w-64 h-64 md:w-72 md:h-72 rounded-full object-cover border-2 border-green-800 shadow-xl hover:shadow-2xl transition-shadow duration-500"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center md:text-left">
          <div
            className={`transform transition-all duration-700 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-500">
              Hi, I'm <span className="text-5xl md:text-6xl font-extrabold text-cyan-700 tracking-wider drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]">Ansif</span> 
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray mb-6 font-light">
              Frontend Developer | React Enthusiast
            </p>

            <p className="text-lg text-gray-200 mb-8 max-w-lg leading-relaxed">
              I create elegant and efficient web solutions with a focus on user experience and clean code.
            </p>

         
          </div>

          {/* Social Links */}
          <div
            className={`flex gap-5 mt-10 justify-center md:justify-start transform transition-all duration-700 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
          <a
  href="https://github.com/ansifmk"
  className="border-green-800 border w-11 h-11 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-green-700 text-gray-600 hover:text-white transition-all duration-300"
>

              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/ansif-mk/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BFLbPSgQST5uIyqUl4K%2BkSw%3D%3D"
              className="w-11 h-11 flex items-center justify-center rounded-lg bg-green-800 hover:bg-gray-100 text-white hover:text-gray-800 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            <a
              href="#"
              className=" border-green-800 border w-11 h-11 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-green-800 text-gray-600 hover:text-white transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};


// import { motion } from 'framer-motion';

export const About = () => {
  return (
    <section
      id="about"
      className="bg-gradient-to-r from-black to-white- min-h-screen flex flex-col md:flex-row justify-center items-center p-6 pt-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          className="backdrop-blur-sm bg-white/5 border border-cyan-500/20 rounded-3xl p-8 md:p-12 shadow-[0_20px_80px_rgba(6,182,212,0.15)]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Header with decorative line */}
          <div className="mb-10 relative">
            <motion.div
              className="absolute -left-4 md:-left-8 top-0 w-1 h-full bg-gradient-to-b from-green-100 to-green-900 rounded-full"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            ></motion.div>
            
            <motion.h2
              className="text-5xl md:text-7xl font-extrabold text-cyan-700 tracking-wider drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)] tracking-wider mb-3"
              style={{
                WebkitTextStroke: '2px rgba(6, 182, 212, 0.5)',
                paintOrder: 'stroke fill',
                textShadow: '0 0 30px rgba(6, 182, 212, 0.3), 0 0 60px rgba(6, 182, 212, 0.2)'
              }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h2>
            
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-green-100 to-green-900 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            ></motion.div>
          </div>

          {/* Content with enhanced typography */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">
              I am a <span className="text-cyan-400 font-semibold">passionate web developer</span> with a keen interest in building
              responsive and user-friendly web applications. I enjoy solving
              complex problems and continuously learning new technologies to
              improve my skills.
            </p>

            <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">
              My focus is on <span className="text-cyan-400 font-semibold">clean code</span>, <span className="text-cyan-400 font-semibold">performance optimization</span>, and delivering
              seamless user experiences. I thrive in collaborative environments
              where I can contribute and grow as a developer.
            </p>

            {/* Skills highlight cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="group bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/30 rounded-xl p-5 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                <div className="text-3xl mb-2">💡</div>
                <h3 className="text-cyan-300 font-bold text-lg mb-1">Innovation</h3>
                <p className="text-gray-400 text-sm">Creative problem solving and also a self-learner</p>
              </div>

              <div className="group bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/30 rounded-xl p-5 hover:border-blue-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="text-blue-300 font-bold text-lg mb-1">Performance</h3>
                <p className="text-gray-400 text-sm">Optimized solutions</p>
              </div>

              <div className="group bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/30 rounded-xl p-5 hover:border-purple-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="text-purple-300 font-bold text-lg mb-1">Focus</h3>
                <p className="text-gray-400 text-sm">User-centric design</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
// import { motion } from 'framer-motion';

export const Skills = () => {
  const skills = [
    {
      name: "HTML5",
      level: 95,
      color: "from-orange-500 to-red-500",
      glow: "shadow-[0_0_30px_rgba(249,115,22,0.3)]",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
    },
    {
      name: "CSS3",
      level: 90,
      color: "from-blue-500 to-cyan-500",
      glow: "shadow-[0_0_30px_rgba(6,182,212,0.3)]",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
    },
    {
      name: "JavaScript",
      level: 88,
      color: "from-yellow-400 to-orange-500",
      glow: "shadow-[0_0_30px_rgba(250,204,21,0.3)]",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
    },
    {
      name: "React",
      level: 85,
      color: "from-cyan-400 to-blue-500",
      glow: "shadow-[0_0_30px_rgba(34,211,238,0.3)]",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    },
    {
      name: "Tailwind CSS",
      level: 92,
      color: "from-sky-400 to-blue-600",
      glow: "shadow-[0_0_30px_rgba(56,189,248,0.3)]",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
    },
    {
      name: "Git",
      level: 87,
      color: "from-orange-600 to-red-600",
      glow: "shadow-[0_0_30px_rgba(234,88,12,0.3)]",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
    },
    {
  name: "Figma",
  level: 90,
  color: "from-pink-500 to-purple-600",
  glow: "shadow-[0_0_30px_rgba(217,70,239,0.3)]",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
},
{
  name: "Bootstrap",
  level: 85,
  color: "from-purple-700 to-indigo-700",
  glow: "shadow-[0_0_30px_rgba(111,66,193,0.3)]",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg"
},


  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id="skills" 
      className="bg-gradient-to-r from-black to-white- min-h-screen flex flex-col md:flex-row justify-center items-center p-6 pt-24"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-extrabold  tracking-wider mb-3tracking-wider mb-4 text-cyan-700 tracking-wider drop-shadow-[_10px_rgba(0,0,0,0.5)]"
            style={{
              WebkitTextStroke: '2px rgba(0, 0, 0, 0.5)',
              paintOrder: 'stroke fill',
              textShadow: '0 0 30px rgba(0, 0, 0, 0.4), 0 0 60px rgba(139, 92, 246, 0.2)'
            }}
          >
            My Skills
          </motion.h2>
          <motion.div
            className="h-1 w-32 bg-gradient-to-r from-green-100 via-green-300 to-green-900 rounded-full mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          ></motion.div>
          <p className="text-gray-400 mt-6 text-lg md:text-xl">Technologies I work with</p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-green-500/50 to-green-100/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${skill.glow} blur-xl`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Logo Icon */}
                  <motion.div
                    className="w-16 h-16 md:w-20 md:h-20 mb-4 mx-auto filter drop-shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img 
                      src={skill.logo} 
                      alt={`${skill.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>

                  {/* Skill Name */}
                  <h3 className="text-xl font-bold text-white mb-4 text-center group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-100 group-hover:to-cyan-400 transition-all duration-300">
                    {skill.name}
                  </h3>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Proficiency</span>
                      <span className="text-cyan-400 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                        viewport={{ once: true }}
                      >
                        {/* Shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{
                            x: ["-100%", "200%"]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: "linear"
                          }}
                        ></motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-lg mb-6">Always learning and expanding my toolkit</p>
          <motion.div
            className="inline-flex items-center gap-2 text-cyan-400 font-semibold"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span>Explore my projects</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export const Projects = () => (
  <section id="projects" className="bg-gradient-to-r from-black to-white- min-h-screen flex flex-col md:flex-row justify-center items-center p-6 pt-24">
    <h2 className="text-4xl font-semibold">Projects</h2>
  </section>
);

export const Contact = () => (
  <section id="contact" className="h-screen flex justify-center items-center bg-gray-100">
    <h2 className="text-4xl font-semibold">Contact</h2>
  </section>
);
