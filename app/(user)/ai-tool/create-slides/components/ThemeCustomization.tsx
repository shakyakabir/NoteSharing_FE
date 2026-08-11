"use client";
import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface ThemeCustomizationProps {
  selectedTheme?: string;
  onThemeChange?: (theme: string) => void;
}

export default function ThemeCustomization({
  selectedTheme: controlledTheme,
  onThemeChange,
}: ThemeCustomizationProps) {
  const [localTheme, setLocalTheme] = useState("professional");
  const selectedTheme = controlledTheme || localTheme;

  const themes = [
    {
      id: "professional",
      label: "Professional",
      bgStyle: "bg-slate-50",
      lineStyle: "bg-slate-200",
    },
    {
      id: "academic",
      label: "Academic",
      bgStyle: "bg-stone-50",
      lineStyle: "bg-stone-200",
    },
    {
      id: "creative",
      label: "Creative",
      bgStyle: "bg-slate-900",
      lineStyle: "bg-slate-700",
      dark: true,
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-slate-800 tracking-tight">
        Theme Customization
      </h3>

      <div className="grid grid-cols-3 gap-4">
        {themes.map((theme) => {
          const isSelected = selectedTheme === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => {
                setLocalTheme(theme.id);
                onThemeChange?.(theme.id);
              }}
              className={`relative border rounded-2xl overflow-hidden bg-white text-left transition-all ${
                isSelected
                  ? "border-indigo-600 ring-1 ring-indigo-600/30"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* Theme Preview Card Window Area */}
              <div
                className={`h-24 ${theme.bgStyle} p-4 flex flex-col justify-center space-y-2 relative border-b border-slate-50`}
              >
                <div
                  className={`h-2.5 w-2/3 rounded-full ${theme.lineStyle}`}
                />
                <div className={`h-2 w-1/2 rounded-full ${theme.lineStyle}`} />

                {isSelected && (
                  <CheckCircle2
                    size={14}
                    className="absolute right-3 bottom-3 text-indigo-600 fill-indigo-50"
                  />
                )}
              </div>

              {/* Bottom Label block */}
              <div className="p-3 text-center text-xs font-bold text-slate-700">
                {theme.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
