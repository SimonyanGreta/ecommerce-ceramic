import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "../../../assets/icon/close.tsx";

export type DrawerPosition = "left" | "right" | "top" | "bottom";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: DrawerPosition;
  width?: string;
  height?: string;
  children: React.ReactNode;
  title?: string;
}

const positionClasses: Record<DrawerPosition, string> = {
  left: "left-0 top-0 h-full",
  right: "right-0 top-0 h-full",
  top: "top-0 left-0 w-full",
  bottom: "bottom-0 left-0 w-full",
};

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  position = "right",
  width = "20rem",
  height = "16rem",
  title,
  children,
}) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const isHorizontal = position === "left" || position === "right";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Оверлей */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.div
            className={`fixed z-50 bg-white shadow-2xl ${positionClasses[position]} flex flex-col`}
            style={{
              width: isHorizontal ? width : "100%",
              height: !isHorizontal ? height : "100%",
            }}
            initial={{
              x:
                position === "right"
                  ? "100%"
                  : position === "left"
                    ? "-100%"
                    : 0,
              y:
                position === "bottom"
                  ? "100%"
                  : position === "top"
                    ? "-100%"
                    : 0,
            }}
            animate={{ x: 0, y: 0 }}
            exit={{
              x:
                position === "right"
                  ? "100%"
                  : position === "left"
                    ? "-100%"
                    : 0,
              y:
                position === "bottom"
                  ? "100%"
                  : position === "top"
                    ? "-100%"
                    : 0,
            }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              {title && <h2 className="text-lg font-semibold">{title}</h2>}
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-gray-100 transition"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
