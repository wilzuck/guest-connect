"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "guestconnect:token";

export function useAuthToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      setToken(window.localStorage.getItem(STORAGE_KEY));
    } catch {
      setToken(null);
    }
  }, []);

  const save = useCallback((next: string) => {
    setToken(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const clear = useCallback(() => {
    setToken(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return { token, save, clear };
}

