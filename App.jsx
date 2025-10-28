import React, { useState, useEffect, useRef, Profiler } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  Menu,
  ArrowRight,
  Import,
  AppleIcon,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { Toaster, toast } from "react-hot-toast";

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
                Frontend Developer | React Enthusiast
              </p>
              <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
                I create elegant and efficient web solutions with a focus on
                user experience and clean code. Passionate about building
                responsive, modern web applications with the latest
                technologies.
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
              <a
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
              </a>
              <a
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
              </a>
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
                specializing in React, Redux, .NET, and modern frontend and
                backend technologies. I have strong expertise in HTML, CSS,
                JavaScript, React, Redux, Bootstrap, Tailwind CSS, C#, .NET,
                SQL, ADO.NET, and Entity Framework. With hands-on experience in
                developing responsive, accessible, and scalable web
                applications, I focus on writing clean, maintainable code and
                building user-centric interfaces that ensure seamless
                performance across devices.
              </p>

              <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">
                More{" "}
                <span className="text-green-400 font-semibold">About </span>,{" "}
                <span className="text-green-400 font-semibold">Me</span>
                Along with my technical expertise, I possess strong presentation
                and communication skills. I’m a self-motivated learner who
                continuously explores new tools, frameworks, and technologies to
                stay ahead in the fast-evolving web development ecosystem. I
                have completed my Bachelor of Computer Applications (BCA) from
                Calicut University. That’s a brief overview of my professional
                journey — thank you for reading!
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
                    💡
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
                    ⚡
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
                    🎯
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
  const [animatedSkills, setAnimatedSkills] = useState({});
  const sectionRef = useRef(null);

  const skills = [
    {
      name: "HTML5",
      level: 95,
      color: "from-orange-500 to-red-500",
      glow: "shadow-[0_0_30px_rgba(249,115,22,0.3)]",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    },
    {
      name: "CSS3",
      level: 90,
      color: "from-blue-500 to-cyan-500",
      glow: "shadow-[0_0_30px_rgba(6,182,212,0.3)]",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    },
    {
      name: "JavaScript",
      level: 88,
      color: "from-yellow-400 to-orange-500",
      glow: "shadow-[0_0_30px_rgba(250,204,21,0.3)]",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    },
    {
      name: "React",
      level: 85,
      color: "from-cyan-400 to-blue-500",
      glow: "shadow-[0_0_30px_rgba(34,211,238,0.3)]",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    },
    {
      name: "Tailwind CSS",
      level: 92,
      color: "from-sky-400 to-blue-600",
      glow: "shadow-[0_0_30px_rgba(56,189,248,0.3)]",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "Git",
      level: 87,
      color: "from-orange-600 to-red-600",
      glow: "shadow-[0_0_30px_rgba(234,88,12,0.3)]",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    },
    {
      name: "Figma",
      level: 90,
      color: "from-pink-500 to-purple-600",
      glow: "shadow-[0_0_30px_rgba(217,70,239,0.3)]",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    },
    {
      name: "Bootstrap",
      level: 85,
      color: "from-purple-700 to-indigo-700",
      glow: "shadow-[0_0_30px_rgba(111,66,193,0.3)]",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setAnimatedSkills({});
            skills.forEach((skill, index) => {
              setTimeout(() => {
                setAnimatedSkills((prev) => ({
                  ...prev,
                  [skill.name]: true,
                }));
              }, index * 100);
            });
          } else {
            setIsVisible(false);
            setAnimatedSkills({});
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

      <section id="skills" ref={sectionRef}
      className=" bg-gradient-to-r from-black to-green-950 min-h-screen flex flex-col md:flex-row justify-center items-center p-6 pt-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl w-full">
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-cyan-300 via-cyan-700 to-cyan-900 bg-clip-text text-transparent drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
              My Skills
            </h2>

            <div
              className={`h-1 w-32 bg-gradient-to-r from-green-100 via-green-400 to-green-900 rounded-full mx-auto transform transition-all duration-1000 ${
                isVisible ? "w-32 opacity-100" : "w-0 opacity-0"
              }`}
              style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
            ></div>

            <p className="text-gray-400 mt-6 text-lg md:text-xl">
              Technologies I work with
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`group relative transform transition-all duration-700 ${
                  animatedSkills[skill.name]
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative bg-gradient-to-br from-green-500/10 to-green-100/5 backdrop-blur-sm border border-green-500/30 hover:border-green-500/60 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:bg-green-500/5 h-full">
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${skill.glow} blur-xl`}
                  ></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-4 mx-auto filter drop-shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <img
                        src={skill.logo}
                        alt={`${skill.name} logo`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-white mb-4 text-center transform transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-cyan-400 flex-1">
                      {skill.name}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Proficiency</span>
                        <span className="text-green-400 font-semibold">
                          {skill.level}%
                        </span>
                      </div>

                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-green-500/20">
                        <div
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative transform origin-left transition-all duration-1000 ease-out`}
                          style={{
                            width: animatedSkills[skill.name]
                              ? `${skill.level}%`
                              : "0%",
                            transitionDelay: `${index * 50}ms`,
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
          <div
            className={`text-center mt-16 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: isVisible ? "500ms" : "0ms" }}
          >
            <p className="text-gray-400 text-lg mb-6">
              Always learning and expanding my toolkit
            </p>
            <div className="inline-flex items-center gap-2 text-green-400 font-semibold hover:text-cyan-400 transition-colors duration-300 group cursor-pointer">
              <span>Explore my projects</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </div>
          </div>
        </div>
      </section>
  );
};

