import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { gsap } from "gsap";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate, // ← new
  useVelocity, // ← new
  useAnimationControls, // ← new
} from "framer-motion";

import {
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  Menu,
  ArrowRight,
  MapPin,
  Phone,
  Import,
  AppleIcon,
} from "lucide-react";
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
import image from "./assets/image.png";


// No screenshot import needed – we'll use a placeholder URL

// const BackgroundBeamsWithCollision = ({ children, className }) => {
//   const containerRef = useRef(null);
//   const parentRef = useRef(null);

//   const beams = [
//     { initialX: 10, translateX: 10, duration: 7, repeatDelay: 3, delay: 2 },
//     { initialX: 40, translateX: 40, duration: 3, repeatDelay: 3, delay: 4 },
//     {
//       initialX: 70,
//       translateX: 70,
//       duration: 7,
//       repeatDelay: 7,
//       className: "h-6",
//     },
//     { initialX: 90, translateX: 90, duration: 5, repeatDelay: 14, delay: 4 },
//     {
//       initialX: 110,
//       translateX: 110,
//       duration: 11,
//       repeatDelay: 2,
//       className: "h-20",
//     },
//     {
//       initialX: 150,
//       translateX: 150,
//       duration: 4,
//       repeatDelay: 2,
//       className: "h-12",
//     },
//     {
//       initialX: 190,
//       translateX: 190,
//       duration: 4,
//       repeatDelay: 4,
//       delay: 2,
//       className: "h-6",
//     },
//     {
//       initialX: 250,
//       translateX: 250,
//       duration: 9,
//       repeatDelay: 5,
//       delay: 3,
//       className: "h-6",
//     },
//     {
//       initialX: 300,
//       translateX: 300,
//       duration: 2,
//       repeatDelay: 8,
//       delay: 4,
//       className: "h-6",
//     },
//     {
//       initialX: 350,
//       translateX: 350,
//       duration: 2,
//       repeatDelay: 8,
//       delay: 4,
//       className: "h-6",
//     },
//     {
//       initialX: 400,
//       translateX: 400,
//       duration: 7,
//       repeatDelay: 7,
//       delay: 2,
//       className: "h-6",
//     },
//     {
//       initialX: 500,
//       translateX: 500,
//       duration: 8,
//       repeatDelay: 6,
//       delay: 4,
//       className: "h-12",
//     },
//     {
//       initialX: 600,
//       translateX: 600,
//       duration: 3,
//       repeatDelay: 5,
//       delay: 9,
//       className: "h-6",
//     },
//     {
//       initialX: 700,
//       translateX: 700,
//       duration: 8,
//       repeatDelay: 9,
//       delay: 3,
//       className: "h-13",
//     },
//     {
//       initialX: 800,
//       translateX: 800,
//       duration: 7,
//       repeatDelay: 4,
//       delay: 5,
//       className: "h-6",
//     },
//     {
//       initialX: 900,
//       translateX: 900,
//       duration: 9,
//       repeatDelay: 12,
//       delay: 7,
//       className: "h-6",
//     },
//     {
//       initialX: 1000,
//       translateX: 1000,
//       duration: 7,
//       repeatDelay: 4,
//       delay: 2,
//       className: "h-20",
//     },
//     {
//       initialX: 1200,
//       translateX: 1200,
//       duration: 4,
//       repeatDelay: 2,
//       delay: 4,
//       className: "h-5",
//     },
//     {
//       initialX: 1300,
//       translateX: 1300,
//       duration: 6,
//       repeatDelay: 9,
//       delay: 6,
//       className: "h-6",
//     },
//     {
//       initialX: 1400,
//       translateX: 1400,
//       duration: 7,
//       repeatDelay: 3,
//       delay: 5,
//       className: "h-8",
//     },
//     {
//       initialX: 1500,
//       translateX: 1500,
//       duration: 3,
//       repeatDelay: 7,
//       delay: 7,
//       className: "h-25",
//     },
//   ];

//   return (
//     <div
//       ref={parentRef}
//       className={cn(
//         "relative flex items-center w-full justify-center overflow-hidden",
//         className,
//       )}
//     >
//       {beams.map((beam) => (
//         <CollisionMechanism
//           key={beam.initialX + "beam-idx"}
//           beamOptions={beam}
//           containerRef={containerRef}
//           parentRef={parentRef}
//         />
//       ))}
//       {children}
//       <div
//         ref={containerRef}
//         className="absolute bottom-0 w-full inset-x-0 pointer-events-none"
//         style={{
//           boxShadow:
//             "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
//         }}
//       ></div>
//     </div>
//   );
// };

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
            "absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-blue-500 via-cyan-500 to-transparent",
            beamOptions.className,
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
  },
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
        className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-sm"
      ></motion.div>
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{ x: span.directionX, y: span.directionY, opacity: 0 }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-blue-500 to-cyan-500"
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
          className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg transition-colors"
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
                    className="flex items-center gap-3 rounded-full bg-blue-900 hover:bg-blue-600 shadow-lg transition-colors pl-4 pr-5 py-2.5"
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
    [20, 40, 20],
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
        className="relative flex aspect-square items-center justify-center rounded-full bg-blue-900 hover:bg-blue-300 transition-colors"
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Name */}
      <motion.h1
        className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-200 bg-clip-text text-transparent"
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
          className="h-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut" }}
        />
      </motion.div>

      <p className="mt-3 text-gray-500 text-sm">{Math.round(progress)}%</p>
    </motion.div>
  );
};



// ── DecryptedText (your original, untouched) ──────────────────────────────────

