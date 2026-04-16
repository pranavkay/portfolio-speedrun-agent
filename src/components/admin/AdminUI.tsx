"use client";

import { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, ButtonHTMLAttributes } from "react";

export function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-bold tracking-widest uppercase text-cinema-accent mb-2">
        {label}
      </span>
      {children}
      {hint && <span className="block text-xs text-gray-500 mt-1">{hint}</span>}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-3 bg-cinema-900 border border-white/10 rounded text-white placeholder-gray-600 focus:outline-none focus:border-cinema-accent transition-colors ${props.className || ""}`}
    />
  );
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full px-4 py-3 bg-cinema-900 border border-white/10 rounded text-white placeholder-gray-600 focus:outline-none focus:border-cinema-accent transition-colors font-sans ${props.className || ""}`}
    />
  );
}

export function Button({
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "danger" }) {
  const styles = {
    primary:
      "bg-cinema-accent text-black hover:bg-white disabled:bg-gray-700 disabled:text-gray-500",
    secondary:
      "bg-transparent text-white border border-white/20 hover:border-cinema-accent hover:text-cinema-accent",
    danger:
      "bg-transparent text-red-400 border border-red-500/30 hover:bg-red-500/10 hover:border-red-500",
  }[variant];

  return (
    <button
      {...props}
      className={`px-6 py-3 text-xs font-bold tracking-widest uppercase rounded transition-colors disabled:cursor-not-allowed ${styles} ${props.className || ""}`}
    />
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-cinema-900 border border-white/5 rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
}

export function SaveStatus({ status }: { status: "idle" | "saving" | "saved" | "error" }) {
  if (status === "idle") return null;
  const text = {
    saving: "Saving...",
    saved: "Saved ✓",
    error: "Save failed",
  }[status];
  const color = {
    saving: "text-gray-400",
    saved: "text-cinema-accent",
    error: "text-red-400",
  }[status];
  return <span className={`text-xs tracking-widest uppercase ${color}`}>{text}</span>;
}
