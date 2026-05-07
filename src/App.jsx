import React, { useState, useEffect, useRef, Profiler } from "react";
import { gsap } from 'gsap';

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,                // ← new
  useVelocity,            // ← new
  useAnimationControls,   // ← new
} from "framer-motion";

import { Home, User, Code, Briefcase, Mail, Menu, ArrowRight, MapPin, Phone, Import, AppleIcon } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Toaster, toast } from "react-hot-toast";
import goibibo from "./assets/goibibo.jpg";
import apple from "./assets/apple.png";
import topic from "./assets/topic.jpeg";
import topics from "./assets/topics.jpeg";
import quate from "./assets/quate.jpeg";
import quates from "./assets/quates.jpeg";
import intro from "./assets/intro.jpeg";
import introduction from "./assets/introduction.jpeg";
import Zayk from "./assets/Zayk.png";

// No screenshot import needed – we'll use a placeholder URL
const cn = (...inputs) => inputs.filter(Boolean).join(" ");

const BackgroundBeamsWithCollision = ({ children, className }) => {
  const containerRef = useRef(null);
  const parentRef = useRef(null);

  const beams = [
    { initialX: 10, translateX: 10, duration: 7, repeatDelay: 3, delay: 2 },
    { initialX: 40, translateX: 40, duration: 3, repeatDelay: 3, delay: 4 },
    {
      initialX: 70,
      translateX: 70,
      duration: 7,
      repeatDelay: 7,
      className: "h-6",
    },
    { initialX: 90, translateX: 90, duration: 5, repeatDelay: 14, delay: 4 },
    {
      initialX: 110,
      translateX: 110,
      duration: 11,
      repeatDelay: 2,
      className: "h-20",
    },
    {
      initialX: 150,
      translateX: 150,
      duration: 4,
      repeatDelay: 2,
      className: "h-12",
    },
    {
      initialX: 190,
      translateX: 190,
      duration: 4,
      repeatDelay: 4,
      delay: 2,
      className: "h-6",
    },
    {
      initialX: 250,
      translateX: 250,
      duration: 9,
      repeatDelay: 5,
      delay: 3,
      className: "h-6",
    },
    {
      initialX: 300,
      translateX: 300,
      duration: 2,
      repeatDelay: 8,
      delay: 4,
      className: "h-6",
    },
    {
      initialX: 350,
      translateX: 350,
      duration: 2,
      repeatDelay: 8,
      delay: 4,
      className: "h-6",
    },
    {
      initialX: 400,
      translateX: 400,
      duration: 7,
      repeatDelay: 7,
      delay: 2,
      className: "h-6",
    },
    {
      initialX: 500,
      translateX: 500,
      duration: 8,
      repeatDelay: 6,
      delay: 4,
      className: "h-12",
    },
    {
      initialX: 600,
      translateX: 600,
      duration: 3,
      repeatDelay: 5,
      delay: 9,
      className: "h-6",
    },
    {
      initialX: 700,
      translateX: 700,
      duration: 8,
      repeatDelay: 9,
      delay: 3,
      className: "h-13",
    },
    {
      initialX: 800,
      translateX: 800,
      duration: 7,
      repeatDelay: 4,
      delay: 5,
      className: "h-6",
    },
    {
      initialX: 900,
      translateX: 900,
      duration: 9,
      repeatDelay: 12,
      delay: 7,
      className: "h-6",
    },
    {
      initialX: 1000,
      translateX: 1000,
      duration: 7,
      repeatDelay: 4,
      delay: 2,
      className: "h-20",
    },
    {
      initialX: 1200,
      translateX: 1200,
      duration: 4,
      repeatDelay: 2,
      delay: 4,
      className: "h-5",
    },
    {
      initialX: 1300,
      translateX: 1300,
      duration: 6,
      repeatDelay: 9,
      delay: 6,
      className: "h-6",
    },
    {
      initialX: 1400,
      translateX: 1400,
      duration: 7,
      repeatDelay: 3,
      delay: 5,
      className: "h-8",
    },
    {
      initialX: 1500,
      translateX: 1500,
      duration: 3,
      repeatDelay: 7,
      delay: 7,
      className: "h-25",
    },
  ];

  return (
    <div
      ref={parentRef}
      className={cn(
        "relative flex items-center w-full justify-center overflow-hidden",
        className
      )}
    >
      {beams.map((beam) => (
        <CollisionMechanism
          key={beam.initialX + "beam-idx"}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}
      {children}
      <div
        ref={containerRef}
        className="absolute bottom-0 w-full inset-x-0 pointer-events-none"
        style={{
          boxShadow:
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        }}
      ></div>
    </div>
  );
};

const CollisionMechanism = React.forwardRef(
  ({ parentRef, containerRef, beamOptions = {} }, ref) => {
    const beamRef = useRef(null);
    const [collision, setCollision] = useState({
      detected: false,
      coordinates: null,
    });
    const [beamKey, setBeamKey] = useState(0);
    const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

    useEffect(() => {
      const checkCollision = () => {
        if (
          beamRef.current &&
          containerRef.current &&
          parentRef.current &&
          !cycleCollisionDetected
        ) {
          const beamRect = beamRef.current.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();
          const parentRect = parentRef.current.getBoundingClientRect();

          if (beamRect.bottom >= containerRect.top) {
            const relativeX =
              beamRect.left - parentRect.left + beamRect.width / 2;
            const relativeY = beamRect.bottom - parentRect.top;
            setCollision({
              detected: true,
              coordinates: { x: relativeX, y: relativeY },
            });
            setCycleCollisionDetected(true);
          }
        }
      };

      const animationInterval = setInterval(checkCollision, 50);
      return () => clearInterval(animationInterval);
    }, [cycleCollisionDetected, containerRef]);

    useEffect(() => {
      if (collision.detected && collision.coordinates) {
        setTimeout(() => {
          setCollision({ detected: false, coordinates: null });
          setCycleCollisionDetected(false);
        }, 2000);
        setTimeout(() => setBeamKey((prevKey) => prevKey + 1), 2000);
      }
    }, [collision]);

    return (
      <>
        <motion.div
          key={beamKey}
          ref={beamRef}
          animate="animate"
          initial={{
            translateY: beamOptions.initialY || "-200px",
            translateX: beamOptions.initialX || "0px",
            rotate: beamOptions.rotate || 0,
          }}
          variants={{
            animate: {
              translateY: beamOptions.translateY || "1800px",
              translateX: beamOptions.translateX || "0px",
              rotate: beamOptions.rotate || 0,
            },
          }}
          transition={{
            duration: beamOptions.duration || 8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: beamOptions.delay || 0,
            repeatDelay: beamOptions.repeatDelay || 0,
          }}
          className={cn(
            "absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-green-500 via-cyan-500 to-transparent",
            beamOptions.className
          )}
        />
        <AnimatePresence>
          {collision.detected && collision.coordinates && (
            <Explosion
              key={`${collision.coordinates.x}-${collision.coordinates.y}`}
              style={{
                left: `${collision.coordinates.x}px`,
                top: `${collision.coordinates.y}px`,
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
        </AnimatePresence>
      </>
    );
  }
);

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({ ...props }) => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    <div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-green-500 to-transparent blur-sm"
      ></motion.div>
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{ x: span.directionX, y: span.directionY, opacity: 0 }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-green-500 to-cyan-500"
        />
      ))}
    </div>
  );
};

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
      <FloatingDockDesktop items={navItems} />
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
          className="flex h-12 w-12 items-center justify-center rounded-full bg-green-900 hover:bg-green-100 shadow-lg transition-colors"
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
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: -10,
                    transition: { delay: idx * 0.05 },
                  }}
                  transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-full bg-green-600 hover:bg-green-700 shadow-lg transition-colors pl-4 pr-5 py-2.5"
                  >
                    <div className="h-5 w-5 flex-shrink-0">{item.icon}</div>
                    <span className="text-sm font-medium text-white whitespace-nowrap">
                      {item.title}
                    </span>
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
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex h-16 items-end gap-4 rounded-2xl backdrop-blur-sm px-4 pb-3 shadow-xl"
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
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

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
        className="relative flex aspect-square items-center justify-center rounded-full bg-green-900 hover:bg-cyan-900 transition-colors"
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

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300); // wait a bit before finishing
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10001] flex flex-col items-center justify-center bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Name */}
      <motion.h1
        className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-200 bg-clip-text text-transparent"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Ansif MK
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="mt-4 text-gray-400 text-lg md:text-xl"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Full Stack Developer
      </motion.p>

      {/* Loading bar */}
      <motion.div
        className="mt-10 w-64 h-1 bg-gray-800 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut" }}
        />
      </motion.div>

      <p className="mt-3 text-gray-500 text-sm">{Math.round(progress)}%</p>
    </motion.div>
  );
};

