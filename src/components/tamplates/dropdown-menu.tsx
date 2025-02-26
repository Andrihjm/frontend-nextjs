"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
  sideOffset?: number;
  alignOffset?: number;
}

const DropdownMenu = ({
  trigger,
  children,
  className = "",
  align = "left",
  sideOffset = 8,
  alignOffset = 0,
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getAlignmentClass = () => {
    switch (align) {
      case "left":
        return "left-0";
      case "right":
        return "right-0";
      case "center":
        return "left-1/2 -translate-x-1/2";
      default:
        return "left-0";
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className="cursor-pointer p-1"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              top: `calc(100% + ${sideOffset}px)`,
              [align === "right" ? "right" : "left"]: `${alignOffset}px`,
            }}
            className={`absolute z-50 cursor-pointer overflow-hidden rounded-md border border-secondary bg-dark_secondary py-1 shadow-md ${getAlignmentClass()} ${className}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const DropdownMenuItem = ({
  children,
  onClick,
  className = "",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative flex w-full cursor-pointer select-none items-center rounded-sm px-4 py-1.5 text-sm outline-none transition-colors hover:bg-dark ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`}
    >
      {children}
    </button>
  );
};

export const DropdownMenuSeparator = ({
  className = "",
}: {
  className?: string;
}) => {
  return <div className={`-mx-1 my-1 h-px bg-slate-200 ${className}`} />;
};

export const DropdownMenuLabel = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`px-2 py-1.5 text-sm font-semibold text-slate-900 ${className}`}
    >
      {children}
    </div>
  );
};

export default DropdownMenu;
