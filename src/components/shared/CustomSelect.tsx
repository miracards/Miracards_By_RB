"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search, Check } from "lucide-react";
import { useTheme } from "@/components/shared/ThemeProvider";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  searchable = true,
}: CustomSelectProps) {
  const { theme } = useTheme();
  const dk = theme === "dark";
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Selected Option object
  const selectedOption = useMemo(() => {
    return options.find((opt) => opt.value === value) || null;
  }, [options, value]);

  // Filtered Options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      // Small timeout to allow animation to start before focusing
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen, searchable]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  // Keyboard navigation inside dropdown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown" && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
      }}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: "8px",
          border: `1.5px solid ${isOpen ? "var(--gold)" : dk ? "rgba(255,255,255,0.12)" : "#CBD5E0"}`,
          background: dk ? "rgba(0,0,0,0.2)" : "#FFFFFF",
          color: selectedOption ? (dk ? "#FFFFFF" : "#0B1D3A") : dk ? "rgba(255,255,255,0.4)" : "#718096",
          fontSize: "14px",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          outline: "none",
          transition: "border-color 200ms ease, box-shadow 200ms ease",
          boxShadow: isOpen
            ? "0 0 0 3px rgba(201, 162, 39, 0.15)"
            : "none",
        }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          style={{
            color: "var(--gold)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 250ms ease",
            flexShrink: 0,
            marginLeft: "8px",
          }}
        />
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: 0,
              right: 0,
              zIndex: 110,
              background: dk ? "#0B1D3A" : "#FFFFFF",
              border: `1.5px solid ${dk ? "rgba(201,162,39,0.3)" : "rgba(201,162,39,0.2)"}`,
              borderRadius: "12px",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.08)",
              overflow: "hidden",
            }}
          >
            {/* Search Input Box */}
            {searchable && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 12px",
                  borderBottom: `1px solid ${dk ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"}`,
                  gap: "8px",
                  background: dk ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.01)",
                }}
              >
                <Search size={14} style={{ color: "var(--gold)", opacity: 0.7, flexShrink: 0 }} />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search collections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: dk ? "#FFFFFF" : "#0B1D3A",
                    fontSize: "13px",
                    padding: 0,
                  }}
                />
              </div>
            )}

            {/* Options List */}
            <div
              role="listbox"
              className="custom-select-scrollbar"
              style={{
                maxHeight: "220px",
                overflowY: "auto",
                padding: "6px",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              <style>{`
                .custom-select-scrollbar::-webkit-scrollbar {
                  width: 5px;
                }
                .custom-select-scrollbar::-webkit-scrollbar-track {
                  background: transparent;
                }
                .custom-select-scrollbar::-webkit-scrollbar-thumb {
                  background: ${dk ? "rgba(201,162,39,0.25)" : "rgba(201,162,39,0.15)"};
                  border-radius: 4px;
                }
                .custom-select-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: var(--gold);
                }
              `}</style>

              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const isSelected = option.value === value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(option.value)}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "6px",
                        border: "none",
                        background: isSelected
                          ? "rgba(201, 162, 39, 0.12)"
                          : "transparent",
                        color: isSelected
                          ? "var(--gold)"
                          : dk
                            ? "#E2E8F0"
                            : "#2D3748",
                        fontSize: "13.5px",
                        fontWeight: isSelected ? 600 : 500,
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        outline: "none",
                        transition: "all 150ms ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background = dk
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(0, 0, 0, 0.03)";
                          e.currentTarget.style.color = "var(--gold)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = dk ? "#E2E8F0" : "#2D3748";
                        }
                      }}
                    >
                      <span>{option.label}</span>
                      {isSelected && <Check size={14} style={{ color: "var(--gold)", flexShrink: 0 }} />}
                    </button>
                  );
                })
              ) : (
                <div
                  style={{
                    padding: "16px 12px",
                    textAlign: "center",
                    color: dk ? "rgba(255,255,255,0.4)" : "#718096",
                    fontSize: "13px",
                  }}
                >
                  No options found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
