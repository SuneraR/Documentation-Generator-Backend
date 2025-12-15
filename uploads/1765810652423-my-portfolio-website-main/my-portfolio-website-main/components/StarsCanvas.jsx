
"use client";

import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";

export default function StarsCanvas() {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    // Check if WebGL is supported
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglSupported(false);
      }
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  // Return null if WebGL is not supported
  if (!webglSupported) {
    return null;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 1] }}
      gl={{
        powerPreference: "high-performance",
        antialias: false,
        alpha: true,
        failIfMajorPerformanceCaveat: false,
      }}
      onError={() => {
        setWebglSupported(false);
      }}
    >
      <Suspense fallback={null}>
        <Stars radius={50} count={3500} factor={4} fade speed={1} />
      </Suspense>
    </Canvas>
  );
}