import Profile from "./assets/profile.jpg";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.2, rootMargin: "0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <BackgroundBeamsWithCollision className="bg-gradient-to-r from-black to-green-950 min-h-screen">
      <section
        id="home"
        ref={sectionRef}
        className="min-h-screen flex flex-col md:flex-row justify-center items-center p-6 pt-24 relative overflow-hidden w-full"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-[28rem] md:h-[28rem] bg-cyan-500/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[32rem] md:h-[32rem] bg-green-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-center items-center max-w-5xl mx-auto gap-8 md:gap-16 w-full">
          <div className="flex-shrink-0">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
              <img
                src={Profile}
                alt="Ansif"
                className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full object-cover shadow-2xl hover:shadow-green-500/50 hover:shadow-3xl transition-all duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="text-center md:text-left flex-1">
            <div
              className={`transform transition-all duration-1000 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-gray-200">
                Hi, I'm{" "}
                <span className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-cyan-700 to-cyan-900 bg-clip-text text-transparent drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
                  Ansif
                </span>
              </h1>
             <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6 font-light">
  Full Stack Developer (.NET + React)
</p>

<p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
  I build scalable and high-performance web applications using .NET Core, React, and SQL Server. 
  Experienced in designing secure REST APIs with JWT authentication and developing responsive 
  user interfaces with modern frontend technologies. Passionate about clean architecture, 
  efficient code, and delivering real-world solutions.
</p>
            </div>

            <div
              className={`relative z-10 flex gap-4 mt-8 justify-center md:justify-start transform transition-all duration-1000 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: isVisible ? "500ms" : "0ms",
                pointerEvents: isVisible ? "auto" : "none",
              }}
            >
              {/* <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-900 border-2 border-green-500/30 hover:bg-green-500/20 hover:border-green-500 text-gray-300 hover:text-green-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/30"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-lg bg-green-500 hover:bg-green-600 text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/30"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a> */}
              {/* <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-900 border-2 border-green-500/30 hover:bg-green-500/20 hover:border-green-500 text-gray-300 hover:text-green-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/30"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a> */}
            </div>
          </div>
        </div>
      </section>
    </BackgroundBeamsWithCollision>
  );
};

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <BackgroundBeamsWithCollision className="bg-gradient-to-r from-black to-green-950 min-h-screen flex flex-col md:flex-row justify-center items-center p-6 pt-24 relative overflow-hidden">
      <section id="about" ref={sectionRef}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "700ms" }}
          ></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <div
            className={`backdrop-blur-sm bg-green-950/30 border border-green-100/30 rounded-3xl p-8 md:p-12 shadow-[0_0px_0px_rgba(34,197,94,0.15)] transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="mb-10 relative">
              <div
                className={`absolute -left-4 md:-left-8 top-0 w-1 bg-gradient-to-b from-green-100 to-green-900 rounded-full transition-all duration-1000 ${
                  isVisible ? "h-full" : "h-0"
                }`}
              ></div>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-cyan-900 to-cyan-900 bg-clip-text text-transparent drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
                About Me
              </h2>
              <div
                className={`h-1 w-24 bg-gradient-to-r from-green-100 to-green-900 rounded-full transition-all duration-1000 ${
                  isVisible ? "w-24 opacity-100" : "w-0 opacity-0"
                }`}
              ></div>
            </div>
            <div
              className={`space-y-6 transition-all duration-1000 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: isVisible ? "500ms" : "0ms" }}
            >
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">
                Hello! I’m Ansif MK, a{" "}
                <span className="text-green-400 font-semibold">
                  Full Stack Web Developer{" "}
                </span>{" "}
             Full Stack Developer specializing in React, Redux, and .NET technologies. 
  Experienced in building scalable and responsive web applications using 
  HTML, CSS, JavaScript, Tailwind CSS, Bootstrap, C#, SQL, ADO.NET, and 
  Entity Framework. Focused on writing clean, maintainable code and creating 
  user-centric interfaces that deliver seamless performance across devices.
              </p>

            <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">
  More{" "}
  <span className="text-green-400 font-semibold">About </span>
  <span className="text-green-400 font-semibold">Me</span> — Along with my 
  technical expertise, I bring strong communication and presentation skills. 
  I’m a self-motivated learner who constantly explores new tools and technologies 
  to stay updated in the ever-evolving web development landscape. I completed my 
  Bachelor of Computer Applications (BCA) from Calicut University. This is a 
  brief overview of my journey — thanks for taking the time to read!
