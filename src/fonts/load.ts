import localFont from "next/font/local";
import { cn } from "@/lib/cn";

/**
 * Local faces only. Add a file under `files/`, register here with `variable`,
 * then add a catalog entry in `registry.ts`.
 */
const bebasNeue = localFont({
  src: "./files/bebas-neue/BebasNeue-Regular.ttf",
  variable: "--font-family-bebas-neue",
  weight: "400",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const heebo = localFont({
  src: "./files/heebo/Heebo-Variable.ttf",
  variable: "--font-family-heebo",
  weight: "100 900",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const ubuntu = localFont({
  src: [
    {
      path: "./files/ubuntu/Ubuntu-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./files/ubuntu/Ubuntu-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-family-ubuntu",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/** Apply on `<html>` so `--font-family-*` CSS vars are available site-wide. */
export const fontVariablesClassName = cn(
  bebasNeue.variable,
  heebo.variable,
  ubuntu.variable,
);