const DecryptedText = ({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  clickMode = "once",
  ...props
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== "click");
  const [direction, setDirection] = useState("forward");

  const containerRef = useRef(null);
  const orderRef = useRef([]);
  const pointerRef = useRef(0);
  const intervalRef = useRef(null);

  const availableChars = useMemo(() => {
    return useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
      : characters.split("");
  }, [useOriginalCharsOnly, text, characters]);

  const shuffleText = useCallback(
    (originalText, currentRevealed) => {
      return originalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (currentRevealed.has(i)) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join("");
    },
    [availableChars]
  );

  const computeOrder = useCallback(
    (len) => {
      const order = [];
      if (len <= 0) return order;
      if (revealDirection === "start") {
        for (let i = 0; i < len; i++) order.push(i);
        return order;
      }
      if (revealDirection === "end") {
        for (let i = len - 1; i >= 0; i--) order.push(i);
        return order;
      }
      const middle = Math.floor(len / 2);
      let offset = 0;
      while (order.length < len) {
        if (offset % 2 === 0) {
          const idx = middle + offset / 2;
          if (idx >= 0 && idx < len) order.push(idx);
        } else {
          const idx = middle - Math.ceil(offset / 2);
          if (idx >= 0 && idx < len) order.push(idx);
        }
        offset++;
      }
      return order.slice(0, len);
    },
    [revealDirection]
  );

  const fillAllIndices = useCallback(() => {
    const s = new Set();
    for (let i = 0; i < text.length; i++) s.add(i);
    return s;
  }, [text]);

  const removeRandomIndices = useCallback((set, count) => {
    const arr = Array.from(set);
    for (let i = 0; i < count && arr.length > 0; i++) {
      const idx = Math.floor(Math.random() * arr.length);
      arr.splice(idx, 1);
    }
    return new Set(arr);
  }, []);

  const encryptInstantly = useCallback(() => {
    const emptySet = new Set();
    setRevealedIndices(emptySet);
    setDisplayText(shuffleText(text, emptySet));
    setIsDecrypted(false);
  }, [text, shuffleText]);

  const triggerDecrypt = useCallback(() => {
    if (sequential) {
      orderRef.current = computeOrder(text.length);
      pointerRef.current = 0;
      setRevealedIndices(new Set());
    } else {
      setRevealedIndices(new Set());
    }
    setDirection("forward");
    setIsAnimating(true);
  }, [sequential, computeOrder, text.length]);

  const triggerReverse = useCallback(() => {
    if (sequential) {
      orderRef.current = computeOrder(text.length).slice().reverse();
      pointerRef.current = 0;
      setRevealedIndices(fillAllIndices());
      setDisplayText(shuffleText(text, fillAllIndices()));
    } else {
      setRevealedIndices(fillAllIndices());
      setDisplayText(shuffleText(text, fillAllIndices()));
    }
    setDirection("reverse");
    setIsAnimating(true);
  }, [sequential, computeOrder, fillAllIndices, shuffleText, text]);

  useEffect(() => {
    if (!isAnimating) return;
    let currentIteration = 0;
    const getNextIndex = (revealedSet) => {
      const textLength = text.length;
      switch (revealDirection) {
        case "start":
          return revealedSet.size;
        case "end":
          return textLength - 1 - revealedSet.size;
        case "center": {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex =
            revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;
          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex))
            return nextIndex;
          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i;
          }
          return 0;
        }
        default:
          return revealedSet.size;
      }
    };
    intervalRef.current = setInterval(() => {
      setRevealedIndices((prevRevealed) => {
        if (sequential) {
          if (direction === "forward") {
            if (prevRevealed.size < text.length) {
              const nextIndex = getNextIndex(prevRevealed);
              const newRevealed = new Set(prevRevealed);
              newRevealed.add(nextIndex);
              setDisplayText(shuffleText(text, newRevealed));
              return newRevealed;
            } else {
              clearInterval(intervalRef.current);
              setIsAnimating(false);
              setIsDecrypted(true);
              return prevRevealed;
            }
          }
          if (direction === "reverse") {
            if (pointerRef.current < orderRef.current.length) {
              const idxToRemove = orderRef.current[pointerRef.current++];
              const newRevealed = new Set(prevRevealed);
              newRevealed.delete(idxToRemove);
              setDisplayText(shuffleText(text, newRevealed));
              if (newRevealed.size === 0) {
                clearInterval(intervalRef.current);
                setIsAnimating(false);
                setIsDecrypted(false);
              }
              return newRevealed;
            } else {
              clearInterval(intervalRef.current);
              setIsAnimating(false);
              setIsDecrypted(false);
              return prevRevealed;
            }
          }
        } else {
          if (direction === "forward") {
            setDisplayText(shuffleText(text, prevRevealed));
            currentIteration++;
            if (currentIteration >= maxIterations) {
              clearInterval(intervalRef.current);
              setIsAnimating(false);
              setDisplayText(text);
              setIsDecrypted(true);
            }
            return prevRevealed;
          }
          if (direction === "reverse") {
            let currentSet = prevRevealed;
            if (currentSet.size === 0) currentSet = fillAllIndices();
            const removeCount = Math.max(
              1,
              Math.ceil(text.length / Math.max(1, maxIterations))
            );
            const nextSet = removeRandomIndices(currentSet, removeCount);
            setDisplayText(shuffleText(text, nextSet));
            currentIteration++;
            if (nextSet.size === 0 || currentIteration >= maxIterations) {
              clearInterval(intervalRef.current);
              setIsAnimating(false);
              setIsDecrypted(false);
              setDisplayText(shuffleText(text, new Set()));
              return new Set();
            }
            return nextSet;
          }
        }
        return prevRevealed;
      });
    }, speed);
    return () => clearInterval(intervalRef.current);
  }, [
    isAnimating, text, speed, maxIterations, sequential, revealDirection,
    shuffleText, direction, fillAllIndices, removeRandomIndices, characters, useOriginalCharsOnly,
  ]);

  const handleClick = () => {
    if (animateOn !== "click") return;
    if (clickMode === "once") {
      if (isDecrypted) return;
      setDirection("forward");
      triggerDecrypt();
    }
    if (clickMode === "toggle") {
      if (isDecrypted) triggerReverse();
      else { setDirection("forward"); triggerDecrypt(); }
    }
  };

  const triggerHoverDecrypt = useCallback(() => {
    if (isAnimating) return;
    setRevealedIndices(new Set());
    setIsDecrypted(false);
    setDisplayText(text);
    setDirection("forward");
    setIsAnimating(true);
  }, [isAnimating, text]);

  const resetToPlainText = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsAnimating(false);
    setRevealedIndices(new Set());
    setDisplayText(text);
    setIsDecrypted(true);
    setDirection("forward");
  }, [text]);

  useEffect(() => {
    if (animateOn !== "view" && animateOn !== "inViewHover") return;
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          triggerDecrypt();
          setHasAnimated(true);
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, {
      root: null, rootMargin: "0px", threshold: 0.1,
    });
    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [animateOn, hasAnimated, triggerDecrypt]);

  useEffect(() => {
    if (animateOn === "click") encryptInstantly();
    else { setDisplayText(text); setIsDecrypted(true); }
    setRevealedIndices(new Set());
    setDirection("forward");
  }, [animateOn, text, encryptInstantly]);

  const animateProps =
    animateOn === "hover" || animateOn === "inViewHover"
      ? { onMouseEnter: triggerHoverDecrypt, onMouseLeave: resetToPlainText }
      : animateOn === "click"
      ? { onClick: handleClick }
      : {};

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      {...animateProps}
      {...props}
    >
      <span className="sr-only">{displayText}</span>
      <span aria-hidden="true">
        {displayText.split("").map((char, index) => {
          const isRevealedOrDone =
            revealedIndices.has(index) || (!isAnimating && isDecrypted);
          return (
            <span key={index} className={isRevealedOrDone ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

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
    <div className="bg-[#080d1a] min-h-screen">
      <section
        id="home"
        ref={sectionRef}
        className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 pt-20 pb-10 relative overflow-hidden"
      >
        {/* Background glow blobs — your original */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-[28rem] md:h-[28rem] bg-cyan-500/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[32rem] md:h-[32rem] bg-blue-200-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Main layout */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-8 md:gap-12">

          {/* ── LEFT: Profile Image ── */}
          <div className="flex-shrink-0 flex items-end justify-center relative">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-56 md:w-72 md:h-72 rounded-full bg-blue-600/20 blur-3xl" />
            <img
              src={image}
              alt="Ansif"
              className="relative z-10 w-56 h-64 sm:w-72 sm:h-80 md:w-[320px] md:h-[380px] lg:w-[400px] lg:h-[460px] xl:w-[460px] xl:h-[520px] object-contain object-bottom drop-shadow-[0_20px_50px_rgba(59,130,246,0.3)]"
            />
          </div>

          {/* ── RIGHT: Text — ALL original styles preserved ── */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">

            {/* Slide-up animation wrapper — your original transition logic */}
            <div
              className={`transform transition-all duration-1000 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
            >
              {/* "Hi, I'm Ansif" — your original exact classes */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-gray-200">
                Hi, I'm{" "}
                <span className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-800 via-blue-500 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
                  Ansif
                </span>
              </h1>

              {/* DecryptedText — your original exact props */}
              <DecryptedText
                text="Full Stack Developer (.NET + React)"
                animateOn="view"
                sequential={true}
                revealDirection="start"
                speed={60}
                maxIterations={15}
                className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6 font-light"
              />

              {/* Description — your original exact classes */}
              <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
                I build scalable and high-performance web applications using
                .NET Core, React, and SQL Server. Experienced in designing
                secure REST APIs with JWT authentication and developing
                responsive user interfaces with modern frontend technologies.
                Passionate about clean architecture, efficient code, and
                delivering real-world solutions.
              </p>

              {/* View My Work button — matching screenshot style */}
              <div
                className={`flex gap-4 justify-center md:justify-start transform transition-all duration-1000 ease-out ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? "500ms" : "0ms",
                  pointerEvents: isVisible ? "auto" : "none",
                }}
              >
                {/* <a
                  href="#projects"
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-cyan-400 text-cyan-400 text-base font-medium tracking-wide hover:bg-cyan-400/10 transition-all duration-300 group"
                >
                  View My Work
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
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
      },
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
    <div className="bg-[#080d1a] min-h-screen flex flex-col md:flex-row justify-center items-center p-6 pt-24 relative overflow-hidden">
      <section id="about" ref={sectionRef} className="w-full">
        {/* Same glow blobs as Hero */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-[28rem] md:h-[28rem] bg-cyan-500/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[32rem] md:h-[32rem] bg-blue-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <div
            className={`backdrop-blur-sm bg-blue-950/30 border border-blue-100/30 rounded-3xl p-8 md:p-12 shadow-[0_0px_0px_rgba(34,197,94,0.15)] transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="mb-10 relative">
              <div
                className={`absolute -left-4 md:-left-8 top-0 w-1 bg-gradient-to-b from-blue-100 to-blue-900 rounded-full transition-all duration-1000 ${
                  isVisible ? "h-full" : "h-0"
                }`}
              ></div>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-800 via-blue-500 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
                About Me
              </h2>
              <div
                className={`h-1 w-24 bg-gradient-to-r from-blue-100 to-blue-900 rounded-full transition-all duration-1000 ${
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
                Hello! I'm Ansif MK, a{" "}
                <span className="text-blue-400 font-semibold">
                  Full Stack Web Developer{" "}
                </span>{" "}
                Full Stack Developer specializing in React, Redux, and .NET
                technologies. Experienced in building scalable and responsive
                web applications using HTML, CSS, JavaScript, Tailwind CSS,
                Bootstrap, C#, SQL, ADO.NET, and Entity Framework. Focused on
                writing clean, maintainable code and creating user-centric
                interfaces that deliver seamless performance across devices.
              </p>

              <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">
                More{" "}
                <span className="text-blue-400 font-semibold">About </span>
                <span className="text-blue-400 font-semibold">Me</span>  Along
                with my technical expertise, I bring strong communication and
                presentation skills. I'm a self-motivated learner who constantly
                explores new tools and technologies to stay updated in the
                ever-evolving web development landscape. I completed my Bachelor
                of Computer Applications (BCA) from Calicut University. This is
                a brief overview of my journey   thanks for taking the time to
                read!
              </p>
              <div
                className={`grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: isVisible ? "700ms" : "0ms" }}
              >
                <div className="group bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/30 rounded-xl p-6 hover:border-blue-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:scale-105 cursor-pointer">
                  <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300"></div>
                  <h3 className="text-blue-300 font-bold text-lg mb-2">
                    Innovation
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Creative problem solving and continuous learning
                  </p>
                </div>

                <div className="group bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:scale-105 cursor-pointer">
                  <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300"></div>
                  <h3 className="text-cyan-300 font-bold text-lg mb-2">
                    Performance
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Optimized and efficient solutions
                  </p>
                </div>

                <div className="group bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/30 rounded-xl p-6 hover:border-green-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:scale-105 cursor-pointer">
                  <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300"></div>
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
    </div>
  );
};

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
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
    {
  name: "ADO.NET",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
},
{
  name: "EF Core",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
},
{
  name: "Redux",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg",
}
  ];

  // Unique fly-in origin for each card (from different screen edges/corners)
  const flyOrigins = [
    { x: -300, y: -200, rotate: -25 },
    { x: 300, y: -250, rotate: 20 },
    { x: -350, y: 100, rotate: -15 },
    { x: 400, y: -150, rotate: 30 },
    { x: -200, y: 300, rotate: -20 },
    { x: 250, y: 280, rotate: 15 },
    { x: -400, y: -100, rotate: -30 },
    { x: 350, y: 200, rotate: 25 },
    { x: -150, y: -300, rotate: -10 },
    { x: 200, y: -280, rotate: 18 },
    { x: -300, y: 250, rotate: -22 },
      { x: 320, y: -180, rotate: 16 },
  { x: -260, y: 220, rotate: -18 },
  { x: 180, y: 320, rotate: 12 },
  ];

  // Each card gets a unique float animation timing so they all move independently
  const floatConfig = [
    { duration: 3.2, delay: 0.0, yRange: 10 },
    { duration: 2.8, delay: 0.4, yRange: 14 },
    { duration: 3.6, delay: 0.8, yRange: 8  },
    { duration: 2.5, delay: 0.2, yRange: 12 },
    { duration: 3.9, delay: 0.6, yRange: 16 },
    { duration: 2.7, delay: 1.0, yRange: 10 },
    { duration: 3.3, delay: 0.3, yRange: 13 },
    { duration: 2.9, delay: 0.7, yRange: 9  },
    { duration: 3.7, delay: 0.1, yRange: 15 },
    { duration: 2.6, delay: 0.9, yRange: 11 },
    { duration: 3.1, delay: 0.5, yRange: 14 },
     { duration: 3.4, delay: 0.2, yRange: 12 },
  { duration: 2.9, delay: 0.6, yRange: 10 },
  { duration: 3.5, delay: 0.4, yRange: 15 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.15, rootMargin: "0px" },
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
      className="bg-[#080d1a] min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-4"
    >
      {/* Same glow blobs as Hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-[28rem] md:h-[28rem] bg-cyan-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[32rem] md:h-[32rem] bg-blue-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-800 via-blue-500 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
            My Skills
          </h2>
          <div
            className={`h-1 bg-gradient-to-r from-blue-800 via-blue-500 to-blue-300 rounded-full mx-auto mt-4 transition-all duration-1000 ${
              isVisible ? "w-32 opacity-100" : "w-0 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          />
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6">
          {skills.map((skill, index) => {
            const origin = flyOrigins[index];
            const float = floatConfig[index];

            return (
              <div
                key={skill.name}
                className="transition-all ease-out"
                style={{
                  transitionDuration: `${700 + index * 60}ms`,
                  transitionDelay: isVisible ? `${index * 70}ms` : "0ms",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translate(0px, 0px) rotate(0deg) scale(1)"
                    : `translate(${origin.x}px, ${origin.y}px) rotate(${origin.rotate}deg) scale(0.4)`,
                }}
              >
                {/* Floating wrapper — CSS keyframe animation per card */}
                <div
                  style={{
                    animation: isVisible
                      ? `float-${index} ${float.duration}s ease-in-out ${float.delay}s infinite alternate`
                      : "none",
                  }}
                >
                  <div className="group relative flex flex-col items-center justify-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-5 aspect-square hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:shadow-[0_0_28px_rgba(34,211,238,0.25)] transition-colors duration-300 cursor-pointer overflow-hidden">

                    {/* Inner shimmer on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl bg-gradient-to-br from-white/5 via-cyan-300/10 to-transparent" />

                    {/* Glowing dot top-right */}
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_6px_rgba(34,211,238,0.9)]" />

                    <img
                      src={skill.logo}
                      alt={skill.name}
                      className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-115 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]"
                      loading="lazy"
                    />
                    <span className="text-xs md:text-sm font-medium text-gray-300 group-hover:text-cyan-300 transition-colors duration-300 text-center leading-tight">
                      {skill.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom text */}
        <div
          className={`text-center mt-14 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: isVisible ? "900ms" : "0ms" }}
        >
          <p className="text-gray-400 text-base md:text-lg">
            Always learning and expanding my toolkit
          </p>
        </div>
      </div>

      {/* Per-card float keyframes — each card bobs independently */}
      <style>{`
        ${skills
          .map(
            (_, i) => `
          @keyframes float-${i} {
            0%   { transform: translateY(0px) rotate(0deg); }
            50%  { transform: translateY(-${floatConfig[i].yRange}px) rotate(${i % 2 === 0 ? 1.5 : -1.5}deg); }
            100% { transform: translateY(-${floatConfig[i].yRange * 0.4}px) rotate(0deg); }
          }
        `
          )
          .join("")}
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
      { threshold: 0.15, rootMargin: "0px" },
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
        "Attended an industrial visit at Spectrum Softtech Solutions Pvt. Ltd., Kochi, to understand real-world IT environments, development workflows, and industry standards.",
      ],
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
        "Collaborated in Agile workflows including sprint planning, code reviews, and testing.",
      ],
    },
  ];

  return (
    <section
      className="bg-[#080d1a] min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-4"
      ref={sectionRef}
    >
      {/* Same glow blobs as Hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-[28rem] md:h-[28rem] bg-cyan-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[32rem] md:h-[32rem] bg-blue-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
        {/* Section heading */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-800 via-blue-500 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
            My Journey
          </h2>
          <div
            className={`h-1 bg-gradient-to-r from-blue-800 via-blue-500 to-blue-300 rounded-full mx-auto mt-4 transition-all duration-1000 ${
              isVisible ? "w-32 opacity-100" : "w-0 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          />
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-blue-500/30 pl-5 md:pl-12 space-y-10 md:space-y-12">
          {milestones.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute -left-[1.85rem] md:-left-[2.8rem] top-1 w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-blue-900 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
              />

              <div className="bg-blue-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-4 md:p-6 hover:border-blue-400/40 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] transition-all duration-300">
                <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 md:px-3 py-1 rounded-full inline-block mb-2">
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
                <p className="text-blue-400 text-xs md:text-sm mb-3">
                  {item.date}
                </p>
                <ul className="space-y-1 md:space-y-2 text-gray-300 text-sm md:text-base list-disc list-inside">
                  {item.description.map((point, i) => (
                    <li key={i} className="leading-relaxed">
                      {point}
                    </li>
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

const ChromaGrid = ({
  items,
  className = "",
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const data = items?.length ? items : [];

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, "--x", "px");
    setY.current = gsap.quickSetter(el, "--y", "px");
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
      overwrite: true,
    });
  };

  const handleMove = (e) => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const handleCardClick = (url) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCardMove = (e) => {
    const c = e.currentTarget;
    const rect = c.getBoundingClientRect();
    c.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    c.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative w-full h-full flex flex-wrap justify-center items-start gap-3 sm:gap-4 ${className}`}
      style={{
        "--r": `${radius}px`,
        "--x": "50%",
        "--y": "50%",
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
              "--card-border": c.borderColor || "transparent",
              background: c.gradient,
              "--spotlight-color": "rgba(255,255,255,0.3)",
              borderColor: c.borderColor || "transparent",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)",
              }}
            />

            {/* Smooth horizontal slider */}
            <div
              className="relative z-10 w-full aspect-[4/5] overflow-hidden rounded-[10px]"
              onMouseEnter={(e) => {
                const wrapper = e.currentTarget.querySelector(".slider-track");
                const slides = wrapper.children.length;
                if (slides > 1) {
                  let idx = 1;
                  const timer = setInterval(() => {
                    wrapper.style.transition = "transform 0.5s ease";
                    wrapper.style.transform = `translateX(-${idx * 100}%)`;
                    idx++;
                    if (idx >= slides) {
                      setTimeout(() => {
                        wrapper.style.transition = "none";
                        wrapper.style.transform = "translateX(0)";
                        idx = 1;
                      }, 2000);
                    }
                  }, 2500);
                  e.currentTarget.dataset.timer = timer;
                }
              }}
              onMouseLeave={(e) => {
                clearInterval(Number(e.currentTarget.dataset.timer));
                const wrapper = e.currentTarget.querySelector(".slider-track");
                wrapper.style.transition = "transform 0.5s ease";
                wrapper.style.transform = "translateX(0)";
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
              {c.handle && (
                <span className="text-[0.95rem] opacity-80 text-right">
                  {c.handle}
                </span>
              )}
              <p className="m-0 text-[0.85rem] opacity-85">{c.subtitle}</p>
              {c.location && (
                <span className="text-[0.85rem] opacity-85 text-right">
                  {c.location}
                </span>
              )}
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
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      container.style.cursor = "grabbing";
    };
    const handleMouseLeave = () => {
      isDown = false;
      container.style.cursor = "grab";
    };
    const handleMouseUp = () => {
      isDown = false;
      container.style.cursor = "grab";
    };
    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };
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

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", handleTouchEnd);
    container.style.cursor = "grab";

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobile]);

  const galleryItems = [
    {
      images: [topic, topics],
      title: "Topic presentation",
      subtitle: "",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(180deg, #3B82F6, #000)",
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
      gradient: "linear-gradient(165deg, #3B82F6, #000)",
    },
  ];

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="bg-[#080d1a] flex items-center justify-center relative overflow-hidden py-12 md:py-20 px-4"
    >
      {/* Same glow blobs as Hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-[28rem] md:h-[28rem] bg-cyan-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[32rem] md:h-[32rem] bg-blue-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Heading */}
        <div
          className={`text-center mb-8 md:mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-800 via-blue-500 to-blue-300 bg-clip-text text-transparent">
            Gallery
          </h2>
          <p className="mt-3 md:mt-4 text-sm md:text-lg text-gray-300 max-w-xl mx-auto px-4">
            A visual tour of my work and inspirations
          </p>
          <div
            className={`h-1 bg-gradient-to-r from-blue-800 via-blue-500 to-blue-300 rounded-full mx-auto mt-3 md:mt-4 transition-all duration-1000 ${
              isVisible ? "w-24 sm:w-32 opacity-100" : "w-0 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          />
        </div>

        {/* Scroll Indicator for Mobile */}
        {isMobile && (
          <div className="flex justify-center items-center gap-2 mb-4 md:hidden">
            <div className="text-xs text-blue-400/70 animate-pulse">
              ← Swipe to scroll →
            </div>
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-blue-400/50"></div>
              <div className="w-1 h-1 rounded-full bg-blue-400/50"></div>
              <div className="w-1 h-1 rounded-full bg-blue-400/50"></div>
            </div>
          </div>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className={`w-full ${
            isMobile
              ? "overflow-x-auto scroll-smooth hide-scrollbar"
              : "overflow-x-auto md:overflow-visible"
          }`}
        >
          <div className={`${isMobile ? "flex gap-4 w-max px-2" : "w-full"}`}>
            {isMobile ? (
              galleryItems.map((item, index) => (
                <div
                  key={index}
                  className="w-[280px] sm:w-[320px] flex-shrink-0 transform transition-all duration-300 hover:scale-105"
                >
                  <div className="bg-gradient-to-br from-blue-900/20 to-transparent backdrop-blur-sm border border-blue-500/20 rounded-2xl overflow-hidden hover:border-blue-400/60 transition-all duration-300">
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
                    </div>
                  </div>
                </div>
              ))
            ) : (
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
};
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
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsVisible(entry.isIntersecting));
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPercentage = (window.scrollY - containerRef.current.offsetTop) / 500;
        setScrollProgress(Math.min(1, Math.max(0, scrollPercentage)));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Apple Cart",
      subtitle: "E-Commerce Platform",
      description:
        "Full-stack shopping experience with secure payments and real-time order tracking. Built with React and Firebase for lightning-fast data sync.",
      image: apple,
      liveLink: "https://applecartecom.vercel.app",
      codeLink: "https://github.com/ansifmk/E-Commerce_AppleCart-connection-frontend",
      tech: ["React", "Tailwind", "Firebase"],
    },
    {
      id: 2,
      title: "Zayq Case",
      subtitle: "Task Management App",
      description:
        "Mobile-first task management app with intuitive drag-and-drop UI and seamless performance across all devices.",
      image: Zayk,
      liveLink: "https://zayq.vercel.app/",
      codeLink: "https://github.com/BeyteFlow/ZAYQ",
      tech: ["React", "Tailwind", "Firebase"],
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="bg-[#080d1a] min-h-screen py-20 px-4 md:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Effects - Same as Hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-[28rem] md:h-[28rem] bg-cyan-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[32rem] md:h-[32rem] bg-blue-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Header Section */}
      <div className="relative z-10 max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold">
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === activeSlide ? "#06b6d4" : "rgba(255,255,255,0.3)",
                  width: i === activeSlide ? "24px" : "8px",
                }}
              />
            ))}
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-sm md:text-base">
            A collection of projects that showcase creativity and technical excellence
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scroll Section - Left to Right */}
      <div className="relative z-10 overflow-hidden">
        {/* Scroll Indicator */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <span className="text-xs text-cyan-400/70 animate-pulse">← Scroll left to right →</span>
          <svg className="w-4 h-4 text-cyan-400/50 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>

        <div
          ref={containerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 gap-8 cursor-grab active:cursor-grabbing"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
          onScroll={(e) => {
            const index = Math.round(e.target.scrollLeft / (window.innerWidth - 100));
            setActiveSlide(index);
          }}
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              className="flex-none w-[90vw] md:w-[80vw] lg:w-[70vw] snap-center"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div 
                className="relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden group transition-all duration-500"
                style={{
                  boxShadow: hoveredCard === project.id 
                    ? "0 20px 40px -15px rgba(6, 182, 212, 0.3), 0 0 0 1px rgba(6, 182, 212, 0.3)" 
                    : "0 0 0 1px rgba(255,255,255,0.05)",
                  transform: hoveredCard === project.id ? "translateY(-8px)" : "translateY(0px)",
                }}
              >
                {/* Animated Gradient Border on Hover */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "",
                    filter: "blur(20px)",
                    opacity: hoveredCard === project.id ? 0.3 : 0,
                  }}
                />
                
                {/* Cyan Glow Effect on Hover */}
                <div 
                  className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.4), transparent)",
                    opacity: hoveredCard === project.id ? 1 : 0,
                  }}
                />
                
                <div className="relative flex flex-col md:flex-row gap-8 p-6 md:p-10">
                  {/* Left Side - Image */}
                  <div className="w-full md:w-1/2">
                    <div className="relative overflow-hidden rounded-2xl">
                      <motion.div
                        className="relative aspect-[4/3] overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      </motion.div>
                      
                      {/* View Button Overlay - Cyan on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <motion.button
                          className="w-20 h-20 rounded-full bg-cyan-500/20 backdrop-blur-md flex items-center justify-center border border-cyan-400/50 hover:bg-cyan-500/30 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => window.open(project.liveLink, "_blank")}
                        >
                          <svg className="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Content */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
                    {/* Project Number */}
                    <div className="text-8xl font-bold text-white/5 absolute right-6 top-6">
                      {String(idx + 1).padStart(2, "0")}
                    </div>

                    {/* Category - Changes color on hover */}
                    <div>
                      <span 
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300"
                        style={{
                          backgroundColor: hoveredCard === project.id ? "rgba(6, 182, 212, 0.15)" : "rgba(59, 130, 246, 0.1)",
                          borderColor: hoveredCard === project.id ? "rgba(6, 182, 212, 0.5)" : "rgba(6, 182, 212, 0.3)",
                          color: hoveredCard === project.id ? "#22d3ee" : "#06b6d4",
                          borderWidth: "1px",
                          borderStyle: "solid",
                        }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        {project.subtitle}
                      </span>
                    </div>

                    {/* Title - Gradient on hover */}
                    <h3 
                      className="text-3xl md:text-4xl lg:text-5xl font-bold transition-all duration-300"
                      style={{
                        color: hoveredCard === project.id ? "transparent" : "white",
                        backgroundImage: hoveredCard === project.id 
                          ? "linear-gradient(135deg, #3b82f6, #06b6d4, #22d3ee)" 
                          : "none",
                        backgroundClip: hoveredCard === project.id ? "text" : "unset",
                        WebkitBackgroundClip: hoveredCard === project.id ? "text" : "unset",
                      }}
                    >
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                      {project.description}
                    </p>

                    {/* Tech Stack - Border changes on hover */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300"
                          style={{
                            backgroundColor: hoveredCard === project.id ? "rgba(6, 182, 212, 0.1)" : "rgba(255,255,255,0.05)",
                            borderColor: hoveredCard === project.id ? "rgba(6, 182, 212, 0.5)" : "rgba(255,255,255,0.1)",
                            color: hoveredCard === project.id ? "#22d3ee" : "#9ca3af",
                            borderWidth: "1px",
                            borderStyle: "solid",
                          }}
                          whileHover={{ y: -2 }}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4 flex-wrap">
                      <motion.a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative px-6 py-3 rounded-full text-white font-semibold overflow-hidden transition-all duration-300"
                        style={{
                          background: hoveredCard === project.id 
                            ? "linear-gradient(135deg, #06b6d4, #3b82f6)" 
                            : "linear-gradient(135deg, #3b82f6, #06b6d4)",
                          boxShadow: hoveredCard === project.id 
                            ? "0 0 20px rgba(6, 182, 212, 0.5)" 
                            : "none",
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">Live Demo</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                      </motion.a>
                      
                      <motion.a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2"
                        style={{
                          borderColor: hoveredCard === project.id ? "rgba(6, 182, 212, 0.5)" : "rgba(255,255,255,0.2)",
                          color: hoveredCard === project.id ? "#22d3ee" : "white",
                          borderWidth: "1px",
                          borderStyle: "solid",
                          backgroundColor: hoveredCard === project.id ? "rgba(6, 182, 212, 0.1)" : "transparent",
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        Code
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Progress Bar - Cyan on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${scrollProgress * 100}%`,
                      background: hoveredCard === project.id 
                        ? "linear-gradient(90deg, #06b6d4, #22d3ee)"
                        : "linear-gradient(90deg, #3b82f6, #06b6d4)",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="relative z-10 flex justify-center gap-3 mt-8">
        {projects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              const container = containerRef.current;
              if (container) {
                container.scrollTo({
                  left: idx * (window.innerWidth - 100),
                  behavior: "smooth",
                });
              }
            }}
            className="group"
          >
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === idx
                  ? "w-8 bg-gradient-to-r from-blue-500 to-cyan-500"
                  : "w-2 bg-white/30 group-hover:bg-cyan-400/50"
              }`}
            />
          </button>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 mt-20 max-w-4xl mx-auto text-center"
      >
        
      </motion.div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};
/* Project Card Content Component - Original size preserved */
const ProjectCardContent = ({ project, index, isFirst }) => {
  return (
    <div
      className="group relative rounded-3xl overflow-hidden border mx-auto max-w-6xl transition-all duration-500 hover:scale-[1.02]"
      style={{
        background: project.bg,
        borderColor: project.accentBorder,
        boxShadow: `0 20px 80px ${project.accentGlow}, 0 0 0 1px ${project.accentBorder}`,
      }}
    >
      {/* Watermark number */}
      <div
        className="absolute top-4 right-6 text-[6rem] md:text-[9rem] font-black leading-none select-none pointer-events-none"
        style={{ color: project.accentBorder, opacity: 0.18 }}
      >
        {project.number}
      </div>

      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 p-6 md:p-10 items-center">
        <div
          className={`w-full md:w-[48%] flex-shrink-0 rounded-2xl overflow-hidden relative order-1 ${
            index % 2 !== 0 ? "md:order-2" : "md:order-1"
          }`}
          style={{ boxShadow: `0 8px 40px ${project.accentGlow}` }}
        >
          <div
            className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10"
            style={{
              background: `linear-gradient(135deg, ${project.accent}50 0%, transparent 65%)`,
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10"
            style={{
              background: `linear-gradient(315deg, ${project.accent}50 0%, transparent 65%)`,
            }}
          />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-52 sm:h-64 md:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div
          className={`flex-1 flex flex-col gap-4 text-center md:text-left order-2 ${
            index % 2 !== 0 ? "md:order-1" : "md:order-2"
          }`}
        >
          <div className="flex justify-center md:justify-start">
            <span
              className="text-xs font-mono font-semibold px-3 py-1 rounded-full border"
              style={{
                color: project.accent,
                borderColor: project.accentBorder,
                background: project.accentMuted,
              }}
            >
              Project {project.number}
            </span>
          </div>

          <div>
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-1"
              style={{ color: project.accent }}
            >
              {project.subtitle}
            </p>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              {project.title}
            </h3>
          </div>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto md:mx-0">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-xs font-mono border"
                style={{
                  color: project.accent,
                  borderColor: project.accentBorder,
                  background: project.accentMuted,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex justify-center md:justify-start mt-2">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold text-sm md:text-base text-white transition-all duration-300 hover:gap-5 group/btn"
              style={{
                background: `linear-gradient(135deg, ${project.accent}, ${project.accent}99)`,
                boxShadow: `0 4px 20px ${project.accentGlow}`,
              }}
            >
              View Project
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
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
          if (entry.isIntersecting) setIsVisible(true);
          else setIsVisible(false);
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
      .sendForm("service_gk5b2to", "template_mctveic", form.current, "zZU9D6KlQyEiFl5Es")
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
      className="bg-[#080d1a] min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-4"
    >
      {/* Same glow blobs as Skills */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-[28rem] md:h-[28rem] bg-cyan-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[32rem] md:h-[32rem] bg-blue-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">

        {/* Heading — matches Skills heading style */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-800 via-blue-500 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
            Get In Touch
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-400 max-w-xl mx-auto">
            Have a project in mind? Let's work together to make something great.
          </p>
          <div
            className={`h-1 bg-gradient-to-r from-blue-800 via-blue-500 to-blue-300 rounded-full mx-auto mt-4 transition-all duration-1000 ${
              isVisible ? "w-32 opacity-100" : "w-0 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* ── Left: Contact Info ── */}
          <div
            className={`lg:col-span-2 transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
          >
            {/* Info card — matches skill card style */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-5 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]">

              {[
                {
                  icon: <Mail className="w-5 h-5 text-cyan-400" />,
                  label: "Email",
                  value: "mkmohammedansif@gmail.com",
                },
                {
                  icon: <MapPin className="w-5 h-5 text-cyan-400" />,
                  label: "Location",
                  value: "Kerala, India",
                },
                {
                  icon: <Phone className="w-5 h-5 text-cyan-400" />,
                  label: "Phone",
                  value: "+91 90481 26169",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-cyan-400/50 group-hover:bg-cyan-500/10 transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                    <p className="text-sm text-gray-300 group-hover:text-cyan-300 transition-colors duration-300 break-all">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links — same card style */}
            <div
              className={`mt-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-1000 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)] ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: isVisible ? "350ms" : "0ms" }}
            >
              <p className="text-xs text-gray-500 mb-4 uppercase tracking-widest">Connect with me</p>
              <div className="flex gap-3">
                {[
                  {
                    href: "https://github.com/ansifmk",
                    label: "GitHub",
                    svg: (
                      <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    ),
                  },
                  {
                    href: "https://www.linkedin.com/in/ansif-mk/",
                    label: "LinkedIn",
                    svg: (
                      <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    ),
                  },
                  {
                    href: "https://www.instagram.com/mr.4nsif?igsh=MWQyY3E4bzg4YXYzbg==",
                    label: "Instagram",
                    svg: (
                      <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    ),
                  },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 hover:scale-110"
                  >
                    {s.svg}
                  </a>
                ))}
              </div>

              {/* Availability badge */}
              <div className="mt-5 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                <span className="text-xs text-cyan-400 font-medium">Available for work</span>
              </div>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div
            className={`lg:col-span-3 transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]">
              <form ref={form} onSubmit={sendEmail} className="space-y-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "user_name", label: "Your Name", type: "text", placeholder: "Ansif MK" },
                    { id: "user_email", label: "Email Address", type: "email", placeholder: "ansif@example.com" },
                  ].map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
                        {field.label} <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        required
                        placeholder={field.placeholder}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-500/5 hover:border-white/20 transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
                    Message <span className="text-cyan-400"></span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-500/5 hover:border-white/20 transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full relative flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_28px_rgba(34,211,238,0.25)] hover:scale-[1.02] active:scale-95"
                  style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(59,130,246,0.15))", border: "1px solid rgba(34,211,238,0.3)" }}
                >
                  {/* Shimmer on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl bg-gradient-to-br from-white/5 via-cyan-300/10 to-transparent" />
                  {/* Glowing dot */}
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_6px_rgba(34,211,238,0.9)]" />
                  <span className="relative z-10">Send Message</span>
                  <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <p className="text-xs text-gray-600 text-center">
                  I'll get back to you within 24 hours 
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: { background: "#0a1628", color: "#fff", border: "1px solid rgba(34,211,238,0.3)" },
          success: { iconTheme: { primary: "#22d3ee", secondary: "#fff" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
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

    const spring = 0.1; // higher = faster catch-up
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
      vel.current.x *= 1 - friction;
      vel.current.y *= 1 - friction;
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
    const colors = ["#1e40af", "#2563eb", "#38bdf8", "#7dd3fc"];
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
        className="fixed top-0 left-0 pointer-events-none z-[10000] w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg"
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
