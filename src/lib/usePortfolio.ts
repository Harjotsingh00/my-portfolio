"use client";

import { useState, useEffect } from "react";
import type { PortfolioData } from "@/types/portfolio";
import { portfolioData as defaultData } from "../../data/portfolio";

const STORAGE_KEY = "portfolio_data";

export function usePortfolio() {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as PortfolioData;
        setData(parsed);
      }
    } catch {
      // fallback to default
    }
    setLoaded(true);
  }, []);

  const save = (updated: PortfolioData) => {
    setData(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // storage unavailable
    }
  };

  const reset = () => {
    setData(defaultData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return { data, save, reset, loaded };
}
