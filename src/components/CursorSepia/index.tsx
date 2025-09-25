import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export const CursorSepia = () => {
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);

  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  // скорость для деформации
  const lastPos = useRef({ x: 0, y: 0, time: Date.now() });
  const velocity = useMotionValue(0);

  useEffect(() => {
    let frame = 0;
    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const now = Date.now();
        const dx = e.clientX - lastPos.current.x;
        const dy = e.clientY - lastPos.current.y;
        const dt = now - lastPos.current.time || 16;

        const speed = (Math.sqrt(dx * dx + dy * dy) / dt) * 16;
        velocity.set(speed);

        lastPos.current = { x: e.clientX, y: e.clientY, time: now };

        x.set(e.clientX - 50);
        y.set(e.clientY - 50);
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMove);
    };
  }, [x, y, velocity]);

  return (
    <motion.div
      className="
        pointer-events-none fixed top-0 left-0
        w-[100px] h-[100px]
        backdrop-hue-rotate-90
        rounded-full
        opacity-70
      "
      style={{
        translateX: springX,
        translateY: springY,
      }}
    />
  );
};
