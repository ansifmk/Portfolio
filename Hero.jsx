// import React, { useState, useEffect, useRef } from "react";

// const Navbar = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-green-900/95 shadow-lg py-2" : "bg-gray-900 py-3"}`}>
//       <div className="max-w-full px-4 md:px-6 flex items-center justify-between">
//         <div className="text-lg md:text-xl font-bold text-green-400">Ansif</div>

//         <div className="hidden md:flex items-center gap-2">
//           {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
//             <a key={item} href={`#${item.toLowerCase()}`} className="px-3 py-2 text-sm text-gray-300 hover:text-white transition">
//               {item}
//             </a>
//           ))}
//         </div>

//         <button className="md:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
//           </svg>
//         </button>

//         <a href="#contact" className="hidden sm:block px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition">
//           Contact
//         </a>
//       </div>

//       {isMenuOpen && (
//         <div className="md:hidden bg-gray-800 p-4 space-y-2">
//           {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
//             <a key={item} href={`#${item.toLowerCase()}`} className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition" onClick={() => setIsMenuOpen(false)}>
//               {item}
//             </a>
//           ))}
//         </div>
//       )}
//     </nav>
//   );
// };

// const Hero = () => {
//   return (
//     <section id="home" className="bg-gradient-to-r from-black to-gray-900 min-h-screen flex items-center justify-center px-4 pt-20">
//       <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-8 md:gap-16">
//         <div className="w-full md:w-1/2 flex justify-center">
//           <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 border-4 border-green-800 shadow-2xl"></div>
//         </div>

//         <div className="w-full md:w-1/2 text-center md:text-left">
//           <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
//             Hi, I'm <span className="text-cyan-400">Ansif</span>
//           </h1>
//           <p className="text-xl md:text-2xl text-gray-300 mb-4">Frontend Developer | React Enthusiast</p>
//           <p className="text-gray-200 mb-8 leading-relaxed">I create elegant and efficient web solutions with a focus on user experience and clean code.</p>

