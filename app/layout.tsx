import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devasurya M — Aspiring AI/ML Engineer",
  description: "Portfolio of Devasurya M, an aspiring AI/ML engineer exploring intelligent systems.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
