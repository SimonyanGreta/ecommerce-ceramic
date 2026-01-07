import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "../../../assets/icon/close";
import { Button } from "../Button";

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

export const Drawer = ({
  isOpen,
  onClose,
  position = "right",
  width = "20rem",
  height = "16rem",
  title,
  children,
}: DrawerProps) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const isHorizontal = position === "left" || position === "right";

  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className={`fixed z-50 flex flex-col bg-white shadow-2xl ${positionClasses[position]}`}
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
            <div className="flex items-center justify-between border-b border-primary/20 p-4">
              {title && (
                <h2 className="text-lg font-semibold text-background-dark">
                  {title}
                </h2>
              )}

              <Button
                variant="ghost"
                size="md"
                onClick={onClose}
                aria-label="close"
              >
                <CloseIcon />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(drawerContent, document.body);
};
