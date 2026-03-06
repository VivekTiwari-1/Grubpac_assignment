"use client";

import { useEffect } from "react";
import useAuthStore from "@/store/authStore";

export default function AuthInit({ children }) {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, []);

  return children;
}