//           <div className="flex justify-center md:justify-start gap-4">
//             <a href="#" className="p-3 rounded-lg bg-gray-100 text-gray-800 hover:bg-green-700 hover:text-white transition">
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
//               </svg>
//             </a>
//             <a href="#" className="p-3 rounded-lg bg-green-800 text-white hover:bg-green-700 transition">
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const About = () => {
//   return (
//     <section id="about" className="bg-gray-900 min-h-screen flex items-center justify-center px-4 py-20">
//       <div className="max-w-4xl w-full">
//         <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-8 text-center">About Me</h2>

//         <div className="bg-gray-800 rounded-2xl p-6 md:p-12 space-y-6">
//           <p className="text-gray-200 text-base md:text-lg leading-relaxed">
//             I am a <span className="text-cyan-400 font-semibold">passionate web developer</span> with a keen interest in building responsive and user-friendly web applications. I enjoy solving complex problems and continuously learning new technologies.
//           </p>

//           <p className="text-gray-200 text-base md:text-lg leading-relaxed">
//             My focus is on <span className="text-cyan-400 font-semibold">clean code</span>, <span className="text-cyan-400 font-semibold">performance optimization</span>, and delivering seamless user experiences.
//           </p>

//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
//             {[
//               { emoji: "💡", title: "Innovation", desc: "Creative problem solving" },
//               { emoji: "⚡", title: "Performance", desc: "Optimized solutions" },
//               { emoji: "🎯", title: "Focus", desc: "User-centric design" }
//             ].map((item) => (
//               <div key={item.title} className="bg-gray-700 rounded-lg p-4 text-center">
//                 <div className="text-3xl mb-2">{item.emoji}</div>
//                 <h3 className="text-cyan-300 font-bold mb-1">{item.title}</h3>
//                 <p className="text-gray-300 text-sm">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const Skills = () => {
//   const skills = [
//     { name: "HTML5", level: 95 },
//     { name: "CSS3", level: 90 },
//     { name: "JavaScript", level: 88 },
//     { name: "React", level: 85 },
//     { name: "Tailwind", level: 92 },
//     { name: "Git", level: 87 },
//     { name: "Figma", level: 90 },
//     { name: "Bootstrap", level: 85 }
//   ];

//   return (
//     <section id="skills" className="bg-gradient-to-r from-black to-gray-900 min-h-screen flex items-center justify-center px-4 py-20">
//       <div className="max-w-5xl w-full">
//         <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-12 text-center">My Skills</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//           {skills.map((skill) => (
//             <div key={skill.name} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
//               <h3 className="text-white font-bold mb-3 text-center">{skill.name}</h3>
//               <div className="bg-gray-600 rounded-full h-3 overflow-hidden">
//                 <div className="bg-gradient-to-r from-green-500 to-cyan-400 h-full" style={{ width: `${skill.level}%` }}></div>
//               </div>
//               <p className="text-gray-300 text-sm text-center mt-2">{skill.level}%</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// const Projects = () => {
//   const projects = [
//     {
//       title: "E-Commerce Platform Apple Cart",
//       desc: "Full-stack shopping experience with secure payments",
//       tech: "React • Tailwind"
//     },
//     {
//       title: "Goibibo Website",
//       desc: "Responsive travel website clone",
//       tech: "HTML • CSS"
//     },
//     {
//       title: "Portfolio Website",
//       desc: "Responsive portfolio with modern design",
//       tech: "React • Tailwind"
//     }
//   ];

//   return (
//     <section id="projects" className="bg-gray-900 min-h-screen flex items-center justify-center px-4 py-20">
//       <div className="max-w-5xl w-full">
//         <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-12 text-center">My Projects</h2>

//         <div className="space-y-8 md:space-y-12">
//           {projects.map((project, i) => (
//             <div key={i} className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}>
//               <div className="w-full md:w-1/2 h-64 md:h-80 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg"></div>
//               <div className="w-full md:w-1/2">
//                 <div className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-full mb-3">Project {i + 1}</div>
//                 <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{project.title}</h3>
//                 <p className="text-gray-300 mb-4">{project.desc}</p>
//                 <p className="text-gray-400 text-sm mb-6">{project.tech}</p>
//                 <a href="#" className="inline-block px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition">
//                   View Project →
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// const Contact = () => {
//   const form = useRef();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Message sent!");
//     form.current.reset();
//   };

//   return (
//     <section id="contact" className="bg-gradient-to-r from-black to-gray-900 min-h-screen flex items-center justify-center px-4 py-20">
//       <div className="max-w-5xl w-full flex flex-col md:flex-row gap-12 items-center">
//         <div className="w-full md:w-1/2 text-center md:text-left">
//           <h2 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">Get In Touch</h2>
//           <p className="text-gray-300 text-lg">Let's create something amazing together</p>
//         </div>

//         <div className="w-full md:w-1/2 max-w-md">
//           <form ref={form} onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-6 md:p-8 space-y-4 border-l-4 border-emerald-500">
//             <div>
//               <label className="block text-gray-700 font-bold mb-2">Name</label>
//               <input type="text" name="name" className="w-full border-b-2 border-gray-300 focus:border-emerald-500 py-2 px-2 outline-none focus:shadow-lg transition" required />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-bold mb-2">Email</label>
//               <input type="email" name="email" className="w-full border-b-2 border-gray-300 focus:border-emerald-500 py-2 px-2 outline-none focus:shadow-lg transition" required />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-bold mb-2">Message</label>
//               <textarea name="message" rows="5" className="w-full border-b-2 border-gray-300 focus:border-emerald-500 py-2 px-2 outline-none focus:shadow-lg transition resize-none" required></textarea>
//             </div>

//             <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition">
//               Send Message
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default function App() {
//   return (
//     <>
//       <Navbar />
//       <Hero />
//       <About />
//       <Skills />
//       <Projects />
//       <Contact />
//     </>
//   );
// }