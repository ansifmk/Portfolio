import React from "react";
import Navbar from "./Navbar";
import { About, Contact, Hero, Projects, Skills } from "./Hero";

function App() {
  return (
    <div className="bg-teal-800 text-white min-h-screen font-sans">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
 