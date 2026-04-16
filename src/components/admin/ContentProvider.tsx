"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Content } from "@/lib/types";

type SaveStatus = "idle" | "saving" | "saved" | "error";

interface ContentContextValue {
  content: Content | null;
  loading: boolean;
  error: string | null;
  status: SaveStatus;
  update: (updater: (current: Content) => Content) => void;
  save: () => Promise<void>;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(!isLoginPage);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<SaveStatus>("idle");

  useEffect(() => {
    if (isLoginPage) return;
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setContent(data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [isLoginPage]);

  const update = useCallback((updater: (current: Content) => Content) => {
    setContent((prev) => (prev ? updater(prev) : prev));
  }, []);

  const save = useCallback(async () => {
    if (!content) return;
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Save failed");
      }
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Save failed");
      setTimeout(() => setStatus("idle"), 4000);
    }
  }, [content]);

  return (
    <ContentContext.Provider value={{ content, loading, error, status, update, save }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be inside ContentProvider");
  return ctx;
}
