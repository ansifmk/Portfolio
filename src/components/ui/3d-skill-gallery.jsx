import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Html, Plane, Sphere } from "@react-three/drei";
import { X } from "lucide-react";

/* ── Card Context ── */
const CardContext = createContext(undefined);

function useCard() {
  const ctx = useContext(CardContext);
  if (!ctx) throw new Error("useCard must be used within CardProvider");
  return ctx;
}

export function CardProvider({ children, cards }) {
  const [selectedCard, setSelectedCard] = useState(null);
  return (
    <CardContext.Provider value={{ selectedCard, setSelectedCard, cards }}>
      {children}
    </CardContext.Provider>
  );
}



/* ── Floating Skill Card ── */
export function FloatingCard({ card, position }) {
  const groupRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const { setSelectedCard } = useCard();

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position);
    }
  });

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Plane
        args={[3.5, 4.5]}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedCard(card);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: "all 0.3s ease",
          transform: hovered ? "scale(1.18)" : "scale(1)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "110px",
            height: "130px",
            borderRadius: "14px",
            overflow: "hidden",
            background: "rgba(8,13,26,0.85)",
            backdropFilter: "blur(10px)",
            padding: "14px 10px 10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxShadow: hovered
              ? "0 20px 40px rgba(56,189,248,0.45), 0 0 24px rgba(56,189,248,0.25)"
              : "0 10px 30px rgba(0,0,0,0.6)",
            border: hovered
              ? "1.5px solid rgba(56,189,248,0.6)"
              : "1px solid rgba(125,211,252,0.15)",
            userSelect: "none",
          }}
        >
          <img
            src={card.imageUrl}
            alt={card.alt}
            style={{
              width: "52px",
              height: "52px",
              objectFit: "contain",
              filter: "drop-shadow(0 0 6px rgba(56,189,248,0.4))",
            }}
            loading="lazy"
            draggable={false}
          />
          <p
            style={{
              color: "#e0f2fe",
              fontSize: "11px",
              fontWeight: "600",
              textAlign: "center",
              lineHeight: 1.2,
              maxWidth: "90px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {card.title}
          </p>
        </div>
      </Html>
    </group>
  );
}

/* ── Skill Modal ── */
export function CardModal() {
  const { selectedCard, setSelectedCard } = useCard();
  const cardRef = useRef(null);

  if (!selectedCard) return null;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y - rect.height / 2) / 15;
    const rotateY = (rect.width / 2 - x) / 15;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.5s ease-out";
      cardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelectedCard(null);
      }}
    >
      <div style={{ position: "relative", maxWidth: "320px", width: "100%", margin: "0 16px" }}>
        <button
          onClick={() => setSelectedCard(null)}
          style={{
            position: "absolute",
            top: "-44px",
            right: 0,
            color: "white",
            background: "none",
            border: "none",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          <X size={28} />
        </button>

        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            background: "rgba(8,13,26,0.95)",
            border: "1px solid rgba(56,189,248,0.3)",
            borderRadius: "20px",
            padding: "32px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            boxShadow:
              "0 25px 60px rgba(56,189,248,0.2), 0 0 40px rgba(56,189,248,0.1)",
            transformStyle: "preserve-3d",
            transition: "transform 0.1s ease-out",
            cursor: "pointer",
          }}
        >
          <img
            src={selectedCard.imageUrl}
            alt={selectedCard.alt}
            style={{
              width: "96px",
              height: "96px",
              objectFit: "contain",
              filter: "drop-shadow(0 0 16px rgba(56,189,248,0.6))",
            }}
          />
          <h3
            style={{
              color: "#e0f2fe",
              fontSize: "22px",
              fontWeight: "700",
              margin: 0,
              textAlign: "center",
            }}
          >
            {selectedCard.title}
          </h3>
          {selectedCard.description && (
            <p
              style={{
                color: "#94a3b8",
                fontSize: "14px",
                textAlign: "center",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              {selectedCard.description}
            </p>
          )}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              justifyContent: "center",
              marginTop: "4px",
            }}
          >
            {selectedCard.tags?.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "rgba(56,189,248,0.12)",
                  border: "1px solid rgba(56,189,248,0.3)",
                  color: "#38bdf8",
                  fontSize: "12px",
                  padding: "3px 10px",
                  borderRadius: "20px",
                  fontWeight: "500",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Card Galaxy ── */
export function CardGalaxy({ cards }) {
  const cardPositions = useMemo(() => {
    const positions = [];
    const numCards = cards.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < numCards; i++) {
      const y = 1 - (i / (numCards - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = (2 * Math.PI * i) / goldenRatio;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      const layerRadius = 10 + (i % 3) * 3;

      positions.push({
        x: x * layerRadius,
        y: y * layerRadius,
        z: z * layerRadius,
        rotationX: Math.atan2(z, Math.sqrt(x * x + y * y)),
        rotationY: Math.atan2(x, z),
        rotationZ: (Math.random() - 0.5) * 0.2,
      });
    }
    return positions;
  }, [cards.length]);

  return (
    <>
      <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#0ea5e9"
          transparent
          opacity={0.08}
          wireframe
        />
      </Sphere>
      <Sphere args={[10, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#38bdf8"
          transparent
          opacity={0.04}
          wireframe
        />
      </Sphere>
      <Sphere args={[14, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#38bdf8"
          transparent
          opacity={0.025}
          wireframe
        />
      </Sphere>

      {cards.map((card, i) => (
        <FloatingCard key={card.id} card={card} position={cardPositions[i]} />
      ))}
    </>
  );
}

/* ── Main Export ── */
export default function SkillGalaxy({ skills }) {
  return (
    <CardProvider cards={skills}>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background: "transparent",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 18], fov: 60 }}
          style={{ position: "absolute", inset: 0, zIndex: 10 }}
          gl={{ alpha: true, antialias: true }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.domElement.style.pointerEvents = "auto";
          }}
        >
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#38bdf8" />
            <pointLight position={[-10, -10, -10]} intensity={0.4} color="#0ea5e9" />
            <CardGalaxy cards={skills} />
            <OrbitControls
              enablePan
              enableZoom
              enableRotate
              minDistance={6}
              maxDistance={35}
              autoRotate
              autoRotateSpeed={0.4}
              rotateSpeed={0.5}
              zoomSpeed={1.2}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>

        <CardModal />
      </div>
    </CardProvider>
  );
}