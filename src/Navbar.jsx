// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";

// const Navbar = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [activeSection, setActiveSection] = useState("home");
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLinks = [
//     { id: "home", label: "Home" },
//     { id: "about", label: "About" },
//     { id: "skills", label: "Skills" },
//     { id: "projects", label: "Projects" },
//     { id: "contact", label: "Contact" }
//   ];

//   const handleLinkClick = (linkId) => {
//     setActiveSection(linkId);
//     setIsMenuOpen(false);
//   };

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//         scrolled
//           ? "bg-green-900/95 backdrop-blur-md shadow-lg py-3"
//           : "bg-gray-900 py-4"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
//         <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-green-400 to-green-100 bg-clip-text text-transparent truncate">
//           Ansif
//         </div>

//         <div className="hidden md:flex items-center space-x-1">
//           {navLinks.map((link) => (
//             <a
//               key={link.id}
//               href={`#${link.id}`}
//               onClick={() => setActiveSection(link.id)}
//               className={`relative px-3 lg:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 hover:text-white ${
//                 activeSection === link.id
//                   ? "text-white"
//                   : "text-gray-300"
//               }`}
//             >
//               {link.label}
//               <span
//                 className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-green-700 to-green-100 transition-all duration-300 ${
//                   activeSection === link.id ? "w-full" : "w-0"
//                 }`}
//               />
//             </a>
//           ))}
//         </div>

//         <button
//           className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           <div className="w-6 h-6 flex flex-col justify-center space-y-1">
//             <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
//             <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
//             <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
//           </div>
//         </button>

//         <a
//           href="#contact"
//           className="hidden sm:block px-4 sm:px-5 py-2 text-xs sm:text-sm bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap"
//         >
//           Get in Touch
//         </a>
//       </div>

//       <div
//         className={`md:hidden absolute top-full left-0 w-full bg-green-900/95 backdrop-blur-md shadow-lg transition-all duration-300 ${
//           isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
//         }`}
//       >
//         <div className="px-4 sm:px-6 py-4 space-y-2">
//           {navLinks.map((link) => (
//             <a
//               key={link.id}
//               href={`#${link.id}`}
//               onClick={() => handleLinkClick(link.id)}
//               className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:text-white ${
//                 activeSection === link.id
//                   ? "text-white bg-white/10"
//                   : "text-gray-300 hover:bg-white/5"
//               }`}
//             >
//               {link.label}
//             </a>
//           ))}
//           <a
//             href="#contact"
//             onClick={() => setIsMenuOpen(false)}
//             className="block sm:hidden mt-4 px-4 sm:px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg text-center"
//           >
//             Get in Touch
//           </a>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export const Hero = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   return (
//     <section
//       id="home"
//       className="bg-gradient-to-r from-black to-white min-h-screen flex flex-col md:flex-row justify-center items-center p-4 sm:p-6 pt-28 sm:pt-24 md:pt-32"
//     >
//       <div className="flex flex-col md:flex-row justify-center items-center max-w-5xl mx-auto gap-8 sm:gap-12 md:gap-16 w-full">
//         <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start">
//           <div className="relative">
//             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-20 blur-lg pointer-events-none" />
//             <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full object-cover border-2 border-green-800 shadow-xl hover:shadow-2xl transition-shadow duration-500 bg-gradient-to-br from-cyan-400 to-blue-600" />
//           </div>
//         </div>

//         <div className="text-center md:text-left w-full md:w-auto">
//           <div
//             className={`transform transition-all duration-700 ease-out ${
//               isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
//             }`}
//             style={{ transitionDelay: '200ms' }}
//           >
//             <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-500">
//               Hi, I'm <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-cyan-700 tracking-wider drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]">Ansif</span> 
//             </h1>
            
//             <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray mb-4 sm:mb-6 font-light">
//               Frontend Developer | React Enthusiast
//             </p>

//             <p className="text-base sm:text-lg text-gray-200 mb-6 sm:mb-8 max-w-lg leading-relaxed">
//               I create elegant and efficient web solutions with a focus on user experience and clean code.
//             </p>
//           </div>

//           <div
//             className={`relative z-10 flex flex-wrap gap-4 sm:gap-5 mt-8 sm:mt-10 justify-center md:justify-start transform transition-all duration-700 ease-out ${
//               isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
//             }`}
//             style={{ transitionDelay: '400ms', pointerEvents: isVisible ? 'auto' : 'none' }}
//           >
//             <a
//               href="#"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg bg-gray-100 border border-green-800 hover:bg-green-700 hover:text-white text-gray-600 transition-all duration-300"
//             >
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
//               </svg>
//             </a>

//             <a
//               href="#"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg bg-green-800 hover:bg-gray-100 hover:text-gray-800 text-white transition-all duration-300"
//             >
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//               </svg>
//             </a>

//             <a
//               href="#"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg bg-gray-100 border border-green-800 hover:bg-green-800 hover:text-white text-gray-600 transition-all duration-300"
//             >
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export const About = () => {
//   return (
//     <section
//       id="about"
//       className="bg-gradient-to-r from-black to-white min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 pt-28 sm:pt-24 md:pt-32"
//     >
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
//       </div>

//       <div className="relative z-10 max-w-5xl mx-auto w-full">
//         <motion.div
//           className="backdrop-blur-sm bg-white/5 border border-cyan-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-[0_20px_80px_rgba(6,182,212,0.15)]"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           viewport={{ once: true, amount: 0.3 }}
//         >
//           <div className="mb-8 sm:mb-10 relative">
//             <motion.div
//               className="absolute -left-3 sm:-left-4 md:-left-8 top-0 w-1 h-full bg-gradient-to-b from-green-100 to-green-900 rounded-full"
//               initial={{ height: 0 }}
//               whileInView={{ height: "100%" }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//               viewport={{ once: true }}
//             ></motion.div>
            
//             <motion.h2
//               className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-cyan-700 tracking-wider drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)] mb-3"
//               style={{
//                 WebkitTextStroke: '2px rgba(6, 182, 212, 0.5)',
//                 paintOrder: 'stroke fill',
//                 textShadow: '0 0 30px rgba(6, 182, 212, 0.3), 0 0 60px rgba(6, 182, 212, 0.2)'
//               }}
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               viewport={{ once: true }}
//             >
//               About Me
//             </motion.h2>
            
//             <motion.div
//               className="h-1 w-20 sm:w-24 bg-gradient-to-r from-green-100 to-green-900 rounded-full"
//               initial={{ width: 0 }}
//               whileInView={{ width: "6rem" }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//               viewport={{ once: true }}
//             ></motion.div>
//           </div>

//           <motion.div
//             className="space-y-4 sm:space-y-6"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.5 }}
//             viewport={{ once: true }}
//           >
//             <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed font-light">
//               I am a <span className="text-cyan-400 font-semibold">passionate web developer</span> with a keen interest in building
//               responsive and user-friendly web applications. I enjoy solving
//               complex problems and continuously learning new technologies to
//               improve my skills.
//             </p>

//             <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed font-light">
//               My focus is on <span className="text-cyan-400 font-semibold">clean code</span>, <span className="text-cyan-400 font-semibold">performance optimization</span>, and delivering
//               seamless user experiences. I thrive in collaborative environments
//               where I can contribute and grow as a developer.
//             </p>

//             <motion.div
//               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 sm:mt-10"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.7 }}
//               viewport={{ once: true }}
//             >
//               <div className="group bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/30 rounded-xl p-4 sm:p-5 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]">
//                 <div className="text-2xl sm:text-3xl mb-2">💡</div>
//                 <h3 className="text-cyan-300 font-bold text-base sm:text-lg mb-1">Innovation</h3>
//                 <p className="text-gray-400 text-xs sm:text-sm">Creative problem solving and self-learner</p>
//               </div>

//               <div className="group bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/30 rounded-xl p-4 sm:p-5 hover:border-blue-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
//                 <div className="text-2xl sm:text-3xl mb-2">⚡</div>
//                 <h3 className="text-blue-300 font-bold text-base sm:text-lg mb-1">Performance</h3>
//                 <p className="text-gray-400 text-xs sm:text-sm">Optimized solutions</p>
//               </div>

//               <div className="group bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/30 rounded-xl p-4 sm:p-5 hover:border-purple-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
//                 <div className="text-2xl sm:text-3xl mb-2">🎯</div>
//                 <h3 className="text-purple-300 font-bold text-base sm:text-lg mb-1">Focus</h3>
//                 <p className="text-gray-400 text-xs sm:text-sm">User-centric design</p>
//               </div>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Navbar;