import goibibo from "./assets/goibibo.jpg"
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
      image: "\apple.png",
      link: "https://applecartecom.vercel.app",
      tech: "React • Tailwind • Firebase",
    },
    {
      id: 2,
      title: "Goibibo Website",
      description:
        "Built a responsive frontend clone of the Goibibo travel website using HTML and CSS. Included key pages like home, hotel booking, flight booking, and login/signup.",
      image: "goibibo.jpg",
      link: "https://github.com/yourusername/project2",
      tech: "HTML • CSS • JavaScript",
    },
    {
      id: 3,
      title: "Portfolio Website",
      description:
        "This responsive portfolio site showcases my skills, projects, and contact info. Built with modern technologies and best practices.",
      image: "\Screenshot 2025-10-24 163530.png",
      link: "https://github.com/yourusername/project3",
      tech: "React • Tailwind • Framer Motion",
    },
  ];

  return (
    <section
      id="projects"
      className=" bg-gradient-to-r from-black to-green-950 min-h-screen flex flex-col md:flex-row justify-center items-center p-6 pt-24 relative overflow-hidden"
    >
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

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div
          className="animate-on-scroll mb-20 transition-all duration-1000"
          id="header"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-cyan-700 to-cyan-900 bg-clip-text text-transparent drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
            My Projects
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl">
            A collection of projects that showcase creativity and technical
            excellence
          </p>
        </div>
        <div className="space-y-24">
          {projects.map((project, index) => (
            <div
              key={project.id}
              id={`project-${project.id}`}
              className={`animate-on-scroll transition-all duration-1000 flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 sm:gap-12 items-center group`}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                opacity: isVisible[`project-${project.id}`] ? 1 : 0,
                transform: isVisible[`project-${project.id}`]
                  ? "translateX(0)"
                  : index % 2 === 0
                  ? "translateX(-60px)"
                  : "translateX(60px)",
                transitionDelay: "200ms",
              }}
            >
              <div className="w-full md:w-1/2">
                <div
                  className={`relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl transition-all duration-500 border border-green-500/20 ${
                    hoveredId === project.id
                      ? "shadow-green-500/70 border-green-500/60 scale-105 image-hover-shine"
                      : "group-hover:shadow-green-500/50 group-hover:border-green-500/60"
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-60 sm:h-80 object-cover transition-transform duration-700 ${
                      hoveredId === project.id
                        ? "scale-110 rotate-2"
                        : "group-hover:scale-110 group-hover:rotate-2"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
                      hoveredId === project.id
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  ></div>
                </div>
              </div>

              <div className="w-full md:w-1/2 space-y-4 sm:space-y-6">
                <div>
                  <div
                    className={`inline-block px-3 sm:px-4 py-1 rounded-full text-sm font-medium mb-3 sm:mb-4 transition-all duration-300 ${
                      hoveredId === project.id
                        ? "bg-green-500/30 border border-green-500/70 text-green-200 scale-110 animate-bounce"
                        : "bg-green-500/10 border border-green-500/30 text-green-400 animate-bounce"
                    }`}
                  >
                    Project {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3
                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold transition-all duration-300 title-hover-glow cursor-default ${
                      hoveredId === project.id
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cyan-300 scale-105"
                        : "text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-cyan-400"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`text-base sm:text-lg leading-relaxed transition-all duration-300 ${
                      hoveredId === project.id
                        ? "text-gray-200 translate-x-1"
                        : "text-gray-300"
                    }`}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {project.tech.split(" • ").map((tech, i) => (
                      <span
                        key={i}
                        className={`px-2 sm:px-3 py-1 rounded-full text-sm font-mono transition-all duration-300 ${
                          hoveredId === project.id
                            ? "bg-green-500/40 border border-green-500/80 text-green-100 scale-110"
                            : "bg-green-500/10 border border-green-500/30 text-green-300 hover:border-green-500/60 hover:bg-green-500/20"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 shadow-lg button-hover-glow transform ${
                      hoveredId === project.id
                        ? "bg-gradient-to-r from-green-400 to-cyan-400 text-black shadow-2xl shadow-green-500/70 scale-110 translate-x-3"
                        : "bg-gradient-to-r from-green-500 to-cyan-500 text-white hover:shadow-2xl hover:shadow-green-500/50 hover:translate-x-2"
                    } group/btn text-sm sm:text-base`}
                  >
                    View Project
                    <ArrowRight
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                        hoveredId === project.id
                          ? "translate-x-2"
                          : "group-hover/btn:translate-x-1"
                      }`}
                    />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="animate-on-scroll mt-24 sm:mt-32 text-center transition-all duration-1000"
          id="cta"
          style={{
            opacity: isVisible.cta ? 1 : 0,
            transform: isVisible.cta ? "scale(1)" : "scale(0.9)",
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
        () => toast.success("Message sent successfully "),
        () => toast.error("Failed to send message . Please try again.")
      );

    e.target.reset();
  };

  return (
    <BackgroundBeamsWithCollision className=" bg-gradient-to-r from-black to-green-950 min-h-screen flex flex-col md:flex-row justify-center items-center p-6 pt-24 relative overflow-hidden">
      <section id="contact" ref={sectionRef}>
        <style>{`
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
        .input-animate:focus {
          animation: inputFocus 0.3s ease-out;
        }
        .btn-pulse:hover {
          animation: buttonPulse 1s infinite;
        }
      `}</style>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <h1 className="mt-95 text-[12rem] sm:text-[16rem] md:text-[20rem] lg:text-[24rem] xl:text-[28rem] font-extrabold bg-gradient-to-t from-cyan-100 via-cyan-500 to-white bg-clip-text text-transparent opacity-8 select-none whitespace-nowrap">
            ANSIF
          </h1>
        </div>

        <Toaster position="top-center" />

        <div className="w-full max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div
              className={`text-center lg:text-left transition-all duration-1000 ease-out ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-20"
              }`}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Get In{" "}
                <span className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-cyan-700 to-cyan-900 bg-clip-text text-transparent drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
                  Touch
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                Let's create something amazing together
              </p>
            </div>

            <div
              className={`transition-all duration-1000 ease-out ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-20"
              }`}
            >
              <div className="bg-white rounded-3xl p-5 sm:p-10 lg:p-4 shadow-3xl border-l-8 border-emerald-500 hover:shadow-3xl transition-all duration-300">
                <form ref={form} onSubmit={sendEmail} className="space-y-8">
                  <div
                    className={`transition-all duration-700 ease-out ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{
                      transitionDelay: isVisible ? "200ms" : "0ms",
                    }}
                  >
                    <label
                      htmlFor="user_name"
                      className="block text-base font-semibold text-gray-800 mb-3"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      placeholder=""
                      required
                      className="input-animate w-full rounded-2xl px-0 py-3 bg-transparent shadow appearance-none border-b-2 border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-0 transition-all duration-300 text-base"
                    />
                  </div>
                  <div
                    className={`transition-all duration-700 ease-out ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{
                      transitionDelay: isVisible ? "300ms" : "0ms",
                    }}
                  >
                    <label
                      htmlFor="user_email"
                      className="block text-base font-semibold text-gray-800 mb-3"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      placeholder=""
                      required
                      className="input-animate rounded-2xl w-full px-0 py-3 bg-transparent shadow appearance-none border-b-2 border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-0 transition-all duration-300 text-base"
                    />
                  </div>
                  <div
                    className={`transition-all duration-700 ease-out ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{
                      transitionDelay: isVisible ? "400ms" : "0ms",
                    }}
                  >
                    <label
                      htmlFor="message"
                      className="block text-base font-semibold text-gray-800 mb-3"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder=""
                      required
                      className="input-animate rounded-2xl w-full px-0 py-3 bg-transparent  shadow appearance-none border-b-2 border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-0 resize-none transition-all duration-300 text-base"
                    ></textarea>
                  </div>

                  <div
                    className={`flex justify-center sm:justify-end transition-all duration-700 ease-out ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{
                      transitionDelay: isVisible ? "500ms" : "0ms",
                    }}
                  >
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
    </BackgroundBeamsWithCollision>
  );
};

const SnakeCursor = () => {
  const [trail, setTrail] = useState(Array(20).fill({ x: -100, y: -100 }));
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Create sparkle particles randomly
      if (Math.random() > 0.7) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: mouseX + (Math.random() - 0.5) * 30,
          y: mouseY + (Math.random() - 0.5) * 30,
          size: Math.random() * 6 + 3,
          duration: Math.random() * 800 + 600,
        };
        
        setParticles(prev => [...prev, newParticle]);
        
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, newParticle.duration);
      }
    };

    const animateTrail = () => {
      setTrail((prevTrail) => {
        const newTrail = [...prevTrail];
        newTrail[0] = { x: mouseX, y: mouseY };
        
        for (let i = 1; i < newTrail.length; i++) {
          const prev = newTrail[i - 1];
          const current = newTrail[i];
          
          const dx = prev.x - current.x;
          const dy = prev.y - current.y;
          
          newTrail[i] = {
            x: current.x + dx * 0.2,
            y: current.y + dy * 0.2,
          };
        }
        
        return newTrail;
      });
      
      requestAnimationFrame(animateTrail);
    };

    window.addEventListener("mousemove", handleMouseMove);
    const animation = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animation);
    };
  }, []);

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
        @keyframes sparkle {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
            opacity: 0;
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
      `}</style>
      
      {/* Main snake trail with vibrant colors */}
      {trail.map((pos, index) => {
        const size = 15  - (index * 0.7);
        const opacity = 1 - (index * 0.045);
        
        // Rainbow gradient colors
        const colors = [
          { from: '#ffffffff', to: '#98ffa4ff' },
          { from: '#5eff2cff', to: '#1f9b18ff' },
          { from: '#016115ff', to: '#1fa9aeff' },
          { from: '#61cff0ff', to: '#00df94ff' },
          { from: '#7c89ffff', to: '#06b6d4' },
        ];
        
        const colorIndex = Math.floor((index / trail.length) * colors.length);
        const color = colors[colorIndex] || colors[0];
        
        return (
          <div
            key={index}
            className="fixed pointer-events-none z-[9999] rounded-full"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              width: `${size}px`,
              height: `${size}px`,
              background: `radial-gradient(circle, ${color.from} 0%, ${color.to} 100%)`,
              opacity: opacity,
              transform: 'translate(-50%, -50%)',
              boxShadow: `
                0 0 ${size * 2}px ${color.from},
                0 0 ${size * 3}px ${color.to},
                inset 0 0 ${size}px rgba(255,255,255,0.3)
              `,
            }}
          />
        );
      })}
      
      <div
        className="fixed pointer-events-none z-[10000] rounded-full"
        style={{
          left: `${trail[0].x}px`,
          top: `${trail[0].y}px`,
          width: '24px',
          height: '24px',
          background: 'radial-gradient(circle, #ffffff 0%, #06b6d4 50%, #8b5cf6 100%)',
          transform: 'translate(-50%, -50%)',
          boxShadow: `
            0 0 20px #c9ffc3ff,
            0 0 40px #77ff8cff,
            0 0 60px #47c530ff,
            inset 0 0 15px rgba(16, 80, 12, 0.8)
          `,
          animation: 'pulse 1s ease-in-out infinite',
        }}
      />
      
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `sparkle ${particle.duration}ms ease-out forwards`,
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle, #ffffff 0%, #06b6d4 40%, transparent 70%)',
              boxShadow: '0 0 10px #06b6d4, 0 0 20px #8b5cf6',
            }}
          />
        </div>
      ))}
      
      {/* Large ambient glow */}
      <div
        className="fixed pointer-events-none z-[9997] rounded-full blur-3xl"
        style={{
          left: `${trail[0].x}px`,
          top: `${trail[0].y}px`,
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(139, 92, 246, 0.3) 50%, rgba(236, 72, 153, 0.2) 100%)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};

export default function App() {
  return (
    <>
      <SnakeCursor />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}