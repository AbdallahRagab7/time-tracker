"use client";

import { useEffect } from "react";
import { seedFakeData } from "@/lib/seedFakeData";

/**
 * Component that seeds fake data on app startup
 * Only runs once when the app loads (if stores are empty)
 */
export function DataSeeder() {
  useEffect(() => {
    seedFakeData();
  }, []);

  return null;
}
