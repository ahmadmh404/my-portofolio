"use client";

import { useEffect, useState } from "react";
import { StarfieldBackground } from "./starfield-background";
import { ParticleSystem } from "./particle-system";

export function BackgroundEffects() {
  const [useThreeJS, setUseThreeJS] = useState(true);

  useEffect(() => {
    // Check device capabilities
    const checkCapabilities = () => {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      const hasWebGL = (() => {
        try {
          const canvas = document.createElement("canvas");
          return !!(window.WebGLRenderingContext && canvas.getContext("webgl"));
        } catch (e) {
          return false;
        }
      })();

      const isLowEndDevice =
        navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

      // Use Canvas fallback for mobile or low-end devices
      setUseThreeJS(!isMobile && hasWebGL && !isLowEndDevice);
    };

    checkCapabilities();
  }, []);

  return useThreeJS ? <StarfieldBackground /> : <ParticleSystem />;
}