</p>
              <div
                className={`grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: isVisible ? "700ms" : "0ms" }}
              >
                <div className="group bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/30 rounded-xl p-6 hover:border-green-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:scale-105 cursor-pointer">
                  <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300">
                    
                  </div>
                  <h3 className="text-green-300 font-bold text-lg mb-2">
                    Innovation
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Creative problem solving and continuous learning
                  </p>
                </div>

                <div className="group bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:scale-105 cursor-pointer">
                  <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300">
                    
                  </div>
                  <h3 className="text-cyan-300 font-bold text-lg mb-2">
                    Performance
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Optimized and efficient solutions
                  </p>
                </div>

                <div className="group bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/30 rounded-xl p-6 hover:border-green-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:scale-105 cursor-pointer">
                  <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300">
                    
                  </div>
                  <h3 className="text-green-300 font-bold text-lg mb-2">
                    Focus
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    User-centric design approach
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BackgroundBeamsWithCollision>
  );
};

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringCard, setIsHoveringCard] = useState(false); // track if any card is hovered
  const sectionRef = useRef(null);

  const skills = [
  {
    name: "HTML5",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  {
    name: "Tailwind CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Bootstrap",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
  },
  {
    name: "C#",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
  },
  {
    name: ".NET",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg",
  },
  {
    name: "SQL Server",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  },
  {
    name: "Figma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  },
];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.2, rootMargin: "0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="bg-gradient-to-r from-black to-green-950 min-h-screen flex items-center justify-center relative overflow-hidden py-20"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 w-full">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-cyan-300 via-cyan-700 to-cyan-900 bg-clip-text text-transparent drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
            My Skills
          </h2>
          <div
            className={`h-1 w-32 bg-gradient-to-r from-green-100 via-green-400 to-green-900 rounded-full mx-auto mt-4 transition-all duration-1000 ${
              isVisible ? "w-32 opacity-100" : "w-0 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          />
        </div>

        <div className="overflow-hidden w-full py-6">
          <div
            className="flex gap-8 w-max animate-scroll-left-right"
            style={{
              animationDuration: `${skills.length * 2}s`,
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
              animationPlayState: isHoveringCard ? "paused" : "running", // 👈 pause when hovering a card
            }}
          >
            {[...skills, ...skills, ...skills].map((skill, index) => (
              <div
                key={`${skill.name}-${index}`}
                className="flex flex-col items-center gap-3 bg-green-900/20 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6 w-32 h-32 md:w-40 md:h-40 shrink-0 hover:border-green-400/60 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all duration-300"
                onMouseEnter={() => setIsHoveringCard(true)}
                onMouseLeave={() => setIsHoveringCard(false)}
              >
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-lg"
                  loading="lazy"
                />
                <span className="text-sm md:text-base font-semibold text-gray-200 whitespace-nowrap">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`text-center mt-10 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <p className="text-gray-400 text-lg">
            Always learning and expanding my toolkit
          </p>
        </div>
      </div>

      <style>{`
        @keyframes scroll-left-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left-right {
          animation: scroll-left-right linear infinite;
        }
      `}</style>
    </section>
  );
};

const Journey = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
          else setIsVisible(false);
        });
      },
      { threshold: 0.15, rootMargin: "0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const milestones = [

      {
  type: "education",
  title: "Bachelor of Computer Applications (BCA)",
  company: "Calicut University",
  date: "2022 – 2025",
  description: [
    "Successfully completed BCA with a focus on software development, databases, and web technologies.",
    "Attended an industrial visit at Spectrum Softtech Solutions Pvt. Ltd., Kochi, to understand real-world IT environments, development workflows, and industry standards."
  ]
},
 {
  type: "work",
  title: "Full Stack Developer Intern",
  company: "Bridgeon Solutions",
  date: "May 2025 – Present",
  description: [
    "Developed RESTful APIs using .NET Core & C# following Clean Architecture principles.",
    "Built responsive and dynamic user interfaces using React, Redux, and Tailwind CSS.",
    "Worked with SQL Server and Entity Framework for database design and management.",
    "Implemented JWT authentication and used Swagger for API documentation and testing.",
    "Collaborated in Agile workflows including sprint planning, code reviews, and testing."
  ],
}

  ];

  return (
    <section className="bg-gradient-to-r from-black to-green-950 min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-4">
      {/* ... */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
        {/* Timeline - improved mobile spacing */}
        <div className="relative border-l-2 border-green-500/30 pl-5 md:pl-12 space-y-10 md:space-y-12">
          {milestones.map((item, index) => (
            <motion.div key={index} /* ... */>
              {/* Timeline dot - adjusted position for mobile */}
              <motion.div
                className="absolute -left-[1.85rem] md:-left-[2.8rem] top-1 w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-br from-green-400 to-cyan-400 border-2 border-green-900 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                /* ... */
              />
              <div className="bg-green-900/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-4 md:p-6">
                <span className="text-xs font-mono text-green-400 bg-green-500/10 px-2 md:px-3 py-1 rounded-full inline-block mb-2">
                  {item.type === "work" ? "Work" : "Education"}
                </span>
                <h3 className="text-lg md:text-2xl font-bold text-white mb-1">
                  {item.title}
                  {item.company && (
                    <span className="text-gray-400 text-sm md:text-lg font-normal ml-1 md:ml-2 block md:inline">
                      @ {item.company}
                    </span>
                  )}
                </h3>
                <p className="text-green-400 text-xs md:text-sm mb-3">{item.date}</p>
                <ul className="space-y-1 md:space-y-2 text-gray-300 text-sm md:text-base list-disc list-inside">
                  {item.description.map((point, i) => (
                    <li key={i} className="leading-relaxed">{point}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
// ======================= CHROMA GRID COMPONENT =======================

const ChromaGrid = ({ items, className = '', radius = 300, damping = 0.45, fadeOut = 0.6, ease = 'power3.out' }) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const data = items?.length ? items : [];

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = e => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardClick = url => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCardMove = e => {
    const c = e.currentTarget;
    const rect = c.getBoundingClientRect();
    c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative w-full h-full flex flex-wrap justify-center items-start gap-3 sm:gap-4 ${className}`}
      style={{
        '--r': `${radius}px`,
        '--x': '50%',
        '--y': '50%'
      }}
    >
      {data.map((c, i) => {
        const imageList = c.images?.length ? c.images : [c.image] || [];

        return (
          <article
            key={i}
            onMouseMove={handleCardMove}
            onClick={() => handleCardClick(c.url)}
            className="group relative flex flex-col w-full sm:w-[300px] rounded-[20px] overflow-hidden border-2 duration-300 cursor-pointer grayscale hover:grayscale-0 transition-all"
            style={{
              '--card-border': c.borderColor || 'transparent',
              background: c.gradient,
              '--spotlight-color': 'rgba(255,255,255,0.3)',
              borderColor: c.borderColor || 'transparent',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
              style={{
                background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'
              }}
            />

            {/* Smooth horizontal slider */}
            <div
              className="relative z-10 w-full aspect-[4/5] overflow-hidden rounded-[10px]"
              onMouseEnter={(e) => {
                const wrapper = e.currentTarget.querySelector('.slider-track');
                const slides = wrapper.children.length;
                if (slides > 1) {
                  let idx = 1;
                  const timer = setInterval(() => {
                    wrapper.style.transition = 'transform 0.5s ease';
                    wrapper.style.transform = `translateX(-${idx * 100}%)`;
                    idx++;
                    if (idx >= slides) {
                      setTimeout(() => {
                        wrapper.style.transition = 'none';
                        wrapper.style.transform = 'translateX(0)';
                        idx = 1;
                      }, 2000);
                    }
                  }, 2500);
                  e.currentTarget.dataset.timer = timer;
                }
              }}
              onMouseLeave={(e) => {
                clearInterval(Number(e.currentTarget.dataset.timer));
                const wrapper = e.currentTarget.querySelector('.slider-track');
                wrapper.style.transition = 'transform 0.5s ease';
                wrapper.style.transform = 'translateX(0)';
              }}
            >
              <div className="slider-track flex h-full w-full">
                {(imageList || []).map((imgSrc, j) => (
                  <div key={j} className="min-w-full h-full flex-shrink-0">
                    <img
                      src={imgSrc}
                      alt={c.title}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-[10px]"
                    />
                  </div>
                ))}
              </div>
            </div>

            <footer className="relative z-10 p-3 text-white font-sans grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">
              <h3 className="m-0 text-[1.05rem] font-semibold">{c.title}</h3>
              {c.handle && <span className="text-[0.95rem] opacity-80 text-right">{c.handle}</span>}
              <p className="m-0 text-[0.85rem] opacity-85">{c.subtitle}</p>
              {c.location && <span className="text-[0.85rem] opacity-85 text-right">{c.location}</span>}
            </footer>
          </article>
        );
      })}
    </div>
  );
};
const Gallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  // Check for mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Touch scroll handling for mobile
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isMobile) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.style.cursor = 'grabbing';
    };

    const handleMouseLeave = () => {
      isDown = false;
      container.style.cursor = 'grab';
    };

    const handleMouseUp = () => {
      isDown = false;
      container.style.cursor = 'grab';
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed
      container.scrollLeft = scrollLeft - walk;
    };

    // Touch events for mobile
    const handleTouchStart = (e) => {
      isDown = true;
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const handleTouchMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
      isDown = false;
    };

    // Add event listeners
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);
    container.style.cursor = 'grab';

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile]);

  const galleryItems = [
    {
      images: [topic, topics],
      title: "Topic presentation",
      subtitle: "",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(180deg, #3B82F6, #000)"
      
    },
    {
      images: [quates, quate],
      title: "Morning Section",
      subtitle: "",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(165deg, #F59E0B, #000)",
      
    },
    {
      images: [intro, introduction],
      title: "Self Introduction",
      subtitle: "",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(165deg, #3B82F6, #000)"
      
    },
  ];

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="bg-gradient-to-r from-black to-green-950 flex items-center justify-center relative overflow-hidden py-12 md:py-20 px-4"
    >
      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className={`text-center mb-8 md:mb-16 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-cyan-300 via-cyan-700 to-cyan-900 bg-clip-text text-transparent">
            Gallery
          </h2>
          <p className="mt-3 md:mt-4 text-sm md:text-lg text-gray-300 max-w-xl mx-auto px-4">
            A visual tour of my work and inspirations
          </p>
          <div className={`h-1 w-24 sm:w-32 bg-gradient-to-r from-green-100 via-green-400 to-green-900 rounded-full mx-auto mt-3 md:mt-4 transition-all duration-1000 ${isVisible ? "w-24 sm:w-32 opacity-100" : "w-0 opacity-0"}`} 
               style={{ transitionDelay: "200ms" }} />
        </div>

        {/* Scroll Indicator for Mobile */}
        {isMobile && (
          <div className="flex justify-center items-center gap-2 mb-4 md:hidden">
            <div className="text-xs text-green-400/70 animate-pulse">
              ← Swipe to scroll →
            </div>
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-green-400/50"></div>
              <div className="w-1 h-1 rounded-full bg-green-400/50"></div>
              <div className="w-1 h-1 rounded-full bg-green-400/50"></div>
            </div>
          </div>
        )}

        {/* Scrollable Container */}
        <div 
          ref={scrollContainerRef}
          className={`w-full ${isMobile ? 'overflow-x-auto scroll-smooth hide-scrollbar' : 'overflow-x-auto md:overflow-visible'}`}
         
        >
          <div className={`${isMobile ? 'flex gap-4 w-max px-2' : 'w-full'}`}>
            {isMobile ? (
              // Mobile: Horizontal scroll layout
              galleryItems.map((item, index) => (
                <div 
                  key={index}
                  className="w-[280px] sm:w-[320px] flex-shrink-0 transform transition-all duration-300 hover:scale-105"
                >
                  <div className="bg-gradient-to-br from-green-900/20 to-transparent backdrop-blur-sm border border-green-500/20 rounded-2xl overflow-hidden hover:border-green-400/60 transition-all duration-300">
                    {/* Image Slider for Mobile */}
                    <div className="relative w-full aspect-[4/5] overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="text-sm text-gray-400">{item.subtitle}</p>
                      )}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-3 text-sm text-green-400 hover:text-green-300 transition-colors"
                      >
                        View Details
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Desktop: Original ChromaGrid layout
              <ChromaGrid
                items={galleryItems}
                radius={200}
                damping={0.45}
                fadeOut={0.6}
                ease="power3.out"
                className="!flex !justify-center"
              />
            )}
          </div>
        </div>

        {/* Scroll Bar Styling */}
        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            height: 4px;
          }
          .hide-scrollbar::-webkit-scrollbar-track {
            background: rgba(34, 197, 94, 0.1);
            border-radius: 10px;
          }
          .hide-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(34, 197, 94, 0.5);
            border-radius: 10px;
          }
          .hide-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(34, 197, 94, 0.8);
          }
        `}</style>
      </div>
    </section>
  );
};//per to handle keyboard keys inside lightbox
const KeyboardHandler = ({ onPrev, onNext, onClose }) => {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onPrev, onNext, onClose]);
  return null;
};

