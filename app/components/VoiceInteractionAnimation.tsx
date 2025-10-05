import { useEffect, useRef, useState } from "react";
import { Application } from "@splinetool/runtime";

interface VoiceInteractionAnimationProps {
  userType: "user" | "agent" | "idle";
}

// Extended type to handle Spline properties that might not be in the type definition
interface SplineApp {
  load: (url: string) => Promise<void>;
  resize?: () => void;
  camera?: {
    position: { set: (x: number, y: number, z: number) => void };
    fov: number;
  };
  dispose?: () => void;
  findObjectByName: (name: string) => { visible: boolean } | null;
}

const VoiceInteractionAnimation = ({
  userType,
}: VoiceInteractionAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splineApp = useRef<SplineApp | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    const handleResize = () => {
      if (!canvasRef.current || !splineApp.current) return;

      const canvas = canvasRef.current;
      const container = canvas.parentElement;

      if (!container) return;

      // Get container dimensions
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      // Set canvas size to match container with device pixel ratio
      const dpr = window.devicePixelRatio || 1;
      canvas.width = containerWidth * dpr;
      canvas.height = containerHeight * dpr;

      // Update canvas style dimensions
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;

      // Scale the context to ensure correct drawing operations further down the line
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      // Resize the Spline application
      if (splineApp.current?.resize) {
        splineApp.current.resize();
      }

      // Adjust camera after resize
      setTimeout(() => {
        adjustCameraForScreen();
      }, 100);
    };

    const adjustCameraForScreen = () => {
      if (!splineApp.current || !isLoaded) return;

      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      // Get camera object if available
      const camera = splineApp.current.camera;
      if (camera) {
        if (isMobile) {
          // Adjust camera for mobile - pull back and adjust angle
          camera.position.set(0, 0, 8);
          camera.fov = 60;
        } else if (isTablet) {
          // Adjust camera for tablet
          camera.position.set(0, 0, 6);
          camera.fov = 55;
        } else {
          // Desktop camera position
          camera.position.set(0, 0, 5);
          camera.fov = 50;
        }
      }
    };

    const initSpline = async () => {
      if (!canvasRef.current || !mounted) return;

      try {
        // Initialize Spline application
        const app = new Application(canvasRef.current) as unknown as SplineApp;
        splineApp.current = app;

        // Load your Spline scene
        await app.load(
          "https://prod.spline.design/G-g8uqpkvJU3Fb05/scene.splinecode"
        );

        const agentSiri = app.findObjectByName("Agent Siri");
        const userSiri = app.findObjectByName("User Siri");

        if (userSiri)
          userSiri.visible = userType === "user" || userType === "idle";
        if (agentSiri) agentSiri.visible = userType === "agent";

        if (mounted) {
          setIsLoaded(true);

          // Force initial resize after scene is loaded
          setTimeout(() => {
            handleResize();
            // Force another resize to ensure proper centering
            setTimeout(() => {
              handleResize();
            }, 200);
          }, 100);
        }
      } catch (error) {
        console.error("Error loading Spline scene:", error);
      }
    };

    // Initialize Spline
    initSpline();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      mounted = false;
      window.removeEventListener("resize", handleResize);
      if (splineApp.current?.dispose) {
        splineApp.current.dispose();
      }
    };
  }, [isLoaded, userType]);

  // Handle user type changes
  useEffect(() => {
    const spline = splineApp.current;
    if (!spline || !isLoaded) return;

    const agentSiri = spline.findObjectByName("Agent Siri");
    const userSiri = spline.findObjectByName("User Siri");

    if (userSiri) userSiri.visible = userType === "user" || userType === "idle";
    if (agentSiri) agentSiri.visible = userType === "agent";
  }, [userType, isLoaded]);

  // Force resize on mount to ensure proper initial centering
  useEffect(() => {
    if (isLoaded && canvasRef.current) {
      const forceResize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const container = canvas.parentElement;
        if (!container) return;

        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = containerWidth * dpr;
        canvas.height = containerHeight * dpr;

        canvas.style.width = `${containerWidth}px`;
        canvas.style.height = `${containerHeight}px`;

        if (splineApp.current?.resize) {
          splineApp.current.resize();
        }
      };

      // Multiple resize attempts to ensure proper initialization
      forceResize();
      setTimeout(forceResize, 100);
      setTimeout(forceResize, 300);
      setTimeout(forceResize, 500);
    }
  }, [isLoaded]);

  return (
    <div className="relative w-full h-full overflow-hidden -mt-5 flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          display: "block",
          maxWidth: "100%",
          maxHeight: "100%",
          touchAction: "none",
          objectFit: "contain", // Ensure the canvas content is centered and scaled properly
        }}
      />
    </div>
  );
};

export default VoiceInteractionAnimation;