const Projects = () => {
  const [isVisible, setIsVisible] = useState({});
  const [hoveredId, setHoveredId] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [id]: true }));
          } else {
            setIsVisible((prev) => ({ ...prev, [id]: false }));
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px" }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const projects = [
        {
          id: 1,
          title: "E-Commerce Platform Apple Cart",
          description:
            "Full-stack shopping experience with secure payments and order tracking.",
          image: apple,
          link: "https://applecartecom.vercel.app",
          tech: "React • Tailwind • Firebase",
        },
        {
          id: 2,
          title: "Zayk - Task Management App",
          description:
            "mobile case task management app with intuitive UI and seamless performance.",
          image: Zayk,
          link: "https://zayq.vercel.app/",
          tech: "React • Tailwind • Firebase",
        }
  ];

  return (
    <section 
      id="projects"  // ← ADD THIS ID ATTRIBUTE
      className="bg-gradient-to-r from-black to-green-950 min-h-screen flex flex-col justify-center items-center p-4 md:p-6 pt-24 relative overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full px-4">
        <div className="animate-on-scroll mb-12 md:mb-20 transition-all duration-1000 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-cyan-700 to-cyan-900 bg-clip-text text-transparent">
            My Projects
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mt-2 md:mt-4">
            A collection of projects that showcase creativity and technical excellence
          </p>
        </div>
        
        <div className="space-y-16 md:space-y-24">
          {projects.map((project, index) => (
            <div
              key={project.id}
              id={`project-${project.id}`}
              className={`animate-on-scroll transition-all duration-1000 flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-6 md:gap-12 items-center group`}
            >
              <div className="w-full md:w-1/2">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 sm:h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2 space-y-3 md:space-y-6 text-center md:text-left">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full text-xs md:text-sm font-medium mb-2 md:mb-4 bg-green-500/10 border border-green-500/30 text-green-400">
                    Project {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-lg leading-relaxed text-gray-300 mb-3 md:mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4 md:mb-6 justify-center md:justify-start">
                    {project.tech.split(" • ").map((tech, i) => (
                      <span key={i} className="px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-mono bg-green-500/10 border border-green-500/30 text-green-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 md:px-8 py-2.5 md:py-4 rounded-full font-semibold bg-gradient-to-r from-green-500 to-cyan-500 text-white hover:shadow-2xl hover:shadow-green-500/50 transition-all text-sm md:text-base"
                  >
                    View Project
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="animate-on-scroll mt-16 md:mt-32 text-center px-4">
          <div className="inline-block p-5 md:p-8 rounded-2xl bg-gradient-to-br from-green-800/50 to-cyan-800/30 border border-green-500/30">
            <h3 className="text-lg md:text-3xl font-bold text-white mb-2 md:mb-4">
              Interested in collaborating?
            </h3>
            <p className="text-sm md:text-lg text-gray-300 mb-4 md:mb-8">
              Let's create something amazing together
            </p>
            <a
              href="#contact"
              className="inline-block px-6 md:px-10 py-2.5 md:py-4 bg-gradient-to-r from-green-400 to-cyan-400 text-black rounded-full font-bold hover:shadow-2xl hover:shadow-green-500/50 transition-all text-sm md:text-base"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export const Contact = () => {
  const form = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    if (!form.current) return;

    emailjs
      .sendForm(
        "service_gk5b2to",
        "template_mctveic",
        form.current,
        "zZU9D6KlQyEiFl5Es"
      )
      .then(
        () => toast.success("Message sent successfully ✨"),
        () => toast.error("Failed to send message. Please try again.")
      );

    e.target.reset();
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-gradient-to-r from-black to-green-950 min-h-screen flex items-center justify-center relative overflow-hidden py-16 md:py-20"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-green-600/10 rounded-full blur-3xl" />
        <div className="absolute top-20 left-10 w-64 h-64 md:w-96 md:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-64 h-64 md:w-96 md:h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-cyan-700 to-cyan-900 bg-clip-text text-transparent drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
            Get In Touch
          </h2>
          <p className="mt-3 md:mt-4 text-sm md:text-lg text-gray-300 max-w-xl mx-auto">
            Have a project in mind? Let's work together to make something great.
          </p>
          <div className={`h-1 w-24 sm:w-32 bg-gradient-to-r from-green-100 via-green-400 to-green-900 rounded-full mx-auto mt-4 md:mt-6 transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-12 items-start">
          {/* Contact Info (left) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6 md:space-y-8"
          >
            <div className="space-y-4 md:space-y-5">
              {/* Email */}
              <div className="flex items-start gap-3 md:gap-4 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-all duration-300 flex-shrink-0">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base md:text-lg">Email</h3>
                  <p className="text-sm md:text-base text-gray-400 break-all hover:text-green-400 transition-colors duration-300">
                    mkmohammedansif@gmail.com
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 md:gap-4 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-all duration-300 flex-shrink-0">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base md:text-lg">Location</h3>
                  <p className="text-sm md:text-base text-gray-400 group-hover:text-green-400 transition-colors duration-300">
                    Kerala, India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 md:gap-4 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-all duration-300 flex-shrink-0">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base md:text-lg">Phone</h3>
                  <p className="text-sm md:text-base text-gray-400 group-hover:text-green-400 transition-colors duration-300">
                    +91 90481 26169
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 md:pt-6">
              <h3 className="text-white font-semibold text-base md:text-lg mb-3 md:mb-4">Connect with me</h3>
              <div className="flex gap-3 md:gap-4">
                <a 
                  href="https://github.com/ansifmk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-500/20 flex items-center justify-center hover:bg-green-500/40 transition-all duration-300 hover:scale-110 hover:rotate-6 group"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-green-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/in/ansif-mk/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-500/20 flex items-center justify-center hover:bg-green-500/40 transition-all duration-300 hover:scale-110 hover:rotate-6 group"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-green-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/mr.4nsif?igsh=MWQyY3E4bzg4YXYzbg==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-500/20 flex items-center justify-center hover:bg-green-500/40 transition-all duration-300 hover:scale-110 hover:rotate-6 group"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-green-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="pt-4 md:pt-6">
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-full bg-green-500/10 border border-green-500/30">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-xs md:text-sm text-green-400 font-medium">Available for work</span>
              </div>
            </div>
          </motion.div>

          {/* Form (right) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl hover:shadow-green-500/10 transition-all duration-500">
              <form ref={form} onSubmit={sendEmail} className="space-y-5 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label htmlFor="user_name" className="block text-sm md:text-base font-medium text-gray-300 mb-1.5 md:mb-2">
                      Your Name <span className="text-green-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      required
                      placeholder="Ansif MK"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 md:px-5 py-2.5 md:py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:bg-white/10 text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label htmlFor="user_email" className="block text-sm md:text-base font-medium text-gray-300 mb-1.5 md:mb-2">
                      Email Address <span className="text-green-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      required
                      placeholder="ansif@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 md:px-5 py-2.5 md:py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:bg-white/10 text-sm md:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm md:text-base font-medium text-gray-300 mb-1.5 md:mb-2">
                    Message <span className="text-green-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 md:px-5 py-2.5 md:py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:bg-white/10 text-sm md:text-base resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 md:py-4 px-6 rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center justify-center gap-2 group transform hover:scale-[1.02] active:scale-95"
                >
                  <span className="text-sm md:text-base">Send Message</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <p className="text-xs md:text-sm text-gray-500 text-center mt-4">
                  I'll get back to you within 24 hours ✨
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #22c55e',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </section>
  );
};
const GradientTrailCursor = () => {
  const cursorRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const spring = 0.1;   // higher = faster catch-up
    const friction = 0.4; // lower = more bouncy

    // quick setters for the dot
    const setX = gsap.quickSetter(cursorRef.current, "x", "px");
    const setY = gsap.quickSetter(cursorRef.current, "y", "px");

    // spawn particles based on velocity
    let lastSpawn = 0;
    const spawnInterval = 20; // ms between particles

    const animate = () => {
      // spring physics
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;
      vel.current.x += dx * spring;
      vel.current.y += dy * spring;
      vel.current.x *= (1 - friction);
      vel.current.y *= (1 - friction);
      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y;
      setX(pos.current.x);
      setY(pos.current.y);

      // spawn particle if enough time and speed
      const now = Date.now();
      const speed = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2);
      if (now - lastSpawn > spawnInterval && speed > 1) {
        spawnParticle(pos.current.x, pos.current.y);
        lastSpawn = now;
      }

      requestAnimationFrame(animate);
    };

    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", move);
    const anim = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(anim);
    };
  }, [isMobile]);

  const spawnParticle = (x, y) => {
    const particle = document.createElement("div");
    const colors = ["#34d399", "#22d3ee", "#a78bfa", "#f472b6"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.className = "fixed pointer-events-none z-[9999] rounded-full";
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.width = "5px";
    particle.style.height = "5px";
    particle.style.background = color;
    particle.style.transform = "translate(-50%, -50%)";
    particle.style.boxShadow = `0 0 6px ${color}`;
    document.body.appendChild(particle);

    gsap.to(particle, {
      opacity: 0,
      scale: 0.5,
      duration: 0.7,
      ease: "power2.out",
      onComplete: () => particle.remove(),
    });
  };

  // Hover scale for interactive elements
  useEffect(() => {
    if (isMobile) return;
    const enter = () => {
      gsap.to(cursorRef.current, { scale: 1.5, duration: 0.2 });
    };
    const leave = () => {
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
    };
    const hooks = document.querySelectorAll("a, button, .hoverable");
    hooks.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    return () => {
      hooks.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 shadow-lg"
        style={{
          transform: "translate(-50%, -50%)",
          willChange: "transform, left, top",
        }}
      />
    </>
  );
};
export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Show loading screen while loading is true */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Main app – only visible after loading finishes */}
      {!loading && (
        <>
          <GradientTrailCursor />
          <Navbar />
          <Hero />
          <About />
          <Journey />
          <Gallery />
          <Skills />
          <Projects />
          <Contact />
        </>
      )}
    </>
  );
}
